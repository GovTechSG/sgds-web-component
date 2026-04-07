# SGDS Switch Component Skill

`<sgds-switch>` is a toggle switch for binary on/off states. Labels can be placed to the right (default slot) or left (`left-label` slot). Use `size` to match it to adjacent UI elements.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Component Definition

The Switch component is a toggle control that represents a binary on/off state. It is visually styled as a sliding thumb inside a track and is used for settings or preferences where the change takes effect immediately.

## Purpose

- Enable users to toggle a binary setting on or off.
- Provide immediate, visible feedback for preference changes.
- Offer a compact, accessible control for boolean options without requiring form submission.

## Usage Guideline

### When to use

- For settings and preferences that take effect immediately upon toggling (e.g. dark mode, notifications, auto-save).
- When a binary on/off state is clear and unambiguous.
- When the user should see the result of their action without submitting a form.

### When NOT to use

- When the action requires confirmation before taking effect — use a checkbox with a submit button instead.
- For non-binary choices (more than two states) — use `<sgds-radio>` or `<sgds-select>`.
- When the toggle represents agreement or acceptance (e.g. terms and conditions) — use `<sgds-checkbox>` instead.
- When the switch needs to participate in native form submission directly — `<sgds-switch>` has no `name` attribute; pair with a hidden input if form integration is needed.

## Behaviour

- Clicking or tapping the switch toggles its `checked` state between `true` and `false`.
- `checked` pre-sets the switch to the on state on render.
- `disabled` prevents interaction; the switch is visible but non-togglable.
- `icon` shows X (off) and check (on) icons inside the toggle thumb for additional visual clarity.
- `size` controls the physical size of the switch: `sm`, `md` (default), or `lg`.
- Fires `sgds-change` with `event.detail.checked` (boolean) on each toggle.
- The component has no `name`, `label`, `hintText`, or validation attributes — it is a UI toggle, not a form field.

## Content Guideline

- Place a concise, clear label in the default slot (right of the switch) or `left-label` slot (left of the switch).
- Labels should describe the on state — not the action (e.g. "Dark mode" not "Toggle dark mode").
- Avoid long labels; keep them to a few words so the on/off context is immediately obvious.
- If no label is used (e.g. in a table row), ensure the purpose is communicated through surrounding context or an `aria-label`.

## Interaction Guideline

- Clicking anywhere on the switch or its label toggles the state.
- Keyboard: `Tab` focuses the switch; `Space` toggles it.
- `sgds-change` fires on each toggle — read `event.detail.checked` for the new state.
- For form submission, listen to `sgds-change` and update a hidden input's value to reflect the switch state.
- The switch provides instant feedback — no additional confirmation step.

## Best Practices

**Do**
- Use for settings that take immediate effect.
- Label clearly using the on-state description.
- Use `icon` when additional visual clarity is needed (e.g. in dense UIs or for users with colour vision differences).
- Match `size` to adjacent form elements for visual consistency.

**Don't**
- Use for actions requiring confirmation before effect — prefer a checkbox + submit pattern.
- Use in place of a checkbox for form-based agreement or acceptance.
- Leave the switch without any label or accessible description in context.
- Use multiple switches for mutually exclusive options — use `<sgds-radio>` instead.

## Common Use Cases

- Enabling or disabling notifications, themes, or accessibility features.
- Toggling auto-save, auto-update, or background sync settings.
- Showing/hiding optional UI elements (e.g. advanced options, sidebars).
- Per-row feature toggles in admin or settings tables.

## Advanced Considerations

- **Form integration**: `<sgds-switch>` has no `name` attribute and does not participate in native form submission. For form-based use, listen to `sgds-change` and sync the value to a hidden `<input type="hidden">`.
- **`icon` prop**: adds X/check icons inside the toggle thumb — useful for colour-blind accessibility or dense layouts where the on/off state may not be obvious from position alone.
- **Label placement**: use the default slot for a right-side label (most common) or `slot="left-label"` for a left-side label when layout requires it. Both can be used simultaneously for labels on both sides.
- **No validation**: `<sgds-switch>` has no `hasFeedback`, `invalid`, or `invalidFeedback` attributes — validation is not applicable to a binary toggle.

## Edge Cases

- **No label**: the switch functions correctly without a label, but ensure accessible context is provided via surrounding text or an `aria-label` attribute on the element.
- **Default state**: `checked` defaults to `false` — if the on state is the expected default, set `checked` explicitly to avoid misleading the user.
- **Disabled with pre-checked state**: a `disabled` switch can be pre-checked — use this to show a non-modifiable setting that is currently on.
- **Rapid toggling**: `sgds-change` fires on every toggle — debounce if the handler performs expensive operations (e.g. API calls).
- **Form submission without hidden input**: if form data must include the switch state, always mirror it to a hidden input on `sgds-change`; omitting this will result in the value not being submitted.

## Quick Decision Guide

**Show X/check icons in the toggle?** → Add `icon`

**Pre-turned-on?** → Add `checked`

**Disabled toggle?** → Add `disabled`

**Label to the left?** → Use `slot="left-label"` instead of the default slot

**Small switch?** → `size="sm"`

```html
<!-- Switch with right label (default) -->
<sgds-switch>Enable notifications</sgds-switch>

<!-- Pre-checked with icon -->
<sgds-switch checked icon>Dark mode</sgds-switch>

<!-- Left label -->
<sgds-switch>
  <span slot="left-label">Auto-save</span>
</sgds-switch>

<!-- Disabled -->
<sgds-switch disabled>Unavailable option</sgds-switch>

<!-- Small size, no label -->
<sgds-switch size="sm"></sgds-switch>

<!-- Listen to change -->
<sgds-switch id="my-switch">Airplane mode</sgds-switch>
<script>
  document.getElementById("my-switch").addEventListener("sgds-change", e => {
    console.log("Checked:", e.detail.checked);
  });
</script>
```

## API Summary

### `<sgds-switch>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `checked` | boolean | `false` | Pre-sets the switch to on |
| `disabled` | boolean | `false` | Disables the switch |
| `icon` | boolean | `false` | Shows X/check icons inside the toggle thumb |
| `size` | `sm \| md \| lg` | `md` | Size of the switch |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Label text displayed to the right of the switch |
| `left-label` | Label text displayed to the left of the switch |

## Events

| Event | Detail | When |
|---|---|---|
| `sgds-change` | `{ checked: boolean }` | Switch is toggled |

---

**For AI agents**:
1. `event.detail.checked` gives the new state (`true` = on, `false` = off).
2. There are no label/hintText/name/validation attributes — `<sgds-switch>` is a simple toggle without form field integration.
3. For form submission, pair with a hidden input element reflecting the switch's checked state.
4. There are no public methods on this component.
