# Custom Validation

## Status

Accepted (revised 26/06/2026)

## Context

We provide an opinionated native validation behaviour using ElementInternals but should also allow users to opt-out and hook in their own custom validation library

## Decision

Add noValidate prop in form components. When true, constraint validation and SGDS validation behaviours are disabled. Users can then call `setInvalid(bool)` and set `invalidFeedback` programmatically.

Additionally the validatorMixin will detect closest `<form novalidate>` and disables constraint and sgds validation. This helps to make it easier for users to set noValidate once.

### Revised approach to InputValidationController instantiation

**Original decision (23/09/2025):** When `noValidate` is true, skip creating `InputValidationController` entirely in `connectedCallback`.

**Revised decision (26/06/2026):** Always create `InputValidationController` regardless of `noValidate`. Instead, guard each validation call site individually with `_mixinShouldSkipSgdsValidation()`.

**Reason for revision:** The original approach broke form reset. When a user sets `setInvalid(true)` programmatically and then resets the form, `_mixinResetValidity` needs the controller to call `resetValidity()` and `updateInvalidState()` to clear the invalid state. Without the controller, the form could not return to a pristine state after reset.

### How validation is prevented with noValidate

The `_mixinShouldSkipSgdsValidation()` check gates every validation entry point in the mixin:

- `_mixinHandleChange()` — returns early
- `_mixinHandleInputChange()` — returns early
- `_mixinValidate()` — returns early
- `_mixinCheckValidity()` — returns `true` immediately
- `_mixinReportValidity()` — returns `true` immediately
- `_mixinSetValidity()` — returns early
- `firstUpdated()` — skips initial validation
- Each component's `_handleIsTouched()` — returns early

The only operations that always run (even with noValidate) are in `_mixinResetValidity`:
1. `resetValidity()` — clears ValidityState
2. `updateInvalidState()` — sets `invalid = false`
3. `_isTouched = false` — resets touched state

Then `validateInput()` is skipped when noValidate is active (no need to re-validate for the next check).

## Consequences

It is easier to implement custom validation without the interference of sgds opinionated validation behaviour. Form reset always returns the component to a pristine state regardless of validation mode.

Components requiring the update:
1. Input (Done on 23/09/2025)
2. ComboBox (Done on 25/06/2026)
3. Select (Done on 25/06/2026)
4. CheckboxGroup (Done on 26/06/2026)
5. Checkbox (Done on 26/06/2026)
6. RadioGroup (Done on 25/06/2026)
7. QuantityToggle
8. Datepicker (Done on 25/06/2026)
9. FileUpload (Done on 25/06/2026)
10. Textarea (Done on 23/09/2025)


## Date of proposal

23/09/2025