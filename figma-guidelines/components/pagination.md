# Pagination

**Purpose**: Paged navigation control for lists, tables, and search results. Supports default and compact (mini) variants.

**Component**: `<sgds-pagination>`

---

## Usage

```html
<!-- Basic pagination -->
<sgds-pagination
  id="pagination"
  length="100"
  itemsPerPage="10"
  currentPage="1">
</sgds-pagination>

<script>
  document.getElementById("pagination").addEventListener("sgds-page-change", (e) => {
    const newPage = e.detail.currentPage;
    console.log("Navigate to page:", newPage);
    loadPage(newPage);
  });
</script>

<!-- Compact (mini) variant -->
<sgds-pagination
  length="50"
  itemsPerPage="10"
  currentPage="1"
  variant="mini">
</sgds-pagination>

<!-- Show ellipsis (large page ranges) -->
<sgds-pagination
  length="200"
  itemsPerPage="10"
  currentPage="5"
  ellipsis>
</sgds-pagination>

<!-- Limit visible page buttons -->
<sgds-pagination
  length="100"
  itemsPerPage="10"
  currentPage="1"
  limit="5">
</sgds-pagination>

<!-- Control from JavaScript -->
<sgds-pagination id="pg" length="100" itemsPerPage="10" currentPage="1"></sgds-pagination>
<script>
  const pg = document.getElementById("pg");

  // Navigate programmatically
  pg.currentPage = 3;

  // Listen to page changes
  pg.addEventListener("sgds-page-change", (e) => {
    const { currentPage, previousPage } = e.detail;
    console.log(`Changed from page ${previousPage} to page ${currentPage}`);
  });
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `length` | number | — | Total number of items |
| `itemsPerPage` | number | `10` | Items per page |
| `currentPage` | number | `1` | Active page number |
| `variant` | `default \| mini` | `default` | Visual variant |
| `ellipsis` | boolean | `false` | Shows `…` for large page ranges |
| `limit` | number | — | Max page buttons visible at once |

## Events

| Event | Description |
|---|---|
| `sgds-page-change` | Fires when user navigates. `event.detail.currentPage` = new page; `event.detail.previousPage` = previous page. |

---

## Notes

- `length` is the **total item count**, not total page count. Pages = `Math.ceil(length / itemsPerPage)`.
- `currentPage` is 1-based.
- Combine with `sgds-page-change` to fetch new data or slice an existing array.

```javascript
// Typical pattern: slice data array on page change
function loadPage(page, data, perPage) {
  const start = (page - 1) * perPage;
  return data.slice(start, start + perPage);
}
```
