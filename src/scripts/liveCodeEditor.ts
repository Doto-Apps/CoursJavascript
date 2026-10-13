import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  drawSelection,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
} from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";

export function mountEditor(element: HTMLElement) {
  const original = element.querySelector("code")!.textContent ?? "";
  const language = element.dataset.language!;
  const title = element.querySelector("h4")!.textContent ?? "Code et résultat";
  element.querySelector(".live-code-fallback")!.remove();
  element.querySelector(".live-code-activate")!.remove();
  element.insertAdjacentHTML(
    "beforeend",
    `<div class="live-code-toolbar">
    <button type="button" data-run>Exécuter</button><button type="button" data-reset>Réinitialiser</button><button type="button" data-copy>Copier</button>
    <label><input type="checkbox" data-auto checked> Aperçu automatique</label>
    <label>Largeur <select aria-label="Largeur de l’aperçu"><option value="100%">Disponible</option><option value="320px">320 px</option><option value="768px">768 px</option><option value="1024px">1024 px</option></select></label>
  </div>
  <div class="live-code-panes"><div class="live-code-editor"></div><div class="live-code-output"><div class="live-code-preview" tabindex="0" aria-label="Aperçu : cliquez ou utilisez Tab pour l’activer" title="Cliquez pour activer l’aperçu"><iframe sandbox="allow-scripts allow-forms" referrerpolicy="no-referrer"></iframe></div><details class="live-code-console"><summary>Console et erreurs</summary><pre data-console tabindex="0" aria-label="Messages de l’exemple"></pre></details></div></div>
  <p data-status class="live-code-status" role="status"></p>`,
  );
  const frame = element.querySelector("iframe")!;
  const preview = element.querySelector<HTMLElement>(".live-code-preview")!;
  let focusTimer: ReturnType<typeof setTimeout> | undefined;
  const setPreviewActive = (active: boolean) => {
    preview.toggleAttribute("data-active", active);
  };
  const onOutsideInteraction = (event: Event) => {
    clearTimeout(focusTimer);
    setPreviewActive(preview.contains(event.target as Node));
  };
  // :focus-within stops matching when focus enters a sandboxed iframe.
  // Preserve activation across that boundary; clicks/focus elsewhere end it.
  const onPreviewBlur = () => {
    focusTimer = setTimeout(() => {
      setPreviewActive(preview.contains(document.activeElement));
    }, 0);
  };
  document.addEventListener("focusin", onOutsideInteraction);
  document.addEventListener("pointerdown", onOutsideInteraction, true);
  preview.addEventListener("focusout", onPreviewBlur);
  frame.title = `Résultat : ${title}`;
  const status = element.querySelector<HTMLElement>("[data-status]")!;
  const output = element.querySelector<HTMLElement>("[data-console]")!;
  const automatic = element.querySelector<HTMLInputElement>("[data-auto]")!;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let runId = "";
  let destroyed = false;
  let running = false;
  const source = () => editor.state.doc.toString();
  const run = () => {
    if (destroyed) return;
    clearTimeout(timer);
    runId = crypto.randomUUID();
    output.textContent = "";
    running = true;
    status.textContent = "Exécution de l’aperçu…";
    const origin = location.origin;
    const policy = `default-src 'none'; script-src 'unsafe-inline' ${origin}; style-src 'unsafe-inline' ${origin}; img-src data: blob: https: http:; font-src data: ${origin}; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-src 'none'; object-src 'none'`;
    const monitor = `<meta http-equiv="Content-Security-Policy" content="${policy}"><script>
      (() => {
        const send = (type, value) => parent.postMessage({kind:'live-code',runId:${JSON.stringify(runId)},type,value},'*');
        const text = value => { try { return typeof value === 'string' ? value : JSON.stringify(value) ?? String(value); } catch { return String(value); } };
        for (const level of ['log','warn','error']) { const old = console[level]; console[level] = (...args) => { send(level,args.map(text).join(' ')); old.apply(console,args); }; }
        addEventListener('error', event => send('error',event.message));
        addEventListener('unhandledrejection', event => send('error',String(event.reason)));
        addEventListener('load', () => send('ready','Aperçu à jour.'));
        document.addEventListener('click', event => {
          const link = event.target.closest?.('a[href^="#"]');
          if (!link || event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
          event.preventDefault();
          let id; try { id=decodeURIComponent(link.getAttribute('href').slice(1)); } catch { return; }
          const target = id ? document.getElementById(id) : document.documentElement;
          if (!target) return;
          target.scrollIntoView(); if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex','-1'); target.focus({preventScroll:true});
        });
      })();
    <\/script>`;
    let documentSource = source();
    const starter = `<main><h1>Bonjour !</h1><p>Un paragraphe pour expérimenter.</p><button type="button">Tester</button><div class="carte">Une carte</div></main>`;
    if (language === "css")
      documentSource = `${starter}<style>${documentSource}</style>`;
    if (language === "javascript")
      documentSource = `${starter}<script>${documentSource}<\/script>`;
    if (!/<html\b/i.test(documentSource)) {
      documentSource = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>${documentSource}</body></html>`;
    }
    if (/<head\b[^>]*>/i.test(documentSource)) {
      documentSource = documentSource.replace(
        /<head\b[^>]*>/i,
        (head) => head + monitor,
      );
    } else
      documentSource = documentSource.replace(
        /<html\b[^>]*>/i,
        (root) => root + "<head>" + monitor + "</head>",
      );
    frame.srcdoc = documentSource;
  };
  const editor = new EditorView({
    parent: element.querySelector(".live-code-editor")!,
    state: EditorState.create({
      doc: original,
      extensions: [
        lineNumbers(),
        history(),
        drawSelection(),
        highlightActiveLine(),
        bracketMatching(),
        syntaxHighlighting(defaultHighlightStyle),
        language === "html"
          ? html()
          : language === "css"
            ? css()
            : javascript(),
        // Deliberately leave Tab to browser focus navigation.
        keymap.of([...defaultKeymap, ...historyKeymap]),
        EditorView.lineWrapping,
        EditorView.contentAttributes.of({
          "aria-label": `Code modifiable : ${title}`,
          spellcheck: "false",
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged && automatic.checked) {
            clearTimeout(timer);
            timer = setTimeout(run, 400);
          }
        }),
      ],
    }),
  });
  const codePane = element.querySelector<HTMLElement>(".live-code-editor")!;
  const focusCode = (event: PointerEvent) => {
    if (event.button !== 0) return;
    editor.contentDOM.focus({ preventScroll: true });
    // A click on a non-focusable gutter otherwise blurs the editor again.
    if (codePane.querySelector(".cm-gutters")?.contains(event.target as Node))
      event.preventDefault();
  };
  const scrollCode = (event: WheelEvent) => {
    if (!editor.hasFocus || event.ctrlKey || !event.cancelable) return;
    const scroller = editor.scrollDOM;
    const unit =
      event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? parseFloat(getComputedStyle(scroller).lineHeight) || 20
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? scroller.clientHeight
          : 1;
    const left = scroller.scrollLeft;
    const top = scroller.scrollTop;
    // Apply the first wheel event directly, without waiting for the browser's
    // scrolling layer to catch up with the newly focused editor.
    scroller.scrollBy({
      left:
        (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * unit,
      top: event.shiftKey && !event.deltaX ? 0 : event.deltaY * unit,
      behavior: "instant",
    });
    if (scroller.scrollLeft !== left || scroller.scrollTop !== top)
      event.preventDefault();
  };
  codePane.addEventListener("pointerdown", focusCode, true);
  codePane.addEventListener("wheel", scrollCode, {
    passive: false,
    capture: true,
  });
  element.dataset.ready = "true";
  element.querySelector("[data-run]")!.addEventListener("click", run);
  element.querySelector("[data-reset]")!.addEventListener("click", () => {
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: original },
    });
    run();
  });
  element.querySelector("[data-copy]")!.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(source());
      status.textContent = "Code copié.";
    } catch {
      editor.dispatch({
        selection: { anchor: 0, head: editor.state.doc.length },
      });
      editor.focus();
      status.textContent = "Code sélectionné : utilisez Ctrl+C ou Cmd+C.";
    }
  });
  automatic.addEventListener("change", () => {
    clearTimeout(timer);
    if (automatic.checked) run();
  });
  element.querySelector("select")!.addEventListener("change", (event) => {
    frame.style.width = (event.target as HTMLSelectElement).value;
  });
  const onMessage = (event: MessageEvent) => {
    if (
      event.source !== frame.contentWindow ||
      event.data?.kind !== "live-code" ||
      event.data.runId !== runId
    )
      return;
    const { type, value } = event.data;
    if (
      !["ready", "log", "warn", "error"].includes(type) ||
      typeof value !== "string"
    )
      return;
    if (type === "ready") {
      if (running) status.textContent = "Aperçu à jour.";
      return;
    }
    output.textContent = (
      output.textContent + `[${type}] ${value.slice(0, 2000)}\n`
    ).slice(-12000);
    if (type === "error") {
      running = false;
      status.textContent = `Erreur JavaScript : ${value.slice(0, 250)}`;
      element.querySelector("details")!.open = true;
    }
  };
  window.addEventListener("message", onMessage);
  run();
  return {
    destroy() {
      destroyed = true;
      clearTimeout(timer);
      clearTimeout(focusTimer);
      document.removeEventListener("focusin", onOutsideInteraction);
      document.removeEventListener("pointerdown", onOutsideInteraction, true);
      preview.removeEventListener("focusout", onPreviewBlur);
      codePane.removeEventListener("pointerdown", focusCode, true);
      codePane.removeEventListener("wheel", scrollCode, true);
      window.removeEventListener("message", onMessage);
      editor.destroy();
    },
  };
}
