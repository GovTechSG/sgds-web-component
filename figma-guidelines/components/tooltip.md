# Tooltip

**Purpose**: Short contextual hint text shown on hover, focus, or click. Use to provide brief explanations for icons or elements that lack visible labels.

**Component**: `<sgds-tooltip>`

---

## Usage

```html
<!-- Tooltip on hover (default) -->
<sgds-tooltip content="This is a helpful tip">
  <sgds-icon-button name="info-circle" label="More information"></sgds-icon-button>
</sgds-tooltip>

<!-- Placement variants -->
<sgds-tooltip content="Above" placement="top">
  <sgds-button variant="ghost">Top</sgds-button>
</sgds-tooltip>

<sgds-tooltip content="Below" placement="bottom">
  <sgds-button variant="ghost">Bottom</sgds-button>
</sgds-tooltip>

<sgds-tooltip content="Left" placement="left">
  <sgds-button variant="ghost">Left</sgds-button>
</sgds-tooltip>

<sgds-tooltip content="Right" placement="right">
  <sgds-button variant="ghost">Right</sgds-button>
</sgds-tooltip>

<!-- Trigger modes -->
<sgds-tooltip content="Hover to see this" trigger="hover">
  <sgds-button variant="ghost">Hover me</sgds-button>
</sgds-tooltip>

<sgds-tooltip content="Focus to see this" trigger="focus">
  <sgds-button variant="ghost">Focus me</sgds-button>
</sgds-tooltip>

<sgds-tooltip content="Click to toggle this" trigger="click">
  <sgds-button variant="ghost">Click me</sgds-button>
</sgds-tooltip>

<!-- Multiple triggers -->
<sgds-tooltip content="Both hover and focus" trigger="hover focus">
  <sgds-icon-button name="question-circle" label="Help"></sgds-icon-button>
</sgds-tooltip>

<!-- Disabled tooltip -->
<sgds-tooltip content="This won't show" disabled>
  <sgds-button variant="ghost">No tooltip here</sgds-button>
</sgds-tooltip>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `content` | string | — | The tooltip text to display |
| `placement` | `top \| top-start \| top-end \| bottom \| bottom-start \| bottom-end \| left \| left-start \| left-end \| right \| right-start \| right-end` | `top` | Where the tooltip appears |
| `trigger` | string | `hover focus` | Space-separated trigger modes: `hover`, `focus`, `click`, `manual` |
| `disabled` | boolean | `false` | Prevents tooltip from showing |
| `open` | boolean | `false` | Forces tooltip to be visible (for `manual` trigger) |

## Slots

| Slot | Content |
|---|---|
| *(default)* | The element that triggers the tooltip |

## Methods

| Method | Description |
|---|---|
| `show()` | Manually shows the tooltip |
| `hide()` | Manually hides the tooltip |

## Events

| Event | When |
|---|---|
| `sgds-show` | Tooltip begins showing |
| `sgds-after-show` | Tooltip fully visible |
| `sgds-hide` | Tooltip begins hiding |
| `sgds-after-hide` | Tooltip fully hidden |

---

## Notes

- Wrap the trigger element directly inside `<sgds-tooltip>` — the tooltip targets its slotted child.
- Keep tooltip text short (under 80 characters). For longer explanations, use a popover or modal.
- Avoid putting interactive elements inside `content` — it's plain text only.
