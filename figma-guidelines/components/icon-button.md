# Icon Button

**Purpose**: Icon-only button for compact actions. Provides a clickable button without visible text. Supports all button variants, sizes, and link mode.

**Component**: `<sgds-icon-button>`

---

## Usage

```html
<!-- Basic icon button -->
<sgds-icon-button name="gear-fill" label="Settings"></sgds-icon-button>

<!-- Variants -->
<sgds-icon-button name="pencil-fill" label="Edit" variant="primary"></sgds-icon-button>
<sgds-icon-button name="pencil-fill" label="Edit" variant="outline"></sgds-icon-button>
<sgds-icon-button name="pencil-fill" label="Edit" variant="ghost"></sgds-icon-button>
<sgds-icon-button name="trash-fill" label="Delete" variant="danger"></sgds-icon-button>

<!-- Sizes -->
<sgds-icon-button name="search" label="Search" size="sm"></sgds-icon-button>
<sgds-icon-button name="search" label="Search" size="md"></sgds-icon-button>
<sgds-icon-button name="search" label="Search" size="lg"></sgds-icon-button>

<!-- Tone (for themed backgrounds) -->
<div style="background: #1f2d3d; padding: 1rem;">
  <sgds-icon-button name="x" label="Close" tone="fixed-light"></sgds-icon-button>
</div>

<!-- Disabled -->
<sgds-icon-button name="download" label="Download" disabled></sgds-icon-button>

<!-- As a link (renders as <a>) -->
<sgds-icon-button
  name="box-arrow-up-right"
  label="Open in new tab"
  href="https://example.com"
  target="_blank">
</sgds-icon-button>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `name` | string | — | Icon name from the SGDS registry |
| `label` | string | — | Accessible label (aria-label) — always required |
| `variant` | `primary \| outline \| ghost \| danger` | `primary` | Button style |
| `size` | `sm \| md \| lg` | `md` | Button size |
| `tone` | `default \| fixed-light \| fixed-dark` | `default` | Color tone for themed backgrounds |
| `disabled` | boolean | `false` | Disables the button |
| `href` | string | — | When set, renders as an `<a>` tag |
| `target` | string | — | Link target (`_blank`, `_self`, etc.) |

## Slots

None — the icon is specified via the `name` attribute.

## Events

Native `click` event. No custom events.

---

## Notes

- Always provide a `label` for accessibility — it becomes the `aria-label` on the button.
- Use `<sgds-icon-button>` instead of `<sgds-button>` when there is no text label.
