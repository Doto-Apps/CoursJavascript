const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
const languages = {
  html: "html",
  xml: "html",
  css: "css",
  js: "javascript",
  javascript: "javascript",
};

/** Opt in with a normal Markdown fence: ```html live title="Optional title". */
export default function remarkLiveCode() {
  return (tree) => {
    let number = 0;
    function renderPreview(node) {
      const language = languages[node.lang?.toLowerCase()];
      if (language !== "html" || /<script\b/i.test(node.value))
        throw new Error("Fixed previews support HTML/CSS only. Use live for JavaScript.");
      const title = node.meta?.match(/\btitle=(?:"([^"]*)"|'([^']*)')/)?.slice(1).find(Boolean) ?? "Résultat du code";
      const height = Math.min(600, Math.max(120, Number(node.meta?.match(/\bheight=(\d+)/)?.[1]) || 220));
      const policy = "default-src 'none'; style-src 'unsafe-inline'; img-src data: https: http:; form-action 'none'; base-uri 'none'";
      let document = node.value;
      const head = `<meta http-equiv="Content-Security-Policy" content="${policy}"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`;
      if (!/<html\b/i.test(document)) document = `<!doctype html><html lang="fr"><head></head><body>${document}</body></html>`;
      document = /<head\b[^>]*>/i.test(document)
        ? document.replace(/<head\b[^>]*>/i, (tag) => tag + head)
        : document.replace(/<html\b[^>]*>/i, (tag) => tag + `<head>${head}</head>`);
      delete node.meta;
      return { type: "html", value: `<figure class="code-preview not-prose"><figcaption>${escape(title)} — aperçu fixe</figcaption><iframe title="${escape(title)}" sandbox="" loading="lazy" referrerpolicy="no-referrer" style="height:${height}px" srcdoc="${escape(document)}"></iframe></figure>` };
    }
    function visit(node) {
      if (
        node.type === "code" &&
        /(?:^|\s)live(?:\s|$)/.test(node.meta ?? "")
      ) {
        const language = languages[node.lang?.toLowerCase()];
        if (!language)
          throw new Error(
            `Interactive blocks support HTML/XML, CSS and JS, not ${node.lang}.`,
          );
        const title =
          node.meta
            ?.match(/\btitle=(?:"([^"]*)"|'([^']*)')/)
            ?.slice(1)
            .find(Boolean) ?? "Code et résultat";
        const id = `live-code-${++number}`;
        const source = node.value;
        node.type = "html";
        node.value = `<section class="live-code not-prose" data-live-code data-language="${language}" aria-labelledby="${id}"><h4 class="live-code-title" id="${id}">${escape(title)}</h4><pre class="live-code-fallback" tabindex="0"><code>${escape(source)}</code></pre><button type="button" class="live-code-activate">Activer l’éditeur et l’aperçu</button><noscript>Le code reste consultable. Activez JavaScript pour le modifier et voir son résultat.</noscript></section>`;
        delete node.lang;
        delete node.meta;
      }
      if (node.children) {
        node.children = node.children.flatMap((child) => {
          if (child.type === "code" && /(?:^|\s)preview(?:\s|$)/.test(child.meta ?? ""))
            return [child, renderPreview(child)];
          visit(child);
          return [child];
        });
      }
    }
    visit(tree);
  };
}
