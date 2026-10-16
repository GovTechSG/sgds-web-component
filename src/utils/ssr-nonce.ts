/**
 * CSP nonce for Declarative Shadow DOM (DSD) styles.
 *
 * Sets globalThis.litNonce and patches LitElementRenderer.renderShadow()
 * to inject the nonce into DSD <style> tags.
 *
 * @example
 * ```tsx
 * // app/layout.tsx (server component)
 * import { setCSPNonce } from '@govtechsg/sgds-web-component/react/ssr';
 * import { headers } from 'next/headers';
 *
 * export default async function Layout({ children }) {
 *   const nonce = (await headers()).get('x-nonce');
 *   if (nonce) await setCSPNonce(nonce);
 *   return <html><body>{children}</body></html>;
 * }
 * ```
 */

let _patched = false;

export function getCSPNonce(): string | null {
  return ((globalThis as Record<string, unknown>)["litNonce"] as string) ?? null;
}

/**
 * Set the CSP nonce for the current request and ensure the
 * LitElementRenderer patch is applied. Await this in your layout
 * to guarantee nonces are injected before children render.
 */
export async function setCSPNonce(nonce: string | null): Promise<void> {
  (globalThis as Record<string, unknown>)["litNonce"] = nonce ?? undefined;

  // Patch LitElementRenderer.renderShadow() to read globalThis.litNonce.
  // This runs once — on the first call to setCSPNonce.
  if (!_patched && typeof window === "undefined") {
    _patched = true;
    try {
      const { LitElementRenderer } = await import("@lit-labs/ssr/lib/lit-element-renderer.js");
      const originalRenderShadow = LitElementRenderer.prototype.renderShadow;

      LitElementRenderer.prototype.renderShadow = function (renderInfo: unknown) {
        const result = originalRenderShadow.call(this, renderInfo);
        if (!result) return result;

        const litNonce = (globalThis as Record<string, unknown>)["litNonce"];
        if (!litNonce) return result;

        return result.map((item: unknown) => {
          if (typeof item === "string" && item === "<style>") {
            return `<style nonce="${litNonce}">`;
          }
          return item;
        });
      };
    } catch {
      // @lit-labs/ssr not available — nonce injection disabled
    }
  }
}
