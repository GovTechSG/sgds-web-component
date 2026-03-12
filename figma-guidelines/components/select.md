# Select

**Purpose**: A searchable single-select dropdown. Renders a combobox-style input that filters options as the user types. For native `<select>` behaviour, prefer this over HTML `<select>`.

**Components**: `<sgds-select>` + `<sgds-select-option>`

---

## Usage

```html
<!-- Basic select -->
<sgds-select label="Salutation" name="salutation">
  <sgds-select-option value="mr">Mr</sgds-select-option>
  <sgds-select-option value="mrs">Mrs</sgds-select-option>
  <sgds-select-option value="ms">Ms</sgds-select-option>
  <sgds-select-option value="dr">Dr</sgds-select-option>
</sgds-select>

<!-- With placeholder -->
<sgds-select label="Country" name="country" placeholder="Select a country">
  <sgds-select-option value="sg">Singapore</sgds-select-option>
  <sgds-select-option value="my">Malaysia</sgds-select-option>
  <sgds-select-option value="au">Australia</sgds-select-option>
</sgds-select>

<!-- Pre-selected value -->
<sgds-select label="Language" name="language" value="en">
  <sgds-select-option value="en">English</sgds-select-option>
  <sgds-select-option value="zh">Chinese</sgds-select-option>
  <sgds-select-option value="ms">Malay</sgds-select-option>
  <sgds-select-option value="ta">Tamil</sgds-select-option>
</sgds-select>

<!-- With hint text and required validation -->
<sgds-select
  label="Department"
  name="department"
  hintText="Select the department you belong to"
  required
  hasFeedback
  invalidFeedback="Please select a department">
  <sgds-select-option value="engineering">Engineering</sgds-select-option>
  <sgds-select-option value="design">Design</sgds-select-option>
  <sgds-select-option value="product">Product</sgds-select-option>
</sgds-select>

<!-- Disabled option -->
<sgds-select label="Status" name="status">
  <sgds-select-option value="active">Active</sgds-select-option>
  <sgds-select-option value="inactive">Inactive</sgds-select-option>
  <sgds-select-option value="archived" disabled>Archived</sgds-select-option>
</sgds-select>

<!-- Listen to selection -->
<sgds-select id="role-select" label="Role" name="role">
  <sgds-select-option value="admin">Administrator</sgds-select-option>
  <sgds-select-option value="editor">Content Editor</sgds-select-option>
  <sgds-select-option value="viewer">Viewer</sgds-select-option>
</sgds-select>
<script>
  document.getElementById("role-select").addEventListener("sgds-select", (e) => {
    console.log("Selected role:", e.target.value);
  });
</script>
```

---

## `<sgds-select>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Field label |
| `hintText` | string | — | Helper text below label |
| `name` | string | — | Form field name |
| `value` | string | — | Pre-selected option value |
| `placeholder` | string | — | Placeholder text when nothing is selected |
| `required` | boolean | `false` | Field is required |
| `disabled` | boolean | `false` | Disables the select |
| `hasFeedback` | boolean | `false` | Shows validation feedback |

## `<sgds-select-option>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `value` | string | — | Option value |
| `disabled` | boolean | `false` | Disables the option |

## Events (`<sgds-select>`)

| Event | Description |
|---|---|
| `sgds-select` | Fires when an option is chosen. Read `event.target.value`. |
| `sgds-input` | Fires as user types (searchable input) |

---

## Notes

- Use `<sgds-select>` when you need a single selection with search.
- For multi-select with search, use `<sgds-combo-box>` with `multiSelect` instead.
