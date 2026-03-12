# SGDS App Layout Patterns

SGDS provides two recommended application layout templates. Choose based on app type.

## Prerequisites

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/css/sgds.css";
import "@govtechsg/sgds-web-component/css/utility.css";
```

---

## Which Layout to Use?

| App type | Layout | Container class |
|---|---|---|
| Public-facing website, informational, transactional pages | **Simple App** | `.sgds-container` |
| Internal tool, dashboard, admin portal, data-heavy app | **Sidebar App** | `.sgds-container-sidebar` |

---

## Simple App Layout

Structure: vertical stack — masthead → mainnav → content → footer

Content container `.sgds-container` is centred and responsive:

| Breakpoint | Max-width |
|---|---|
| < 512px | `calc(100% - 40px)` |
| ≥ 512px | `calc(100% - 48px)` |
| ≥ 768px | `calc(100% - 56px)` |
| ≥ 1024px | `888px` |
| ≥ 1280px | `1168px` |
| ≥ 1440px | `1312px` |

```html
<div>
  <sgds-masthead fluid></sgds-masthead>
  <sgds-mainnav fluid>
    <strong slot="brand">My App</strong>
    <strong slot="end">End</strong>
  </sgds-mainnav>
</div>
<div class="sgds:flex sgds:flex-col sgds:w-full">
  <div class="sgds-container sgds:py-2-xl">
    <!-- Page content goes here -->
  </div>
  <sgds-footer></sgds-footer>
</div>
```

---

## Sidebar App Layout

Structure: sticky top bar + two-column body (sticky sidebar + scrollable main content).

Content container `.sgds-container-sidebar` is narrower to account for the sidebar:

| Breakpoint | Max-width |
|---|---|
| < 768px | `100%` |
| ≥ 768px | `calc(100% - 96px)` |
| ≥ 1024px | `840px` |
| ≥ 1280px | `888px` |
| ≥ 1440px | `1024px` |

```html
<!-- Sticky top bar — wrap masthead + mainnav together -->
<div class="sgds:sticky sgds:top-0">
  <sgds-masthead fluid></sgds-masthead>
  <sgds-mainnav fluid>
    <strong slot="brand">My App</strong>
    <strong slot="end">End</strong>
  </sgds-mainnav>
</div>

<!-- Two-column body -->
<div class="sgds:flex sgds:flex-row">

  <!-- Sticky sidebar column -->
  <div class="sgds:sticky sgds:h-[calc(100vh-108px)] sgds:overflow-y-scroll sgds:top-27 sgds:w-68 sgds:border-r sgds:border-muted">
    <!-- Place <sgds-sidenav> here -->
  </div>

  <!-- Main content column -->
  <div class="sgds:flex sgds:flex-col sgds:w-full">
    <div class="sgds-container-sidebar sgds:py-2-xl">
      <!-- Page content goes here -->
    </div>
    <sgds-footer></sgds-footer>
  </div>

</div>
```

**Sidebar height notes:**
- `sgds:h-[calc(100vh-108px)]` — fills viewport minus sticky header (~60px masthead + ~48px mainnav). Adjust if header height differs.
- `sgds:top-27` — offsets the sticky position below the header. Adjust to match actual header height.
- `sgds:overflow-y-scroll` — makes sidebar independently scrollable.

---

## Rules

1. Always wrap masthead + mainnav in a single `<div>` when making the header sticky.
2. Use `.sgds-container` for simple apps. Do NOT use `sgds:max-w-*` utilities to replicate it.
3. Use `.sgds-container-sidebar` (not `.sgds-container`) inside the main content column of a sidebar app.
4. Place `<sgds-footer>` inside the main content column — not outside the two-column wrapper.
5. The sidebar needs `sgds:sticky` + `sgds:top-27` + `sgds:h-[calc(100vh-108px)]` together — missing any one breaks sticky behavior.
