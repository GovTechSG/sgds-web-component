# Application Shell

The application shell is the mandatory page chrome that wraps every SGDS page. It consists of three required components plus the appropriate content container.

**Every page must include all three. Never ship a page without them.**

| Component | Role | Required |
|---|---|---|
| `<sgds-masthead>` | Singapore Government identity bar | Always |
| `<sgds-mainnav>` | Application navigation header | Always |
| `<sgds-footer>` | Singapore Government footer | Always |

---

## Layout Decision

**Public-facing, informational, or transactional pages?** → Simple App Layout

**Internal tool, dashboard, or admin portal with persistent sidebar navigation?** → Sidebar App Layout

---

## Simple App Layout

Vertical stack — masthead → mainnav → content → footer. Use `.sgds-container` for the content well.

```jsx
<>
  {/* Header — wrap both in one div for sticky positioning */}
  <div>
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">My App</strong>
      <sgds-mainnav-item href="/home">Home</sgds-mainnav-item>
      <sgds-mainnav-item href="/services">Services</sgds-mainnav-item>
      <div slot="end">
        <sgds-button variant="outline" size="sm">Sign In</sgds-button>
      </div>
    </sgds-mainnav>
  </div>

  {/* Content + Footer */}
  <div className="sgds:flex sgds:flex-col sgds:w-full">
    <div className="sgds-container sgds:py-layout-md">
      {/* Page content */}
    </div>
    <sgds-footer></sgds-footer>
  </div>
</>
```

**`.sgds-container` max-widths:**

| Breakpoint | Max width |
|---|---|
| < 512px | `calc(100% - 40px)` |
| ≥ 512px | `calc(100% - 48px)` |
| ≥ 768px | `calc(100% - 56px)` |
| ≥ 1024px | 888px |
| ≥ 1280px | 1168px |
| ≥ 1440px | 1312px |

---

## Sidebar App Layout

Sticky top bar + two-column body (sticky sidebar + scrollable main content). Use `.sgds-container-sidebar` for the content well.

```jsx
<>
  {/* Sticky top bar — wrap both in one div */}
  <div className="sgds:sticky sgds:top-0 sgds:z-10">
    <sgds-masthead fluid></sgds-masthead>
    <sgds-mainnav fluid>
      <strong slot="brand">Admin Portal</strong>
      <div slot="end">
        <sgds-button variant="ghost" size="sm">Sign Out</sgds-button>
      </div>
    </sgds-mainnav>
  </div>

  {/* Two-column body */}
  <div className="sgds:flex sgds:flex-row">

    {/* Sticky sidebar column */}
    <div className="sgds:sticky sgds:top-27 sgds:h-[calc(100vh-108px)] sgds:overflow-y-scroll sgds:border-r sgds:border-muted sgds:w-68 sgds:shrink-0">
      <sgds-sidenav>
        <sgds-sidenav-item href="/dashboard">Dashboard</sgds-sidenav-item>
        <sgds-sidenav-item href="/applications">Applications</sgds-sidenav-item>
        <sgds-sidenav-item href="/settings">Settings</sgds-sidenav-item>
      </sgds-sidenav>
    </div>

    {/* Main content column */}
    <div className="sgds:flex sgds:flex-col sgds:w-full">
      <div className="sgds-container-sidebar sgds:py-layout-md">
        {/* Page content */}
      </div>
      <sgds-footer></sgds-footer>
    </div>

  </div>
</>
```

**`.sgds-container-sidebar` max-widths:**

| Breakpoint | Max width |
|---|---|
| < 768px | 100% |
| ≥ 768px | `calc(100% - 96px)` |
| ≥ 1024px | 840px |
| ≥ 1280px | 888px |
| ≥ 1440px | 1024px |

**Sidebar height notes:**
- `sgds:h-[calc(100vh-108px)]` — fills viewport height minus the sticky header (masthead ~60px + mainnav ~48px ≈ 108px)
- `sgds:top-27` — offsets below the header
- `sgds:overflow-y-scroll` — sidebar scrolls independently when content exceeds viewport

---

## Rules

- Always wrap the masthead + mainnav pair in a single `<div>` — never apply `sgds:sticky` to each component individually
- Never use `sgds:max-w-*` utilities to replicate container behaviour — use `.sgds-container` or `.sgds-container-sidebar` exclusively
- Place `<sgds-footer>` inside the main content column (not outside the two-column flex wrapper) so it sits below the content
- The sidebar column must have `sgds:sticky`, `sgds:top-27`, and `sgds:h-[calc(100vh-108px)]` together — missing any one breaks the sticky behaviour
