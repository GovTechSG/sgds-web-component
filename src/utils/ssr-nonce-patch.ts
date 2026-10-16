/**
 * Patches @lit-labs/ssr's LitElementRenderer.renderShadow() to respect
 * globalThis.litNonce for CSP nonce injection.
 *
 * Uses new Function("return require")() to get a synchronous require
 * that is invisible to both Rolldown and webpack. Bundlers cannot
 * statically analyze new Function(), so they leave it alone.
 * At runtime in Node.js, it returns the real require function.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

if (typeof window === "undefined") {
  try {
    // new Function hides require from all bundlers — synchronous at runtime
    const _require = new Function("return require")() as (
      id: string
    ) => any;
    const mod = _require("@lit-labs/ssr/lib/lit-element-renderer.js");
    const LitElementRenderer =
      mod.LitElementRenderer || mod.default?.LitElementRenderer;

    if (LitElementRenderer && !LitElementRenderer._sgdsNoncePatched) {
      LitElementRenderer._sgdsNoncePatched = true;

      const originalRenderShadow =
        LitElementRenderer.prototype.renderShadow;

      LitElementRenderer.prototype.renderShadow = function (
        renderInfo: unknown
      ) {
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
  } catch {
    // @lit-labs/ssr not available — nonce injection disabled
  }
}
