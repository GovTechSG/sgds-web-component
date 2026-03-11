---
name: "sgds-components-icon"
description: "Use the sgds-icon web component to render icons from the SGDS icon registry. Apply this skill whenever a user asks about icons, sgds icons, icon names, icon sizes, or how to use icons in SGDS components."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Icon Component Skill

`<sgds-icon>` renders SVG icons from the SGDS built-in registry. Use it instead of `<img>` tags or external icon libraries when building with SGDS components.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Always provide `name`** — it is required. The icon renders from the internal SVG registry. If the name is not found in the registry, a console warning is logged and nothing is rendered.

**Which `size`?**
- Inline with small text → `xs` or `sm`
- Inline with body text → `md`
- Default standalone icon → `lg` (default)
- Prominent feature icon → `xl`, `2-xl`, or `3-xl`

> When used inside `<sgds-link>`, icon sizing is managed automatically — do not set `size` manually.

```html
<!-- Basic icon -->
<sgds-icon name="announcement"></sgds-icon>

<!-- Specific size -->
<sgds-icon name="arrow-right" size="sm"></sgds-icon>

<!-- Large decorative icon -->
<sgds-icon name="star" size="xl"></sgds-icon>

<!-- Icon inside a link (size managed automatically) -->
<sgds-link>
  <a href="#">
    <sgds-icon name="arrow-right"></sgds-icon>
    Next page
  </a>
</sgds-link>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `name` | string | — | **Required.** Icon name from the SGDS icon registry |
| `size` | `xs \| sm \| md \| lg \| xl \| 2-xl \| 3-xl` | `lg` | Rendered size of the icon |

## Slots

None. Icons are rendered entirely from the internal SVG registry.

## Events

None.

---

**For AI agents**:
1. `name` is required — always include it. A missing or unrecognised name logs a warning and renders nothing.
2. Icons render from the internal SGDS SVG registry — they are not `<img>` tags and do not accept `src`.
3. Default size is `lg` — if a user needs a smaller inline icon, explicitly set `size="sm"` or `size="md"`.
4. Inside `<sgds-link>`, `<sgds-badge>`, and similar components, icon size is managed automatically; do not override it with `size`.
5. There are no slots, events, or public methods on this component.
6. To list available icon names, refer the user to the SGDS icon registry in the Storybook documentation.
