# SGDS Utility Classes Overview

SGDS provides a utility class system powered by **Tailwind v4**, scoped under the `sgds:` prefix. These classes encode SGDS design decisions (spacing, color, typography, borders) and should be used instead of writing raw CSS.

**Setup required before using any utility classes** — see `overview-setup.md`.

---

## The `sgds:` Prefix

All SGDS utility classes use the `sgds:` prefix:

```html
<!-- ✅ Correct -->
<div class="sgds:p-4 sgds:bg-primary-default sgds:text-white">Content</div>

<!-- ❌ Wrong — missing prefix -->
<div class="p-4 bg-primary-default text-white">Content</div>
```

---

## Semantic vs Raw Utilities

SGDS provides **semantic utilities** that encode design intent and are responsive. **Always prefer semantic utilities over raw numeric ones.**

| Category | Semantic (preferred) | Raw (fallback) |
|---|---|---|
| Font size | `sgds:text-heading-lg`, `sgds:text-body-md` | `sgds:text-xl`, `sgds:text-base` |
| Line height | `sgds:leading-md`, `sgds:leading-xl` | `sgds:leading-20`, `sgds:leading-28` |
| Spacing | `sgds:gap-layout-md`, `sgds:p-component-sm` | `sgds:gap-4`, `sgds:p-3` |

Only use raw utilities when no semantic token fits.

---

## Utility Categories

| Category | Design Token Files | Example Classes |
|---|---|---|
| **Spacing** | `design-tokens/spacing.md` | `sgds:p-layout-md`, `sgds:gap-text-sm`, `sgds:w-container` |
| **Background Colors** | `design-tokens/colors.md` | `sgds:bg-surface-default`, `sgds:bg-primary-default` |
| **Text Colors** | `design-tokens/colors.md` | `sgds:text-default`, `sgds:text-heading-default` |
| **Border Colors** | `design-tokens/colors.md` | `sgds:border-default`, `sgds:border-danger-default` |
| **Border Width** | `design-tokens/border.md` | `sgds:border`, `sgds:border-2`, `sgds:border-l-4` |
| **Border Radius** | `design-tokens/border.md` | `sgds:rounded-lg`, `sgds:rounded-full` |
| **Typography** | `design-tokens/typography.md` | `sgds:text-heading-lg`, `sgds:font-semibold` |
| **Opacity** | `design-tokens/opacity.md` | `sgds:opacity-50`, `sgds:opacity-75` |

---

## Layout Utilities

SGDS also provides standard Tailwind layout utilities under the `sgds:` prefix:

```html
<div class="sgds:flex sgds:flex-col sgds:gap-4">Flex column</div>
<div class="sgds:grid sgds:grid-cols-3">Grid</div>
<div class="sgds:hidden sgds:lg:block">Responsive visibility</div>
<div class="sgds:sticky sgds:top-0">Sticky element</div>
```

---

## Theme Toggling

Toggle between day (light) and night (dark) themes by adding/removing the class on `<html>`:

```js
document.documentElement.classList.toggle("sgds-theme-night");
```

Colors that use non-`fixed` tokens automatically update on toggle.
