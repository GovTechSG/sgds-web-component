# SGDS Border Design Tokens

Border utilities use the `sgds:` prefix and do **not** require theme files (width and radius are layout-only). Border **color** utilities do require theme files — see `overview-setup.md`.

---

## Border Width

Border width controls thickness and side selection. Width alone produces no visible border — always combine with a color class:

```html
<!-- ✅ Correct — width + color -->
<div class="sgds:border sgds:border-default">Visible border</div>

<!-- ❌ Wrong — width alone is invisible -->
<div class="sgds:border">No visible border</div>
```

### All Sides

| Class | Result |
|---|---|
| `sgds:border` | 1px all sides |
| `sgds:border-0` | No border |
| `sgds:border-2` | 2px all sides |
| `sgds:border-4` | 4px all sides |
| `sgds:border-8` | 8px all sides |

### Individual Sides

| Class | Result |
|---|---|
| `sgds:border-t` | Top only (1px) |
| `sgds:border-r` | Right only (1px) |
| `sgds:border-b` | Bottom only (1px) |
| `sgds:border-l` | Left only (1px) |

### Specific Width Per Side

```html
<div class="sgds:border-t-2">Top 2px</div>
<div class="sgds:border-l-4">Left 4px</div>
<div class="sgds:border-b-0">Remove bottom border</div>
```

### Axis Shortcuts

| Class | Result |
|---|---|
| `sgds:border-x` | Left + right (1px each) |
| `sgds:border-y` | Top + bottom (1px each) |
| `sgds:border-x-2` | Left + right (2px each) |

---

## Border Radius

SGDS has two radius scales: **general** (for all elements) and **form** (for native HTML form elements only).

### General Border Radius

Use on divs, containers, buttons, badges, avatars — any non-form element.

| Class | Value | Typical use |
|---|---|---|
| `sgds:rounded-none` | 0px | Sharp corners, table cells |
| `sgds:rounded-sm` | 2px | Tags, subtle rounding |
| `sgds:rounded` | 4px | Standard buttons, small components |
| `sgds:rounded-md` | 6px | Cards, panels |
| `sgds:rounded-lg` | 8px | Larger cards, modals |
| `sgds:rounded-xl` | 12px | Featured cards |
| `sgds:rounded-2-xl` | 16px | Large containers |
| `sgds:rounded-3-xl` | 24px | Hero sections |
| `sgds:rounded-full` | 9999px | Badges, avatars, pill shapes |

### Side/Corner Targeting

```html
<div class="sgds:rounded-t-lg">Top corners only</div>
<div class="sgds:rounded-b-lg">Bottom corners only</div>
<div class="sgds:rounded-tl-lg">Top-left only</div>
<div class="sgds:rounded-br-lg">Bottom-right only</div>
```

### Form Border Radius

Apply **only** to native HTML form elements: `<input>`, `<select>`, `<textarea>`, `<form>`.

| Class | Typical use |
|---|---|
| `sgds:rounded-form-none` | Square form controls |
| `sgds:rounded-form-xs` | Very compact inputs |
| `sgds:rounded-form-sm` | Small inputs |
| `sgds:rounded-form-md` | Standard inputs (default choice) |
| `sgds:rounded-form-full` | Pill-shaped search inputs |

> Use `<sgds-input>`, `<sgds-select>` etc. instead of native form elements when possible — they have correct radius built in.

---

## Common Patterns

### Card with border

```html
<div class="sgds:border sgds:border-default sgds:rounded-lg sgds:p-component-md">
  Card content
</div>
```

### Error state container

```html
<div class="sgds:border-2 sgds:border-danger-default sgds:rounded-md sgds:p-4">
  Error content
</div>
```

### Avatar / circular image

```html
<img class="sgds:rounded-full sgds:w-12 sgds:h-12" src="avatar.jpg" alt="User" />
```

### Left accent border

```html
<div class="sgds:border-l-4 sgds:border-primary-default sgds:pl-4">
  Highlighted content
</div>
```
