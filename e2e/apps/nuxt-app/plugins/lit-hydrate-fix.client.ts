/**
 * Safety net for production builds: re-invoke Lit hydration support if
 * the bundler evaluated lit-element.js before lit-element-hydrate-support.js.
 *
 * Same fix as _ssr-init.ts in the React wrappers, adapted for Nuxt.
 * In dev mode this is a no-op (import order is correct with Vite).
 */
import { LitElement } from "lit";

try {
  if (typeof globalThis.litElementHydrateSupport === "function") {
    if (!(LitElement.observedAttributes ?? []).includes("defer-hydration")) {
      globalThis.litElementHydrateSupport({ LitElement });
    }
  }
} catch {
  // observedAttributes getter may throw in some bundler contexts.
  // Safe to skip — patches are already applied.
}

export default defineNuxtPlugin(() => {});
