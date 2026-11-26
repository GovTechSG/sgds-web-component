# Custom Validation (Disabling SGDS Validation)

For 3rd-party validation libraries (e.g. Zod) or fully custom logic, disable SGDS's built-in validation first, then call `setInvalid(bool)` and update `invalidFeedback` in response to input events.

## Option 1 — Disable per component with `noValidate`

Currently supported on **`<sgds-input>`**, **`<sgds-textarea>`**, **`<sgds-combo-box>`**, **`<sgds-datepicker>`**, **`<sgds-file-upload>`**, **`<sgds-select>`**, **`<sgds-quantity-toggle>`**, **`<sgds-radio-group>`**, **`<sgds-checkbox>`**, and **`<sgds-checkbox-group>`**.

```html
<sgds-input
  noValidate
  id="keys-input"
  name="keys"
  label="Keys"
  hintText="Cannot start with special characters"
  hasFeedback="both"
></sgds-input>

<script>
  const input = document.getElementById("keys-input");

  input.addEventListener("sgds-input", e => {
    if (/^[^a-zA-Z0-9]/.test(e.target.value)) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Keys cannot start with special characters";
    } else {
      e.target.setInvalid(false);
    }
  });
</script>
```

## Option 2 — Disable at form level with `novalidate`

Adding `novalidate` to the `<form>` element disables constraint validation and SGDS validation for **all child components**. Then apply `setInvalid` logic per field.

```html
<form id="custom-form" novalidate class="d-flex-column">
  <sgds-input id="keys-input" name="keys" label="Keys" hasFeedback="both"></sgds-input>

  <sgds-textarea id="bio-textarea" name="bio" label="Bio" hasFeedback="true"></sgds-textarea>
</form>

<script>
  document.getElementById("keys-input").addEventListener("sgds-input", e => {
    if (/^[^a-zA-Z0-9]/.test(e.target.value)) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Invalid key format";
    } else {
      e.target.setInvalid(false);
    }
  });

  document.getElementById("bio-textarea").addEventListener("sgds-input", e => {
    if (e.target.value.length < 10) {
      e.target.setInvalid(true);
      e.target.invalidFeedback = "Bio must be at least 10 characters";
    } else {
      e.target.setInvalid(false);
    }
  });
</script>
```

## `setInvalid(bool)` Method

| Parameter | Type      | Description                                                                                      |
| --------- | --------- | ------------------------------------------------------------------------------------------------ |
| `bool`    | `boolean` | `true` marks the component invalid and shows `invalidFeedback`; `false` clears the invalid state |

Pair `setInvalid(true)` with setting the `invalidFeedback` property on the element to control the displayed message.

## Custom Validation Support Status

| Component                                   | Status         |
| ------------------------------------------- | -------------- |
| `<sgds-input>`                              | ✅ Implemented |
| `<sgds-textarea>`                           | ✅ Implemented |
| `<sgds-datepicker>`                         | ✅ Implemented |
| `<sgds-checkbox>` / `<sgds-checkbox-group>` | ✅ Implemented |
| `<sgds-quantity-toggle>`                    | ✅ Implemented |
| `<sgds-radio-group>`                        | ✅ Implemented |
| `<sgds-file-upload>`                        | ✅ Implemented |
| `<sgds-select>`                             | ✅ Implemented |
| `<sgds-combo-box>`                          | ✅ Implemented |
