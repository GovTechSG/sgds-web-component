# Next.js Integration

SGDS React wrappers provide **zero-config SSR** in Next.js (tested with Next.js 16). Components render their full shadow DOM as inline HTML on the server using Declarative Shadow DOM (DSD) — no FOUC, no layout shift, no webpack plugin required. Works with both webpack and Turbopack.

## Use React wrapper components

Two import paths are available:

| Import | Use when |
|--------|----------|
| `@govtechsg/sgds-web-component/react/ssr` | You want SSR with Declarative Shadow DOM (no FOUC, CLS 0, CSP nonce support) |
| `@govtechsg/sgds-web-component/react` | You are fine with client-side rendering only |

`/react/ssr` re-exports every component from `/react` and adds SSR hydration init + `setCSPNonce`/`getCSPNonce`. Both paths expose the same React wrapper components.

```tsx
'use client';
import { SgdsInput, SgdsButton } from "@govtechsg/sgds-web-component/react/ssr";

export default function MyForm() {
  return (
    <>
      <SgdsInput label="Name" onSgdsChange={(e) => console.log(e)} />
      <SgdsButton variant="primary">Submit</SgdsButton>
    </>
  );
}
```

Event naming follows the camelCase convention: `sgds-change` → `onSgdsChange`, `sgds-after-show` → `onSgdsAfterShow`.

## SSR — how it works

SSR is **automatically enabled** when you import components from `@govtechsg/sgds-web-component/react/ssr`. There is nothing else to configure.

1. On the server, each SGDS component renders its full shadow DOM as inline HTML using Declarative Shadow DOM (DSD). Component styles are embedded in the HTML response.
2. The browser receives fully styled components on the first paint — no flash of unstyled content (FOUC), no layout shift.
3. On the client, the browser adopts the shadow DOM from the HTML and Lit hydrates without re-rendering. Events attach and the component becomes interactive.

## CSP nonce support (optional)

If the app has a strict `Content-Security-Policy` with `style-src 'nonce-...'`, call `setCSPNonce()` in the root layout to stamp the nonce onto DSD `<style>` tags:

```tsx
// app/layout.tsx (server component)
import { setCSPNonce } from "@govtechsg/sgds-web-component/react/ssr";
import { headers } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  if (nonce) setCSPNonce(nonce);
  return <html lang="en"><body>{children}</body></html>;
}
```

`setCSPNonce()` stamps the nonce onto every `<style>` tag inside each component's Declarative Shadow DOM during server rendering. This is synchronous — no `await` needed.

> `getCSPNonce()` is also exported from `@govtechsg/sgds-web-component/react/ssr` for debugging or inspecting the current nonce value.

The `react/ssr` entry has no `"use client"` directive. `setCSPNonce`/`getCSPNonce` should be called in server components (e.g. `layout.tsx`). Component imports from `/react/ssr` work in `'use client'` files because they re-export from the `'use client'`-marked `/react` entry.

## TypeScript support

Add a `types.d.ts` at the project root:

```ts
import "@govtechsg/sgds-web-component/types/react";
```

Ensure it is included by your `tsconfig.json`:

```json
{
  "include": ["types.d.ts", "next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

Official docs: https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs
