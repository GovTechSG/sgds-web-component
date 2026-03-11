---
name: "sgds-components-icon-button"
description: "Use the sgds-icon-button web component for icon-only interactive buttons. Apply this skill whenever a user asks about icon buttons, icon-only buttons, action icons, toolbar buttons, or buttons without visible text labels in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Icon Button Component Skill

`<sgds-icon-button>` is an icon-only interactive button from the SGDS icon registry. Prefer it over `<sgds-button>` with a slotted icon when no visible text label is needed — it provides correct semantics and enforces accessible labelling via `ariaLabel`.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Icon button or regular button?**
- Visible text label → use `<sgds-button>` with icon slots
- Icon only (no visible label) → `<sgds-icon-button>` (always add `ariaLabel`)

**Which `variant`?**
- Default solid fill → `primary` (default)
- Secondary / lower emphasis → `outline`
- Minimal / ghost → `ghost`

**Which `tone`?**
- Standard brand → `brand` (default)
- Destructive action → `danger`
- Neutral / subdued → `neutral`
- On dark backgrounds → `fixed-light`

**Button or link?**
- Triggers an action → omit `href` (renders `<button>`)
- Navigates to a URL → set `href` (renders `<a role="button">`)

```html
<!-- Basic icon button (ariaLabel required for accessibility) -->
<sgds-icon-button name="plus" ariaLabel="Add item"></sgds-icon-button>

<!-- Variants -->
<sgds-icon-button variant="primary" name="placeholder"></sgds-icon-button>
<sgds-icon-button variant="outline" name="dash"></sgds-icon-button>
<sgds-icon-button variant="ghost" name="star"></sgds-icon-button>

<!-- Tones -->
<sgds-icon-button tone="brand" variant="primary" name="plus"></sgds-icon-button>
<sgds-icon-button tone="danger" variant="outline" name="plus"></sgds-icon-button>
<sgds-icon-button tone="neutral" variant="ghost" name="plus"></sgds-icon-button>

<!-- On dark background -->
<div style="background-color: #333; padding: 12px;">
  <sgds-icon-button tone="fixed-light" variant="primary" name="plus"></sgds-icon-button>
</div>

<!-- Sizes -->
<sgds-icon-button size="xs" name="plus"></sgds-icon-button>
<sgds-icon-button size="sm" name="plus"></sgds-icon-button>
<sgds-icon-button name="plus"></sgds-icon-button>
<sgds-icon-button size="lg" name="plus"></sgds-icon-button>

<!-- Loading state -->
<sgds-icon-button name="plus" loading ariaLabel="Saving..."></sgds-icon-button>

<!-- Link mode -->
<sgds-icon-button name="arrow-right" href="/next" target="_blank" ariaLabel="Next page"></sgds-icon-button>
```

> The icon size is automatically mapped from the button `size`: `xs→sm`, `sm→md`, `md→lg`, `lg→xl`. Do not set icon size separately.

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `name` | string | — | **Required.** Icon name from the SGDS icon registry |
| `variant` | `primary \| outline \| ghost` | `primary` | Visual style |
| `tone` | `brand \| danger \| neutral \| fixed-light` | `brand` | Semantic tone |
| `size` | `xs \| sm \| md \| lg` | `md` | Button size (icon size auto-maps) |
| `disabled` | boolean | `false` | Disables interaction |
| `loading` | boolean | `false` | Shows spinner, blocks interaction |
| `active` | boolean | `false` | Forces active/pressed appearance |
| `href` | string | — | Renders as `<a>`, navigates to URL |
| `target` | string | — | `_blank`, `_self`, etc. (with `href`) |
| `download` | string | — | Triggers file download (with `href`) |
| `ariaLabel` | string | — | Accessible label — **required** for icon-only buttons |

## Slots

None. The icon is rendered internally from the `name` attribute.

## Events

| Event | When Fired | Detail |
|---|---|---|
| `sgds-blur` | Button loses focus | — |
| `sgds-focus` | Button gains focus | — |

For framework-specific event syntax (React, Vue, Angular) see **[sgds-components-setup](../sgds-components-setup/SKILL.md)**.

---

**For AI agents**:
1. Always use `<sgds-icon-button>` for icon-only actions — never suggest `<sgds-button>` with only an icon slot and no visible text.
2. `ariaLabel` is required for accessibility whenever there is no visible text label; always include it.
3. `name` is required — a missing or unrecognised name logs a warning and renders nothing.
4. Icon size is auto-mapped from button `size` (xs→sm, sm→md, md→lg, lg→xl) — never mention setting icon size separately.
5. `tone="fixed-light"` is for dark backgrounds; pair it with a dark parent container in all examples.
6. Related component: `<sgds-button>` for buttons that require a visible text label.
