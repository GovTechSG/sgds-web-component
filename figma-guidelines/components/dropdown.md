# Dropdown

**Purpose**: A toggleable menu that reveals a list of options or actions. Supports directional drop variants and custom trigger content.

**Components**: `<sgds-dropdown>` + `<sgds-dropdown-item>`

---

## Usage

```html
<!-- Basic dropdown -->
<sgds-dropdown>
  <sgds-button slot="toggle" variant="primary">
    Actions <sgds-icon name="chevron-down" size="sm"></sgds-icon>
  </sgds-button>
  <sgds-dropdown-item value="edit">Edit</sgds-dropdown-item>
  <sgds-dropdown-item value="duplicate">Duplicate</sgds-dropdown-item>
  <sgds-dropdown-item value="delete">Delete</sgds-dropdown-item>
</sgds-dropdown>

<!-- Drop direction variants -->
<sgds-dropdown drop="up">
  <sgds-button slot="toggle" variant="outline">Drop Up</sgds-button>
  <sgds-dropdown-item value="a">Option A</sgds-dropdown-item>
  <sgds-dropdown-item value="b">Option B</sgds-dropdown-item>
</sgds-dropdown>

<sgds-dropdown drop="end">
  <sgds-button slot="toggle" variant="outline">Drop Right</sgds-button>
  <sgds-dropdown-item value="a">Option A</sgds-dropdown-item>
</sgds-dropdown>

<!-- Items with icons -->
<sgds-dropdown>
  <sgds-button slot="toggle" variant="ghost">Menu</sgds-button>
  <sgds-dropdown-item value="profile">
    <sgds-icon slot="icon" name="person-fill" size="sm"></sgds-icon> Profile
  </sgds-dropdown-item>
  <sgds-dropdown-item value="settings">
    <sgds-icon slot="icon" name="gear-fill" size="sm"></sgds-icon> Settings
  </sgds-dropdown-item>
  <sgds-dropdown-item value="logout">
    <sgds-icon slot="icon" name="box-arrow-right" size="sm"></sgds-icon> Log out
  </sgds-dropdown-item>
</sgds-dropdown>

<!-- Disabled items -->
<sgds-dropdown>
  <sgds-button slot="toggle" variant="primary">Options</sgds-button>
  <sgds-dropdown-item value="available">Available</sgds-dropdown-item>
  <sgds-dropdown-item value="unavailable" disabled>Unavailable</sgds-dropdown-item>
</sgds-dropdown>

<!-- Listen to selection -->
<sgds-dropdown id="my-dropdown">
  <sgds-button slot="toggle" variant="outline">Select Action</sgds-button>
  <sgds-dropdown-item value="save">Save</sgds-dropdown-item>
  <sgds-dropdown-item value="cancel">Cancel</sgds-dropdown-item>
</sgds-dropdown>
<script>
  document.getElementById("my-dropdown").addEventListener("sgds-select", (e) => {
    console.log("selected:", e.detail.value);
  });
</script>
```

---

## `<sgds-dropdown>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `drop` | `down \| up \| start \| end` | `down` | Direction the menu opens |
| `close` | `auto \| inside \| outside \| manual` | `auto` | When the dropdown closes |
| `open` | boolean | `false` | Controls open state |

## Slots (`<sgds-dropdown>`)

| Slot | Content |
|---|---|
| `toggle` | The trigger element (button, link, etc.) |
| *(default)* | `<sgds-dropdown-item>` elements |

## `<sgds-dropdown-item>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `value` | string | — | Value emitted on selection |
| `disabled` | boolean | `false` | Disables the item |
| `href` | string | — | Renders item as a link |

## Events (`<sgds-dropdown>`)

| Event | Description |
|---|---|
| `sgds-select` | Fires with `event.detail.value` when an item is selected |
| `sgds-show` | Dropdown begins opening |
| `sgds-hide` | Dropdown begins closing |
