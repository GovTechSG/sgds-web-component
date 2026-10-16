/**
 * Patches @lit-labs/ssr's LitElementRenderer.renderShadow() to respect
 * globalThis.litNonce for CSP nonce injection.
 *
 * Uses a dynamic require for synchronous module resolution within webpack's
 * bundle. This ensures the patch is applied at module evaluation time —
 * before any SSR rendering starts, including on the first request.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

if (typeof window === "undefined") {
  try {
    // Get a require function that TypeScript won't complain about.
    // In webpack/Node.js server context, globalThis has require available.
    const _require =
      (globalThis as any).require || (typeof __webpack_require__ !== "undefined" ? __non_webpack_require__ : undefined);

    if (_require) {
      const mod = _require("@lit-labs/ssr/lib/lit-element-renderer.js");
      const LitElementRenderer = mod.LitElementRenderer || mod.default?.LitElementRenderer;

      if (LitElementRenderer && !LitElementRenderer._sgdsNoncePatched) {
        LitElementRenderer._sgdsNoncePatched = true;

        const originalRenderShadow = LitElementRenderer.prototype.renderShadow;

        LitElementRenderer.prototype.renderShadow = function (renderInfo: unknown) {
          const result = originalRenderShadow.call(this, renderInfo);
          if (!result) return result;

          const nonce = (globalThis as any).litNonce;
          if (!nonce) return result;

          return result.map((item: unknown) => {
            if (typeof item === "string" && item === "<style>") {
              return `<style nonce="${nonce}">`;
            }
            return item;
          });
        };
      }
    }
  } catch {
    // @lit-labs/ssr not available — nonce injection disabled
  }
}

// Declare webpack globals to avoid TS errors
declare const __webpack_require__: unknown;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const __non_webpack_require__: any;
