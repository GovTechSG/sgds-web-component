# Next.js integration

SGDS web components are fully supported in Next.js with React 19+, tested with Next.js 16. The React wrappers provide **zero-config server-side rendering (SSR)** with Declarative Shadow DOM — no webpack plugins, no `next.config.js` changes required.

## Recommended: Use React wrapper components

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
      <SgdsButton variant="primary" onSgdsBlur={(e) => console.log(e)}>Submit</SgdsButton>
    </>
  );
}
```

Event naming follows the camelCase convention: `sgds-change` → `onSgdsChange`, `sgds-after-show` → `onSgdsAfterShow`.

See the [React integration guide](/docs/frameworks-react--docs) for full import paths and TypeScript usage.

## Prerequisites

Before integrating SGDS with Next.js, read the [React integration guide](/docs/frameworks-react--docs) for foundational concepts.

## Server-Side Rendering (SSR)

SSR is **automatically enabled** when you import components from `@govtechsg/sgds-web-component/react/ssr`. There is nothing else to configure.

### How it works

1. On the server, each SGDS component renders its full shadow DOM as inline HTML using [Declarative Shadow DOM](https://developer.chrome.com/docs/css-ui/declarative-shadow-dom) (DSD). Component styles are embedded in the HTML response.
2. The browser receives fully styled components on the first paint — no flash of unstyled content (FOUC), no layout shift.
3. On the client, the browser adopts the shadow DOM from the HTML and Lit hydrates without re-rendering. Events attach and the component becomes interactive.

### What this means for you

- **No layout shift** — components render with the correct styles immediately
- **No FOUC** — component CSS is included in the server response
- **No webpack plugin** — unlike the previous `@lit-labs/nextjs` approach, there is no `withLit()` plugin to configure
- **Turbopack compatible** — works with both webpack and Turbopack

## CSP nonce support (optional)

If your Next.js app uses a strict `Content-Security-Policy` with a `style-src` nonce directive, the inline `<style>` tags inside each component's shadow DOM need to carry the nonce. Without it, the browser blocks the styles.

Call `setCSPNonce()` in your root layout **before** any SGDS components render:

```tsx
// app/layout.tsx (server component)
import { setCSPNonce } from "@govtechsg/sgds-web-component/react/ssr";
import { headers } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  if (nonce) setCSPNonce(nonce);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`setCSPNonce()` stamps the nonce onto every `<style>` tag inside each component's Declarative Shadow DOM during server rendering. This is synchronous — no `await` needed.

> `getCSPNonce()` is also exported from `@govtechsg/sgds-web-component/react/ssr` for debugging or inspecting the current nonce value.

**Note:** The `react/ssr` import is a server-only module (no `"use client"` directive). Import it only in server components.

## TypeScript support

Add a `types.d.ts` file at the project root and import the SGDS React type definitions. This gives full IntelliSense for props and typed `CustomEvent` detail payloads on all `sgds-*` elements without manual per-component declarations:

```ts
// types.d.ts
import "@govtechsg/sgds-web-component/types/react";
```

Ensure the file is picked up by your `tsconfig.json`:

```json
{
  "include": ["types.d.ts", "next-env.d.ts", "**/*.ts", "**/*.tsx"]
}
```

## Using native custom element tags

If you use the native `<sgds-*>` tags directly instead of the React wrappers, you will need to handle some Next.js-specific issues manually.

> These issues do not apply when using the React wrapper components.

### Event listeners not firing on first load

Custom event listeners may fail to attach due to Next.js hydration timing. Add event listeners in a `useEffect` hook:

```tsx
'use client';

import { type JSX, useEffect, useRef } from 'react';

interface Props {
  className?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onInput?: (value: string) => void;
}

const SgdsInput = ({
  className,
  label,
  placeholder,
  value,
  onInput = () => {}
}: Props): JSX.Element => {
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleInput = (event: CustomEvent<{ value: string }>) => {
      const inputElement = event.target as HTMLInputElement;
      onInput(inputElement.value);
    };

    input.addEventListener('sgds-input', handleInput);

    return () => {
      input.removeEventListener('sgds-input', handleInput);
    };
  }, [onInput]);

  return (
    <sgds-input
      ref={inputRef}
      className={className}
      label={label}
      placeholder={placeholder}
      value={value}
      suppressHydrationWarning
    >
      <sgds-icon slot="icon" name="search" suppressHydrationWarning />
    </sgds-input>
  );
};

export default SgdsInput;
```

### Hydration mismatch warnings

Web components add attributes during browser parsing that weren't in the server HTML. Add `suppressHydrationWarning` to web component elements:

```tsx
<sgds-input suppressHydrationWarning>
  <sgds-icon slot="icon" name="search" suppressHydrationWarning />
</sgds-input>
```
