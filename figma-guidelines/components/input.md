# Input

**Purpose**: Text input field with label, hint text, prefix/suffix decorations, validation feedback, and an optional action slot. Supports all native text input types.

**Component**: `<sgds-input>`

---

## Usage

```html
<!-- Basic text input -->
<sgds-input label="Full Name" name="fullname" placeholder="Enter your name"></sgds-input>

<!-- With hint text -->
<sgds-input
  label="Email Address"
  name="email"
  type="email"
  hintText="We'll never share your email"
  placeholder="you@example.com">
</sgds-input>

<!-- Required with validation feedback -->
<sgds-input
  label="NRIC"
  name="nric"
  required
  hasFeedback="both"
  invalidFeedback="NRIC is required"
  placeholder="S1234567A">
</sgds-input>

<!-- With prefix text (e.g. currency) -->
<sgds-input label="Amount" name="amount" type="number">
  <span slot="prefix">$</span>
</sgds-input>

<!-- With suffix text (e.g. units) -->
<sgds-input label="Weight" name="weight" type="number">
  <span slot="suffix">kg</span>
</sgds-input>

<!-- With action button (e.g. copy-to-clipboard) -->
<sgds-input label="Reference Code" name="ref" value="REF-2024-XYZ" readonly>
  <sgds-icon-button slot="action" name="clipboard" label="Copy"></sgds-icon-button>
</sgds-input>

<!-- Password with toggle visibility -->
<sgds-input label="Password" name="password" type="password">
</sgds-input>

<!-- Loading state -->
<sgds-input label="Username" loading placeholder="Checking availability..."></sgds-input>

<!-- Disabled -->
<sgds-input label="Read-only Field" value="Cannot be changed" disabled></sgds-input>

<!-- Different sizes -->
<sgds-input label="Small" size="sm"></sgds-input>
<sgds-input label="Medium (default)" size="md"></sgds-input>
<sgds-input label="Large" size="lg"></sgds-input>

<!-- Custom validation via JavaScript -->
<sgds-input id="custom-input" label="Username" name="username" hasFeedback></sgds-input>
<script>
  const input = document.getElementById("custom-input");
  input.addEventListener("sgds-input", (e) => {
    const val = e.target.value;
    if (val.length < 3) {
      input.setInvalid("Username must be at least 3 characters");
    } else {
      input.setInvalid(""); // Clears error state
    }
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
| `value` | string | — | Input value |
| `type` | string | `text` | Native input type (`text`, `email`, `password`, `number`, etc.) |
| `placeholder` | string | — | Placeholder text |
| `size` | `sm \| md \| lg` | `md` | Input size |
| `required` | boolean | `false` | Field is required |
| `disabled` | boolean | `false` | Disables the input |
| `readonly` | boolean | `false` | Makes the input read-only |
| `loading` | boolean | `false` | Shows loading spinner |
| `hasFeedback` | `style \| text \| both` | — | Validation UI: `style` (border only), `text` (message only), `both` (border + message) |
| `pattern` | string | — | Regex validation pattern |
| `minlength` | number | — | Minimum character count |
| `maxlength` | number | — | Maximum character count |
| `min` | number | — | Minimum value (for `type="number"`) |
| `max` | number | — | Maximum value (for `type="number"`) |

## Slots

| Slot | Content |
|---|---|
| `prefix` | Content shown before the input (icon or text) |
| `suffix` | Content shown after the input (icon or text) |
| `action` | Action button inside the input (right side) |

## Methods

| Method | Description |
|---|---|
| `setInvalid(message)` | Programmatically mark invalid with a message. Pass empty string to clear. |
| `focus()` | Programmatically focus the input |
| `blur()` | Programmatically blur the input |

## Events

| Event | Description |
|---|---|
| `sgds-input` | Fires on every keystroke |
| `sgds-change` | Fires when value changes and field loses focus |
| `sgds-focus` | Fires on focus |
| `sgds-blur` | Fires on blur |
