# Form Background Colors Reference

**Level**: Component level
**Usage**: Input fields, textareas, select backgrounds

Form elements use the `sgds:bg-surface-{modifier}` pattern.

## Token Pattern

```
sgds:bg-surface-{modifier}
```

## Available Tokens

| Class | Use for |
|-------|---------|
| `sgds:bg-surface-default` | Default input background |
| `sgds:bg-surface-raised` | Elevated input, floating label background |
| `sgds:bg-surface-emphasis` | Highlighted or active input state |
| `sgds:bg-surface-subtle` | Subtle input background |
| `sgds:bg-surface-muted` | Muted / read-only input background |
| `sgds:bg-surface-inverse` | Inverted background (dark on light, light on dark) |
| `sgds:bg-surface-fixed-light` | Always light — never changes with theme |
| `sgds:bg-surface-fixed-dark` | Always dark — never changes with theme |

## Common Patterns

> **Note**: Use library components like `<sgds-input>`, `<sgds-select>`, `<sgds-textarea>` when available. Form background tokens are for creating custom form elements when library components don't meet your needs.

### Text Input

```html
<input class="sgds:bg-surface-default" type="text" placeholder="Enter your name" />
```

### Textarea

```html
<textarea class="sgds:bg-surface-default" placeholder="Enter your message"></textarea>
```

### Select Dropdown

```html
<select class="sgds:bg-surface-default">
  <option>Singapore</option>
  <option>Malaysia</option>
</select>
```

### Read-only Input

```html
<input class="sgds:bg-surface-muted" type="text" value="Read only value" readonly />
```

### Inverted Form Field

```html
<input class="sgds:bg-surface-inverse" type="text" placeholder="Inverted input" />
```
```

### Input with Validation States

```html
<!-- Success State -->
<div>
  <label>Email (Valid)</label>
  <input
    class="sgds:bg-form-default"
    type="email"
    value="user@example.com"
  />
  <p>✓ Valid email</p>
</div>

<!-- Error State -->
<div>
  <label>Email (Invalid)</label>
  <input
    class="sgds:bg-form-default"
    type="email"
    value="invalid-email"
  />
  <p>✗ Invalid email format</p>
</div>
```

## Best Practices

### ✅ DO: Use for All Form Inputs

```html
<!-- ✅ Good - consistent form backgrounds -->
<input class="sgds:bg-form-default" type="text" />
<textarea class="sgds:bg-form-default"></textarea>
<select class="sgds:bg-form-default"></select>
```

### ✅ DO: Combine with Border States

```html
<!-- ✅ Good - clear focus state -->
<input
  class="sgds:bg-form-default"
  type="text"
/>
```

### ✅ DO: Use with Validation Colors

```html
<!-- ✅ Good - form background + validation border -->
<input
  class="sgds:bg-form-default"
  type="text"
/>
```

### ❌ DON'T: Use for Non-Input Elements

```html
<!-- ❌ Avoid - form background for regular divs -->
<div class="sgds:bg-form-default">
  Regular content (not a form field)
</div>

<!-- ✅ Better - surface for regular content -->
<div class="sgds:bg-surface-default">
  Regular content
</div>
```

### ❌ DON'T: Mix with Other Surface Backgrounds in Forms

```html
<!-- ❌ Avoid - inconsistent input backgrounds -->
<input class="sgds:bg-surface-default" type="text" />
<input class="sgds:bg-form-default" type="email" />

<!-- ✅ Better - consistent form backgrounds -->
<input class="sgds:bg-form-default" type="text" />
<input class="sgds:bg-form-default" type="email" />
```

## Theme Adaptation

Form backgrounds automatically adapt to the active theme:

- **Day Theme**: Lighter background for contrast on light pages
- **Night Theme**: Adjusted background for contrast on dark pages

This ensures form inputs are always visible and accessible regardless of theme.

## Additional Considerations

### Focus States

Always include focus states for accessibility:

```html
<input
  class="sgds:bg-form-default"
  type="text"
/>
```

### Disabled States

Use opacity to indicate disabled fields:

```html
<input
  class="sgds:bg-form-default"
  type="text"
  disabled
/>
```

### Readonly States

Differentiate readonly from disabled:

```html
<input
  class="sgds:bg-form-default"
  type="text"
  value="Read-only value"
  readonly
/>
```

## See Also

- **success.md** - Success validation states
- **danger.md** - Error validation states
- **warning.md** - Warning validation states
