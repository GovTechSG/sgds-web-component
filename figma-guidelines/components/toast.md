# Toast

**Purpose**: Non-blocking notification pop-ups for feedback on user actions (save, error, warning). Appear briefly and auto-hide. Use `<sgds-toast-container>` to position toasts.

**Components**: `<sgds-toast>` + `<sgds-toast-container>`

---

## Usage

```html
<!-- Toast container (use only one per page, positions all toasts) -->
<sgds-toast-container position="top-end">

  <!-- Basic toast (auto-hides after 3 seconds) -->
  <sgds-toast id="success-toast" variant="success" autohide delay="3000">
    <sgds-icon slot="icon" name="check-circle-fill" size="md"></sgds-icon>
    Changes saved successfully.
  </sgds-toast>

  <!-- With title -->
  <sgds-toast id="info-toast" variant="info" autohide>
    <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
    <strong slot="title">New Update</strong>
    A new version is available.
  </sgds-toast>

  <!-- Persistent (no auto-hide) -->
  <sgds-toast id="error-toast" variant="danger">
    <sgds-icon slot="icon" name="x-circle-fill" size="md"></sgds-icon>
    <strong slot="title">Error</strong>
    Failed to submit form. Please try again.
  </sgds-toast>

</sgds-toast-container>

<!-- Show toasts via JavaScript -->
<sgds-button id="show-save" variant="primary">Save</sgds-button>
<script>
  document.getElementById("show-save").addEventListener("click", () => {
    document.getElementById("success-toast").show();
  });
</script>
```

---

## `<sgds-toast-container>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `position` | `top-start \| top-center \| top-end \| middle-start \| middle-center \| middle-end \| bottom-start \| bottom-center \| bottom-end` | `top-end` | Where toasts appear on screen |

## `<sgds-toast>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `info \| success \| warning \| danger \| neutral` | `info` | Toast type/color |
| `autohide` | boolean | `false` | Auto-dismisses after `delay` milliseconds |
| `delay` | number | `3000` | Auto-hide delay in ms (when `autohide` is `true`) |
| `show` | boolean | `false` | Controls visibility |

## Slots (`<sgds-toast>`)

| Slot | Content |
|---|---|
| `icon` | Icon element |
| `title` | Toast heading |
| *(default)* | Toast message body |

## Methods (`<sgds-toast>`)

| Method | Description |
|---|---|
| `show()` | Displays the toast |
| `hide()` | Hides the toast |

## Events (`<sgds-toast>`)

| Event | When |
|---|---|
| `sgds-show` | Toast begins showing |
| `sgds-after-show` | Toast fully visible |
| `sgds-hide` | Toast begins hiding |
| `sgds-after-hide` | Toast fully hidden |

---

## Notes

- Always place toasts inside a single `<sgds-toast-container>` — the container handles stacking and positioning.
- Set `autohide` and `delay` for transient feedback (saves, confirmations).
- Omit `autohide` for errors that require user acknowledgment.
