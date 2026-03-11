---
name: "sgds-components-table"
description: "Use sgds-table to display structured tabular data with configurable headers, orientation, borders, and responsive behaviour. Apply this skill whenever a user asks about tables, data tables, HTML tables, grid data display, tabular layout, or row/column headers in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Table Component Skill

`<sgds-table>` renders a structured data table from arrays. Headers and data are passed as JavaScript property arrays — not as HTML slot content. Use `headerPosition` to control whether headers appear on rows, columns, or both.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Column headers on top (most common)?** → `headerPosition="horizontal"` (default); set `columnHeader`

**Row headers on the left?** → `headerPosition="vertical"`; set `rowHeader`

**Both row and column headers?** → `headerPosition="both"`; set both `rowHeader` and `columnHeader`

**Horizontal scrolling for wide tables?** → `responsive="always"` or a breakpoint like `responsive="sm"`

**Striped header row/column?** → `headerBackground`

**Bordered cells?** → `tableBorder`

```html
<!-- Table with column headers (default horizontal header) -->
<sgds-table id="my-table"></sgds-table>

<script>
  const table = document.getElementById("my-table");

  table.columnHeader = ["Name", "Department", "Role", "Status"];
  table.tableData = [
    ["Alice Tan", "Engineering", "Senior Engineer", "Active"],
    ["Bob Lee", "Design", "UX Designer", "Active"],
    ["Carol Ng", "Product", "Product Manager", "On Leave"]
  ];
</script>

<!-- With both headers, border, and background -->
<sgds-table
  id="both-headers-table"
  headerPosition="both"
  tableBorder
  headerBackground
></sgds-table>
<script>
  const t = document.getElementById("both-headers-table");
  t.rowHeader = ["Q1", "Q2", "Q3", "Q4"];
  t.columnHeader = ["Revenue", "Costs", "Profit"];
  t.tableData = [
    ["$1.2M", "$0.8M", "$0.4M"],
    ["$1.5M", "$0.9M", "$0.6M"],
    ["$1.8M", "$1.1M", "$0.7M"],
    ["$2.0M", "$1.2M", "$0.8M"]
  ];
</script>

<!-- Responsive with horizontal scroll below md breakpoint -->
<sgds-table id="responsive-table" responsive="md"></sgds-table>
```

## API Summary

### `<sgds-table>`

| Property | Type | Default | Purpose |
|---|---|---|---|
| `columnHeader` | `string[]` | `[]` | Column header labels (used when `headerPosition` is `horizontal` or `both`) |
| `rowHeader` | `string[]` | `[]` | Row header labels (used when `headerPosition` is `vertical` or `both`) |
| `tableData` | `(string \| number)[][]` | `[]` | 2D array of row data |
| `headerPosition` | `horizontal \| vertical \| both` | `horizontal` | Where headers are rendered |
| `responsive` | `sm \| md \| lg \| xl \| always` | — | Adds horizontal scroll below the specified breakpoint |
| `headerBackground` | boolean | `false` | Applies a background shade to header cells |
| `tableBorder` | boolean | `false` | Applies borders to all cells |

## Events

None.

---

**For AI agents**:
1. All data properties (`columnHeader`, `rowHeader`, `tableData`) must be set as **JavaScript properties**, not HTML attributes — they are arrays.
2. `tableData` is a 2D array: each inner array is a row. Columns must align with `columnHeader` count (for horizontal or both) and rows with `rowHeader` count (for vertical or both).
3. For `headerPosition="horizontal"`, only `columnHeader` is needed.
4. For `headerPosition="vertical"`, only `rowHeader` is needed.
5. For `headerPosition="both"`, provide both `rowHeader` and `columnHeader`; `tableData[i][j]` is the cell at row `i`, column `j`.
6. There are no custom events or public methods on this component.
