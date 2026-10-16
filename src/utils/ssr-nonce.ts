/**
 * CSP nonce for Declarative Shadow DOM (DSD) styles.
 *
 * Two functions:
 * - `registerSSRNonce()` — call ONCE at server startup (instrumentation.ts).
 *   Patches LitElementRenderer to respect globalThis.litNonce.
 * - `setCSPNonce()` — call per-request in layout.tsx.
 *   Sets globalThis.litNonce for the current request.
 *
 * @example
 * ```ts
 * // instrumentation.ts
 * import { registerSSRNonce } from '@govtechsg/sgds-web-component/react/ssr';
 *
 * export async function register() {
 *   await registerSSRNonce();
 * }
 * ```
 *
 * ```tsx
 * // app/layout.tsx (server component)
 * import { setCSPNonce } from '@govtechsg/sgds-web-component/react/ssr';
 * import { headers } from 'next/headers';
 *
 * export default async function Layout({ children }) {
 *   const nonce = (await headers()).get('x-nonce');
 *   if (nonce) setCSPNonce(nonce);
 *   return <html><body>{children}</body></html>;
 * }
 * ```
 */

/**
 * Set the CSP nonce for the current request. Call this in your server
 * component (e.g. layout.tsx) before SGDS components render.
 * This is synchronous — no await needed.
 */
export function setCSPNonce(nonce: string | null): void {
  (globalThis as Record<string, unknown>)["litNonce"] = nonce ?? undefined;
}

export function getCSPNonce(): string | null {
  return (
    ((globalThis as Record<string, unknown>)["litNonce"] as string) ?? null
  );
}

/**
 * Patch LitElementRenderer.renderShadow() to inject CSP nonces into
 * DSD <style> tags. Call this ONCE at server startup from instrumentation.ts.
 *
 * This must run before any SSR request is handled. Next.js's
 * instrumentation.ts `register()` hook guarantees this.
 */
export async function registerSSRNonce(): Promise<void> {
  if (typeof window !== "undefined") return;

  try {
    const { LitElementRenderer } = await import(
      "@lit-labs/ssr/lib/lit-element-renderer.js"
    );

    // Guard against double-patching
    if (
      (LitElementRenderer as Record<string, unknown>)._sgdsNoncePatched
    ) {
      return;
    }
    (LitElementRenderer as Record<string, unknown>)._sgdsNoncePatched =
      true;

    const originalRenderShadow = LitElementRenderer.prototype.renderShadow;

    LitElementRenderer.prototype.renderShadow = function (
      renderInfo: unknown
    ) {
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
