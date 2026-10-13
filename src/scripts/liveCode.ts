import "../styles/live-code.css";

type Playground = { destroy(): void };
let observer: IntersectionObserver | undefined;
let modulePromise: ReturnType<typeof importEditor> | undefined;
const active = new Map<HTMLElement, Playground>();
const pending = new WeakSet<HTMLElement>();
const bound = new WeakSet<HTMLElement>();
const importEditor = () => import("./liveCodeEditor");

async function activate(element: HTMLElement) {
  if (active.has(element) || pending.has(element)) return;
  pending.add(element);
  observer?.unobserve(element);
  const button = element.querySelector<HTMLButtonElement>(
    ".live-code-activate",
  );
  if (button) {
    button.disabled = true;
    button.textContent = "Chargement de l’éditeur…";
  }
  try {
    modulePromise ??= importEditor();
    const { mountEditor } = await modulePromise;
    if (element.isConnected) active.set(element, mountEditor(element));
  } catch {
    modulePromise = undefined;
    if (button) {
      button.disabled = false;
      button.textContent = "Réessayer de charger l’éditeur";
    }
  } finally {
    pending.delete(element);
  }
}

function setup() {
  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries)
        if (entry.isIntersecting) void activate(entry.target as HTMLElement);
    },
    { rootMargin: "250px 0px" },
  );

  const currentObserver = observer;
  if (!currentObserver) return;

  for (const element of document.querySelectorAll<HTMLElement>("[data-live-code]")) {
    if (active.has(element)) continue;
    if (!bound.has(element)) {
      element
        .querySelector(".live-code-activate")
        ?.addEventListener("click", () => void activate(element));
      bound.add(element);
    }
    currentObserver.observe(element);
  }
}

function cleanup() {
  observer?.disconnect();
  for (const editor of active.values()) editor.destroy();
  active.clear();
}

document.addEventListener("astro:page-load", setup);
document.addEventListener("astro:before-swap", cleanup);
// Also support a layout without Astro client-side navigation.
if (document.readyState === "loading")
  document.addEventListener("DOMContentLoaded", setup, { once: true });
else setup();
