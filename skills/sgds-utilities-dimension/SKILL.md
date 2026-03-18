---
name: sgds-utilities-dimension
description: "Use SGDS dimension utilities for constraining container widths with sgds:w-container and sgds:max-w-container-*. Apply this skill whenever a user asks about container width, max-width, content area sizing, page width, constraining layout width, or how wide a container or section should be in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: spacing
---

# SGDS Dimension Utilities

Helps developers constrain content area widths using SGDS container dimension tokens.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

## Quick Decision Guide

| Situation | Use |
|-----------|-----|
| First-level content wrapper on a page or route | `sgds:w-container` |
| Inner section, card body, modal content, or any nested container | `sgds:max-w-container-*` |

---

## `sgds:w-container` — Responsive first-level container

**Always use this for the top-level content wrapper on a page.** It is a responsive width token — the max-width value changes automatically across breakpoints.

| Breakpoint | Width |
|------------|-------|
| Mobile (default) | 360px |
| ≥ 1024px (lg) | 888px |
| ≥ 1440px (2xl) | 1312px |

```html
<!-- Correct: top-level page content container -->
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl">
  <!-- page content -->
</div>
```

Always pair with `sgds:mx-auto` to centre the container horizontally.

---

## `sgds:max-w-container-*` — Static max-width for nested containers

Use these when the container is **not** the first-level page wrapper — e.g. an inner section, a card body, a form panel, or a modal content area. These are **static** — they do not respond to breakpoints.

| Class | CSS Variable | Value |
|-------|-------------|-------|
| `sgds:max-w-container-md` | `--sgds-container-max-width-md` | 768px |
| `sgds:max-w-container-lg` | `--sgds-container-max-width-lg` | 888px |
| `sgds:max-w-container-xl` | `--sgds-container-max-width-xl` | 1168px |
| `sgds:max-w-container-2-xl` | `--sgds-container-max-width-2-xl` | 1312px |
| `sgds:max-w-container-3-xl` | `--sgds-container-max-width-3-xl` | 1440px |

**Default: use `sgds:max-w-container-md`** unless the design explicitly calls for a wider inner area.

```html
<!-- Correct: nested container inside a page section -->
<section class="sgds:py-2-xl">
  <div class="sgds:max-w-container-md sgds:mx-auto">
    <!-- section content -->
  </div>
</section>
```

---

## Common Patterns

### Page layout with responsive top-level container
```html
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl">
  <h1>Page title</h1>
  <p>Page content</p>
</div>
```

### Narrow form or dialog panel inside a wider layout
```html
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl">
  <div class="sgds:max-w-container-md sgds:mx-auto">
    <form>...</form>
  </div>
</div>
```

### Login / sign-in page (narrow centred card)
```html
<div class="sgds:w-container sgds:mx-auto sgds:py-2-xl sgds:flex sgds:justify-center">
  <div class="sgds:max-w-container-md sgds:w-full">
    <!-- login card -->
  </div>
</div>
```

---

## Rules

1. **`sgds:w-container` is for the first-level content wrapper only.** Never use it for inner sections.
2. **`sgds:max-w-container-*` is for nested containers.** The default size is `md` (768px).
3. Always pair container width classes with `sgds:mx-auto` to centre them.
4. Do not mix `sgds:w-container` and `sgds:max-w-container-*` on the same element — they serve different purposes and different nesting levels.
