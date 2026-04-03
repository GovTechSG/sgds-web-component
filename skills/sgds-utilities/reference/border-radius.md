# SGDS Border Radius Utilities Skill

Helps developers apply rounded corners to components, containers, and form elements using SGDS design tokens.

## Core Concept

Border radius defines the curvature of UI elements and contributes to both:

- **Usability** — clarity, grouping, affordance
- **Visual tone** — structured ↔ friendly

SGDS provides two radius scales:

| Scale | Classes | Use on |
|-------|---------|--------|
| **General** | `sgds:rounded-{size}` | Containers, buttons, cards, badges, avatars |
| **Form** | `sgds:rounded-form-{size}` | Native form elements (`<input>`, `<select>`, `<textarea>`) |

Use general tokens by default. Use form tokens only for native form controls.

## General Border Radius

### All Corners

```html
<div class="sgds:rounded-none">0px — square corners</div>
<div class="sgds:rounded-sm">2px</div>
<div class="sgds:rounded">4px (default)</div>
<div class="sgds:rounded-md">6px</div>
<div class="sgds:rounded-lg">8px</div>
<div class="sgds:rounded-xl">12px</div>
<div class="sgds:rounded-2-xl">16px</div>
<div class="sgds:rounded-3-xl">24px</div>
<div class="sgds:rounded-full">9999px — pill / circle</div>
```

### Specific Sides

```html
<div class="sgds:rounded-t-lg">Top corners (top-left + top-right)</div>
<div class="sgds:rounded-b-lg">Bottom corners</div>
<div class="sgds:rounded-l-lg">Left corners</div>
<div class="sgds:rounded-r-lg">Right corners</div>
```

### Individual Corners

```html
<div class="sgds:rounded-tl-lg">Top-left only</div>
<div class="sgds:rounded-tr-lg">Top-right only</div>
<div class="sgds:rounded-br-lg">Bottom-right only</div>
<div class="sgds:rounded-bl-lg">Bottom-left only</div>
```

### Size Reference

| Class | Value | Usage |
|-------|-------|-------|
| `sgds:rounded-none` | 0px | Sharp, structured UI — tables, dense layouts |
| `sgds:rounded-sm` | 2px | Minimal rounding to reduce harsh edges |
| `sgds:rounded` | 4px | Small components — badges, tags |
| `sgds:rounded-md` | 6px | Default for components — buttons, inputs, cards |
| `sgds:rounded-lg` | 8px | Larger containers — cards, modals |
| `sgds:rounded-xl` | 12px | Feature elements |
| `sgds:rounded-2-xl` | 16px | Panels, grouped sections |
| `sgds:rounded-3-xl` | 24px | Hero / highlight sections |
| `sgds:rounded-full` | 9999px | Circle / pill — avatars, chips, filters |

## Form Border Radius

Apply to native HTML form elements only: `<input>`, `<select>`, `<textarea>`, `<form>`.

```html
<input class="sgds:rounded-form-md" type="text" />
<select class="sgds:rounded-form-md"></select>
<textarea class="sgds:rounded-form-md"></textarea>
```

### Form Size Reference

| Class | Typical use |
|-------|-------------|
| `sgds:rounded-form-none` | Square form controls |
| `sgds:rounded-form-xs` | Very compact inputs |
| `sgds:rounded-form-sm` | Small inputs |
| `sgds:rounded-form-md` | Standard inputs — default choice |
| `sgds:rounded-form-full` | Pill-shaped search / filter inputs |

## Form Patterns

> **Note**: Use library components like `<sgds-input>`, `<sgds-select>` when available. Form border radius tokens are for custom form elements when library components don't meet your needs.

### Standard Text Input

```html
<input class="sgds:rounded-form-md" type="text" placeholder="Enter text" />
```

### Pill Search Input

```html
<input class="sgds:rounded-form-full" type="search" placeholder="Search..." />
```

### Square Input

```html
<input class="sgds:rounded-form-none" type="text" placeholder="No rounding" />
```

## Usage Patterns

**Default components** — use `sgds:rounded-md` as the baseline. Increase for larger surfaces; decrease for compact UI.

---

## Design Decision Principles

**1. Size → Radius** — match visual weight:
- Small element → smaller radius
- Large element → larger radius

**2. Density → Radius** — reflect UI complexity:
- Dense / data-heavy → sharper (`none` – `sm`)
- Spacious / marketing → softer (`lg` – `xl+`)

**3. Consistency** — avoid mixing too many radius values in one view. Keep radius consistent within a component group.

---

## Brand Expression

Border radius is a branding lever, not just a utility.

| Brand tone | Recommended radius |
|------------|-------------------|
| Structured / Government / Enterprise | `none` – `md` |
| Balanced / Modern | `md` – `lg` |
| Friendly / Consumer | `lg` – `full` |

Examples:
- Government system → `sgds:rounded-md`
- Consumer product → `sgds:rounded-full` buttons

---

## Troubleshooting

**Rounded corners not appearing**: Check for `overflow: hidden` on a parent element — it clips corners. Ensure the element has a defined width/height.

**`sgds:rounded-full` on a non-square element**: Produces a pill (oval), not a circle. Set equal width and height for a true circle.

**Form element looks out of place**: If the border-radius on a form control doesn't match surrounding inputs, confirm you're using `sgds:rounded-form-*` instead of the general `sgds:rounded-*` scale.

## See Also

- **[border-color](border-color.md)** — Semantic and theme-aware border colors
- **[border-width](border-width.md)** — Border thickness and sides
