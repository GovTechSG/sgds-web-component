# Icon

**Purpose**: Render icons from the SGDS icon registry by name. Icons are inline SVGs sized with predefined options.

**Component**: `<sgds-icon>`

---

## Usage

```html
<!-- Basic icon -->
<sgds-icon name="star-fill"></sgds-icon>

<!-- Sizes -->
<sgds-icon name="star-fill" size="xs"></sgds-icon>
<sgds-icon name="star-fill" size="sm"></sgds-icon>
<sgds-icon name="star-fill" size="md"></sgds-icon>
<sgds-icon name="star-fill" size="lg"></sgds-icon>
<sgds-icon name="star-fill" size="xl"></sgds-icon>
<sgds-icon name="star-fill" size="2xl"></sgds-icon>

<!-- Color inherits from text color -->
<span class="sgds:text-primary">
  <sgds-icon name="check-circle-fill" size="md"></sgds-icon>
  Verified
</span>

<!-- Common icons -->
<sgds-icon name="info-circle-fill" size="md"></sgds-icon>
<sgds-icon name="exclamation-triangle-fill" size="md"></sgds-icon>
<sgds-icon name="check-circle-fill" size="md"></sgds-icon>
<sgds-icon name="x-circle-fill" size="md"></sgds-icon>
<sgds-icon name="chevron-down" size="sm"></sgds-icon>
<sgds-icon name="search" size="sm"></sgds-icon>
<sgds-icon name="person-fill" size="md"></sgds-icon>
<sgds-icon name="download" size="md"></sgds-icon>
<sgds-icon name="trash-fill" size="sm"></sgds-icon>
<sgds-icon name="pencil-fill" size="sm"></sgds-icon>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `name` | string | — | Icon name from the SGDS registry |
| `size` | `xs \| sm \| md \| lg \| xl \| 2xl` | `md` | Icon size |

## Slots

None.

## Events

None.

---

## Notes

- Icon color inherits from the CSS `color` property of the parent.
- For a full list of available icon names, see the [SGDS Icons documentation](https://designsystem.tech.gov.sg/icons/).
- Icons are rendered as inline SVGs — no external icon font is required.
