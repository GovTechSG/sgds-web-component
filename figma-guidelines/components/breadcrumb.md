# Breadcrumb

**Purpose**: Display a navigational breadcrumb trail showing page hierarchy. The last item is automatically marked as the active (current) page.

**Components**: `<sgds-breadcrumb>` + `<sgds-breadcrumb-item>`

---

## Usage

```html
<!-- Basic breadcrumb -->
<sgds-breadcrumb>
  <sgds-breadcrumb-item>
    <a href="/">Home</a>
  </sgds-breadcrumb-item>
  <sgds-breadcrumb-item>
    <a href="/products">Products</a>
  </sgds-breadcrumb-item>
  <sgds-breadcrumb-item>
    <!-- Last item has no href — it's the current page -->
    Current Page
  </sgds-breadcrumb-item>
</sgds-breadcrumb>

<!-- With icons -->
<sgds-breadcrumb>
  <sgds-breadcrumb-item>
    <a href="/"><sgds-icon name="house-fill" size="sm"></sgds-icon> Home</a>
  </sgds-breadcrumb-item>
  <sgds-breadcrumb-item>
    <a href="/settings">Settings</a>
  </sgds-breadcrumb-item>
  <sgds-breadcrumb-item>
    Profile
  </sgds-breadcrumb-item>
</sgds-breadcrumb>
```

---

## `<sgds-breadcrumb>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `ariaLabel` | string | `"breadcrumb"` | Accessible label for the nav landmark |

## Slots (`<sgds-breadcrumb>`)

| Slot | Content |
|---|---|
| *(default)* | `<sgds-breadcrumb-item>` elements |

## `<sgds-breadcrumb-item>` Slots

| Slot | Content |
|---|---|
| *(default)* | Anchor `<a>` for navigation items, or plain text for the current page |

## Events

None.

---

## Notes

- The last `<sgds-breadcrumb-item>` is automatically treated as the active (current) page — do not add `href` on it.
- Always use `<a>` tags inside items for proper keyboard navigation.
