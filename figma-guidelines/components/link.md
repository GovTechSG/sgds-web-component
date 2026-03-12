# Link

**Purpose**: Styled anchor links for navigation and inline actions. Supports color tones and sizes, with optional icons on either side.

**Component**: `<sgds-link>`

---

## Usage

```html
<!-- Basic link -->
<sgds-link href="/dashboard">Go to Dashboard</sgds-link>

<!-- Open in new tab -->
<sgds-link href="https://example.com" target="_blank">External site</sgds-link>

<!-- Tones -->
<sgds-link href="/info" tone="default">Default link</sgds-link>
<sgds-link href="/danger" tone="danger">Danger link</sgds-link>

<!-- For use on dark backgrounds -->
<div style="background: #1a1a1a; padding: 1rem;">
  <sgds-link href="/help" tone="fixed-light">Help Center</sgds-link>
</div>

<!-- Sizes -->
<sgds-link href="#" size="sm">Small link</sgds-link>
<sgds-link href="#" size="md">Medium link</sgds-link>
<sgds-link href="#" size="lg">Large link</sgds-link>

<!-- With left icon -->
<sgds-link href="/back">
  <sgds-icon slot="leftIcon" name="arrow-left" size="sm"></sgds-icon>
  Back to list
</sgds-link>

<!-- With right icon (e.g. external link indicator) -->
<sgds-link href="https://external.com" target="_blank">
  Visit external site
  <sgds-icon slot="rightIcon" name="box-arrow-up-right" size="sm"></sgds-icon>
</sgds-link>

<!-- Disabled state -->
<sgds-link href="/unavailable" disabled>Unavailable</sgds-link>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `href` | string | — | URL the link navigates to |
| `target` | string | — | Link target (`_blank`, `_self`, etc.) |
| `tone` | `default \| danger \| fixed-light \| fixed-dark` | `default` | Color tone |
| `size` | `sm \| md \| lg` | `md` | Text size |
| `disabled` | boolean | `false` | Disables the link |

## Slots

| Slot | Content |
|---|---|
| *(default)* | Link text |
| `leftIcon` | Icon before the text |
| `rightIcon` | Icon after the text |

## Events

Native `click` event. No custom events.

---

## Notes

- Use `tone="fixed-light"` when placing links on dark/photo backgrounds.
- Always include `target="_blank"` with `rel="noopener noreferrer"` for external links (the component sets this automatically when using `target="_blank"`).
