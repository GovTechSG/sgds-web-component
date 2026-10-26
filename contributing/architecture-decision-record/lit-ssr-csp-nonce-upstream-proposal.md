# Upstream proposal: CSP nonce support in @lit-labs/ssr

## Status

Proposed (pending upstream submission to lit/lit)

## Context

Lit supports CSP nonces on the client via `globalThis.litNonce` (added in PR [#2134](https://github.com/lit/lit/pull/2134), shipped with Lit 2.0). When set, Lit applies the nonce to dynamically created `<style>` elements in `@lit/reactive-element`'s `css-tag.ts`.

However, `@lit-labs/ssr`'s `LitElementRenderer.renderShadow()` does **not** check `globalThis.litNonce`. It hardcodes `<style>` without a nonce attribute:

```ts
// packages/labs/ssr/src/lib/lit-element-renderer.ts — line 130
result.push('<style>');
```

This causes CSP `style-src` violations in production SSR apps (Next.js, Remix, etc.) that use Declarative Shadow DOM with strict Content Security Policy. The browser blocks the DSD inline `<style>` because it lacks a nonce matching the CSP header.

## The problem in practice

When `@lit-labs/ssr-react` renders an SGDS web component server-side, the HTML looks like:

```html
<sgds-input ssr="">
  <template shadowrootmode="open">
    <style>:host { display: block; ... }</style>  <!-- NO nonce -->
    ...
  </template>
</sgds-input>
```

With a CSP header of `style-src 'self' 'nonce-abc123'`, the browser blocks the `<style>` and the component renders unstyled.

## Proposed fix

A 2-line change in `LitElementRenderer.renderShadow()`:

```ts
// Before:
result.push('<style>');

// After:
const nonce = (globalThis as {litNonce?: string}).litNonce;
result.push(nonce ? `<style nonce="${nonce}">` : '<style>');
```

This aligns server-side behaviour with the existing client-side `globalThis.litNonce` mechanism in `@lit/reactive-element`.

### Consumer usage

```ts
// Server startup (e.g. Next.js instrumentation.ts)
globalThis.litNonce = requestNonce;
```

```tsx
// Per-request in layout.tsx
globalThis.litNonce = (await headers()).get('x-nonce');
```

No configuration, no monkey-patching, no bundler dependencies.

## Why we can't solve this downstream

We explored multiple approaches to solve this from outside `@lit-labs/ssr`:

| Approach | Problem |
|----------|---------|
| Monkey-patch `LitElementRenderer.prototype.renderShadow` via async `import().then()` | First cold-start request renders before the async patch resolves |
| `await import()` in Next.js server component layout | Next.js streaming SSR sends the response before the await resolves |
| Patch React.createElement/jsx before `enable-lit-ssr.js` | Webpack CJS/ESM interop creates different module references — patch doesn't intercept |
| `serverExternalPackages` to unify module instances | Doesn't work with `pnpm link` (dev) and adds consumer config burden |
| `require()` for synchronous patching | Rolldown transforms `require()` to `__require()` runtime helper — webpack can't resolve it |
| Next.js `instrumentation.ts` for startup-time patching | webpack layer isolation (RSC vs SSR) creates separate `LitElementRenderer` instances |

All approaches either fail on first request, require consumer configuration, or depend on specific bundler behaviour.

**The only reliable fix is in the source** — `LitElementRenderer.renderShadow()` reading `globalThis.litNonce` natively.

## Existing Lit issues and PRs

| Reference | Relevance |
|-----------|-----------|
| [PR #2134](https://github.com/lit/lit/pull/2134) | Added client-side `globalThis.litNonce` support (merged, Lit 2.0) |
| [Issue #2025](https://github.com/lit/lit/issues/2025) | CSP violation with `style-src 'self'` — resolved by PR #2134 |
| [Issue #3722](https://github.com/lit/lit/issues/3722) | CSP `style-src` violations — resolved |
| [PR #4558](https://github.com/lit/lit/pull/4558) | Proposed reading nonce from DOM node — closed/abandoned |
| [Issue #5025](https://github.com/lit/lit/issues/5025) | Inline `style` attribute nonce limitation — closed as by-design |

**No existing issue or PR addresses `globalThis.litNonce` in the SSR renderer.**

## Impact

Without this fix, any application using:
- `@lit-labs/ssr` or `@lit-labs/ssr-react` for SSR
- Declarative Shadow DOM (`<template shadowrootmode="open">`)
- Strict CSP with `style-src` nonce

...will have DSD styles blocked by CSP. This affects all Lit-based web component libraries (not just SGDS) used in SSR frameworks like Next.js, Remix, or Astro.

## Date of proposal

16/10/2026
