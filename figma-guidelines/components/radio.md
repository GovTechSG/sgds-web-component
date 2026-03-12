# Radio

**Purpose**: Mutually exclusive selection — the user can pick exactly one option from a group. Always use `<sgds-radio-group>` to wrap multiple `<sgds-radio>` elements.

**Components**: `<sgds-radio-group>` + `<sgds-radio>`

---

## Usage

```html
<!-- Basic radio group -->
<sgds-radio-group label="Preferred contact method" name="contact">
  <sgds-radio value="email">Email</sgds-radio>
  <sgds-radio value="phone">Phone</sgds-radio>
  <sgds-radio value="post">Post</sgds-radio>
</sgds-radio-group>

<!-- Pre-selected option -->
<sgds-radio-group label="Frequency" name="frequency" value="weekly">
  <sgds-radio value="daily">Daily</sgds-radio>
  <sgds-radio value="weekly">Weekly</sgds-radio>
  <sgds-radio value="monthly">Monthly</sgds-radio>
</sgds-radio-group>

<!-- With hint text and validation -->
<sgds-radio-group
  label="Citizenship status"
  name="citizenship"
  hintText="Select the option that applies to you"
  required
  hasFeedback
  invalidFeedback="Please select your citizenship status">
  <sgds-radio value="citizen">Singapore Citizen</sgds-radio>
  <sgds-radio value="pr">Permanent Resident</sgds-radio>
  <sgds-radio value="foreigner">Non-Resident</sgds-radio>
</sgds-radio-group>

<!-- Disabled option -->
<sgds-radio-group label="Plan" name="plan">
  <sgds-radio value="basic">Basic (free)</sgds-radio>
  <sgds-radio value="pro">Professional</sgds-radio>
  <sgds-radio value="enterprise" disabled>Enterprise (contact sales)</sgds-radio>
</sgds-radio-group>

<!-- Disabled group -->
<sgds-radio-group label="Account type" name="account-type" disabled>
  <sgds-radio value="personal">Personal</sgds-radio>
  <sgds-radio value="business">Business</sgds-radio>
</sgds-radio-group>

<!-- Listen to change -->
<sgds-radio-group id="mode-group" label="Mode" name="mode">
  <sgds-radio value="view">View Only</sgds-radio>
  <sgds-radio value="edit">Edit Mode</sgds-radio>
</sgds-radio-group>
<script>
  document.getElementById("mode-group").addEventListener("sgds-change", (e) => {
    console.log("Selected mode:", e.target.value);
  });
</script>
```

---

## `<sgds-radio-group>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Group label |
| `hintText` | string | — | Helper text below label |
| `name` | string | — | Form field name (shared by all radios) |
| `value` | string | — | Pre-selected option value |
| `required` | boolean | `false` | Field is required |
| `hasFeedback` | boolean | `false` | Shows validation feedback |
| `disabled` | boolean | `false` | Disables all radio options |

## `<sgds-radio>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `value` | string | — | The value for this option |
| `disabled` | boolean | `false` | Disables this option only |

## Slots (`<sgds-radio>`)

| Slot | Content |
|---|---|
| *(default)* | Radio option label text |

## Events (`<sgds-radio-group>`)

| Event | Description |
|---|---|
| `sgds-change` | Fires when selection changes. `event.target.value` is the selected value. |
