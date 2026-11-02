export function getCSPNonce(): string | null {
  return ((globalThis as Record<string, unknown>)["litNonce"] as string) ?? null;
}

/**
 * CSP nonce for Declarative Shadow DOM (DSD) styles.
 *
 * Sets globalThis.litNonce — the standard Lit mechanism for CSP nonces.
 * The ssr-nonce-patch.raw.js file reads this value at render time and
 * injects it into DSD <style> tags.
 *
 * @example
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
