# Overflow Menu

**Purpose**: A three-dot (ellipsis) icon button that reveals a contextual menu of actions. Use in tables, cards, and list items where full button labels would take too much space.

**Components**: `<sgds-overflow-menu>` + `<sgds-dropdown-item>`

---

## Usage

```html
<!-- Basic overflow menu -->
<sgds-overflow-menu>
  <sgds-dropdown-item value="view">View Details</sgds-dropdown-item>
  <sgds-dropdown-item value="edit">Edit</sgds-dropdown-item>
  <sgds-dropdown-item value="delete">Delete</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- With icons on items -->
<sgds-overflow-menu>
  <sgds-dropdown-item value="view">
    <sgds-icon slot="icon" name="eye-fill" size="sm"></sgds-icon>
    View
  </sgds-dropdown-item>
  <sgds-dropdown-item value="edit">
    <sgds-icon slot="icon" name="pencil-fill" size="sm"></sgds-icon>
    Edit
  </sgds-dropdown-item>
  <sgds-dropdown-item value="delete">
    <sgds-icon slot="icon" name="trash-fill" size="sm"></sgds-icon>
    Delete
  </sgds-dropdown-item>
</sgds-overflow-menu>

<!-- Disabled item -->
<sgds-overflow-menu>
  <sgds-dropdown-item value="download">Download</sgds-dropdown-item>
  <sgds-dropdown-item value="share" disabled>Share (coming soon)</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- Drop direction -->
<sgds-overflow-menu drop="up">
  <sgds-dropdown-item value="action1">Action 1</sgds-dropdown-item>
  <sgds-dropdown-item value="action2">Action 2</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- Listen to selection -->
<sgds-overflow-menu id="row-menu">
  <sgds-dropdown-item value="edit">Edit</sgds-dropdown-item>
  <sgds-dropdown-item value="delete">Delete</sgds-dropdown-item>
</sgds-overflow-menu>
<script>
  document.getElementById("row-menu").addEventListener("sgds-select", (e) => {
    console.log("Action:", e.detail.value); // "edit" or "delete"
  });
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `drop` | `down \| up \| start \| end` | `down` | Direction the menu opens |
| `close` | `auto \| inside \| outside \| manual` | `auto` | When the menu closes |

## Slots

| Slot | Content |
|---|---|
| *(default)* | `<sgds-dropdown-item>` elements |

## Events

| Event | Description |
|---|---|
| `sgds-select` | Fires with `event.detail.value` when an item is selected |
