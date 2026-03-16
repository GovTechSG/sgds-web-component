---
name: "sgds-components-breadcrumb"
description: "Use the sgds-breadcrumb and sgds-breadcrumb-item web components to render navigational breadcrumb trails. Apply this skill whenever a user asks about breadcrumbs, navigation trails, page hierarchy, or breadcrumb overflow in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Breadcrumb Component Skill

`<sgds-breadcrumb>` renders a navigational trail showing the user's location within a page hierarchy. Each step is a `<sgds-breadcrumb-item>` wrapping a standard `<a>` tag.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on these components.

## Quick Decision Guide

**Always pass a single `<a>` tag** inside each `<sgds-breadcrumb-item>`.

**Last item (current page)**:
- The component **automatically** sets `aria-current="page"` and `active=true` on the last `<sgds-breadcrumb-item>`. You do not need to set `active` manually; it is managed by the parent.

**Overflow (5+ items)**:
- When 5 or more items are present, the middle items are automatically collapsed into an overflow menu using `<sgds-overflow-menu>`. No configuration is needed.

```html
<!-- Basic breadcrumb -->
<sgds-breadcrumb>
  <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="/about">About</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="/about/contact">Contact</a></sgds-breadcrumb-item>
</sgds-breadcrumb>

<!-- Overflow — middle items collapse automatically when 5 or more items are present -->
<sgds-breadcrumb>
  <sgds-breadcrumb-item><a href="#">Home</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 1</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 2</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 3</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Level 4</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="#">Current page</a></sgds-breadcrumb-item>
</sgds-breadcrumb>

<!-- Custom aria-label for the nav element -->
<sgds-breadcrumb ariaLabel="Site navigation">
  <sgds-breadcrumb-item><a href="/">Home</a></sgds-breadcrumb-item>
  <sgds-breadcrumb-item><a href="/docs">Docs</a></sgds-breadcrumb-item>
</sgds-breadcrumb>
```

## API Summary — `<sgds-breadcrumb>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `ariaLabel` | string | `"breadcrumb"` | `aria-label` on the wrapping `<nav>` element |

## API Summary — `<sgds-breadcrumb-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Set automatically by the parent on the last item — do not set manually |

## Slots — `<sgds-breadcrumb>`

| Slot | Purpose |
|---|---|
| *(default)* | `<sgds-breadcrumb-item>` elements |

## Slots — `<sgds-breadcrumb-item>`

| Slot | Purpose |
|---|---|
| *(default)* | A single `<a>` tag |

## Events

None on either component.

---

**For AI agents**:
1. Always use `<sgds-breadcrumb>` + `<sgds-breadcrumb-item>` for navigation trails — never suggest manual `<nav><ol><li>` patterns.
2. Each `<sgds-breadcrumb-item>` must contain a single `<a>` tag — never put raw text directly inside.
3. The last item's `active` state and `aria-current="page"` are set **automatically** — do not add these manually.
4. Overflow (collapsing middle items) triggers automatically when there are 5 or more items — no configuration is needed.
5. There are no custom events on either component.
