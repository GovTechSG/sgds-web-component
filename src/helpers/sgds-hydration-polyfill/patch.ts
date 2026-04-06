/** Elements already patched — prevents double-patching on re-renders. */
const patched = new WeakSet<Element>();

/** Read React memoizedProps from a DOM node via the fiber tree.
 *  React attaches the fiber as `__reactFiber$<hash>` on each DOM node. */
function getReactProps(el: Element): Record<string, unknown> | null {
  const fiberKey = Object.keys(el).find(k => k.startsWith("__reactFiber"));
  if (!fiberKey) return null;
  return (el as any)[fiberKey]?.memoizedProps ?? null;
}

/**
 * Polyfill for React #35446 / PR #35474.
 *
 * Re-applies custom element props (events + object/array properties) that
 * React's hydrateProperties() skipped during SSR hydration.
 *
 * Call immediately after SGDS custom elements are registered:
 *
 *   await import('@govtechsg/sgds-web-component');
 *   patchCustomElementHydration(document.body);
 *
 * Safe to call multiple times — already-patched elements are skipped.
 */
export function patchCustomElementHydration(container: Element = document.body): void {
  container.querySelectorAll("*").forEach(el => {
    // isCustomElement: tag name contains a hyphen (Web Components spec)
    if (!el.tagName.includes("-")) return;
    if (patched.has(el)) return;

    const props = getReactProps(el);
    if (!props) return;

    for (const [key, value] of Object.entries(props)) {
      if (value == null) continue;

      if (key.startsWith("on") && typeof value === "function") {
        // React 19 convention: 'onsgds-change' → addEventListener('sgds-change', ...)
        // key.slice(2) matches exactly how React derives the event name in
        // setInitialDOMProperties / setPropOnCustomElement (the upstream fix).
        el.addEventListener(key.slice(2), value as EventListener);
      } else if (
        key !== "children" &&
        key !== "className" &&
        key !== "suppressHydrationWarning" &&
        key !== "ref" &&
        (typeof value === "object" || Array.isArray(value))
      ) {
        // Set array/object directly as DOM property — bypasses setAttribute()
        // serialization which corrupts arrays to "[object Object]".
        (el as any)[key] = value;
      }
    }

    patched.add(el);
  });
}
