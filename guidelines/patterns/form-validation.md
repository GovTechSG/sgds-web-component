# Form Validation

SGDS form components integrate with the browser's native form API — they participate in `<form>` submission, `FormData`, and constraint validation automatically.

**All form components must be inside a `<form>` element with a `name` attribute.**

---

## Quick Decision Guide

| Need | Solution |
|---|---|
| Show error messages when invalid | Add `hasFeedback` to each form component |
| Prevent submit when fields are invalid | Built-in — no extra code needed |
| Read submitted field values | Use `new FormData(event.target)` in submit handler |
| Custom error message text | Set `invalidFeedback` attribute |
| Disable validation per field | `noValidate` on `<sgds-input>` or `<sgds-textarea>` |
| Disable validation for whole form | `novalidate` on the `<form>` element |
| 3rd-party validation (e.g. Zod) | Disable built-in, then call `element.setInvalid(bool)` |

---

## How Validation Triggers

1. **On blur** — validates when the user leaves a field; shows feedback if `hasFeedback` is set
2. **On submit** — final pass before submission; blocks the form if any field is invalid
3. **On reset** — clears all validity states and field values automatically

Disabled components skip validation entirely and never block form submission.

---

## `hasFeedback` — Activating Error Display

Constraint validation runs regardless of `hasFeedback`, but the **visible error message only appears when `hasFeedback` is present**.

| Value | Behaviour |
|---|---|
| `hasFeedback` (boolean) | Shows the native validation message as error text |
| `hasFeedback="text"` | Same as boolean — text message only |
| `hasFeedback="style"` | Invalid border/colour styling only, no text |
| `hasFeedback="both"` | Both invalid styling and text message |

Always pair `hasFeedback` with `invalidFeedback` to show a human-readable error message:

```jsx
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

## Hint Text and Error Message Placement

On most form components (`<sgds-input>`, `<sgds-textarea>`, `<sgds-select>`, `<sgds-combo-box>`, `<sgds-quantity-toggle>`, `<sgds-file-upload>`):
- `hintText` and the error message share the same space below the input
- When invalid, the error message **replaces** `hintText`
- When the error clears, `hintText` reappears

On `<sgds-checkbox-group>` and `<sgds-radio-group>`:
- `hintText` appears in the label row above the options — always visible
- The error message appears separately below the options

---

## Constraint Validations by Component

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

## Complete Form Example

```jsx
<form id="application-form" className="sgds:flex sgds:flex-col sgds:gap-component-sm">

  <sgds-input
    label="Full Name"
    name="fullName"
    required
    hasFeedback="both"
    pattern="[A-Za-z ]+"
    invalidFeedback="Letters only please"
  ></sgds-input>

  <sgds-input
    type="email"
    label="Email Address"
    name="email"
    required
    hasFeedback="both"
    invalidFeedback="Please enter a valid email address"
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
    <sgds-radio value="prefer-not">Prefer not to say</sgds-radio>
  </sgds-radio-group>

  <sgds-checkbox-group
    label="Food Preference"
    name="food"
    required
    hasFeedback
    hintText="Select at least one"
  >
    <sgds-checkbox value="vegetarian">Vegetarian</sgds-checkbox>
    <sgds-checkbox value="halal">Halal</sgds-checkbox>
  </sgds-checkbox-group>

  <sgds-textarea
    label="Comments"
    name="comments"
    minlength="10"
    hasFeedback
  ></sgds-textarea>

  {/* Action pair */}
  <div className="sgds:flex sgds:gap-2 sgds:justify-end">
    <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    <sgds-button type="submit">Submit Application</sgds-button>
  </div>

</form>
```

---

## Reading Form Values (FormData)

```jsx
const form = document.getElementById("application-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const gender = formData.get("gender");
  const food = formData.getAll("food"); // multiple checkboxes

  // File uploads are NOT in FormData automatically
  const fileUpload = document.querySelector("sgds-file-upload");
  for (let i = 0; i < fileUpload.selectedFiles.length; i++) {
    formData.append("file" + i, fileUpload.selectedFiles[i]);
  }

  // Submit to server
});
```

---

## Custom Validation

For 3rd-party validation (Zod, Yup) or custom logic on `<sgds-input>` and `<sgds-textarea>`:

**Option 1 — Disable per field with `noValidate`:**

```jsx
<sgds-input
  noValidate
  id="key-input"
  name="key"
  label="API Key"
  hasFeedback="both"
  hintText="Cannot start with a special character"
></sgds-input>

<script>
  const input = document.getElementById("key-input");
  input.addEventListener("sgds-input", (e) => {
    if (/^[^a-zA-Z0-9]/.test(e.target.value)) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Key cannot start with a special character";
    } else {
      e.target.setInvalid(false);
    }
  });
</script>
```

**Option 2 — Disable at form level with `novalidate`:**

```jsx
<form id="custom-form" novalidate className="sgds:flex sgds:flex-col sgds:gap-component-sm">
  <sgds-input id="name-input" name="name" label="Name" hasFeedback="both"></sgds-input>
  <sgds-button type="submit">Submit</sgds-button>
</form>
```

**`setInvalid(bool)` method:**
- `setInvalid(true)` — marks the component invalid and shows `invalidFeedback`
- `setInvalid(false)` — clears the invalid state

Only `<sgds-input>` and `<sgds-textarea>` fully support `noValidate` + `setInvalid`. Other components have this as WIP.

---

## Custom Validation Support Status

| Component | `noValidate` + `setInvalid` |
|---|---|
| `<sgds-input>` | Supported |
| `<sgds-textarea>` | Supported |
| All other form components | Work in progress |
