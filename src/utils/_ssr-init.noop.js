// No-op: SSR init is only needed in Node.js environments (Next.js SSR).
// CSR React apps resolve this via the "default" export condition, skipping
// @lit-labs/ssr-react and nonce-patch imports entirely.
export {};
