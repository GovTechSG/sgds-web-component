# Spacing

All spacing utilities use the `sgds:` prefix. Always prefer semantic spacing utilities over raw numeric utilities — semantic tokens are responsive and encode design intent.

**Never render content without spacing between blocks, sections, and elements.**

---

## Semantic Spacing — Always Use These First

All semantic tokens are **responsive** — they adapt across mobile (base), tablet (≥1024px), and desktop (≥1440px).

### Text Gap — between text and content elements

Use for gaps between paragraphs, headings, and inline text groups.

| Class | Mobile / Tablet / Desktop |
|---|---|
| `sgds:gap-text-2-xs` | 4px / 4px / 4px |
| `sgds:gap-text-xs` | 8px / 8px / 8px |
| `sgds:gap-text-sm` | 8px / 12px / 12px |
| `sgds:gap-text-md` | 12px / 16px / 16px |
| `sgds:gap-text-lg` | 16px / 20px / 20px |
| `sgds:gap-text-xl` | 20px / 24px / 24px |
| `sgds:gap-text-2-xl` | 24px / 32px / 32px |

### Layout Gap — between page sections and grid columns

| Class | Mobile / Tablet / Desktop |
|---|---|
| `sgds:gap-layout-2-xs` | 4px / 12px / 16px |
| `sgds:gap-layout-xs` | 8px / 16px / 20px |
| `sgds:gap-layout-sm` | 12px / 20px / 24px |
| **`sgds:gap-layout-md`** | 16px / 24px / 32px |
| `sgds:gap-layout-lg` | 20px / 32px / 48px |
| `sgds:gap-layout-xl` | 24px / 48px / 64px |

### Layout Padding — for page sections and containers

Supports `sgds:p-layout-*`, `sgds:px-layout-*`, `sgds:py-layout-*`.

| Class | Mobile / Tablet / Desktop |
|---|---|
| `sgds:p-layout-xs` | 16px / 20px / 24px |
| `sgds:p-layout-sm` | 20px / 24px / 32px |
| **`sgds:p-layout-md`** | 24px / 32px / 48px |
| `sgds:p-layout-lg` | 32px / 48px / 64px |
| `sgds:p-layout-xl` | 48px / 64px / 96px |

### Component Gap — inside custom components

| Class | Mobile / Tablet / Desktop |
|---|---|
| `sgds:gap-component-xs` | 8px / 16px / 20px |
| **`sgds:gap-component-sm`** | 12px / 20px / 24px |
| `sgds:gap-component-md` | 16px / 24px / 32px |
| `sgds:gap-component-lg` | 20px / 32px / 48px |

### Component Padding — inside custom components

Supports `sgds:p-component-*`, `sgds:px-component-*`, `sgds:py-component-*`.

| Class | Mobile / Tablet / Desktop |
|---|---|
| **`sgds:p-component-xs`** | 16px / 20px / 24px |
| `sgds:p-component-sm` | 20px / 24px / 32px |
| `sgds:p-component-md` | 24px / 32px / 48px |
| `sgds:p-component-lg` | 32px / 48px / 64px |

---

## Default Starting Points

Start with these defaults, then scale up or down as the design requires:

| Context | Default class |
|---|---|
| Gap between page sections / layout areas | `sgds:gap-layout-md` |
| Padding on page / section containers | `sgds:p-layout-md` |
| Gap inside a custom component | `sgds:gap-component-sm` |
| Padding inside a custom component | `sgds:p-component-xs` |
| Gap between text / content elements | `sgds:gap-text-md` |

---

## Decision Guide

| Spacing context | Use |
|---|---|
| Between text elements (paragraphs, headings) | `sgds:gap-text-*` |
| Between layout sections or grid areas | `sgds:gap-layout-*` |
| Padding on a page section or container | `sgds:p-layout-*` / `sgds:py-layout-*` |
| Gap inside a custom component | `sgds:gap-component-*` |
| Padding inside a custom component | `sgds:p-component-*` |
| Responsive container width | `sgds:w-container` |

---

## Raw Numeric Utilities (Fallback Only)

Only use raw utilities when no semantic token fits. Base unit: **n × 4px**.

- `sgds:p-{n}` / `sgds:px-{n}` / `sgds:py-{n}` — padding
- `sgds:m-{n}` / `sgds:mx-{n}` / `sgds:my-{n}` — margin
- `sgds:mx-auto` — horizontal centering
- `sgds:gap-{n}` — flex/grid gap

---

## Common Patterns

```jsx
{/* Page layout */}
<div className="sgds:mx-auto sgds:w-container sgds:px-layout-md">
  <div className="sgds:flex sgds:flex-col sgds:gap-layout-md">
    <section>
      <h2>Section Title</h2>
      <div className="sgds:flex sgds:flex-col sgds:gap-text-md">
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </div>
    </section>
  </div>
</div>

{/* Custom card component */}
<div className="sgds:bg-surface-raised sgds:p-component-xs sgds:rounded-md">
  <div className="sgds:flex sgds:flex-col sgds:gap-component-sm">
    <h3>Card Title</h3>
    <p>Card description</p>
  </div>
</div>
```
