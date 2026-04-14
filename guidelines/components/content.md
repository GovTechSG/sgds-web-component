# Content Components

Components for displaying structured information: cards, tables, icons, description lists, tooltips, and more.

---

## Card Components

SGDS provides four card variants depending on the content emphasis.

| Component | Use when |
|---|---|
| `<sgds-card>` | General-purpose content card with title, body, and optional image |
| `<sgds-image-card>` | Image is the primary visual element |
| `<sgds-icon-card>` | Icon leads the card, followed by title and description |
| `<sgds-thumbnail-card>` | Small image thumbnail alongside text content |

### `<sgds-card>` — General Purpose

```jsx
<sgds-card>
  <img slot="image" src="/hero.jpg" alt="Application overview" />
  <div slot="title">Application Overview</div>
  <div slot="description">Manage and track all submitted applications from this dashboard.</div>
  <div slot="footer">
    <sgds-link href="/applications">View All</sgds-link>
  </div>
</sgds-card>
```

### `<sgds-icon-card>` — Icon-Led

```jsx
<sgds-icon-card>
  <sgds-icon slot="icon" name="file-earmark-text" size="xl"></sgds-icon>
  <div slot="title">Submit Application</div>
  <div slot="description">Start a new application for permits and licences.</div>
</sgds-icon-card>
```

**Card anatomy rules:**
- Every card: padding (`sgds:p-component-md`), gap between rows (`sgds:gap-layout-md`), border-radius (`sgds:rounded-lg`), and subtle shadow (`sgds:shadow-1`)
- Card background: `sgds:bg-surface-raised` (lifts off the page background)
- Label text: `sgds:text-muted sgds:text-label-sm`; value text: `sgds:text-default sgds:text-heading-md sgds:font-semibold`

---

## `<sgds-icon>` — Icon

Use `<sgds-icon>` exclusively for all iconography. Do not embed raw SVG or third-party icon libraries.

```jsx
{/* Default size */}
<sgds-icon name="check-circle-fill"></sgds-icon>

{/* With size */}
<sgds-icon name="house" size="lg"></sgds-icon>

{/* Inside a button */}
<sgds-button>
  <sgds-icon slot="leftIcon" name="plus-circle"></sgds-icon>
  Add Item
</sgds-button>
```

**Sizes:** `xs`, `sm`, `md` (default), `lg`, `xl`.

Find available icon names at the SGDS icon library. Common names: `check-circle-fill`, `exclamation-circle-fill`, `exclamation-triangle-fill`, `info-circle-fill`, `arrow-left`, `arrow-right`, `chevron-down`, `x-lg`, `pencil`, `trash`, `search`, `download`, `house`, `plus-circle`, `file-earmark-text`.

---

## `<sgds-table>` — Data Table

Use `<sgds-table>` with slot-based sub-components for all tabular data. Never use plain `<table>` HTML.

```jsx
<sgds-table>
  <sgds-table-row slot="header">
    <sgds-table-head>Name</sgds-table-head>
    <sgds-table-head>Status</sgds-table-head>
    <sgds-table-head>Date</sgds-table-head>
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
        <sgds-dropdown-item>Delete</sgds-dropdown-item>
      </sgds-overflow-menu>
    </sgds-table-cell>
  </sgds-table-row>
</sgds-table>
```

Table cells support rich content: `<sgds-link>`, `<sgds-badge>`, `<sgds-button>`, `<sgds-overflow-menu>`.

---

## `<sgds-description-list>` — Key-Value Pairs

Use to display structured entity metadata as label-value pairs. Common in detail and profile pages.

```jsx
<sgds-description-list>
  <sgds-description-list-term>Application ID</sgds-description-list-term>
  <sgds-description-list-details>APP-2025-001234</sgds-description-list-details>

  <sgds-description-list-term>Applicant Name</sgds-description-list-term>
  <sgds-description-list-details>Tan Ah Kow</sgds-description-list-details>

  <sgds-description-list-term>Submitted On</sgds-description-list-term>
  <sgds-description-list-details>12 January 2025</sgds-description-list-details>
</sgds-description-list>
```

---

## `<sgds-tooltip>` — Contextual Help

Use to provide supplemental information for an element without cluttering the UI.

```jsx
<sgds-tooltip content="Your NRIC or FIN number">
  <sgds-icon-button name="question-circle" ariaLabel="Help"></sgds-icon-button>
</sgds-tooltip>
```

Keep tooltip text concise — one or two sentences maximum. Do not put interactive elements inside a tooltip.

---

## `<sgds-icon-list>` — Feature or Benefit List

Use for structured lists where each item has an icon and a description.

```jsx
<sgds-icon-list>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check-circle-fill" class="sgds:text-success-default"></sgds-icon>
    Fast processing within 3 working days
  </sgds-icon-list-item>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check-circle-fill" class="sgds:text-success-default"></sgds-icon>
    Fully digital — no physical documents required
  </sgds-icon-list-item>
</sgds-icon-list>
```
