# Sidenav

**Purpose**: Vertical sidebar navigation with multi-level nesting. Use for dashboard and internal tool navigation where a persistent sidebar is needed.

**Components**: `<sgds-sidenav>` + `<sgds-sidenav-item>` + `<sgds-sidenav-link>`

---

## Usage

```html
<!-- Basic sidebar navigation -->
<sgds-sidenav>
  <sgds-sidenav-item title="Dashboard">
    <sgds-icon slot="icon" name="house-fill" size="md"></sgds-icon>
  </sgds-sidenav-item>

  <sgds-sidenav-item title="Reports" open>
    <sgds-icon slot="icon" name="bar-chart-fill" size="md"></sgds-icon>
    <!-- Nested links -->
    <sgds-sidenav-link href="/reports/monthly" active>Monthly Reports</sgds-sidenav-link>
    <sgds-sidenav-link href="/reports/annual">Annual Reports</sgds-sidenav-link>
  </sgds-sidenav-item>

  <sgds-sidenav-item title="Users">
    <sgds-icon slot="icon" name="people-fill" size="md"></sgds-icon>
    <sgds-sidenav-link href="/users/list">All Users</sgds-sidenav-link>
    <sgds-sidenav-link href="/users/roles">Roles</sgds-sidenav-link>
    <sgds-sidenav-link href="/users/invite">Invite</sgds-sidenav-link>
  </sgds-sidenav-item>

  <sgds-sidenav-item title="Settings" href="/settings">
    <sgds-icon slot="icon" name="gear-fill" size="md"></sgds-icon>
  </sgds-sidenav-item>

  <sgds-sidenav-item title="Locked Feature" disabled>
    <sgds-icon slot="icon" name="lock-fill" size="md"></sgds-icon>
  </sgds-sidenav-item>
</sgds-sidenav>

<!-- Three-level nesting -->
<sgds-sidenav>
  <sgds-sidenav-item title="Level 1" open>
    <sgds-sidenav-item title="Level 2" open>
      <sgds-sidenav-link href="/level3-a" active>Level 3 Link A</sgds-sidenav-link>
      <sgds-sidenav-link href="/level3-b">Level 3 Link B</sgds-sidenav-link>
    </sgds-sidenav-item>
  </sgds-sidenav-item>
</sgds-sidenav>
```

---

## `<sgds-sidenav>` Props

No configurable props. Used as the top-level container.

## `<sgds-sidenav-item>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `title` | string | — | Nav item label |
| `href` | string | — | When set, renders item as a link (no children) |
| `open` | boolean | `false` | Expands the item to show children |
| `active` | boolean | `false` | Marks this item as active |
| `disabled` | boolean | `false` | Disables this item |

## Slots (`<sgds-sidenav-item>`)

| Slot | Content |
|---|---|
| `icon` | Icon element (shown before the title) |
| *(default)* | Nested `<sgds-sidenav-item>` or `<sgds-sidenav-link>` children |

## `<sgds-sidenav-link>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `href` | string | — | Link URL |
| `active` | boolean | `false` | Marks this link as the current page |
| `disabled` | boolean | `false` | Disables the link |

## Events (`<sgds-sidenav-item>`)

| Event | Description |
|---|---|
| `sgds-toggle` | Fires when an item is expanded or collapsed |

---

## Notes

- Mark the current page's link with `active` on `<sgds-sidenav-link>`.
- Nesting is supported up to three levels deep.
- See [patterns/layout.md](../patterns/layout.md) for a full sidebar app layout template.
