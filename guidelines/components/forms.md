# Form Components

All SGDS form components integrate with the browser's native form API — place them inside a `<form>` element with a `name` attribute. For validation, see [patterns/form-validation.md](../patterns/form-validation.md).

**Never set explicit widths directly on form components.** Control width via the parent layout wrapper.

---

## `<sgds-input>` — Single-Line Text Input

Use for freeform single-line text — names, emails, search queries, IDs.

**When NOT to use:**
- Multi-line input → use `<sgds-textarea>`
- Predefined options → use `<sgds-select>`, `<sgds-radio>`, or `<sgds-checkbox>`

```jsx
{/* Basic text input */}
<sgds-input
  type="text"
  label="Full Name"
  name="fullName"
  hintText="Enter your name as per NRIC"
  required
></sgds-input>

{/* Email with validation feedback */}
<sgds-input
  type="email"
  label="Email Address"
  name="email"
  required
  hasFeedback="both"
  invalidFeedback="Please enter a valid email address"
></sgds-input>

{/* Number with range */}
<sgds-input
  type="number"
  label="Age"
  name="age"
  min="0"
  max="120"
></sgds-input>

{/* With currency prefix */}
<sgds-input
  type="text"
  label="Amount"
  name="amount"
  prefix="$"
  suffix=".00"
></sgds-input>

{/* With icon action button */}
<sgds-input type="search" label="Search" name="search">
  <sgds-icon-button slot="action" variant="ghost" name="search"></sgds-icon-button>
</sgds-input>
```

**Key attributes:**

| Attribute | Purpose |
|---|---|
| `type` | `text \| email \| number \| tel \| password \| search \| url \| date` |
| `label` | Field label |
| `name` | Form field name |
| `hintText` | Helper text below the field |
| `required` | Makes field required |
| `hasFeedback` | `"style"` (border only) / `"text"` (message only) / `"both"` |
| `invalidFeedback` | Custom error message |
| `prefix` / `suffix` | Text addons inside the input border |
| `loading` | Shows a loading spinner inside the field |
| `disabled` | Non-interactive, excluded from form submission |
| `readonly` | Visible but not editable, included in form submission |

---

## `<sgds-textarea>` — Multi-Line Text Input

Use for longer freeform text — comments, descriptions, addresses.

```jsx
<sgds-textarea
  label="Comments"
  name="comments"
  rows="4"
  required
  minlength="10"
  hasFeedback="both"
  hintText="Minimum 10 characters"
></sgds-textarea>
```

---

## `<sgds-select>` — Single-Selection Dropdown

Use for predefined options where the user picks one. Includes built-in search filtering.

```jsx
<sgds-select label="Country" name="country" required hasFeedback>
  <sgds-select-option value="sg">Singapore</sgds-select-option>
  <sgds-select-option value="my">Malaysia</sgds-select-option>
  <sgds-select-option value="au">Australia</sgds-select-option>
</sgds-select>
```

For multi-select, use `<sgds-combo-box multiSelect>` instead.

---

## `<sgds-combo-box>` — Searchable Single or Multi-Select

Use when users need to search through a long list of options, or when multi-selection is required.

```jsx
{/* Single searchable */}
<sgds-combo-box label="Department" name="department">
  <sgds-select-option value="eng">Engineering</sgds-select-option>
  <sgds-select-option value="ops">Operations</sgds-select-option>
</sgds-combo-box>

{/* Multi-select */}
<sgds-combo-box label="Skills" name="skills" multiSelect>
  <sgds-select-option value="react">React</sgds-select-option>
  <sgds-select-option value="ts">TypeScript</sgds-select-option>
</sgds-combo-box>
```

---

## `<sgds-checkbox>` and `<sgds-checkbox-group>` — Checkboxes

Use `<sgds-checkbox-group>` when multiple related checkboxes share a label and validation.

```jsx
{/* Grouped checkboxes */}
<sgds-checkbox-group
  label="Food Preference"
  name="food"
  required
  hasFeedback
  hintText="Select at least one"
>
  <sgds-checkbox value="vegetarian">Vegetarian</sgds-checkbox>
  <sgds-checkbox value="halal">Halal</sgds-checkbox>
  <sgds-checkbox value="vegan">Vegan</sgds-checkbox>
</sgds-checkbox-group>

{/* Standalone checkbox (e.g. terms agreement) */}
<sgds-checkbox name="terms" value="agreed" required hasFeedback="both">
  I agree to the terms and conditions
</sgds-checkbox>
```

Note: In `<sgds-checkbox-group>`, `hintText` appears in the label row above the options and stays visible at all times. Error messages appear below the options.

---

## `<sgds-radio-group>` — Radio Buttons

Use when the user must pick exactly one option from a small, fixed set.

```jsx
<sgds-radio-group label="Gender" name="gender" required hasFeedback>
  <sgds-radio value="female">Female</sgds-radio>
  <sgds-radio value="male">Male</sgds-radio>
  <sgds-radio value="prefer-not">Prefer not to say</sgds-radio>
</sgds-radio-group>
```

---

## `<sgds-datepicker>` — Date Picker

Use for date selection. Supports min/max date constraints.

```jsx
<sgds-datepicker
  label="Appointment Date"
  name="appointmentDate"
  required
  hasFeedback
  minDate="2024-01-01"
  maxDate="2025-12-31"
></sgds-datepicker>
```

---

## `<sgds-file-upload>` — File Upload

Use for file selection. Files are not automatically included in `FormData` — read them from the component's `selectedFiles` property.

```jsx
<sgds-file-upload
  label="Supporting Documents"
  name="documents"
  accept=".pdf,.doc,.docx"
  multiple
></sgds-file-upload>
```

In the submit handler:
```jsx
const fileUpload = document.querySelector("sgds-file-upload");
for (let i = 0; i < fileUpload.selectedFiles.length; i++) {
  formData.append("file" + i, fileUpload.selectedFiles[i]);
}
```

---

## `<sgds-quantity-toggle>` — Number Stepper

Use for adjusting numeric quantities with plus/minus controls.

```jsx
<sgds-quantity-toggle
  label="Quantity"
  name="quantity"
  value="1"
  min="1"
  max="99"
></sgds-quantity-toggle>
```

---

## `<sgds-switch>` — Toggle Switch

Use for binary on/off settings. Not a form submit control — use for real-time preference changes.

```jsx
<sgds-switch name="notifications" checked>
  Email Notifications
</sgds-switch>
```

---

## `<sgds-stepper>` — Multi-Step Form Navigation

Use to break a long form into sequential named steps.

```jsx
<sgds-stepper steps={[
  { stepHeader: "Personal Details", component: <Step1 /> },
  { stepHeader: "Contact Info", component: <Step2 /> },
  { stepHeader: "Review", component: <Step3 /> },
]}></sgds-stepper>
```
