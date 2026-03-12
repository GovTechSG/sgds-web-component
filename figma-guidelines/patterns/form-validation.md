# SGDS Form Validation Pattern

SGDS form components integrate with the browser's **ElementInternals API** — they participate in `<form>` submission, `FormData`, and constraint validation like native HTML controls.

## Prerequisites

All form components:
1. Must be inside a `<form>` element
2. Must have a `name` attribute to participate in form submission

---

## Quick Decision Guide

| Need | Solution |
|---|---|
| Show validation error messages | Add `hasFeedback` to each form component |
| Block submit when fields are invalid | Built-in — no extra code needed |
| Read submitted values | `new FormData(event.target)` in submit handler |
| Disable SGDS validation per component | `noValidate` on `<sgds-input>` or `<sgds-textarea>` |
| Disable SGDS validation for whole form | `novalidate` on the `<form>` element |
| Custom validation (e.g. Zod) | Disable first, then call `setInvalid(bool)` + set `invalidFeedback` |

---

## `hasFeedback` Values

| Value | Behavior |
|---|---|
| `hasFeedback` or `hasFeedback="text"` | Shows error message text only |
| `hasFeedback="style"` | Shows invalid border/color styling only |
| `hasFeedback="both"` | Shows both styling and error text |

Override the browser's native message with `invalidFeedback`:

```html
<sgds-input
  name="email"
  label="Email"
  type="email"
  required
  hasFeedback="both"
  invalidFeedback="Please enter a valid email address"
></sgds-input>
```

---

## Supported Constraints by Component

| Component | Supported constraints |
|---|---|
| `<sgds-input>` | `required`, `pattern`, `min`, `max`, `minlength`, `maxlength` |
| `<sgds-textarea>` | `required`, `minlength`, `maxlength` |
| `<sgds-quantity-toggle>` | `min`, `max` |
| `<sgds-datepicker>` | `required`, `minDate`, `maxDate` |
| `<sgds-select>` | `required` |
| `<sgds-combo-box>` | `required` |
| `<sgds-radio-group>` | `required` |
| `<sgds-checkbox-group>` | `required` |
| `<sgds-checkbox>` (standalone) | `required` |
| `<sgds-file-upload>` | `required` |

---

## Full Form Example

```html
<form id="my-form">
  <sgds-input
    label="First Name"
    name="firstName"
    required
    hasFeedback="both"
    pattern="[A-Za-z ]+"
    invalidFeedback="Letters only"
  ></sgds-input>

  <sgds-datepicker
    label="Appointment Date"
    name="appointmentDate"
    required
    hasFeedback
  ></sgds-datepicker>

  <sgds-radio-group label="Gender" name="gender" required hasFeedback>
    <sgds-radio value="female">Female</sgds-radio>
    <sgds-radio value="male">Male</sgds-radio>
  </sgds-radio-group>

  <sgds-checkbox-group
    label="Food Preference"
    name="food"
    required
    hasFeedback
    hintText="Select at least one option"
  >
    <sgds-checkbox value="vegetarian">Vegetarian</sgds-checkbox>
    <sgds-checkbox value="halal">Halal</sgds-checkbox>
  </sgds-checkbox-group>

  <sgds-textarea
    label="Comments"
    name="comments"
    required
    minlength="3"
    hasFeedback
  ></sgds-textarea>

  <sgds-button type="submit">Submit</sgds-button>
  <sgds-button type="reset" variant="ghost">Reset</sgds-button>
</form>
```

---

## Reading Form Values via FormData

```js
form.addEventListener("submit", event => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const firstName = formData.get("firstName");
  const gender = formData.get("gender");

  // File uploads are not in FormData automatically
  const fileUpload = document.querySelector("sgds-file-upload");
  for (let i = 0; i < fileUpload.selectedFiles.length; i++) {
    formData.append("file" + i, fileUpload.selectedFiles[i]);
  }
});
```

---

## Custom Validation

### Per component — `noValidate` on `<sgds-input>` or `<sgds-textarea>`

```html
<sgds-input
  noValidate
  id="keys-input"
  name="keys"
  label="Keys"
  hasFeedback="both"
></sgds-input>

<script>
  const input = document.getElementById("keys-input");
  input.addEventListener("sgds-input", e => {
    if (/^[^a-zA-Z0-9]/.test(e.target.value)) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Keys cannot start with special characters";
    } else {
      e.target.setInvalid(false);
    }
  });
</script>
```

### Whole form — `novalidate` on `<form>`

Adding `novalidate` disables constraint validation for all child components. Apply `setInvalid` logic per field.

### `setInvalid(bool)` Method

| Parameter | Behavior |
|---|---|
| `true` | Marks invalid, shows `invalidFeedback` |
| `false` | Clears invalid state |

Currently fully supported on `<sgds-input>` and `<sgds-textarea>` only. Other components are WIP.

---

## Key Rules

1. `hasFeedback` must be present for error messages to visually appear.
2. The reset button (`type="reset"`) automatically clears all validity states — no extra reset logic needed.
3. Disabled components are excluded from constraint validation and never block submission.
4. Do NOT add extra submit event listeners to replicate built-in blocking behavior.
