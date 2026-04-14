# Navigation Components

Components for site-level and page-level navigation. The masthead, mainnav, and footer are mandatory on every page — see [patterns/app-shell.md](../patterns/app-shell.md).

---

## `<sgds-masthead>` — Government Identity Bar

**Mandatory on every page.** Renders the Official Singapore Government banner — "A Singapore Government Agency Website" — as the topmost element.

```jsx
{/* Always fluid for full-width layouts */}
<sgds-masthead fluid></sgds-masthead>
```

Always place `<sgds-masthead>` as the first element inside the sticky header wrapper. Never remove or hide it.

---

## `<sgds-mainnav>` — Primary Navigation Bar

**Mandatory on every page.** The primary horizontal navigation bar with brand slot and navigation items. Collapses into a hamburger menu on small screens.

```jsx
<sgds-mainnav fluid>
  <strong slot="brand">My App</strong>

  {/* Navigation items */}
  <sgds-mainnav-item href="/home">Home</sgds-mainnav-item>
  <sgds-mainnav-item href="/about">About</sgds-mainnav-item>

  {/* Dropdown nav item */}
  <sgds-mainnav-dropdown text="Services">
    <sgds-dropdown-item href="/service-a">Service A</sgds-dropdown-item>
    <sgds-dropdown-item href="/service-b">Service B</sgds-dropdown-item>
  </sgds-mainnav-dropdown>

  {/* End slot (right side) */}
  <div slot="end">
    <sgds-button variant="outline" size="sm">Sign In</sgds-button>
  </div>
</sgds-mainnav>
```

Always wrap `<sgds-masthead>` and `<sgds-mainnav>` together in a single `<div>` when making the header sticky. Do not apply sticky positioning to each individually.

---

## `<sgds-footer>` — Government Footer

**Mandatory on every page.** Renders the standard Singapore Government footer with mandatory links (Contact, Feedback, Privacy, Terms of Use).

```jsx
{/* Minimal footer — mandatory links only */}
<sgds-footer></sgds-footer>

{/* Footer with site columns */}
<sgds-footer>
  <sgds-footer-item header="About">
    <a href="/mission">Our Mission</a>
    <a href="/team">Our Team</a>
  </sgds-footer-item>
  <sgds-footer-item header="Resources">
    <a href="/docs">Documentation</a>
    <a href="/faq">FAQ</a>
  </sgds-footer-item>
</sgds-footer>
```

Place `<sgds-footer>` inside the main content column, below the page content wrapper. Never outside the two-column wrapper in sidebar layouts.

---

## `<sgds-breadcrumb>` — Breadcrumb Trail

Shows the user's location within a page hierarchy. The last item is the current page — it automatically receives the active state.

```jsx
<sgds-breadcrumb>
  <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="/applications">Applications</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item>Application #1234</sgds-breadcrumb-item>
</sgds-breadcrumb>
```

When 5 or more items are present, the component automatically collapses middle items into an overflow menu.

---

## `<sgds-tab-group>` — Tabs

Use to organise content into switchable panels within the same page context. Each `<sgds-tab>` must have a `panel` attribute that matches a `<sgds-tab-panel>` `name` attribute.

```jsx
<sgds-tab-group>
  <sgds-tab panel="overview">Overview</sgds-tab>
  <sgds-tab panel="details">Details</sgds-tab>
  <sgds-tab panel="history">History</sgds-tab>

  <sgds-tab-panel name="overview">Overview content here</sgds-tab-panel>
  <sgds-tab-panel name="details">Details content here</sgds-tab-panel>
  <sgds-tab-panel name="history">History content here</sgds-tab-panel>
</sgds-tab-group>
```

**Variants:**
- `variant="underline"` (default) — underlined active tab, minimal chrome
- `variant="solid"` — filled background on active tab

---

## `<sgds-pagination>` — Pagination Control

Renders a paging control. Provide `dataLength`, `itemsPerPage`, and `currentPage`. Listen to `sgds-page-change` to update what data is displayed.

```jsx
<sgds-pagination
  dataLength={totalRecords}
  itemsPerPage={10}
  currentPage={page}
  onsgds-page-change={(e) => setPage(e.detail.currentPage)}
></sgds-pagination>
```

Always keep `currentPage` in sync with the actual data page being displayed.

---

## `<sgds-sidenav>` — Sidebar Navigation

Use for multi-level persistent sidebar navigation inside the Sidebar App layout.

```jsx
<sgds-sidenav>
  <sgds-sidenav-item href="/dashboard">Dashboard</sgds-sidenav-item>
  <sgds-sidenav-item>
    Applications
    <sgds-sidenav-item slot="children" href="/applications/list">All Applications</sgds-sidenav-item>
    <sgds-sidenav-item slot="children" href="/applications/new">New Application</sgds-sidenav-item>
  </sgds-sidenav-item>
  <sgds-sidenav-item href="/settings">Settings</sgds-sidenav-item>
</sgds-sidenav>
```

---

## `<sgds-table-of-contents>` — In-Page Navigation

Use on long-form content pages to render an auto-generated anchor link list from page headings.

```jsx
<sgds-table-of-contents></sgds-table-of-contents>
```
