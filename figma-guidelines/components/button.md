# Button

**Purpose**: Primary interactive buttons for forms, dialogs, and navigation. Supports variants, loading states, icons, and link mode.

**Component**: `<sgds-button>`

---

## Usage

```html
<!-- Variants -->
<sgds-button variant="primary">Primary</sgds-button>
<sgds-button variant="outline">Outline</sgds-button>
<sgds-button variant="ghost">Ghost</sgds-button>
<sgds-button variant="danger">Danger</sgds-button>

<!-- Sizes -->
<sgds-button size="sm">Small</sgds-button>
<sgds-button size="md">Medium (default)</sgds-button>
<sgds-button size="lg">Large</sgds-button>

<!-- Tone (for light/dark backgrounds) -->
<sgds-button tone="fixed-light">Fixed Light</sgds-button>
<sgds-button tone="fixed-dark">Fixed Dark</sgds-button>

<!-- With icons -->
<sgds-button variant="primary">
  <sgds-icon slot="leftIcon" name="download" size="md"></sgds-icon>
  Download
</sgds-button>

<sgds-button variant="outline">
  Next
  <sgds-icon slot="rightIcon" name="arrow-right" size="md"></sgds-icon>
</sgds-button>

<!-- Loading state -->
<sgds-button variant="primary" loading>Submitting...</sgds-button>

<!-- Disabled -->
<sgds-button variant="primary" disabled>Disabled</sgds-button>

<!-- Full width -->
<sgds-button variant="primary" fluid>Full Width Button</sgds-button>

<!-- As a link (renders as <a>) -->
<sgds-button variant="primary" href="/page" target="_blank">
  Go to Page
</sgds-button>

<!-- Form submission -->
<form>
  <sgds-button type="submit" variant="primary">Submit</sgds-button>
  <sgds-button type="reset" variant="ghost">Reset</sgds-button>
</form>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary \| outline \| ghost \| danger` | `primary` | Button style |
| `size` | `sm \| md \| lg` | `md` | Button size |
| `tone` | `default \| fixed-light \| fixed-dark` | `default` | Color tone for themed backgrounds |
| `type` | `button \| submit \| reset` | `button` | Native button type |
| `disabled` | boolean | `false` | Disables the button |
| `loading` | boolean | `false` | Shows a loading spinner |
| `fluid` | boolean | `false` | Makes the button full width |
| `href` | string | — | When set, renders as an `<a>` tag |
| `target` | string | — | Link target (`_blank`, `_self`, etc.) |
| `download` | string | — | Sets the download attribute on the link |

## Slots

| Slot | Content |
|---|---|
| *(default)* | Button label text |
| `leftIcon` | Icon before the label |
| `rightIcon` | Icon after the label |

## Events

Fires the native `click` event. No custom events.

---

## React 19+

```jsx
<sgds-button variant="primary" onsgds-blur={() => {}}>Click</sgds-button>
```

## React ≤18

```jsx
import { SgdsButton } from "@govtechsg/sgds-web-component/react";
<SgdsButton variant="primary">Click</SgdsButton>
```
