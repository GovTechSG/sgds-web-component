# Table

**Purpose**: Render structured tabular data from JavaScript arrays. Supports horizontal and vertical header positions, borders, and responsive scroll.

**Component**: `<sgds-table>`

---

## Usage

```html
<!-- Basic table (headers as first column) -->
<sgds-table id="basic-table"></sgds-table>
<script>
  const table = document.getElementById("basic-table");

  table.columnHeader = ["Name", "Role", "Status"];
  table.tableData = [
    ["Alice Tan", "Administrator", "Active"],
    ["Bob Lim", "Editor", "Active"],
    ["Carol Ng", "Viewer", "Inactive"]
  ];
</script>

<!-- Horizontal headers (default) -->
<sgds-table id="h-table" headerPosition="horizontal"></sgds-table>
<script>
  const t = document.getElementById("h-table");
  t.columnHeader = ["Date", "Transaction", "Amount"];
  t.tableData = [
    ["01 Jan 2024", "Payment received", "$250.00"],
    ["05 Jan 2024", "Refund issued", "$50.00"]
  ];
</script>

<!-- Vertical headers (row headers in first column) -->
<sgds-table id="v-table" headerPosition="vertical"></sgds-table>
<script>
  const t = document.getElementById("v-table");
  t.rowHeader = ["Q1", "Q2", "Q3", "Q4"];
  t.tableData = [
    ["$1,200", "$1,450", "$1,100", "$1,800"]
  ];
</script>

<!-- Both column and row headers -->
<sgds-table id="both-table" headerPosition="both"></sgds-table>
<script>
  const t = document.getElementById("both-table");
  t.columnHeader = ["Category", "Jan", "Feb", "Mar"];
  t.rowHeader = ["Revenue", "Expenses", "Profit"];
  t.tableData = [
    ["$10,000", "$12,000", "$11,000"],
    ["$7,000", "$8,000", "$7,500"],
    ["$3,000", "$4,000", "$3,500"]
  ];
</script>

<!-- With borders -->
<sgds-table id="bordered-table" tableBorder></sgds-table>
<script>
  const t = document.getElementById("bordered-table");
  t.columnHeader = ["Item", "Price"];
  t.tableData = [["Coffee", "$3.50"], ["Tea", "$2.50"]];
</script>

<!-- Responsive (horizontal scroll on small screens) -->
<sgds-table id="responsive-table" responsive></sgds-table>
<script>
  const t = document.getElementById("responsive-table");
  t.columnHeader = ["Col 1", "Col 2", "Col 3", "Col 4", "Col 5"];
  t.tableData = [["A", "B", "C", "D", "E"]];
</script>

<!-- Header background highlight -->
<sgds-table id="bg-table" headerBackground></sgds-table>
<script>
  const t = document.getElementById("bg-table");
  t.columnHeader = ["Name", "Score"];
  t.tableData = [["Alice", "95"], ["Bob", "87"]];
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `headerPosition` | `horizontal \| vertical \| both` | `horizontal` | Where header cells are placed |
| `tableBorder` | boolean | `false` | Adds borders to all cells |
| `responsive` | boolean | `false` | Enables horizontal scroll on overflow |
| `headerBackground` | boolean | `false` | Highlights header cells with background color |

## JavaScript Properties

These are set as **JS properties** on the element, not HTML attributes:

| Property | Type | Description |
|---|---|---|
| `columnHeader` | `string[]` | Array of column header labels |
| `rowHeader` | `string[]` | Array of row header labels (for `vertical` or `both`) |
| `tableData` | `string[][]` | 2D array of cell data (rows × columns) |

---

## Notes

- `columnHeader`, `rowHeader`, and `tableData` are **JavaScript properties** — set them in `<script>`, not as HTML attributes.
- For `headerPosition="horizontal"`: provide `columnHeader` + `tableData`.
- For `headerPosition="vertical"`: provide `rowHeader` + `tableData`.
- For `headerPosition="both"`: provide `columnHeader` + `rowHeader` + `tableData`.
- Each row in `tableData` must have the same number of columns as `columnHeader`.
