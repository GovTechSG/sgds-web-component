# Badge

**Purpose**: Render labels, status indicators, tags, and notification chips. Can be dismissible and include icons.

**Component**: `<sgds-badge>`

---

## Usage

```html
<!-- Basic badges by variant -->
<sgds-badge variant="primary">Primary</sgds-badge>
<sgds-badge variant="success">Success</sgds-badge>
<sgds-badge variant="danger">Danger</sgds-badge>
<sgds-badge variant="warning">Warning</sgds-badge>
<sgds-badge variant="accent">Info</sgds-badge>
<sgds-badge variant="neutral">Neutral</sgds-badge>

<!-- Outlined style -->
<sgds-badge variant="primary" outlined>Outlined</sgds-badge>

<!-- Dismissible badge -->
<sgds-badge variant="success" dismissible>Removable Tag</sgds-badge>

<!-- Badge with left icon -->
<sgds-badge variant="primary">
  <sgds-icon slot="leftIcon" name="check-circle-fill" size="sm"></sgds-icon>
  Verified
</sgds-badge>

<!-- Badge with right icon -->
<sgds-badge variant="accent">
  New Feature
  <sgds-icon slot="rightIcon" name="arrow-right" size="sm"></sgds-icon>
</sgds-badge>

<!-- Long text auto-truncated — set maxWidth or use CSS -->
<sgds-badge variant="neutral" style="max-width: 120px;">
  Very long badge text that truncates
</sgds-badge>

<!-- Listen to dismiss -->
<sgds-badge id="tag1" variant="primary" dismissible>JavaScript</sgds-badge>
<script>
  document.getElementById("tag1").addEventListener("sgds-hide", () => {
    console.log("Badge removed");
  });
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary \| accent \| success \| danger \| warning \| cyan \| purple \| neutral \| white` | `primary` | Color scheme |
| `dismissible` | boolean | `false` | Shows a close button |
| `outlined` | boolean | `false` | Outline (border-only) style |

## Slots

| Slot | Content |
|---|---|
| *(default)* | Badge label text |
| `leftIcon` | Icon displayed before the label |
| `rightIcon` | Icon displayed after the label |

## Events

| Event | When |
|---|---|
| `sgds-hide` | Close button is clicked |
