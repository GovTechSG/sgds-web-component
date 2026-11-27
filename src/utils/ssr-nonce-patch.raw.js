/**
 * Patches @lit-labs/ssr's LitElementRenderer.renderShadow() to:
 *
 * 1. Eagerly resolve function thunks into flat HTML strings.
 *    @lit-labs/ssr-react's wrapJsxDev (dev mode) uses
 *    [...shadowContents].join('') instead of collectResultSync(),
 *    which .toString()'s function thunks into visible text like
 *    "() => (0,_render_value_js__WEBPACK_IMPORTED_MODULE_4__.renderValue)".
 *
 * 2. Inject globalThis.litNonce into <style> tags for CSP compliance.
 *
 * This file is NOT processed by Rolldown — it's copied as-is to lib/.
 * The bare require() is preserved so webpack resolves it within its own
 * module system, ensuring we patch the SAME LitElementRenderer instance
 * that @lit-labs/ssr-react uses during rendering.
 */
if (typeof window === "undefined") {
  try {
    var mod = require("@lit-labs/ssr/lib/lit-element-renderer.js");
    var LitElementRenderer = mod.LitElementRenderer || (mod.default && mod.default.LitElementRenderer);
    var collectResultSync = require("@lit-labs/ssr/lib/render-result.js").collectResultSync;

    if (LitElementRenderer && !LitElementRenderer._sgdsNoncePatched) {
      LitElementRenderer._sgdsNoncePatched = true;

      var originalRenderShadow = LitElementRenderer.prototype.renderShadow;

      LitElementRenderer.prototype.renderShadow = function (renderInfo) {
        var result = originalRenderShadow.call(this, renderInfo);
        if (!result) return result;

        // Eagerly resolve all thunks into a single HTML string so that
        // consumers using [...result].join('') get correct output.
        var html = collectResultSync(result);

        // Inject CSP nonce into <style> tags if set
        var nonce = globalThis.litNonce;
        if (nonce) {
          html = html.replace(/<style>/g, '<style nonce="' + nonce + '">');
        }

        return [html];
      };
    }
  } catch (e) {
    // @lit-labs/ssr not available — patch disabled
  }
}
