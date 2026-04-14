# Project Setup

Every SGDS application requires these four setup steps before any component or page code.

---

## Step 1 — Font

SGDS uses **Inter** by default. Load it via Google Fonts in your HTML `<head>`:

```html
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,600;0,14..32,700;1,14..32,300;1,14..32,400;1,14..32,600;1,14..32,700&display=swap"
    rel="stylesheet"
  />
</head>
```

Weights loaded: 300 (light), 400 (regular), 600 (semibold), 700 (bold) — both normal and italic.

---

## Step 2 — CSS Imports

Import in this exact order in your main CSS entry point (the file processed by Tailwind):

```css
/* globals.css / index.css / main.css */

/* 1. Theme tokens — must come first */
@import "@govtechsg/sgds-web-component/themes/day.css";

/* 2. Foundation styles (typography, headings, body, grid) */
@import "@govtechsg/sgds-web-component/css/sgds.css";

/* 3. Utility classes — must be processed by Tailwind v4 */
@import "@govtechsg/sgds-web-component/css/utility.css";
```

**Import order matters.** `themes/day.css` must come first so CSS variable tokens are defined before foundation and utility styles are processed.

`utility.css` contains Tailwind v4 directives — it cannot be a plain JS import; it must be processed by your Tailwind build pipeline.

---

## Step 3 — Component Registration

Import once at your app entry point (JS/TS):

```jsx
// main.tsx / app.tsx / layout.tsx
import "@govtechsg/sgds-web-component";
```

This registers all `<sgds-*>` custom elements globally. Use the native web component tag anywhere in React 19 JSX after this.

---

## Step 4 — App Layout

Every page must use one of two layout structures. Choose based on app type:

| App type | Layout | Container class |
|---|---|---|
| Public-facing, informational | Simple App | `.sgds-container` |
| Internal tool, dashboard, admin portal | Sidebar App | `.sgds-container-sidebar` |

**Simple App** — vertical stack, centred content:

```jsx
<>
  <div>
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">My App</strong>
    </sgds-mainnav>
  </div>
  <div className="sgds:flex sgds:flex-col sgds:w-full">
    <div className="sgds-container sgds:py-2-xl">
      {/* Page content */}
    </div>
    <sgds-footer></sgds-footer>
  </div>
</>
```

**Sidebar App** — sticky header, two-column body:

```jsx
<>
  <div className="sgds:sticky sgds:top-0">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">My App</strong>
    </sgds-mainnav>
  </div>
  <div className="sgds:flex sgds:flex-row">
    <div className="sgds:sticky sgds:h-[calc(100vh-108px)] sgds:overflow-y-scroll sgds:top-27 sgds:border-r sgds:border-muted">
      {/* Sidebar navigation */}
    </div>
    <div className="sgds:flex sgds:flex-col sgds:w-full">
      <div className="sgds-container-sidebar sgds:py-2-xl">
        {/* Page content */}
      </div>
      <sgds-footer></sgds-footer>
    </div>
  </div>
</>
```

See [patterns/app-shell.md](patterns/app-shell.md) for full breakpoint tables and sticky-header details.
