# SGDS Toast Component Skill

`<sgds-toast>` is a brief, non-blocking notification. `<sgds-toast-container>` positions one or more toasts on the screen. Toasts must contain both a `title` and a message, and optionally an icon and an action link.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For brief, non-blocking status notifications that confirm a completed action or report a background event (e.g. "Changes saved", "File uploaded successfully", "Error sending message").
- When the notification is transient and does not require user action or sustained attention.
- For system-level feedback that is not tied to a specific element on the page.

### When NOT to use

- For critical messages that require immediate action — use a modal or alert instead.
- For persistent information that should be part of the page layout.
- When information is complex or requires user interaction — toasts are dismissible and transient.

## Behaviour

- `show` attribute controls whether the toast is visible; set it on page load to show a toast immediately or use `showToast()` / `hideToast()` methods for programmatic control.
- `variant` sets the visual tone: `info` (default), `success`, `danger`, `warning`, or `neutral`.
- `autohide` dismisses the toast automatically after `delay` milliseconds (default 5000); without `autohide` the toast persists until dismissed or hidden via JS.
- `dismissible` renders a close button users can click to dismiss the toast manually.
- Multiple toasts overlap as a card-deck stack (max 3 visible, older toasts scale down and peek behind). When a 4th toast appears, the oldest fades out automatically.
- Hovering over the toast stack expands all toasts vertically with gaps so users can read/interact with each one. Autohide timers pause while hovered and resume on mouse leave.
- Toasts animate in with a slide + fade (direction based on container position: top positions slide down, bottom positions slide up).
- Events fire in sequence: `sgds-show` → `sgds-after-show` when showing; `sgds-hide` → `sgds-after-hide` when hiding.
- `noAnimation` disables show/hide animations for reduced-motion contexts.

## Imperative API (`toast()` function)

For programmatic usage, import the `toast()` utility function. It auto-creates a container per position, creates the toast with the correct variant icon, shows it, and removes it from the DOM after hiding.

```js
import { toast } from "@govtechsg/sgds-web-component";

toast({
  title: "Success",
  message: "Your changes have been saved.",
  variant: "success",
  position: "bottom-end",
  delay: 5000,
  dismissible: true
});
```

| Option | Type | Default | Description |
|---|---|---|---|
| `title` | string | *(required)* | Toast heading |
| `message` | string | — | Toast body text |
| `variant` | `info \| success \| danger \| warning \| neutral` | `"info"` | Visual style (icon auto-selected) |
| `position` | ToastPosition | `"bottom-end"` | Where on screen to show the toast |
| `autohide` | boolean | `true` | Auto-dismiss after delay |
| `delay` | number | `5000` | Ms before auto-dismiss |
| `dismissible` | boolean | `true` | Show close button |

The `toast()` function returns the created `<sgds-toast>` element, which can be used to call `hideToast()` programmatically.

Alternatively, call `container.toast(options)` directly on an existing `<sgds-toast-container>` element (same options except `position`).

## Advanced Considerations

- **Always use `<sgds-toast-container>`**: `<sgds-toast>` must be placed inside `<sgds-toast-container>` — the container handles screen positioning and stacking.
- **`title` is required for accessibility**: always set a meaningful `title` on every `<sgds-toast>` — it is the accessible heading of the notification.
- **Declarative vs imperative**: use the `show` attribute and HTML templates for toasts visible on initial render; use the `toast()` function or `showToast()` / `hideToast()` methods for dynamically triggered notifications.
- **Deprecated positions**: `top-start`, `middle-start`, `middle-center`, `middle-end` are deprecated since v3.7.1 — use only `top-center`, `top-end`, `bottom-start`, `bottom-center`, `bottom-end`.
- **One container per position**: use a single `<sgds-toast-container>` per screen position — the `toast()` function handles this automatically.
- **Auto-dismiss timing**: `delay` only takes effect when `autohide` is also set — setting `delay` alone has no effect.
- **Max 3 visible**: the container limits the visible stack to 3 toasts. Older toasts fade out when a 4th arrives.

## Edge Cases

- **Multiple rapid toasts**: the container handles rapid creation gracefully — max 3 visible, oldest fades out. No need for application-level queueing.
- **Z-index conflicts**: ensure `<sgds-toast-container>` appears above modals, banners, and other overlays — check stacking context if toasts are hidden behind other elements.
- **DOM cleanup**: toasts created via `toast()` or `container.toast()` auto-remove from the DOM after hiding. Declarative toasts (in HTML templates) stay in the DOM — use `sgds-after-hide` to remove them manually if needed.
- **Hover pauses autohide**: when a user hovers over the toast stack, all autohide timers pause and the stack expands for readability. Timers resume on mouse leave.

## Quick Decision Guide

**Variant?**
- Informational → `variant="info"` (default) — `<sgds-icon slot="icon" name="info-circle-fill" size="md">`
- Confirmation → `variant="success"` — `<sgds-icon slot="icon" name="check-circle-fill" size="md">`
- Error → `variant="danger"` — `<sgds-icon slot="icon" name="exclamation-circle-fill" size="md">`
- Caution → `variant="warning"` — `<sgds-icon slot="icon" name="exclamation-triangle-fill" size="md">`
- Theme-neutral → `variant="neutral"` — `<sgds-icon slot="icon" name="info-circle-fill" size="md">`

**Auto-dismiss?** → Add `autohide` and optionally `delay` (ms, default 5000)

**User can dismiss?** → Add `dismissible`

**Position on screen?**
- Bottom right → `position="bottom-end"` on `<sgds-toast-container>` (common default)
- Use `"top-end"`, `"top-center"`, `"bottom-center"`, `"bottom-start"` etc.

**Show/hide a toast via JS?** → Use `toast()` function (preferred) or `showToast()` / `hideToast()` methods

```js
// Preferred: imperative toast() function (auto-creates container, auto-removes after hide)
import { toast } from "@govtechsg/sgds-web-component";

toast({ title: "Saved", message: "Your changes have been saved.", variant: "success", position: "bottom-end" });
toast({ title: "Error", message: "Something went wrong.", variant: "danger", position: "bottom-end" });
```

```html
<!-- Declarative: basic toast (already shown) -->
<sgds-toast-container position="bottom-end">
  <sgds-toast show variant="info" title="Info" dismissible>
    <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
    Your changes have been saved.
    <sgds-link slot="action" size="sm"><a href="#" target="_blank">Undo</a></sgds-link>
  </sgds-toast>
</sgds-toast-container>

<!-- Declarative: auto-dismissing toast after 3 seconds -->
<sgds-toast-container position="top-end">
  <sgds-toast show variant="success" title="Success" autohide delay="3000">
    <sgds-icon slot="icon" name="check-circle-fill" size="md"></sgds-icon>
    Item added to cart.
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
| `icon` | Icon displayed on the left (use `<sgds-icon size="md">`) |
| *(default)* | Toast message body text |
| `action` | Action link on the right (use `<sgds-link size="sm">`) |

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
| `pauseAutohide()` | Pauses the autohide countdown (used internally on hover) |
| `resumeAutohide()` | Resumes the autohide countdown |

## Public Methods (`<sgds-toast-container>`)

| Method | Description |
|---|---|
| `toast(options)` | Creates a toast with the correct variant icon, appends it, shows it, and auto-removes after hide. Returns the toast element. |

## Exported Utility Function

| Function | Description |
|---|---|
| `toast(options)` | Convenience function — finds or creates a container for the given `position`, then calls `container.toast()`. Import from `@govtechsg/sgds-web-component`. |

---

**For AI agents**:
1. **Prefer `toast()` function** for dynamic notifications — it handles container creation, icon selection, and DOM cleanup automatically.
2. Always set `title` on `<sgds-toast>` — it is required for accessibility.
3. For declarative toasts (in HTML), `show` must be set for visibility on page load; wrap inside `<sgds-toast-container>`.
4. Multiple toasts stack as an overlapping card-deck (max 3 visible). Hovering expands the stack.
5. Avoid deprecated position values (`top-start`, `middle-*`); use `bottom-end` as the default position.
6. The `toast()` function auto-selects the correct icon per variant — no need to manually add `<sgds-icon>`.
7. For declarative usage, icon slot accepts `<sgds-icon size="md">`, action slot accepts `<sgds-link size="sm">` wrapping an `<a>` tag.
