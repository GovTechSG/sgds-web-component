---
name: "sgds-components-quantity-toggle"
description: "Use sgds-quantity-toggle to display a number input with increment and decrement buttons. Apply this skill whenever a user asks about quantity selectors, number steppers, count inputs, increment/decrement controls, quantity pickers, or item count fields in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Quantity Toggle Component Skill

`<sgds-quantity-toggle>` renders a number input flanked by minus (−) and plus (+) icon buttons. Use `min`, `max`, and `step` to constrain and control the value increment.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Set initial value?** → `value="0"` (default is 0)

**Minimum quantity?** → Set `min`

**Maximum quantity?** → Set `max`

**Increment by more than 1?** → `step="5"` (default step is 1)

**Prevent manual typing?** → `readonly`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

```html
<!-- Basic quantity toggle -->
<sgds-quantity-toggle
  name="quantity"
  label="Quantity"
  value="1"
  min="1"
  max="99"
></sgds-quantity-toggle>

<!-- With hint text and step -->
<sgds-quantity-toggle
  name="tickets"
  label="Number of Tickets"
  hintText="Maximum 10 tickets per order"
  value="1"
  min="1"
  max="10"
  step="1"
></sgds-quantity-toggle>

<!-- Read-only quantity display -->
<sgds-quantity-toggle
  name="items"
  label="Items in Cart"
  value="3"
  readonly
></sgds-quantity-toggle>

<!-- With validation feedback -->
<sgds-quantity-toggle
  name="count"
  label="Count"
  value="0"
  min="1"
  hasFeedback="both"
  invalidFeedback="Must be at least 1"
></sgds-quantity-toggle>

<!-- Listen to value change -->
<sgds-quantity-toggle id="qty" name="qty" label="Qty" value="1" min="1" max="10">
</sgds-quantity-toggle>
<script>
  document.getElementById("qty").addEventListener("sgds-change", e => {
    console.log("New quantity:", document.getElementById("qty").value);
  });
</script>
```

## API Summary

### `<sgds-quantity-toggle>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | — | Field label |
| `hintText` | string | — | Hint text below the label |
| `name` | string | — | Form field name |
| `value` | number | `0` | Current quantity value |
| `step` | number | `1` | Amount to increment or decrement per click |
| `min` | number | — | Minimum allowed value |
| `max` | number | — | Maximum allowed value |
| `size` | string | — | Size of the toggle (matches `<sgds-input>` size) |
| `disabled` | boolean | `false` | Disables the control |
| `readonly` | boolean | `false` | Makes the value read-only (hides +/− buttons is false — they are still shown but the input becomes non-editable) |
| `invalid` | boolean | `false` | Manually sets the invalid state |
| `hasFeedback` | `style \| text \| both` | — | Controls validation UI feedback |
| `invalidFeedback` | string | — | Error message when value is invalid |

## Events

| Event | When |
|---|---|
| `sgds-change` | Value changes after a button click or keyboard input |
| `sgds-input` | Value changes on each input event |

---

**For AI agents**:
1. Button clicks increment/decrement by `step`; direct input allows custom values.
2. When `min` is set, the minus (−) button is disabled at the minimum value; similarly for `max` and the plus (+) button.
3. Read `element.value` (a number) after `sgds-change` to get the current count.
4. There are no public methods on this component.
