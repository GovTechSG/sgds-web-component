# Icon List

**Purpose**: Render a list of items where each item pairs an icon with a text label. Useful for feature lists, benefit lists, and quick facts.

**Components**: `<sgds-icon-list>` (wrapper) + `<sgds-icon-list-item>` (each row)

---

## Usage

```html
<!-- Basic icon list (icons auto-sized to match text) -->
<sgds-icon-list>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    First benefit or feature
  </sgds-icon-list-item>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    Second benefit or feature
  </sgds-icon-list-item>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    Third benefit or feature
  </sgds-icon-list-item>
</sgds-icon-list>

<!-- Different icon per item -->
<sgds-icon-list>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check-circle-fill"></sgds-icon>
    Supported feature
  </sgds-icon-list-item>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="x-circle-fill"></sgds-icon>
    Not supported in free plan
  </sgds-icon-list-item>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="dash-circle-fill"></sgds-icon>
    Optional add-on
  </sgds-icon-list-item>
</sgds-icon-list>

<!-- Size variants (sets text size; icon matches) -->
<sgds-icon-list size="sm">
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check2"></sgds-icon>
    Small text item
  </sgds-icon-list-item>
</sgds-icon-list>

<sgds-icon-list size="lg">
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="check2"></sgds-icon>
    Large text item
  </sgds-icon-list-item>
</sgds-icon-list>

<!-- Manually override icon size -->
<sgds-icon-list>
  <sgds-icon-list-item>
    <sgds-icon slot="icon" name="star-fill" size="lg"></sgds-icon>
    Item with larger icon
  </sgds-icon-list-item>
</sgds-icon-list>
```

---

## `<sgds-icon-list>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `size` | `sm \| md \| lg` | `md` | Text size (icon size auto-matches unless overridden) |

## Slots (`<sgds-icon-list>`)

| Slot | Content |
|---|---|
| *(default)* | `<sgds-icon-list-item>` elements |

## Slots (`<sgds-icon-list-item>`)

| Slot | Content |
|---|---|
| `icon` | The icon element (use `<sgds-icon>`) |
| *(default)* | Item label text |

## Events

None.

---

## Notes

- The icon size within `<sgds-icon-list>` auto-adjusts to match the `size` prop unless you explicitly set a `size` on the `<sgds-icon>`.
- Use consistent icons across all items in a list for visual harmony.
