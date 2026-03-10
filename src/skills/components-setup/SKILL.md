---
name: sgds-components-setup
description: "Setup and framework integration instructions for using SGDS web components. Apply this skill whenever a user asks about installing SGDS components, integrating with React, Vue, or Angular, React 19 vs React 18 component usage, importing individual components, or accessing component methods via refs."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: setup
---

# SGDS Components Setup Skill

Prerequisites and framework integration for using `<sgds-*>` web components.

## Installation

```bash
npm install @govtechsg/sgds-web-component
# or
pnpm add @govtechsg/sgds-web-component
```

Import the library once at your app entry point:

```js
import "@govtechsg/sgds-web-component";
```

## Framework Integration

### React

**React version determines which import to use.**

#### React 19+ (client-side, e.g. Vite)

React 19 supports native custom elements directly — import once at the app entry point, then use the web component tag anywhere:

```jsx
import "@govtechsg/sgds-web-component";

function App() {
  return (
    <sgds-button variant="primary" onsgds-blur={(e) => console.log(e)}>
      Click Me
    </sgds-button>
  );
}
```

Custom event syntax in React 19: prefix the event name with `on` in lowercase (`sgds-blur` → `onsgds-blur`).

> **Using Next.js?** Next.js is SSR-based and requires a different setup — see the [Next.js section](#nextjs) below.

Complex props (arrays, objects) can be passed declaratively:

```jsx
import "@govtechsg/sgds-web-component";

const steps = [
  { component: <Step1 />, stepHeader: "Personal details" },
  { component: <Step2 />, stepHeader: "Contact details" },
];

function App() {
  return <sgds-stepper steps={steps}></sgds-stepper>;
}
```

#### React 18 and below

React ≤18 does not support custom element events or complex props natively. Use the React wrapper components:

```jsx
import { SgdsButton } from "@govtechsg/sgds-web-component/react";

function App() {
  return (
    <SgdsButton variant="primary" onSgdsBlur={(e) => console.log(e)}>
      Click Me
    </SgdsButton>
  );
}
```

React wrapper event naming: `sgds-blur` → `onSgdsBlur`, `sgds-change` → `onSgdsChange` (prefix `on`, camelCase).

| Web component event | React ≤18 wrapper prop |
|---|---|
| `sgds-change` | `onSgdsChange` |
| `sgds-blur` | `onSgdsBlur` |
| `sgds-focus` | `onSgdsFocus` |
| `sgds-toggle` | `onSgdsToggle` |
| `sgds-after-show` | `onSgdsAfterShow` |
| `sgds-after-hide` | `onSgdsAfterHide` |

**Accessing component methods in React ≤18** (via `useRef`):

```tsx
import { useRef } from "react";
import type { SgdsStepper as SStep } from "@govtechsg/sgds-web-component/components";
import SgdsStepper from "@govtechsg/sgds-web-component/react/stepper/index.js";

function StepperComponent() {
  const stepperRef = useRef<SStep>(null);
  return <SgdsStepper steps={steps} ref={stepperRef} />;
}
```

> **Note**: The React wrappers will be phased out in a future major version. Migrate to React 19+ native usage when possible.

Official docs: https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs

---

### Next.js

Next.js is an SSR framework — web components rely on browser APIs and will error if imported at the module level during server-side rendering.

**Step 1 — Create `sgds.tsx` (library loader)**

```tsx
'use client';

import { useEffect } from 'react';

const SgdsLibraryLoader = () => {
  useEffect(() => {
    (async () => {
      await import('@govtechsg/sgds-web-component');
    })();
  }, []);

  return null;
};

export default SgdsLibraryLoader;
```

**Step 2 — Add to root layout `<head>`**

```tsx
// src/app/layout.tsx
import SgdsLibraryLoader from './sgds';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <SgdsLibraryLoader />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
```

**Step 3 — Use components directly** with `suppressHydrationWarning`

```tsx
<sgds-masthead suppressHydrationWarning></sgds-masthead>
```

**Step 4 — TypeScript support** — add `types.d.ts` at the project root:

```ts
import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sgds-masthead': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      // Add other SGDS components as needed
    }
  }
}
```

**Events in Next.js** — due to hydration timing, wire custom events via `useEffect` + `addEventListener` rather than declarative React props:

```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function MyInput() {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: Event) => console.log((e.target as any).value);
    el.addEventListener('sgds-input', handler);
    return () => el.removeEventListener('sgds-input', handler);
  }, []);

  return <sgds-input ref={ref} suppressHydrationWarning />;
}
```

See the [official Next.js integration docs](https://webcomponent.designsystem.tech.gov.sg/?path=/docs/frameworks-react--docs) for more detail.

---

### Vue

Vue 3 supports web components natively — no SGDS-specific wrappers exist. Refer to the [Vue + web components documentation](https://vuejs.org/guide/extras/web-components) for configuration. The SGDS-specific filter for suppressing unknown element warnings is `tag.startsWith("sgds-")`.

---

### Angular

Angular supports web components natively via `CUSTOM_ELEMENTS_SCHEMA` — no SGDS-specific wrappers exist. Refer to the [Angular elements documentation](https://angular.io/guide/elements) for configuration.

---

**For AI agents**: The key SGDS-specific decision is React version and rendering mode. React 19+ (CSR, e.g. Vite) uses the native `<sgds-*>` tag with a direct import. Next.js (SSR) requires the `SgdsLibraryLoader` pattern with `useEffect` + dynamic import — do NOT use a direct top-level import in Next.js. React ≤18 requires the SGDS React wrapper package. Vue and Angular use native web components — their setup is standard web component integration, not SGDS-specific.
