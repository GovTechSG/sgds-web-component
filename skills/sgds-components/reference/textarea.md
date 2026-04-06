# SGDS Textarea Component Skill

`<sgds-textarea>` is a multi-line text input with built-in label, hint text, character limit feedback, resize control, spellcheck, and validation support.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Component Definition

A Textarea is a multi-line input field that allows users to enter and edit longer text content, such as comments, descriptions, or messages. It supports wrapping, scrolling, and optionally resizing.

## Purpose

- Enable users to input free-form text that exceeds the length of a single-line input
- Capture detailed user information while maintaining readability and accessibility

## Usage Guideline

**When to use:**
- Capturing user feedback, comments, or descriptions
- Input that requires multiple lines or paragraphs
- Situations where content may exceed typical single-line limits

**When NOT to use:**
- When input is expected to be short or single-line — use `<sgds-input>` instead
- When character count is extremely limited — use `<sgds-input>` with validation
- When formatting or rich text is required — use a Rich Text Editor instead

## Behaviour

- Expands vertically as users type when `resize="auto"` is set
- Supports scrollbars if content exceeds the visible area
- Maintains focus and cursor position on input
- Provides visual feedback for error, warning, or success states

## Content Guidelines

- Use clear and concise placeholder text to guide user input
- Keep character limits visible when applicable via `maxlength`
- Use `hintText` for instructions — avoid placing guidance inside the textarea itself

## Interaction Guidelines

- Keyboard navigation: `Tab` to focus, `Shift+Tab` to move backward
- Provide accessible labels and ARIA attributes for screen readers
- Highlight focus state clearly

## Best Practices

**Do**
- Use for multi-line input only
- Indicate optional vs required fields
- Provide clear labels and `hintText`
- Use visual states for validation (error, success)

**Don't**
- Use for short or single-line input
- Overload with instructions inside the textarea
- Allow uncontrolled resizing that breaks layout — use `resize="none"` or `resize="vertical"` where needed

## Common Use Cases

- **Feedback forms** — user feedback, ratings, suggestions
- **Comment sections** — replies, annotations
- **Message input** — chat or email applications
- **Description fields** — forms or applications requiring detailed text

## Advanced Considerations

**Auto-resizing vs fixed height** — use `resize="auto"` for content-driven height; use fixed `rows` for predictable layout

**Character limits** — `maxlength` shows a live counter near the field; use it to set expectations upfront

**Large paste content** — consider truncating or warning when pasted content exceeds `maxlength`

**Accessibility** — ensure screen reader support and high contrast mode compatibility

## Edge Cases

- **Empty submission** — provide validation if field is required
- **Exceeding character limit** — `maxlength` prevents further input and displays a counter
- **Very long single words** — may cause horizontal overflow; handle with CSS `overflow-wrap`
- **Non-printable characters or line breaks** — may cause formatting issues; sanitise on submission
- **Mobile virtual keyboards** — may obscure the field; ensure the page scrolls to keep the textarea visible

## Quick Decision Guide

**Set visible rows?** → `rows="4"` (default is 4)

**Limit character count?** → `maxlength="200"` — displays a counter near the field

**Prevent manual resize?** → `resize="none"`

**Auto-expand to content?** → `resize="auto"`

**Show validation feedback?** → Set `hasFeedback` and `invalidFeedback`

```html
<!-- Basic textarea -->
<sgds-textarea
  label="Comments"
  name="comments"
  hintText="Tell us more"
  placeholder="Enter your comments here"
  rows="4"
></sgds-textarea>

<!-- With character limit and validation -->
<sgds-textarea
  label="Description"
  name="description"
  maxlength="300"
  hasFeedback="both"
  invalidFeedback="Description must not be empty"
  required
></sgds-textarea>

<!-- Auto-resize, no vertical grip -->
<sgds-textarea
  label="Notes"
  name="notes"
  rows="2"
  resize="auto"
></sgds-textarea>
```

## API Summary

### `<sgds-textarea>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `label` | string | `""` | Field label |
| `hintText` | string | `""` | Hint text shown below the label |
| `name` | string | — | Form field name for submission |
| `value` | string | `""` | Current value |
| `defaultValue` | string | — | Initial value |
| `placeholder` | string | `"Placeholder"` | Placeholder text |
| `rows` | number | `4` | Visible number of text lines |
| `minlength` | number | — | Minimum character length |
| `maxlength` | number | — | Maximum character length; shows counter when set |
| `resize` | `none \| vertical \| auto` | `vertical` | Controls textarea resize behaviour |
| `inputmode` | string | — | Virtual keyboard mode for mobile |
| `autocorrect` | boolean | `false` | Enables autocorrection |
| `spellcheck` | boolean | `false` | Enables spellcheck |
| `hasFeedback` | string | — | Controls validation UI; like `<sgds-input>`, supports `"style"`, `"text"`, `"both"` |
| `invalidFeedback` | string | `""` | Error message shown when invalid |
| `invalid` | boolean | — | Manually sets the invalid state |
| `required` | boolean | `false` | Makes the field required |
| `disabled` | boolean | `false` | Disables the textarea |
| `readonly` | boolean | `false` | Makes the textarea read-only |
| `autofocus` | boolean | `false` | Focuses the textarea on load |

## Events

| Event | When |
|---|---|
| `sgds-change` | Committed value change |
| `sgds-input` | Each keystroke that changes the value |
| `sgds-focus` | Textarea gains focus |
| `sgds-blur` | Textarea loses focus |

---

**For AI agents**:
1. Setting `maxlength` automatically shows a character counter below the textarea.
2. `resize="auto"` makes the textarea grow vertically as the user types; `resize="none"` disables manual resizing.
3. Use `hasFeedback="both"` with `invalidFeedback` to show both the error border colour and the error message.
4. There are no public methods on this component.
