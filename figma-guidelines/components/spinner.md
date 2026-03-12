# Spinner

**Purpose**: Animated loading indicator for pending actions or processes. Supports multiple tones and sizes, with an optional label.

**Component**: `<sgds-spinner>`

---

## Usage

```html
<!-- Default spinner -->
<sgds-spinner></sgds-spinner>

<!-- With accessible label -->
<sgds-spinner label="Loading data..."></sgds-spinner>

<!-- Sizes -->
<sgds-spinner size="sm"></sgds-spinner>
<sgds-spinner size="md"></sgds-spinner>
<sgds-spinner size="lg"></sgds-spinner>

<!-- Tones -->
<sgds-spinner tone="default"></sgds-spinner>
<sgds-spinner tone="accent"></sgds-spinner>
<sgds-spinner tone="success"></sgds-spinner>
<sgds-spinner tone="danger"></sgds-spinner>
<sgds-spinner tone="warning"></sgds-spinner>
<sgds-spinner tone="neutral"></sgds-spinner>

<!-- For dark backgrounds -->
<div style="background: #1a1a1a; padding: 1rem;">
  <sgds-spinner tone="fixed-light"></sgds-spinner>
</div>

<!-- Label position: below (default) or right -->
<sgds-spinner label="Loading" labelPosition="below"></sgds-spinner>
<sgds-spinner label="Loading" labelPosition="right"></sgds-spinner>

<!-- As full-page overlay -->
<div style="display: flex; justify-content: center; padding: 4rem;">
  <sgds-spinner size="lg" label="Loading page..."></sgds-spinner>
</div>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `sm \| md \| lg` | `md` | Spinner size |
| `tone` | `default \| accent \| success \| danger \| warning \| neutral \| fixed-light \| fixed-dark` | `default` | Color tone |
| `label` | string | `"Loading"` | Accessible label text |
| `labelPosition` | `below \| right` | `below` | Label placement direction |
| `visible` | boolean | `true` | Controls visibility |

## Slots

None.

## Events

None.

---

## Notes

- Always provide a meaningful `label` for screen reader accessibility.
- Use `tone="fixed-light"` on dark or primary-colored backgrounds.
- For button loading states, use `<sgds-button loading>` instead of embedding a spinner.
