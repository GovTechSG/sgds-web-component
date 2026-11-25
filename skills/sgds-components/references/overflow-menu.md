# SGDS Overflow Menu Component Skill

`<sgds-overflow-menu>` is a pre-built icon button that toggles a dropdown menu. By default it renders a three-dot (`⋯`) icon, but the icon can be swapped to any available icon via the `icon` prop. It uses `<sgds-dropdown-item>` as its list items and is commonly used in table rows, cards, and list items for contextual actions.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For table rows, cards, or list items where multiple contextual actions (view, edit, delete) need to be grouped under a compact three-dot icon button.
- When space is too limited for visible action buttons and the actions are secondary or contextual.
- As a standard overflow pattern for per-row actions in data-heavy interfaces.

### When NOT to use

- When a visible button label is needed — use `<sgds-dropdown>` with a custom `toggler` slot instead.
- When a fully custom toggler (e.g. a labeled button or non-icon trigger) is required — use `<sgds-dropdown>`.
- For primary actions — overflow menus hide actions; primary actions should always be visible.
- When there is only one action — show it as a direct button instead of hiding it in a menu.

## Behaviour

- Renders an icon button (defaults to three-dot `⋯`); clicking it toggles the dropdown menu.
- `icon` sets the icon name: defaults to `"three-dots"`, can be changed to any valid icon (e.g. `"three-dots-vertical"`, `"gear"`, `"plus"`).
- `size` controls the icon button size: `md` (default) or `sm`.
- List items must be `<sgds-dropdown-item>` elements in the default slot.
- `disabled` on `<sgds-dropdown-item>` prevents selection; `sgds-select` does not fire for disabled items.
- Fires `sgds-select` with `event.detail.item` as the clicked `<sgds-dropdown-item>`.
- No public methods — the menu is toggled entirely via the built-in icon button.

## Advanced Considerations

- **vs `<sgds-dropdown>`**: `<sgds-overflow-menu>` is a convenience wrapper with a configurable icon toggler. Use `<sgds-dropdown>` when a fully custom toggler (e.g. a labeled button or non-icon element) is needed.
- **Navigation vs action items**: for navigation, slot an `<a>` inside `<sgds-dropdown-item>`; for actions (no URL), slot plain text directly.
- **`sgds-select` event**: fires on the `<sgds-overflow-menu>` element — use `event.detail.item` to identify the selected item and `.textContent.trim()` to read its label.
- **Size in compact layouts**: use `size="sm"` inside table rows and tight card layouts to match the surrounding density.

## Edge Cases

- **No items**: an empty menu opens but shows nothing — always include at least one `<sgds-dropdown-item>`.
- **All items disabled**: the menu opens but nothing is selectable — ensure at least one enabled item exists or remove the overflow menu entirely.
- **Single action**: a one-item overflow menu adds unnecessary interaction cost — show the action as a direct button instead.
- **Long item labels**: may overflow the menu container — keep action labels concise (1–3 words).

## Quick Decision Guide

**Custom toggler or button label needed?** → Use `<sgds-dropdown>` instead

**Icon menu with no label?** → `<sgds-overflow-menu>` (this component)

**Custom icon?** → `icon="three-dots-vertical"` or any valid icon name

**Size?** → `size="md"` (default), `size="sm"`

```html
<!-- Basic overflow menu (defaults to three-dots icon) -->
<sgds-overflow-menu size="sm">
  <sgds-dropdown-item ariaLabel="View">View</sgds-dropdown-item>
  <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
  <sgds-dropdown-item disabled ariaLabel="Archive">Archive</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- Vertical three-dots icon -->
<sgds-overflow-menu icon="three-dots-vertical">
  <sgds-dropdown-item ariaLabel="View">View</sgds-dropdown-item>
  <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
</sgds-overflow-menu>

<!-- React to selection -->
<sgds-overflow-menu id="row-menu">
  <sgds-dropdown-item ariaLabel="View details">View details</sgds-dropdown-item>
  <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
  <sgds-dropdown-item ariaLabel="Delete">Delete</sgds-dropdown-item>
</sgds-overflow-menu>

<script>
  document.getElementById("row-menu").addEventListener("sgds-select", e => {
    const action = e.detail.item.textContent.trim();
    console.log("Action selected:", action);
  });
</script>

<!-- Common usage inside a table row -->
<tr>
  <td>Item name</td>
  <td>Active</td>
  <td>
    <sgds-overflow-menu size="sm">
      <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
      <sgds-dropdown-item ariaLabel="Delete">Delete</sgds-dropdown-item>
    </sgds-overflow-menu>
  </td>
</tr>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `size` | `sm \| md` | `md` | Size of the icon button |
| `icon` | `string` | `three-dots` | Icon name to display (any valid icon name) |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | `<sgds-dropdown-item>` elements for the menu list |

## Events

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-show` | No | — | Menu begins opening |
| `sgds-after-show` | No | — | Menu fully open |
| `sgds-hide` | No | — | Menu begins closing |
| `sgds-after-hide` | No | — | Menu fully closed |
| `sgds-select` | No | `{ item: SgdsDropdownItem }` | A dropdown item is clicked |

---

**For AI agents**:
1. `<sgds-overflow-menu>` is a convenience wrapper with a configurable `icon` prop — for a fully custom toggler or labeled button use `<sgds-dropdown>` instead.
2. List items must be `<sgds-dropdown-item>` elements in the default slot.
3. **Always add `ariaLabel`** to each `<sgds-dropdown-item>` — this forwards `aria-label` to the inner clickable element for screen readers.
4. `sgds-select` fires when any item is clicked — `event.detail.item` is the clicked `<sgds-dropdown-item>`.
5. For navigation items, slot `<a>` tags inside `<sgds-dropdown-item>`; for action items, slot plain text directly.
6. There are no public methods — the menu is toggled entirely via the built-in icon button.
