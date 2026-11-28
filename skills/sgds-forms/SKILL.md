---
name: "sgds-forms"
description: "Use when users ask about form validation in SGDS, hasFeedback prop, constraint validation, custom validation, noValidate, setInvalid, form submission, or reading FormData from SGDS form components."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: pattern
---

# SGDS Form Validation Pattern

SGDS form components integrate with the browser's [ElementInternals API](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals) so they behave like native HTML form controls — they participate in `<form>` submission, `FormData`, and constraint validation automatically.

## Prerequisites

See **[sgds-components](../sgds-components/SKILL.md)** for installation and framework integration.

All form components must be placed inside a `<form>` element and given a `name` attribute to participate in form submission.

## Form Sizes

All form components support a `size` prop to control their visual density. The default is `"lg"`. Use `size="md"` for a more compact form layout. The `size` prop is available on: `<sgds-input>`, `<sgds-textarea>`, `<sgds-select>`, `<sgds-combo-box>`, `<sgds-datepicker>`, `<sgds-quantity-toggle>`, `<sgds-radio-group>`, `<sgds-checkbox-group>`, `<sgds-checkbox>` (standalone), and `<sgds-file-upload>`.

When using slotted icons (leading/trailing icons, action buttons) inside `<sgds-input>`, scale them one size down to match: use `size="sm"` icons and icon-buttons when the input is `size="md"`, and `size="md"` when the input is `size="lg"` (default).

## Quick Decision Guide

**Show native HTML validation messages?** → Add `hasFeedback` to each form component

**Prevent submit when fields are invalid?** → Built-in — no extra code needed

**Read submitted field values?** → Use `new FormData(event.target)` in the submit handler

**Disable SGDS validation per component?** → `noValidate` prop on `<sgds-input>`, `<sgds-textarea>`, `<sgds-combo-box>`, `<sgds-select>`, `<sgds-datepicker>`, `<sgds-quantity-toggle>`, or `<sgds-file-upload>`

**Disable SGDS validation for the whole form?** → `novalidate` on the `<form>` element

**Run 3rd-party validation (e.g. Zod)?** → Disable SGDS validation first, then call `setInvalid(bool)` and set `invalidFeedback` programmatically

## How Validation Is Triggered

SGDS validation is layered:

1. **onChange (after blur)** — validates when the user leaves a field; shows feedback if `hasFeedback` is set
2. **onSubmit** — final validation pass fires before submission; blocks the form if any field is invalid
3. **onReset** — clears all validity states and field values when the form is reset

Disabled components skip validation entirely.

## `hintText` and Error Message Placement

On most form components (`<sgds-input>`, `<sgds-textarea>`, `<sgds-select>`, `<sgds-combo-box>`, `<sgds-quantity-toggle>`, `<sgds-file-upload>`), `hintText` and the error message **share the same space** below the input container:

- When the field is **invalid** (and `hasFeedback` is set), the error message replaces `hintText`.
- When the error is **resolved**, `hintText` reappears.

`<sgds-checkbox-group>` and `<sgds-radio-group>` behave differently — `hintText` is rendered in the label row above the options and remains visible at all times. The error message appears separately below the options.

## Activating Feedback Display

Constraint validation runs regardless of `hasFeedback`, but the **visible error message only renders when `hasFeedback` is present**.

**Important:** The `hasFeedback` prop type differs by component:

**String union (`"style" | "text" | "both"`)** — `<sgds-input>`, `<sgds-checkbox>` (standalone), `<sgds-quantity-toggle>`:

| Value                | Behaviour                                         |
| -------------------- | ------------------------------------------------- |
| `hasFeedback="text"` | Shows text feedback only                          |
| `hasFeedback="style"`| Shows invalid border/colour styling only, no text |
| `hasFeedback="both"` | Shows both invalid styling and text feedback      |

**Boolean** — `<sgds-textarea>`, `<sgds-select>`, `<sgds-combo-box>`, `<sgds-datepicker>`, `<sgds-radio-group>`, `<sgds-checkbox-group>`, `<sgds-file-upload>`:

| Value        | Behaviour                                              |
| ------------ | ------------------------------------------------------ |
| `hasFeedback`| Shows the native HTML validation message as error text |

You can also override the displayed message with `invalidFeedback`:

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

## Constraint Validations by Component

| Component                      | Supported constraints                                         |
| ------------------------------ | ------------------------------------------------------------- |
| `<sgds-input>`                 | `required`, `pattern`, `min`, `max`, `minlength`, `maxlength` |
| `<sgds-textarea>`              | `required`, `minlength`, `maxlength`                          |
| `<sgds-quantity-toggle>`       | `min`, `max`                                                  |
| `<sgds-datepicker>`            | `required`, `minDate`, `maxDate`                              |
| `<sgds-select>`                | `required`                                                    |
| `<sgds-combo-box>`             | `required`                                                    |
| `<sgds-radio-group>`           | `required`                                                    |
| `<sgds-checkbox-group>`        | `required`                                                    |
| `<sgds-checkbox>` (standalone) | `required`                                                    |
| `<sgds-file-upload>`           | `required` (file size limit WIP)                              |

## → Read [references/form-example.md](references/form-example.md)
Full working form with multiple SGDS components, plus how to read values via `FormData`.

## → Read [references/custom-validation.md](references/custom-validation.md)
Disabling SGDS validation for 3rd-party libraries (Zod, etc.): `noValidate` per component, `novalidate` on form, `setInvalid(bool)` API, and support status table.

---

## For AI agents

1. Always place SGDS form components inside a `<form>` element with `name` attributes for them to participate in form submission and `FormData`.
2. `hasFeedback` must be present on a form component for the error message to visually appear — constraint validation alone does not show UI feedback.
3. `hasFeedback` type varies by component: `<sgds-input>`, `<sgds-checkbox>` (standalone), and `<sgds-quantity-toggle>` accept `"style" | "text" | "both"`. All other form components accept a boolean. Do not pass `hasFeedback="both"` to components that only accept boolean.
4. Use `invalidFeedback` to override the browser's native constraint validation message with a custom string.
5. Constraint validation and form submission blocking are built-in — do not add extra submit event listeners to replicate this behaviour.
6. Use `new FormData(event.target)` in the submit handler to read values. For file uploads, read `selectedFiles` directly from the `<sgds-file-upload>` element.
7. When using custom/3rd-party validation, add `noValidate` on the component (or `novalidate` on the form), then call `element.setInvalid(true/false)` and set `element.invalidFeedback` inside the relevant event listener (`sgds-input` for inputs/textareas, `sgds-change-date` for datepicker, `sgds-change` for select/combo-box/radio-group/checkbox-group/quantity-toggle, `sgds-add-files`/`sgds-remove-file` for file-upload).
8. All form components (`<sgds-input>`, `<sgds-textarea>`, `<sgds-datepicker>`, `<sgds-combo-box>`, `<sgds-select>`, `<sgds-quantity-toggle>`, `<sgds-radio-group>`, `<sgds-checkbox>`, `<sgds-checkbox-group>`, and `<sgds-file-upload>`) fully support custom validation via `noValidate` + `setInvalid`.
9. The reset button (`type="reset"`) automatically clears all validity states and values — no extra reset logic is needed.
10. Disabled components are excluded from constraint validation and will never block form submission.
