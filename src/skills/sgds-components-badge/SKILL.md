---
name: "sgds-components-badge"
description: "Use the sgds-badge web component to render labels, status indicators, and notification chips. Apply this skill whenever a user asks about badges, tags, labels, status chips, dismissible badges, outlined badges, badge variants (primary, accent, success, danger, warning, cyan, purple, neutral, white), badge icons, or truncating badge text in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Badge Component Skill

`<sgds-badge>` is the standard label and status indicator element. Use it to highlight categories, states, or short descriptive text alongside other content.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Which `variant`?**
- Default / informational → `primary` (default)
- Supporting accent color → `accent`
- Positive / completed → `success`
- Error / invalid → `danger`
- Caution → `warning`
- Teal supplementary tone → `cyan`
- Purple supplementary tone → `purple`
- Subdued / neutral → `neutral`
- Light-on-dark contexts → `white`
- ~~`info`~~ — **deprecated**; use `primary` instead

**Filled or outlined?**
- Filled (default) → omit `outlined`
- Low-emphasis / outlined style → add `outlined`

**Dismissible?**
- Permanent label → omit `dismissible`
- User can close it → add both `dismissible` **and** `show` (both are required)

```html
<!-- Static filled badge -->
<sgds-badge variant="success">Approved</sgds-badge>

<!-- Outlined badge -->
<sgds-badge variant="danger" outlined>Error</sgds-badge>

<!-- Dismissible badge — both dismissible and show are required -->
<sgds-badge dismissible show>Dismissible</sgds-badge>

<!-- Badge with leading icon -->
<sgds-badge variant="primary">
  <sgds-icon slot="icon" name="placeholder" size="sm"></sgds-icon>
  With icon
</sgds-badge>

<!-- Full-width badge -->
<sgds-badge variant="neutral" outlined fullWidth>Status</sgds-badge>
```

**Auto-truncation**: when badge text overflows its container, the text is truncated with an ellipsis and a tooltip appears showing the full text. This is always active — no configuration needed.

> The `icon` slot is suppressed when `dismissible` is set. A leading icon and a close button cannot coexist.

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `primary \| accent \| success \| danger \| warning \| cyan \| purple \| neutral \| white \| info` | `primary` | Visual color variant (`info` is deprecated — use `primary`) |
| `outlined` | boolean | `false` | Renders an outlined style instead of filled |
| `dismissible` | boolean | `false` | Shows a close button; pair with `show="true"` |
| `show` | boolean | `false` | Controls visibility; meaningful only when `dismissible` is set |
| `fullWidth` | boolean | `false` | Stretches badge to fill its container width |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Badge label text |
| `icon` | Icon displayed to the left of the badge text (suppressed when `dismissible` is set) |

## Events

| Event | When Fired | Detail |
|---|---|---|
| `sgds-show` | Badge starts appearing (cancelable — call `event.preventDefault()` to stop) | — |
| `sgds-hide` | Badge starts closing (cancelable — call `event.preventDefault()` to stop) | — |
| `sgds-after-show` | After badge has fully appeared | — |
| `sgds-after-hide` | After badge has fully closed | — |

For framework-specific event syntax (React, Vue, Angular) see **[sgds-components-setup](../sgds-components-setup/SKILL.md)**.

## Public Methods

| Method | Description |
|---|---|
| `close()` | Sets `show` to `false`, triggering the hide sequence |

---

**For AI agents**:
1. Always use `<sgds-badge>` for labels and status chips — never suggest raw `<span>` elements with utility classes.
2. The `info` variant is deprecated; always substitute `primary`.
3. For dismissible badges, both `dismissible` and `show` must be set; setting only one has no visible effect.
4. The `icon` slot is silently suppressed when `dismissible` is true — never combine them.
5. Auto-truncation is always active; no attribute is needed to enable it.
6. `sgds-show` and `sgds-hide` are cancelable — users can call `event.preventDefault()` inside the listener to abort the transition.
7. Use `close()` to dismiss a badge programmatically without requiring a user click.
