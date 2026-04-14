# Elevation

SGDS provides two categories of shadow-based depth: **surface** (components floating in front of other surfaces) and **edge** (components anchored to the viewport edge).

---

## Surface Elevation

Use progressive levels — higher = closer to the user.

| Class | Use for |
|---|---|
| `sgds:shadow-1` | Cards, panels, tiles |
| `sgds:shadow-2` | Floating controls — dropdown menus, select menus, mega menus |
| `sgds:shadow-3` | Contextual overlays — tooltips, toasts |
| `sgds:shadow-4` | Blocking overlays — modals, drawers |
| `sgds:shadow-5` | Hovering card state (interaction) |

---

## Edge Elevation

For components anchored to the viewport top or bottom.

| Class | Use for |
|---|---|
| `sgds:shadow-edge-bottom` | Sticky headers, top navigation bars — shadow cast downward |
| `sgds:shadow-edge-top` | Bottom action bars — shadow cast upward |

Edge elevation is not for footers.

---

## Choosing an Elevation Level

| Context | Recommended |
|---|---|
| Card, panel, tile | `sgds:shadow-1` |
| Dropdown, select menu, mega menu | `sgds:shadow-2` |
| Tooltip, toast | `sgds:shadow-3` |
| Modal, drawer | `sgds:shadow-4` |
| Hovering card (interactive hover state) | `sgds:shadow-5` |
| Sticky header, top navigation | `sgds:shadow-edge-bottom` |
| Bottom action bar | `sgds:shadow-edge-top` |

---

## Common Patterns

```html
<!-- Card with elevation -->
<div class="sgds:bg-surface-raised sgds:shadow-1 sgds:p-component-md sgds:rounded-lg">
  <h3 class="sgds:text-heading-md sgds:font-semibold">Card Title</h3>
  <p class="sgds:text-body-md sgds:text-muted">Description</p>
</div>

<!-- Sticky header with edge shadow -->
<header class="sgds:bg-default sgds:shadow-edge-bottom sgds:sticky sgds:top-0">
  <!-- Navigation -->
</header>

<!-- Card with hover lift effect -->
<div class="sgds:bg-surface-raised sgds:shadow-1 hover:sgds:shadow-5 sgds:transition-shadow sgds:p-component-md sgds:rounded-lg">
  Hover to elevate
</div>
```

---

## Guidelines

- Limit to 2–3 elevation levels per screen — avoid stacking too many levels in one view
- Pair elevation with `sgds:bg-surface-raised` or another surface background for proper visual layering
- Use `hover:sgds:shadow-5` with `sgds:transition-shadow` for interactive card lift effects
- Prefer borders or background contrast when elevation is unnecessary
