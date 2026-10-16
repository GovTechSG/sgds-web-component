/**
 * Patches @lit-labs/ssr's LitElementRenderer.renderShadow() to respect
 * globalThis.litNonce for CSP nonce injection.
 *
 * This file is NOT processed by Rolldown — it's copied as-is to lib/.
 * The bare require() is preserved so webpack resolves it within its own
 * module system, ensuring we patch the SAME LitElementRenderer instance
 * that @lit-labs/ssr-react uses during rendering.
 */
if (typeof window === "undefined") {
  try {
    var mod = require("@lit-labs/ssr/lib/lit-element-renderer.js");
    var LitElementRenderer =
      mod.LitElementRenderer || (mod.default && mod.default.LitElementRenderer);

    if (LitElementRenderer && !LitElementRenderer._sgdsNoncePatched) {
      LitElementRenderer._sgdsNoncePatched = true;

      var originalRenderShadow = LitElementRenderer.prototype.renderShadow;

      LitElementRenderer.prototype.renderShadow = function (renderInfo) {
        var result = originalRenderShadow.call(this, renderInfo);
        if (!result) return result;

        var nonce = globalThis.litNonce;
        if (!nonce) return result;

        return result.map(function (item) {
          if (typeof item === "string" && item === "<style>") {
            return '<style nonce="' + nonce + '">';
          }
          return item;
        });
      };
    }
  } catch (e) {
    // @lit-labs/ssr not available — nonce injection disabled
  }
}
