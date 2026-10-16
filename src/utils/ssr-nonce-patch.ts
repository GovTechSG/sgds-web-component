/**
 * Patches @lit-labs/ssr's LitElementRenderer.renderShadow() to respect
 * globalThis.litNonce for CSP nonce injection.
 *
 * Uses globalThis.require (Node.js CJS require) for SYNCHRONOUS module
 * resolution. This ensures the patch is applied at module evaluation time —
 * before any SSR rendering starts, including on the first request.
 */

if (typeof window === "undefined") {
  try {
    // Use Function constructor to get a raw require that bundlers won't transform.
    // In webpack's server bundle, this resolves to the bundled module synchronously.
    // In Node.js runtime, this resolves via the module cache.
    const _require = typeof require !== "undefined" ? require : new Function("id", "return import(id)");

    const mod = _require("@lit-labs/ssr/lib/lit-element-renderer.js");
    const LitElementRenderer = mod.LitElementRenderer || mod.default?.LitElementRenderer;

    if (LitElementRenderer && !LitElementRenderer._sgdsNoncePatched) {
      LitElementRenderer._sgdsNoncePatched = true;

      const originalRenderShadow = LitElementRenderer.prototype.renderShadow;

      LitElementRenderer.prototype.renderShadow = function (renderInfo: unknown) {
        const result = originalRenderShadow.call(this, renderInfo);
        if (!result) return result;

        const nonce = (globalThis as Record<string, unknown>)["litNonce"];
        if (!nonce) return result;

        return result.map((item: unknown) => {
          if (typeof item === "string" && item === "<style>") {
            return `<style nonce="${nonce}">`;
          }
          return item;
        });
      };
    }
  } catch {
    // @lit-labs/ssr not available — nonce injection disabled
  }
}
