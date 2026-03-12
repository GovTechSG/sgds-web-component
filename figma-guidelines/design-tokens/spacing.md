# SGDS Spacing Design Tokens

SGDS spacing utilities use the `sgds:` prefix and do **not** require theme files.

**Always prefer semantic spacing utilities over raw numeric ones.** Semantic tokens are responsive — they adapt across mobile, tablet (≥1024px), and desktop (≥1440px) breakpoints.

Base unit: every spacing value = **multiplier × 4px**.

---

## Semantic Spacing Utilities (Always Prefer)

### Text Gap — between text/content elements

Use for gaps between paragraphs, headings, and inline text groups.

| Class | Use for |
|---|---|
| `sgds:gap-text-2-xs` | Extremely tight text grouping |
| `sgds:gap-text-xs` | Very tight (caption to field) |
| `sgds:gap-text-sm` | Tight body text spacing |
| `sgds:gap-text-md` | Default paragraph spacing |
| `sgds:gap-text-lg` | Spacious reading content |
| `sgds:gap-text-xl` | Large content blocks |
| `sgds:gap-text-2-xl` | Extra large content separation |

### Layout Gap — between layout sections

Use for gaps between page sections, grid columns, and layout areas.

| Class | Use for |
|---|---|
| `sgds:gap-layout-2-xs` | Very tight layout sections |
| `sgds:gap-layout-xs` | Small section separation |
| `sgds:gap-layout-sm` | Compact layout |
| `sgds:gap-layout-md` | Default section gap |
| `sgds:gap-layout-lg` | Spacious layout |
| `sgds:gap-layout-xl` | Maximum layout separation |

### Layout Padding — for page/section areas

Supports `sgds:p-layout-*`, `sgds:px-layout-*`, `sgds:py-layout-*`.

| Class | Use for |
|---|---|
| `sgds:p-layout-xs` | Compact page padding |
| `sgds:p-layout-sm` | Small page inset |
| `sgds:p-layout-md` | Default page padding |
| `sgds:p-layout-lg` | Spacious page padding |
| `sgds:p-layout-xl` | Maximum page padding |

### Component Gap — inside custom components

Use for gaps between internal elements when building a custom component.

| Class | Use for |
|---|---|
| `sgds:gap-component-xs` | Very tight component internals |
| `sgds:gap-component-sm` | Compact component layout |
| `sgds:gap-component-md` | Default component gap |
| `sgds:gap-component-lg` | Spacious component layout |
| `sgds:gap-component-xl` | Large component internals |

### Component Padding — inside custom components

Supports `sgds:p-component-*`, `sgds:px-component-*`, `sgds:py-component-*`.

| Class | Use for |
|---|---|
| `sgds:p-component-xs` | Very tight internal padding |
| `sgds:p-component-sm` | Compact component padding |
| `sgds:p-component-md` | Default component padding |
| `sgds:p-component-lg` | Spacious component padding |
| `sgds:p-component-xl` | Large component padding |

### Container Width

```html
<div class="sgds:mx-auto sgds:w-container">
  <!-- Responsive container: 360px → 888px → 1312px -->
</div>
```

---

## Decision Guide

| Situation | Use |
|---|---|
| Between text/paragraph elements | `sgds:gap-text-*` |
| Between page sections or grid areas | `sgds:gap-layout-*` |
| Padding on page/section areas | `sgds:p-layout-*` / `sgds:px-layout-*` / `sgds:py-layout-*` |
| Gap inside a custom component | `sgds:gap-component-*` |
| Padding inside a custom component | `sgds:p-component-*` / `sgds:px-component-*` / `sgds:py-component-*` |
| Responsive page container width | `sgds:w-container` |

---

## Common Patterns

### Page Layout

```html
<div class="sgds:mx-auto sgds:w-container sgds:px-layout-md">
  <div class="sgds:flex sgds:flex-col sgds:gap-layout-lg">
    <section>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-md">
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </div>
    </section>
  </div>
</div>
```

### Custom Card Component

```html
<div class="sgds:bg-surface-raised sgds:p-component-md sgds:rounded-md">
  <div class="sgds:flex sgds:flex-col sgds:gap-component-sm">
    <h3>Card Title</h3>
    <p>Description</p>
  </div>
</div>
```

---

## Raw Numeric Utilities (Fallback Only)

Only use when no semantic token fits:
- `sgds:p-{n}` / `sgds:px-{n}` / `sgds:py-{n}` / `sgds:pt/pr/pb/pl-{n}` — padding
- `sgds:m-{n}` / `sgds:mx-{n}` / `sgds:my-{n}` / `sgds:mt/mr/mb/ml-{n}` — margin
- `sgds:mx-auto` — horizontal centering
- `sgds:gap-{n}` / `sgds:gap-x-{n}` / `sgds:gap-y-{n}` — flex/grid gap

Where `n × 4px` gives the pixel value.
