# Change Events Fire Only on User Interaction

## Status

Accepted

## Context

SGDS form components were emitting `sgds-change` from `@watch("value")` decorators, meaning any value change (user interaction, programmatic assignment, or form reset) would fire the event. This caused issues:

1. **Form reset triggering validation** - Custom validation listeners attached to `sgds-change` would fire during reset, incorrectly showing validation errors when the form was being cleared.
2. **Divergence from native behaviour** - Native `<input>`, `<select>`, and `<textarea>` elements only fire the `change` event in response to user-committed actions, never on programmatic `.value` assignment or form reset.
3. **FormData timing** - When `sgds-change` was emitted from the watcher (during Lit's async update cycle), `FormData` had not yet been synced via `setFormValue`, so consumers reading `FormData` inside their `sgds-change` listener would get stale values.

Reference: Shoelace (a peer Lit-based web component library) follows the same pattern - `sl-change` is only emitted from user interaction handlers, not from property watchers.

## Decision

`sgds-change` (and related events like `sgds-select`) must only be emitted from **user interaction handlers** (click, keyboard, clear button), never from `@watch("value")` watchers or during form reset.

### Implementation pattern

1. Remove `this.emit("sgds-change")` from `@watch("value")` watchers. The watcher should only handle internal state sync (updating child elements, syncing hidden inputs, running validation).
2. Add `this.emit("sgds-change")` directly in user interaction methods (e.g. `_handleRadioClick`, `_handleItemSelected`, `_addValue`).
3. Call `_mixinSetFormValue()` or `_updateInputValue()` **before** emitting `sgds-change`, so that `FormData` is correct when consumers read it in their event listener.
4. Form reset (`_mixinResetFormControl`) sets the value without emitting change events since it is not a user-initiated action.

### Components that required rectification

| Component | Status |
|-----------|--------|
| RadioGroup | Done (03/07/2026) |
| CheckboxGroup | Done (03/07/2026) |
| ComboBox | Done (03/07/2026) |

### Components already correct (no watcher-based emission)

- Input
- Textarea
- Select
- Datepicker
- QuantityToggle
- FileUpload
- Checkbox

## Consequences

- Custom validation listeners on `sgds-change` no longer fire during form reset.
- `FormData` is guaranteed to be up-to-date when `sgds-change` fires.
- Programmatic `element.value = "x"` no longer emits `sgds-change`. Consumers who relied on this must use the component's public API or listen to property changes via MutationObserver if needed.
- Consistent behaviour across all SGDS form components and aligned with the web platform.

## Date of proposal

03/07/2026
