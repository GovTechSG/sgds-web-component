# Form Positioning Variants

All forms maintain the same internal structure and layout rules. The only difference between variants is the **column positioning** on the form wrapper.

## Grid Structure

### Basic form grid (left positioning, 12-column layout)
```
.sgds-container
└── .sgds-grid (12 columns)
    └── Form (sgds-col-lg-8) — 8 columns, left-aligned (columns 1-8)
        ├── Form section
        ├── Field rows (.sgds-grid, gap-layout-md)
        │   ├── 4-col field (.sgds-col-4 sgds-col-sm-4)
        │   ├── 4-col field (.sgds-col-4 sgds-col-sm-4) [optional]
        │   └── 8-col field (block in flex) [full-width]
        └── Form actions (flex gap-layout-sm)
```

### Form with center positioning (12-column layout)
```
.sgds-container
└── .sgds-grid (12 columns)
    └── Form (sgds-col-lg-center-8) — 8 columns, centered (columns 3-10)
        ├── Form section
        ├── Field rows (.sgds-grid, gap-layout-md)
        └── Form actions
```

### Form with right positioning (12-column layout)
```
.sgds-container
└── .sgds-grid (12 columns)
    └── Form (grid-column: 5 / span 8) — 8 columns, right-aligned (columns 5-12)
        ├── Form section
        ├── Field rows (.sgds-grid, gap-layout-md)
        └── Form actions
```

### Form with side navigation (left sidebar + center form)
```
.sgds-container
└── .sgds-grid (12 columns)
    ├── Side navigation (sgds-col-lg-4) — 4 columns
    └── Form (sgds-col-lg-center-8) — 8 columns (center-most, columns 3-10)
        ├── Form section
        ├── Field rows (.sgds-grid, gap-layout-md)
        └── Form actions
```

### Form with both side navigation and right TOC
```
.sgds-container
└── .sgds-grid (12 columns)
    ├── Side navigation (sgds-col-lg-4) — 4 columns
    ├── Form (sgds-col-lg-8) — 8 columns (center-most, columns 5-12)
    │   ├── Form section
    │   ├── Field rows (.sgds-grid, gap-layout-md)
    │   └── Form actions
    └── Right TOC (sgds-col-lg-4) — 4 columns
```

## Positioning Options

Forms always take **exactly 8 columns** within the `.sgds-grid`. You can position these 8 columns at three different locations:

| Position | Responsive Column Classes | Desktop Grid Position |
|----------|---------------------------|---------------------|
| **Left (default)** | `sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8` | Columns 1-8 |
| **Center** | `sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8` | Columns 3-10 (centered with 2-col margins) |
| **Right** | `sgds-col-4 sgds-col-sm-8 sgds-col-md-8` + custom CSS `grid-column: 5 / span 8;` at lg+ | Columns 5-12 |

## Responsive Behavior (all variants)

All three positioning variants behave identically at smaller breakpoints:

- **Mobile (default, 4-col grid)**: Form spans all 4 columns = **full width**
- **Small (512px+, 8-col grid)**: Form spans all 8 columns = **full width**
- **Medium (768px+, 8-col grid)**: Form spans all 8 columns = **full width**
- **Large (1024px+, 12-col grid)**: Form spans 8 of 12 columns at the specified position
- **XL & 2XL (12-col grid)**: Form spans 8 of 12 columns at the specified position

The difference only matters at `lg` breakpoint and above where the grid becomes 12 columns.

## Implementation Examples

### Left positioning
```html
<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-8 sgds-col-xl-8 sgds-col-2-xl-8">
  <!-- Form sections and fields -->
</form>
```
**Use case**: Standard form layout, default choice.

### Center positioning
```html
<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
  <!-- Form sections and fields -->
</form>
```
**Use case**: Centered forms with balanced whitespace on left and right. Uses SGDS built-in `center-8` tokens.

### Right positioning
```html
<style>
  @media (min-width: 1024px) {
    form.form-right {
      grid-column: 5 / span 8;
    }
  }
</style>

<form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 form-right">
  <!-- Form sections and fields -->
</form>
```
**Use case**: Forms paired with left sidebar or left-aligned content. Requires custom CSS since SGDS doesn't have a right-align token.

## Working Playground Examples

See these implementations for complete, ready-to-use examples:

- **Left**: `playground/blocks/form/form-basic.html`
- **Center**: `playground/blocks/form/form-basic-center.html`
- **Right**: `playground/blocks/form/form-basic-right.html`

All three use identical form content and internal structure. Only the positioning classes differ.

## Choosing a Position

- **Left**: Default choice for most forms. Leaves balanced whitespace on the right.
- **Center**: Use when you want a symmetric, centered appearance with equal margins on both sides.
- **Right**: Use in layouts where you have left-aligned navigation, sidebar, or TOC — form stays positioned opposite the sidebar.

## Mixing with Side Navigation or TOC

If your page has side navigation or a table of contents, forms still take 8 columns:

```html
<div class="sgds-container">
  <div class="sgds-grid">
    <!-- Left sidebar: 4 columns -->
    <nav class="sgds-col-4 sgds-col-lg-4">Navigation</nav>

    <!-- Form: center 8 columns -->
    <form class="sgds-col-4 sgds-col-sm-8 sgds-col-md-8 sgds-col-lg-center-8 sgds-col-xl-center-8 sgds-col-2-xl-center-8">
      <!-- Sections and fields -->
    </form>

    <!-- Right TOC: 4 columns (optional) -->
    <aside class="sgds-col-4 sgds-col-lg-4">Table of Contents</aside>
  </div>
</div>
```

At lg+ breakpoint: sidebar (4) + form (8) + TOC (4) = 16 columns... wait, that's too many!

**Important**: When using side content, the form should use **center positioning only if you have one side component** (either left or right, not both). If you need both left and right components, they must be external to the main grid or use a different layout pattern entirely.

For two-sided layouts with form in the middle, refer back to [form-layout.md](form-layout.md#form-with-both-sides) for the proper grid structure.
