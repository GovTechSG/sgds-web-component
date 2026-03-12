# Quantity Toggle

**Purpose**: A numeric input with increment (+) and decrement (−) buttons. Use for quantity selection in forms, carts, and settings.

**Component**: `<sgds-quantity-toggle>`

---

## Usage

```html
<!-- Basic quantity toggle -->
<sgds-quantity-toggle
  label="Quantity"
  name="qty"
  value="1">
</sgds-quantity-toggle>

<!-- With min and max constraints -->
<sgds-quantity-toggle
  label="Number of guests"
  name="guests"
  value="1"
  min="1"
  max="10">
</sgds-quantity-toggle>

<!-- Custom step (increment by 5) -->
<sgds-quantity-toggle
  label="Package quantity"
  name="packages"
  value="5"
  min="5"
  max="50"
  step="5">
</sgds-quantity-toggle>

<!-- Hint text for context -->
<sgds-quantity-toggle
  label="Items"
  hintText="Maximum of 20 items per order"
  name="items"
  min="1"
  max="20"
  hasFeedback="both"
  invalidFeedback="Must be between 1 and 20">
</sgds-quantity-toggle>

<!-- Disabled -->
<sgds-quantity-toggle
  label="Locked Quantity"
  name="locked"
  value="3"
  disabled>
</sgds-quantity-toggle>

<!-- Listen to change -->
<sgds-quantity-toggle id="qty" label="Quantity" name="qty" value="1" min="1" max="99"></sgds-quantity-toggle>
<script>
  document.getElementById("qty").addEventListener("sgds-change", (e) => {
    console.log("New quantity:", e.target.value);
  });
</script>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `label` | string | — | Field label |
| `hintText` | string | — | Helper text below label |
| `name` | string | — | Form field name |
| `value` | number | `0` | Current value |
| `min` | number | — | Minimum allowed value |
| `max` | number | — | Maximum allowed value |
| `step` | number | `1` | Increment/decrement step |
| `disabled` | boolean | `false` | Disables all controls |
| `required` | boolean | `false` | Field is required |
| `hasFeedback` | `style \| text \| both` | — | Validation UI: `style` (border only), `text` (message only), `both` (border + message) |

## Events

| Event | Description |
|---|---|
| `sgds-change` | Fires when the value changes (button click or input) |
| `sgds-input` | Fires on every input event |
