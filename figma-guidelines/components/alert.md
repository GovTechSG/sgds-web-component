# Alert

**Purpose**: Show contextual feedback banners — info, success, warning, danger, neutral. Can be dismissible.

**Components**: `<sgds-alert>` + `<sgds-alert-link>` (for links inside alerts)

---

## Usage

```html
<!-- Basic info alert -->
<sgds-alert variant="info">
  <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
  This is an informational message.
</sgds-alert>

<!-- Dismissible alert with title -->
<sgds-alert variant="success" dismissible>
  <sgds-icon slot="icon" name="check-circle-fill" size="md"></sgds-icon>
  <strong slot="title">Success!</strong>
  Your form has been submitted.
</sgds-alert>

<!-- Alert with a link -->
<sgds-alert variant="warning" dismissible>
  <sgds-icon slot="icon" name="exclamation-triangle-fill" size="md"></sgds-icon>
  Your session will expire soon. <sgds-alert-link href="/renew">Renew now</sgds-alert-link>
</sgds-alert>

<!-- Outlined style -->
<sgds-alert variant="danger" outlined dismissible>
  <sgds-icon slot="icon" name="x-circle-fill" size="md"></sgds-icon>
  <strong slot="title">Error</strong>
  Failed to save your changes.
</sgds-alert>

<!-- Listen to dismiss event -->
<sgds-alert id="my-alert" variant="info" dismissible>
  <sgds-icon slot="icon" name="info-circle-fill" size="md"></sgds-icon>
  Click × to dismiss.
</sgds-alert>
<script>
  document.getElementById("my-alert").addEventListener("sgds-hide", () => {
    console.log("Alert dismissed");
  });
</script>
```

---

## `<sgds-alert>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `info \| success \| warning \| danger \| neutral` | `info` | Alert type |
| `dismissible` | boolean | `false` | Shows a close button |
| `outlined` | boolean | `false` | Uses outline (bordered) style instead of filled |
| `show` | boolean | `true` | Controls visibility |

## Slots (`<sgds-alert>`)

| Slot | Content |
|---|---|
| `icon` | Icon element (use `<sgds-icon>`) |
| `title` | Bold alert title |
| *(default)* | Alert message body |

## Events (`<sgds-alert>`)

| Event | Cancelable | When |
|---|---|---|
| `sgds-show` | No | Alert begins showing |
| `sgds-after-show` | No | Alert fully visible |
| `sgds-hide` | Yes | Alert begins hiding (dismiss clicked) |
| `sgds-after-hide` | No | Alert fully hidden |

## `<sgds-alert-link>` Props

| Attribute | Description |
|---|---|
| `href` | The link URL |

---

## Notes

- Cancel `sgds-hide` with `event.preventDefault()` to prevent dismissal.
- `sgds-alert-link` inherits the alert's color for correct contrast.
