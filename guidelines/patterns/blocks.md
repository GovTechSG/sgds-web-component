# UI Blocks

Self-contained, reusable UI sections that drop into any page layout. Blocks have a single focused responsibility and can appear multiple times on a page or alongside other blocks.

**Blocks are the ingredients. Page templates are the recipes.**

---

## Available Blocks

| Block | Use when |
|---|---|
| [Page Header](#page-header) | Orienting the user at the top of a content page with breadcrumb, title, and CTA |
| [Basic Details Card](#basic-details-card) | Displaying read-only key-value entity metadata |
| [Filter Sidebar](#filter-sidebar) | Filtering content by one or more categorical dimensions |
| [Table Filter](#table-filter) | Search + filter bar + results count + data table for list pages |

---

## Page Header

A page-level header with breadcrumb trail, icon + title row, description, and an optional primary CTA button. Use at the top of any content page.

```jsx
<div className="sgds:bg-primary-surface-muted sgds:p-layout-md sgds:rounded-lg sgds:mb-layout-md">

  {/* Breadcrumb */}
  <sgds-breadcrumb>
    <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
    <sgds-breadcrumb-item><a href="/applications">Applications</a></sgds-breadcrumb-item>
    <sgds-breadcrumb-item>Application Details</sgds-breadcrumb-item>
  </sgds-breadcrumb>

  {/* Title row */}
  <div className="sgds:flex sgds:items-center sgds:justify-between sgds:mt-4">
    <div className="sgds:flex sgds:items-center sgds:gap-component-sm">
      <div className="sgds:bg-primary-default sgds:rounded-lg sgds:p-3">
        <sgds-icon name="file-earmark-text" size="xl" className="sgds:text-white"></sgds-icon>
      </div>
      <div>
        <h1 className="sgds:text-heading-xl sgds:font-bold">Application Details</h1>
        <p className="sgds:text-body-md sgds:text-muted">Review and manage your submitted application.</p>
      </div>
    </div>

    {/* Primary CTA — omit if not applicable */}
    <sgds-button>
      <sgds-icon slot="leftIcon" name="pencil"></sgds-icon>
      Edit Application
    </sgds-button>
  </div>

</div>
```

---

## Basic Details Card

A bordered card displaying key-value pairs for a single entity. Use for read-only entity metadata on detail or profile pages.

```jsx
<div className="sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-md sgds:shadow-1">

  {/* Card header */}
  <div className="sgds:flex sgds:items-center sgds:justify-between sgds:mb-layout-sm">
    <h2 className="sgds:text-subtitle-md sgds:font-semibold">Applicant Details</h2>
    <sgds-button variant="outline" size="sm">
      <sgds-icon slot="leftIcon" name="pencil"></sgds-icon>
      Edit
    </sgds-button>
  </div>

  {/* Key-value fields */}
  <div className="sgds:flex sgds:flex-col sgds:gap-component-sm">
    {[
      { label: "Application ID", value: "APP-2025-001234" },
      { label: "Applicant Name", value: "Tan Ah Kow" },
      { label: "Email", value: "tan.ahkow@example.com" },
      { label: "Submitted On", value: "12 January 2025" },
    ].map(({ label, value }) => (
      <div key={label} className="sgds:flex sgds:gap-component-md">
        <div className="sgds:w-40 sgds:shrink-0 sgds:text-label-md sgds:font-semibold">{label}</div>
        <div className="sgds:text-body-md sgds:text-default">{value}</div>
      </div>
    ))}
  </div>

</div>
```

---

## Filter Sidebar

A vertical filter panel with grouped checkbox sections and a "Clear all" reset link. Use alongside a content area (cards or table rows) that needs to be narrowed by categorical filters.

```jsx
{/* Two-column layout: filter sidebar + content */}
<div className="sgds:flex sgds:gap-layout-md sgds:items-start">

  {/* Filter sidebar */}
  <aside className="sgds:w-64 sgds:shrink-0">
    <div className="sgds:bg-surface-raised sgds:rounded-lg sgds:p-component-md sgds:shadow-1">

      {/* Header */}
      <div className="sgds:flex sgds:items-center sgds:justify-between sgds:mb-layout-sm">
        <h2 className="sgds:text-subtitle-md sgds:font-semibold">Filters</h2>
        <sgds-link href="#" id="clear-all">Clear all</sgds-link>
      </div>

      {/* Filter categories */}
      <div className="sgds:flex sgds:flex-col sgds:gap-layout-sm">
        <sgds-checkbox-group label="Status" name="status">
          <sgds-checkbox value="active">Active (42)</sgds-checkbox>
          <sgds-checkbox value="pending">Pending (18)</sgds-checkbox>
          <sgds-checkbox value="rejected">Rejected (7)</sgds-checkbox>
        </sgds-checkbox-group>

        <sgds-divider></sgds-divider>

        <sgds-checkbox-group label="Category" name="category">
          <sgds-checkbox value="permits">Permits (31)</sgds-checkbox>
          <sgds-checkbox value="licences">Licences (24)</sgds-checkbox>
          <sgds-checkbox value="grants">Grants (12)</sgds-checkbox>
        </sgds-checkbox-group>
      </div>

    </div>
  </aside>

  {/* Content area */}
  <div className="sgds:flex-1">
    {/* Cards, table, results here */}
  </div>

</div>
```

---

## Table Filter

A card containing a search input, filter button, results count, and data table. Use on list and admin pages.

```jsx
<div className="sgds:bg-surface-raised sgds:rounded-lg sgds:shadow-1">

  {/* Card header */}
  <div className="sgds:flex sgds:items-center sgds:gap-component-sm sgds:p-component-md sgds:border-b sgds:border-muted">
    <div className="sgds:bg-primary-surface-muted sgds:rounded-md sgds:p-2">
      <sgds-icon name="table" className="sgds:text-primary-default"></sgds-icon>
    </div>
    <h2 className="sgds:text-subtitle-md sgds:font-semibold">All Applications</h2>
  </div>

  {/* Search + filter bar */}
  <div className="sgds:flex sgds:gap-component-sm sgds:p-component-md">
    <sgds-input type="search" label="" name="search" placeholder="Search by name or ID" className="sgds:flex-1">
      <sgds-icon-button slot="action" variant="ghost" name="search"></sgds-icon-button>
    </sgds-input>
    <sgds-button variant="outline">
      <sgds-icon slot="leftIcon" name="funnel"></sgds-icon>
      Filter
    </sgds-button>
  </div>

  {/* Results count */}
  <div className="sgds:px-component-md sgds:pb-2 sgds:text-body-sm sgds:text-muted">
    Showing 1–10 of 67 results
  </div>

  {/* Data table */}
  <sgds-table>
    <sgds-table-row slot="header">
      <sgds-table-head>Name</sgds-table-head>
      <sgds-table-head>Status</sgds-table-head>
      <sgds-table-head>Submitted</sgds-table-head>
      <sgds-table-head>Actions</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell>Tan Ah Kow</sgds-table-cell>
      <sgds-table-cell><sgds-badge variant="success">Active</sgds-badge></sgds-table-cell>
      <sgds-table-cell>12 Jan 2025</sgds-table-cell>
      <sgds-table-cell>
        <sgds-overflow-menu>
          <sgds-dropdown-item>View</sgds-dropdown-item>
          <sgds-dropdown-item>Edit</sgds-dropdown-item>
        </sgds-overflow-menu>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>

</div>
```

---

## Custom Block Rules

When building a block not covered above, stay within the SGDS system:

| Requirement | How |
|---|---|
| UI components | Use `<sgds-*>` components — do not use plain HTML equivalents when an SGDS component exists |
| Styling | Use `sgds:` utility classes exclusively — no arbitrary CSS values |
| Typography | Use semantic role tokens (`sgds:text-heading-md`, `sgds:text-body-md`) — never raw scale utilities |
| Icons | Use `<sgds-icon name="...">` only — no raw SVG or third-party icon libraries |
| External inspiration | Fine to reference Tailwind UI, shadcnblocks, etc. for layout ideas — but always re-implement using SGDS components and tokens |
