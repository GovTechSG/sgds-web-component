# SGDS Toast Component Skill

`<sgds-toast>` is a brief, non-blocking notification. `<sgds-toast-container>` positions one or more toasts on the screen. Toasts must contain both a `title` and a message, and optionally an icon and an action link.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Component Definition

A Toast is a transient, non-disruptive notification that appears temporarily to provide brief feedback or status updates to the user, usually at the top or bottom of the interface.

## Purpose

- Communicate success, warning, error, or informational messages
- Provide feedback without interrupting the user's workflow
- Enhance user confidence and clarity in the interface

## Usage Guideline

**When to use:**
- To confirm user actions (e.g. "Settings saved successfully")
- To alert the user about temporary errors or warnings (e.g. "Failed to upload file")
- To provide status updates for background processes (e.g. "Syncing your data")

**When NOT to use:**
- For critical messages that require immediate action — use modal or alert instead
- For persistent information that should be part of the page layout
- When information is complex or requires user interaction

## Behaviour

- Appears temporarily and automatically dismisses after a set duration
- Can optionally be dismissible by the user
- Only one toast per type or context should be displayed at a time to avoid clutter
- Stacking is allowed but limit to 3–4 to maintain clarity

## Content Guidelines

- Keep messages short and concise (ideally 1–2 lines)
- Use plain language and an actionable tone if relevant
- Avoid complex links or detailed instructions — use modals or inline messages instead
- Include status icons to indicate type (success, error, warning, info)

## Interaction Guidelines

- Toasts appear and disappear smoothly without interrupting other content
- If dismissible, include a clear close icon with hover/focus states
- Support keyboard accessibility (e.g. `Esc` key to dismiss)
- Screen reader friendly: announce toast type and message when it appears

## Best Practices

**Do**
- Use for brief confirmations or alerts
- Keep text concise and scannable
- Ensure consistent positioning and timing
- Provide visual differentiation for types via color and iconography

**Don't**
- Overload users with multiple simultaneous toasts
- Place critical information only in a toast
- Use for persistent content that requires user interaction

## Common Use Cases

- **Success** — "Profile updated successfully"
- **Error** — "Failed to save changes. Please try again"
- **Warning** — "Your session is about to expire"
- **Informational** — "New version available"

## Advanced Considerations

**Custom duration** — errors may warrant a longer display duration than success messages

**Animation** — fade or slide patterns; keep motion subtle and consistent

**Theming** — support dark/light mode with accessible contrast ratios

**Localisation** — account for longer translated messages that may exceed recommended line length

**System integration** — consider queueing or throttling when multiple rapid actions trigger many toasts

## Edge Cases

- **Multiple rapid toasts** — implement queueing or throttling to avoid flooding the UI
- **Very long messages** — truncate with ellipsis or provide a link to more detail
- **Small screens** — adjust positioning and size to avoid obscuring content
- **Z-index conflicts** — ensure toasts appear above modals, banners, and other overlays

## Quick Decision Guide

**Variant?**
- Informational → `variant="info"` (default)
- Confirmation → `variant="success"`
- Error → `variant="danger"`
- Caution → `variant="warning"`
- Theme-neutral → `variant="neutral"`

**Auto-dismiss?** → Add `autohide` and optionally `delay` (ms, default 5000)

**User can dismiss?** → Add `dismissible`

**Position on screen?**
- Bottom right → `position="bottom-end"` on `<sgds-toast-container>` (common default)
- Use `"top-end"`, `"top-center"`, `"bottom-center"`, `"bottom-start"` etc.

**Show/hide a toast via JS?** → Use `showToast()` / `hideToast()` methods

```html
<!-- Basic toast (already shown) -->
<sgds-toast-container position="bottom-end">
  <sgds-toast show variant="info" title="Info" dismissible>
    <sgds-icon slot="icon" name="info-circle-fill"></sgds-icon>
    Your changes have been saved.
    <sgds-link slot="action"><a href="#" target="_blank">Undo</a></sgds-link>
  </sgds-toast>
</sgds-toast-container>

<!-- Auto-dismissing toast after 3 seconds -->
<sgds-toast-container position="top-end">
  <sgds-toast show variant="success" title="Success" autohide delay="3000">
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    Item added to cart.
  </sgds-toast>
</sgds-toast-container>

<!-- Trigger toast via JS -->
<sgds-button id="trigger-toast">Show Toast</sgds-button>
<sgds-toast-container position="bottom-end">
  <sgds-toast id="my-toast" variant="danger" title="Error" dismissible>
    <sgds-icon slot="icon" name="exclamation-circle-fill"></sgds-icon>
    Something went wrong. Please try again.
  </sgds-toast>
</sgds-toast-container>

<script>
  document.getElementById("trigger-toast").addEventListener("click", () => {
    document.getElementById("my-toast").showToast();
  });
</script>

<!-- Multiple toasts stacked -->
<sgds-toast-container position="bottom-end">
  <sgds-toast show variant="success" title="Saved">
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    Document saved.
  </sgds-toast>
  <sgds-toast show variant="warning" title="Warning">
    <sgds-icon slot="icon" name="exclamation-triangle-fill"></sgds-icon>
    Storage almost full.
  </sgds-toast>
</sgds-toast-container>
```

## API Summary

### `<sgds-toast>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `show` | boolean | `false` | Controls toast visibility |
| `title` | string | `"Title"` | Toast heading (required for accessibility) |
| `variant` | `info \| success \| danger \| warning \| neutral` | `info` | Visual style and semantic meaning |
| `dismissible` | boolean | `false` | Shows a close button for user dismissal |
| `autohide` | boolean | `false` | Auto-hides the toast after `delay` ms |
| `delay` | number | `5000` | Milliseconds before auto-hide (requires `autohide`) |
| `noAnimation` | boolean | `false` | Disables show/hide animations |

### `<sgds-toast-container>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `position` | ToastPosition | — | Screen position for the toast stack |

#### ToastPosition values (current)
`top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`

> `top-start`, `middle-start`, `middle-center`, `middle-end` are **deprecated since 3.7.1** — avoid these positions.

## Slots (`<sgds-toast>`)

| Slot | Purpose |
|---|---|
| `icon` | Icon displayed on the left (use `<sgds-icon>`) |
| *(default)* | Toast message body text |
| `action` | Action link on the right (use `<sgds-link>`) |

## Events (`<sgds-toast>`)

| Event | Cancelable | When |
|---|---|---|
| `sgds-show` | No | Toast begins showing |
| `sgds-after-show` | No | Toast fully visible (animation complete) |
| `sgds-hide` | No | Toast begins hiding |
| `sgds-after-hide` | No | Toast fully hidden (animation complete) |

## Public Methods (`<sgds-toast>`)

| Method | Description |
|---|---|
| `showToast()` | Shows the toast (sets `show = true` with animation) |
| `hideToast()` | Hides the toast (sets `show = false` with animation) |

---

**For AI agents**:
1. Always set `title` on `<sgds-toast>` — it is required for accessibility.
2. `show` must be set on the toast for it to be visible on page load; `showToast()` / `hideToast()` are the programmatic API.
3. Always wrap `<sgds-toast>` inside `<sgds-toast-container>` — the container handles positioning.
4. Multiple `<sgds-toast>` elements inside one container stack vertically automatically.
5. Avoid deprecated position values (`top-start`, `middle-*`); use `bottom-end` as the default position.
6. Icon slot accepts `<sgds-icon>`, action slot accepts `<sgds-link>` wrapping an `<a>` tag.
