# Active state `:active::after` overlay for button components

## Status

Accepted

## Context

Users need visual feedback when clicking buttons, especially in scenarios where a server-side action follows the click and there may be a perceptible wait before the UI updates. Without an active state, the button appears unresponsive during the click.

We chose a `::after` pseudo-element overlay approach rather than modifying `background-color` directly, so the active state works consistently across all button variants (primary, outline, ghost) and tones (brand, danger, neutral, fixed-light) without needing variant-specific overrides.

## Decision

### Applied to

The `:active::after` overlay using `background-color: var(--sgds-bg-translucent)` has been applied to:

1. **`base/button.css` (`.btn:active::after`)** — covers:
   - `sgds-button`
   - `sgds-icon-button`
   - All components that consume them internally: `sgds-file-upload`, `sgds-modal`, `sgds-datepicker`, `sgds-pagination`, `sgds-mainnav`, `sgds-sidebar`, `sgds-quantity-toggle`, `sgds-system-banner`

2. **`CloseButton/close-button.css` (`.btn-close:active::after`)** — covers:
   - `sgds-close-button`
   - All components that consume it internally: `sgds-alert`, `sgds-badge`, `sgds-drawer`, `sgds-modal`, `sgds-toast`, `sgds-system-banner`

### Not applied (KIV)

The following components have their own clickable elements with `cursor: pointer` but were **not** given the active overlay. These elements already provide immediate visual feedback (e.g. selection highlight, navigation, animation) and are not expected to trigger server-side waits:

- `sgds-accordion` — accordion-item toggle
- `sgds-tab` — tab button
- `sgds-stepper` — step button
- `sgds-dropdown` — dropdown-item
- `sgds-overflow-menu` — menu trigger and items
- `sgds-mainnav` — mainnav-item, mainnav-dropdown
- `sgds-subnav` — subnav-item
- `sgds-sidebar` — sidebar-item, sidebar-section, sidebar-group
- `sgds-sidenav` — sidenav-item
- `sgds-masthead` — masthead toggle
- `sgds-system-banner` — system-banner-item
- `sgds-datepicker` — calendar day cells
- `sgds-link` — link element
- `sgds-alert` — alert-link
- `sgds-input` — clear/password toggle button
- `sgds-file-upload` — file drop area
- `sgds-combo-box` — combo-box trigger
- `sgds-data-table` — sortable column headers
- `sgds-pagination` — pagination page number buttons (own CSS, separate from `sgds-button` usage)

**Candidates to revisit first:** `sgds-pagination` (own CSS buttons), navigational components, `sgds-datepicker` — these are more likely to be used in contexts where server-side actions follow a click, or a navigational lag.

### Implementation pattern

```css
.btn:active::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: var(--sgds-bg-translucent);
  border-radius: inherit;
}
```

Requires `position: relative` on the parent element.

## Consequences

- Buttons and close buttons now show a translucent overlay on click, giving users immediate tactile feedback.
- The overlay inherits `border-radius` so it works across all size variants without additional rules.
- Future components that extend `base/button-element` will automatically inherit this behaviour.
- KIV components can be opted in later by applying the same `::after` pattern to their clickable elements.

## Date of proposal

15/09/2026
