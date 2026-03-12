# SGDS Setup & Framework Integration

## Installation

```bash
npm install @govtechsg/sgds-web-component
# or
pnpm add @govtechsg/sgds-web-component
```

## Required CSS Imports

Import these files in your project's main CSS entry point (processed by Tailwind):

```css
/* 1. Theme tokens — must come first */
@import "@govtechsg/sgds-web-component/themes/day.css";

/* 2. Foundation styles (typography, headings, body, grid) */
@import "@govtechsg/sgds-web-component/css/sgds.css";

/* 3. Utility classes (sgds: prefix) — must be processed by Tailwind v4 */
@import "@govtechsg/sgds-web-component/css/utility.css";
```

For dark/night mode support, also add:
```css
@import "@govtechsg/sgds-web-component/themes/night.css";
```

## Font

SGDS uses **Inter** by default. Add to `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=swap"
  rel="stylesheet"
/>
```

## Component Registration

Import once at app entry point — registers all `<sgds-*>` elements globally:

```js
import "@govtechsg/sgds-web-component";
```

---

## Framework Integration

### React 19+ (Vite / CSR)

React 19 supports custom elements natively. Import once, use tag directly:

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

Custom event syntax: prefix event name with `on` in lowercase (`sgds-blur` → `onsgds-blur`).

Complex props (arrays, objects) can be passed declaratively in React 19:

```jsx
const steps = [
  { component: <Step1 />, stepHeader: "Personal details" },
  { component: <Step2 />, stepHeader: "Contact details" },
];

<sgds-stepper steps={steps}></sgds-stepper>
```

### React 18 and below

Use the React wrapper package:

```jsx
import { SgdsButton } from "@govtechsg/sgds-web-component/react";

<SgdsButton variant="primary" onSgdsBlur={(e) => console.log(e)}>
  Click Me
</SgdsButton>
```

Event naming for wrappers: `sgds-blur` → `onSgdsBlur`, `sgds-change` → `onSgdsChange`.

### Next.js (SSR)

Web components rely on browser APIs — never import at the module level in Next.js.

**Step 1** — Create `sgds.tsx` (client-only loader):
```tsx
'use client';
import { useEffect } from 'react';

const SgdsLibraryLoader = () => {
  useEffect(() => {
    (async () => { await import('@govtechsg/sgds-web-component'); })();
  }, []);
  return null;
};

export default SgdsLibraryLoader;
```

**Step 2** — Add to root layout `<head>`:
```tsx
import SgdsLibraryLoader from './sgds';
// <head><SgdsLibraryLoader /></head>
```

**Step 3** — Use components with `suppressHydrationWarning`:
```tsx
<sgds-masthead suppressHydrationWarning></sgds-masthead>
```

**Step 4** — Wire events via `useEffect` + `addEventListener`:
```tsx
useEffect(() => {
  const el = ref.current;
  el.addEventListener('sgds-input', handler);
  return () => el.removeEventListener('sgds-input', handler);
}, []);
```

### Vue 3

Use standard Vue web component integration. Suppress unknown element warnings with:
```js
// The filter to suppress warnings:
tag.startsWith("sgds-")
```

### Angular

Use `CUSTOM_ELEMENTS_SCHEMA`. Follow the [Angular elements documentation](https://angular.io/guide/elements).

---

## CSS Import Order Matters

`themes/day.css` → `css/sgds.css` → `css/utility.css`

The theme file must come first so CSS variable tokens are available when styles are processed.

`utility.css` must be imported inside a CSS file processed by **Tailwind v4** — it cannot be a plain JS import.
