/**
 * Patches @lit-labs/ssr's LitElementRenderer.renderShadow() to respect
 * globalThis.litNonce for CSP nonce injection.
 *
 * This module is imported from _ssr-init (the "use client" SSR layer).
 * When @lit-labs/ssr is in serverExternalPackages, the same module instance
 * is shared with the RSC layer, so the patch applies everywhere.
 */
if (typeof window === "undefined") {
  import("@lit-labs/ssr/lib/lit-element-renderer.js")
    .then(({ LitElementRenderer }) => {
      // Only patch once
      if ((LitElementRenderer as Record<string, unknown>)._sgdsNoncePatched) {
        return;
      }
      (LitElementRenderer as Record<string, unknown>)._sgdsNoncePatched = true;

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
    })
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    .catch(() => {});
}
