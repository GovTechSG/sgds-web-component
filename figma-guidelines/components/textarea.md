# Textarea

**Purpose**: Multi-line text input field for free-form text. Supports character count, resize control, validation feedback, and the same label/hint API as `<sgds-input>`.

**Component**: `<sgds-textarea>`

---

## Usage

```html
<!-- Basic textarea -->
<sgds-textarea
  label="Description"
  name="description"
  placeholder="Enter a description...">
</sgds-textarea>

<!-- With hint text and required validation -->
<sgds-textarea
  label="Feedback"
  name="feedback"
  hintText="Maximum 500 characters"
  required
  hasFeedback="both"
  invalidFeedback="Feedback is required">
</sgds-textarea>

<!-- Character count display -->
<sgds-textarea
  label="Bio"
  name="bio"
  maxlength="300"
  characterCount>
</sgds-textarea>

<!-- Fixed rows -->
<sgds-textarea
  label="Comments"
  name="comments"
  rows="6">
</sgds-textarea>

<!-- Control resize behaviour -->
<sgds-textarea label="No resize" resize="none"></sgds-textarea>
<sgds-textarea label="Vertical only (default)" resize="vertical"></sgds-textarea>
<sgds-textarea label="Fully resizable" resize="both"></sgds-textarea>

<!-- Disabled / read-only -->
<sgds-textarea label="Read-only notes" value="Cannot be changed" disabled></sgds-textarea>

<!-- Custom validation via JavaScript -->
<sgds-textarea id="msg" label="Message" name="message" hasFeedback></sgds-textarea>
<script>
  const ta = document.getElementById("msg");
  ta.addEventListener("sgds-input", () => {
    if (ta.value.length < 10) {
      ta.setInvalid("Message must be at least 10 characters");
    } else {
      ta.setInvalid(""); // Clear error
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
| `value` | string | — | Textarea value |
| `placeholder` | string | — | Placeholder text |
| `rows` | number | `4` | Visible row count |
| `maxlength` | number | — | Maximum character count |
| `minlength` | number | — | Minimum character count |
| `characterCount` | boolean | `false` | Shows a live character counter |
| `resize` | `none \| vertical \| horizontal \| both` | `vertical` | CSS resize control |
| `required` | boolean | `false` | Field is required |
| `disabled` | boolean | `false` | Disables the textarea |
| `readonly` | boolean | `false` | Makes the textarea read-only |
| `hasFeedback` | `style \| text \| both` | — | Validation UI: `style` (border only), `text` (message only), `both` (border + message) |

## Methods

| Method | Description |
|---|---|
| `setInvalid(message)` | Programmatically marks invalid with message. Pass `""` to clear. |
| `focus()` | Programmatically focuses the textarea |

## Events

| Event | Description |
|---|---|
| `sgds-input` | Fires on every keystroke |
| `sgds-change` | Fires when value changes and field loses focus |
| `sgds-focus` | Fires on focus |
| `sgds-blur` | Fires on blur |
