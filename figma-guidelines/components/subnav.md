# Subnav

**Purpose**: Horizontal secondary navigation bar, typically placed below the main navigation. Use for section-level navigation tabs or filters.

**Components**: `<sgds-subnav>` + `<sgds-subnav-item>`

---

## Usage

```html
<!-- Basic subnav -->
<sgds-subnav>
  <sgds-subnav-item href="/overview" active>Overview</sgds-subnav-item>
  <sgds-subnav-item href="/details">Details</sgds-subnav-item>
  <sgds-subnav-item href="/settings">Settings</sgds-subnav-item>
  <sgds-subnav-item href="/logs">Logs</sgds-subnav-item>
</sgds-subnav>

<!-- With disabled items -->
<sgds-subnav>
  <sgds-subnav-item href="/published" active>Published</sgds-subnav-item>
  <sgds-subnav-item href="/drafts">Drafts</sgds-subnav-item>
  <sgds-subnav-item href="/archived" disabled>Archived</sgds-subnav-item>
</sgds-subnav>

<!-- Full-width (fluid) -->
<sgds-subnav fluid>
  <sgds-subnav-item href="/tab1" active>Tab 1</sgds-subnav-item>
  <sgds-subnav-item href="/tab2">Tab 2</sgds-subnav-item>
  <sgds-subnav-item href="/tab3">Tab 3</sgds-subnav-item>
</sgds-subnav>
```

---

## `<sgds-subnav>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `fluid` | boolean | `false` | Full-width layout |

## Slots (`<sgds-subnav>`)

| Slot | Content |
|---|---|
| *(default)* | `<sgds-subnav-item>` elements |

## `<sgds-subnav-item>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `href` | string | — | Navigation URL |
| `active` | boolean | `false` | Marks item as current |
| `disabled` | boolean | `false` | Disables the item |

## Events

None.

---

## Notes

- Set `active` on the item matching the current route.
- For content tabs (without page navigation), use `<sgds-tab-group>` instead.
