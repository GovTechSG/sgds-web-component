# Mainnav

**Purpose**: Responsive horizontal navigation bar for the main site header. Supports text nav items, dropdown menus, and automatically collapses to a hamburger menu on small screens.

**Components**: `<sgds-mainnav>` + `<sgds-mainnav-item>` + `<sgds-mainnav-dropdown>`

---

## Usage

```html
<!-- Basic navigation bar -->
<sgds-mainnav>
  <!-- Brand/logo slot -->
  <a slot="brand" href="/">
    <img src="/logo.svg" alt="Agency Logo" height="32" />
  </a>

  <!-- Navigation items -->
  <sgds-mainnav-item href="/home" active>Home</sgds-mainnav-item>
  <sgds-mainnav-item href="/about">About Us</sgds-mainnav-item>
  <sgds-mainnav-item href="/services">Services</sgds-mainnav-item>
  <sgds-mainnav-item href="/contact">Contact</sgds-mainnav-item>

  <!-- Right-side slot for actions (login, search) -->
  <div slot="end">
    <sgds-button variant="outline" size="sm">Log In</sgds-button>
  </div>
</sgds-mainnav>

<!-- Navbar with dropdown menus -->
<sgds-mainnav>
  <a slot="brand" href="/">
    <img src="/logo.svg" alt="Logo" height="32" />
  </a>

  <sgds-mainnav-item href="/">Home</sgds-mainnav-item>

  <sgds-mainnav-dropdown toggle="Products">
    <sgds-dropdown-item value="product-a" href="/products/a">Product A</sgds-dropdown-item>
    <sgds-dropdown-item value="product-b" href="/products/b">Product B</sgds-dropdown-item>
    <sgds-dropdown-item value="product-c" href="/products/c">Product C</sgds-dropdown-item>
  </sgds-mainnav-dropdown>

  <sgds-mainnav-item href="/pricing">Pricing</sgds-mainnav-item>
  <sgds-mainnav-item href="/contact">Contact</sgds-mainnav-item>
</sgds-mainnav>

<!-- Nav without masthead (expand hamburger breakpoint) -->
<sgds-mainnav expand="md">
  <a slot="brand" href="/">
    <img src="/logo.svg" alt="Logo" height="32" />
  </a>
  <sgds-mainnav-item href="/">Home</sgds-mainnav-item>
  <sgds-mainnav-item href="/about">About</sgds-mainnav-item>
</sgds-mainnav>
```

---

## `<sgds-mainnav>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `expand` | `sm \| md \| lg \| xl \| xxl` | `lg` | Breakpoint at which the nav expands from hamburger |
| `fluid` | boolean | `false` | Full-width inner container |

## Slots (`<sgds-mainnav>`)

| Slot | Content |
|---|---|
| `brand` | Logo or brand name (left side) |
| *(default)* | `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` elements |
| `end` | Right-aligned area for search, login button, etc. |

## `<sgds-mainnav-item>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `href` | string | — | Navigation URL |
| `active` | boolean | `false` | Marks item as the current page |
| `disabled` | boolean | `false` | Disables the item |

## `<sgds-mainnav-dropdown>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `toggle` | string | — | Label text for the dropdown trigger |
| `active` | boolean | `false` | Marks the dropdown as active |

## Events

| Component | Event | When |
|---|---|---|
| `<sgds-mainnav>` | `sgds-toggle` | Hamburger open/close toggled |
| `<sgds-mainnav-dropdown>` | `sgds-select` | Dropdown item selected |

---

## Notes

- Place `<sgds-mainnav>` immediately below `<sgds-masthead>` in the page layout.
- Set `active` on the `<sgds-mainnav-item>` matching the current page URL.
- In sticky layouts, set `position: sticky; top: 0; z-index: 100` on `<sgds-mainnav>`.
