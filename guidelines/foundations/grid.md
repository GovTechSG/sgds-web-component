# Grid System

The SGDS grid is a CSS Grid layout built from three layers: container → grid wrapper → columns. Always use `.sgds-container` + `.sgds-grid` + `.sgds-col-*` before reaching for generic Tailwind grid utilities.

---

## Three-Layer Stack

| Layer | Class | Role |
|---|---|---|
| Container | `.sgds-container` or `.sgds-container-sidebar` | Constrains content width and centres horizontally |
| Grid wrapper | `.sgds-grid` | Sets column track count and gutter for the breakpoint |
| Column | `.sgds-col-{bp}-{n}` | Spans `n` tracks on the grid |

```html
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Main content</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Side content</div>
  </div>
</div>
```

---

## Breakpoints

The grid expands: 4 columns (mobile) → 8 columns (tablet) → 12 columns (desktop).

| Breakpoint | Min width | Class prefix | Columns | Gutter |
|---|---|---|---|---|
| XS (default) | — | `.sgds-col-*` | 4 | 16px |
| SM | 512px | `.sgds-col-sm-*` | 8 | 16px |
| MD | 768px | `.sgds-col-md-*` | 8 | 24px |
| LG | 1024px | `.sgds-col-lg-*` | 12 | 24px |
| XL | 1280px | `.sgds-col-xl-*` | 12 | 32px |
| 2-XL | 1440px | `.sgds-col-2-xl-*` | 12 | 32px |

Classes are mobile-first — define the XS span first, then override at larger breakpoints.

---

## Containers

### `.sgds-container` — simple app layout (no sidebar)

| Breakpoint | Max width |
|---|---|
| < 512px | `calc(100% - 40px)` |
| ≥ 512px | `calc(100% - 48px)` |
| ≥ 768px | `calc(100% - 56px)` |
| ≥ 1024px | 888px |
| ≥ 1280px | 1168px |
| ≥ 1440px | 1312px |

### `.sgds-container-sidebar` — sidebar app layout

| Breakpoint | Max width |
|---|---|
| < 768px | 100% |
| ≥ 768px | `calc(100% - 96px)` |
| ≥ 1024px | 840px |
| ≥ 1280px | 888px |
| ≥ 1440px | 1024px |

**Never replicate containers with `sgds:max-w-*` utilities.** Only `.sgds-container` and `.sgds-container-sidebar` have the correct responsive breakpoints.

---

## Content Width Rules

- Default content should not exceed 8 columns on a 12-column grid
- Use the full 12 columns only for data tables and dense card layouts

---

## Column Combinations (12-column grid)

| Split | Typical use |
|---|---|
| 3 + 9 | Narrow sidebar + wide content |
| 4 + 8 | Standard sidebar + content |
| 6 + 6 | Equal halves |
| 4 + 4 + 4 | Three equal thirds |
| 3 + 3 + 3 + 3 | Four equal quarters |

---

## Centred Columns

Horizontally centres a column without offset wrappers. Only even-numbered spans are available.

```html
<!-- Centre an 8/12 block on large screens -->
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-center-8">
      Centred content (e.g. login form, article body)
    </div>
  </div>
</div>
```

---

## Common Patterns

```html
<!-- Two equal halves on desktop, stacked on mobile -->
<div class="sgds-container">
  <div class="sgds-grid">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Left</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-6">Right</div>
  </div>
</div>

<!-- Content (8) + aside (4) on desktop -->
<div class="sgds-container">
  <div class="sgds-grid">
    <main class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">Main content</main>
    <aside class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">Sidebar</aside>
  </div>
</div>

<!-- Dashboard: mixed spans in one grid -->
<div class="sgds-container">
  <div class="sgds-grid sgds:gap-layout-sm">
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-8">Wide chart</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-4">Narrow stat</div>
    <div class="sgds-col-4 sgds-col-sm-8 sgds-col-lg-12">Full-width table</div>
  </div>
</div>
```

---

## Decision Guide

**Step 1 — Container?**
- Full page, no sidebar → `.sgds-container`
- Content alongside a sidebar → `.sgds-container-sidebar`

**Step 2 — Need a column grid inside the container?**
- Yes → add `.sgds-grid` as a direct child
- No (full-width hero, header) → place the element directly in the container

**Step 3 — Column spans?**
- Same on all screens → `.sgds-col-{max}` (4 for XS, 8 for SM/MD, 12 for LG+)
- Responsive → stack classes: `sgds-col-4 sgds-col-sm-8 sgds-col-lg-6`
- Centred → use `-center-{n}` variant

**When to use Tailwind `sgds:grid-cols-*` instead:**
- Auto-filling card rows: `sgds:grid-cols-[repeat(auto-fill,_minmax(240px,1fr))]`
- Non-standard column counts
