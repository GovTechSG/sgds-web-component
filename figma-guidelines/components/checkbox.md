# Checkbox

**Purpose**: Single checkbox inputs and grouped checkbox sets with form integration, validation, and indeterminate state support.

**Components**: `<sgds-checkbox-group>` (field group with label) + `<sgds-checkbox>` (individual checkbox)

---

## Usage

```html
<!-- Single standalone checkbox -->
<sgds-checkbox name="terms" value="agreed">
  I accept the terms and conditions
</sgds-checkbox>

<!-- Pre-checked -->
<sgds-checkbox name="newsletter" value="yes" checked>
  Subscribe to newsletter
</sgds-checkbox>

<!-- Indeterminate state (programmable only) -->
<sgds-checkbox id="selectAll" name="all" value="all">Select all</sgds-checkbox>
<script>
  document.getElementById("selectAll").indeterminate = true;
</script>

<!-- Grouped checkboxes with validation -->
<sgds-checkbox-group
  label="Select preferences"
  hintText="Choose at least one"
  required
  hasFeedback
  invalidFeedback="Please select at least one preference">
  <sgds-checkbox name="prefs" value="email">Email notifications</sgds-checkbox>
  <sgds-checkbox name="prefs" value="sms">SMS notifications</sgds-checkbox>
  <sgds-checkbox name="prefs" value="push" disabled>
    Push notifications (unavailable)
  </sgds-checkbox>
</sgds-checkbox-group>

<!-- Pre-selected group values (comma-separated on the group) -->
<sgds-checkbox-group
  label="Interests"
  name="interests"
  value="sports,music">
  <sgds-checkbox value="sports">Sports</sgds-checkbox>
  <sgds-checkbox value="music">Music</sgds-checkbox>
  <sgds-checkbox value="travel">Travel</sgds-checkbox>
</sgds-checkbox-group>

<!-- Listen to events -->
<sgds-checkbox id="chk" name="option" value="yes">Option</sgds-checkbox>
<script>
  const chk = document.getElementById("chk");
  chk.addEventListener("sgds-change", e => console.log("checked:", e.target.checked));
  chk.addEventListener("sgds-check", () => console.log("checked!"));
  chk.addEventListener("sgds-uncheck", () => console.log("unchecked!"));
</script>
```

---

## `<sgds-checkbox-group>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Group label text |
| `hintText` | string | — | Helper text below label |
| `required` | boolean | `false` | Field is required |
| `hasFeedback` | boolean | `false` | Shows validation feedback message |
| `name` | string | — | Shared name for all checkboxes |
| `value` | string | — | Comma-separated pre-selected values |
| `disabled` | boolean | `false` | Disables all checkboxes in group |

## `<sgds-checkbox>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `name` | string | — | Input name |
| `value` | string | — | Input value |
| `checked` | boolean | `false` | Checked state |
| `indeterminate` | boolean | `false` | Indeterminate state (programmatic) |
| `disabled` | boolean | `false` | Disables the checkbox |
| `required` | boolean | `false` | Field is required |

## Slots (`<sgds-checkbox>`)

| Slot | Content |
|---|---|
| *(default)* | Checkbox label text |

## Events (`<sgds-checkbox>`)

| Event | Description |
|---|---|
| `sgds-change` | Fires when checked state changes |
| `sgds-check` | Fires when checkbox becomes checked |
| `sgds-uncheck` | Fires when checkbox becomes unchecked |

---

## Notes

- Set `hasFeedback` on `<sgds-checkbox-group>` not on individual checkboxes.
- To programmatically set indeterminate, use the JS property: `element.indeterminate = true`.
- `value` on `<sgds-checkbox-group>` is a comma-separated string that pre-selects matching checkboxes.
