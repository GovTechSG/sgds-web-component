/**
 * Patches @lit-labs/ssr's LitElementRenderer.renderShadow() to respect
 * globalThis.litNonce for CSP nonce injection.
 *
 * Uses module.createRequire for SYNCHRONOUS module resolution in ESM.
 * createRequire is a function call (not the bare `require` keyword),
 * so Rolldown preserves it instead of transforming to __require().
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createRequire } from "node:module";

if (typeof window === "undefined") {
  try {
    const _require = createRequire(import.meta.url);
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
