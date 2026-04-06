# SGDS Tooltip Component Skill

`<sgds-tooltip>` wraps a target element and shows a small text popup on hover, focus, or click. The tooltip content must be plain text only — no HTML.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Component Definition

A tooltip is a contextual, non-persistent overlay that appears when a user hovers, focuses, or taps on an element, providing additional descriptive information without disrupting the user's flow.

## Purpose

- Clarify meaning of icons, labels, or controls
- Provide short, supplementary information
- Reduce visual clutter by hiding secondary details until needed

## Usage Guideline

**When to use:**
- When UI elements (e.g. icons, abbreviations) need clarification
- When additional context is helpful but not critical
- To support accessibility (e.g. describing icon-only buttons)
- When space is limited and inline text would create clutter

**When NOT to use:**
- For critical information users must see
- For long or complex content
- As a replacement for proper labels
- On touch-only experiences where hover is not available (without fallback)
- To display actionable content (e.g. links, buttons)

## Behaviour

- Appears on hover (desktop) and focus (keyboard navigation)
- May appear on tap (mobile) with appropriate fallback
- Displays after a short delay (e.g. 300–500ms)
- Disappears when the pointer leaves the trigger, focus is lost, or user taps elsewhere
- Positioned relative to the trigger (top, bottom, left, right); auto-repositions to avoid viewport overflow
- Only one tooltip should be visible at a time

## Content Guidelines

- Keep content short and concise (1 line preferred, max ~2 lines)
- Use sentence case, not title case
- Avoid punctuation unless necessary
- Do not repeat visible labels

✅ "Download file", "Enter your NRIC without dashes"

❌ "Click here to download the file now", redundant text like "Button to download"

## Interaction Guidelines

- Trigger element must be focusable for keyboard users
- Tooltip must be announced by screen readers via `aria-describedby`
- Maintain sufficient delay to prevent accidental triggering
- Avoid flickering when cursor moves between trigger and tooltip
- Tooltip should not capture focus or block interaction

## Best Practices

**Do**
- Use tooltips to support, not replace, UI clarity
- Ensure accessible implementation (keyboard + screen reader)
- Keep timing consistent across the system
- Position tooltips where they do not obscure important content
- Use for icon-only or ambiguous elements

**Don't**
- Overload tooltips with too much information
- Rely on tooltips as the only way to convey meaning
- Use tooltips for critical instructions or errors
- Place tooltips on disabled elements (no interaction trigger)
- Make tooltips interactive

## Common Use Cases

- **Icon buttons** — download, info, settings
- **Form inputs** — requiring extra clarification
- **Truncated text** — ellipsis overflow
- **Data tables** — abbreviated column headers
- **Status indicators** — additional explanation

## Advanced Considerations

**Accessibility** — must support keyboard trigger (focus); use `aria-describedby` to associate tooltip with trigger; avoid relying on hover-only interactions

**Responsive behaviour** — on mobile, replace with tap-triggered tooltip or consider alternative patterns (e.g. inline hint text, bottom sheet)

**Positioning logic** — use smart positioning to prevent clipping; support flipping (top → bottom, left → right); maintain consistent spacing from trigger

**Timing control** — introduce delay to avoid accidental triggers; allow immediate dismissal to reduce friction

## Edge Cases

- **Disabled elements** — tooltips won't trigger; wrap with a non-disabled container if needed
- **Dense UI (tables, toolbars)** — risk of multiple triggers; ensure only one tooltip is visible
- **Viewport boundaries** — tooltip may overflow; must reposition dynamically
- **Touch devices** — no hover; provide alternative interaction or avoid tooltip
- **Long content** — should not wrap excessively; consider alternative components (e.g. popover)
- **Scrolling containers** — tooltip positioning may break; use a portal/layering strategy

## Quick Decision Guide

**Placement?**
- `placement="top"` (default), `bottom`, `left`, `right`

**How the tooltip is triggered?**
- `trigger="hover focus"` (default) — mouse hover + keyboard tab
- `trigger="hover"` — mouse only
- `trigger="focus"` — keyboard/programmatic focus only
- `trigger="click"` — mouse click toggles the tooltip

**Target element not keyboard-focusable (e.g. SVG, div)?** → Add `tabindex="0"` to make it focusable

```html
<!-- Basic tooltip on an icon -->
<sgds-tooltip content="More information about this field" placement="bottom">
  <sgds-icon name="info-circle" tabindex="0"></sgds-icon>
</sgds-tooltip>

<!-- Tooltip triggered only on click -->
<sgds-tooltip content="Copied to clipboard!" trigger="click" placement="top">
  <sgds-button>Copy</sgds-button>
</sgds-tooltip>

<!-- Tooltip with focus trigger only (keyboard accessible) -->
<sgds-tooltip content="Required field" trigger="focus">
  <input type="text" placeholder="Enter your name" />
</sgds-tooltip>

<!-- Tooltip on a non-focusable SVG element -->
<sgds-tooltip content="Quick reference guide" placement="right">
  <svg tabindex="0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
    <!-- SVG paths -->
  </svg>
</sgds-tooltip>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `content` | string | `""` | Tooltip text (plain text only, no HTML) |
| `placement` | `top \| bottom \| left \| right` | `top` | Where the tooltip appears relative to its target |
| `trigger` | `hover \| focus \| click \| hover focus` | `hover focus` | How the tooltip is shown/hidden |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | The target element that triggers the tooltip |

## Events

| Event | Cancelable | When |
|---|---|---|
| `sgds-show` | No | Tooltip begins showing |
| `sgds-after-show` | No | Tooltip fully visible (animation complete) |
| `sgds-hide` | No | Tooltip begins hiding |
| `sgds-after-hide` | No | Tooltip fully hidden (animation complete) |

## Public Methods

| Method | Description |
|---|---|
| `show()` | Programmatically shows the tooltip |
| `hide()` | Programmatically hides the tooltip |
| `toggle()` | Toggles tooltip visibility |

---

**For AI agents**:
1. `content` accepts plain text only — HTML is not rendered inside the tooltip.
2. The default `trigger="hover focus"` ensures both mouse and keyboard users can access the tooltip — prefer this over `hover` alone.
3. Add `tabindex="0"` to non-focusable elements (SVG, div, span) placed in the default slot so keyboard users can trigger the tooltip.
4. Use `trigger="click"` sparingly — it is better suited for binary states like "copied" confirmations.
5. The tooltip auto-flips placement if it would overflow the viewport.
