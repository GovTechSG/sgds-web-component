---
name: "sgds-components-sidebar"
description: "Use sgds-sidebar, sgds-sidebar-item, sgds-sidebar-group, and sgds-sidebar-section to build a vertical collapsible sidebar navigation. Apply this skill whenever a user asks about sidebar navigation, vertical nav, collapsible menu, sidebar layout, nested navigation, icon navigation, or dashboard sidebars in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Sidebar Component Skill

`<sgds-sidebar>` is a vertical collapsible navigation component optimized for dashboard and application layouts. It supports three nesting levels with icons, collapsible sections, and automatic drawer overlays for nested items.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Flat list of navigation items (no nesting)?** → Use only `<sgds-sidebar-item>` elements in a `<sgds-sidebar-section>`

**Parent items with nested children?** → Use `<sgds-sidebar-group>` to hold `<sgds-sidebar-item>` children (up to 3 levels total)

**Collapse sidebar to icons only?** → Set `collapsed="true"` on `<sgds-sidebar>` — labels hide, only icons show

**Organize items into sections?** → Wrap items in `<sgds-sidebar-section>` with optional `title`

**Mark the current page?** → Set `active="item-name"` on the root `<sgds-sidebar>`

**Icon requirements:**

- **Level 1 items/groups**: REQUIRED — must have `leading-icon` slot with `<sgds-icon>`
- **Level 2 items/groups**: REQUIRED — must have `leading-icon` slot with `<sgds-icon>`
- **Level 3 items**: OPTIONAL — `leading-icon` is optional; `trailing-icon` is optional for all levels

**Drawer overlays:** Level 1 groups automatically show nested items in a drawer overlay when clicked; keyboard Left/Right arrows manage the drawer.

```html
<!-- Basic sidebar with sections and items -->
<sgds-sidebar active="meetings">
  <div slot="top">My App</div>

  <!-- Main section -->
  <sgds-sidebar-section title="Main" ?collapsible="false">
    <!-- Level 1 item (required icon) -->
    <sgds-sidebar-item title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leading-icon"></sgds-icon>
    </sgds-sidebar-item>

    <!-- Level 1 group with nested items -->
    <sgds-sidebar-group title="Reports" name="reports">
      <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>

      <!-- Level 2 items (required icon) -->
      <sgds-sidebar-item title="Sales Report" name="sales-report">
        <sgds-icon name="trend-up" slot="leading-icon"></sgds-icon>
      </sgds-sidebar-item>

      <!-- Level 2 group with further nesting -->
      <sgds-sidebar-group title="Analytics" name="analytics">
        <sgds-icon name="bar-chart" slot="leading-icon"></sgds-icon>

        <!-- Level 3 items (optional icon) -->
        <sgds-sidebar-item title="Monthly View" name="monthly-view">
          <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Yearly View" name="yearly-view"></sgds-sidebar-item>
      </sgds-sidebar-group>
    </sgds-sidebar-group>
  </sgds-sidebar-section>

  <!-- Optional: Another section -->
  <sgds-sidebar-section title="Settings" name="settings" collapsible>
    <sgds-sidebar-item title="Account" name="account">
      <sgds-icon name="user-circle" slot="leading-icon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar-section>

  <!-- Footer content -->
  <div slot="bottom">Footer</div>
</sgds-sidebar>

<!-- Collapsed sidebar example -->
<sgds-sidebar collapsed>
  <div slot="top">A</div>
  <sgds-sidebar-section>
    <sgds-sidebar-item title="Home" name="home">
      <sgds-icon name="house" slot="leading-icon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar-section>
</sgds-sidebar>
```

## API Summary

### `<sgds-sidebar>`

| Attribute   | Type    | Default | Purpose                             |
| ----------- | ------- | ------- | ----------------------------------- |
| `collapsed` | boolean | `false` | Collapses sidebar to icon-only mode |
| `active`    | string  | `""`    | Name of the currently active item   |

### `<sgds-sidebar-item>`

| Attribute | Type   | Default | Purpose                                        |
| --------- | ------ | ------- | ---------------------------------------------- |
| `title`   | string | `""`    | Display label for the item                     |
| `name`    | string | `""`    | Unique identifier (used for `active` tracking) |

### `<sgds-sidebar-group>`

| Attribute | Type   | Default | Purpose                                        |
| --------- | ------ | ------- | ---------------------------------------------- |
| `title`   | string | `""`    | Display label for the group                    |
| `name`    | string | `""`    | Unique identifier (used for `active` tracking) |

### `<sgds-sidebar-section>`

| Attribute     | Type    | Default | Purpose                                                |
| ------------- | ------- | ------- | ------------------------------------------------------ |
| `title`       | string  | `""`    | Section header label (optional)                        |
| `name`        | string  | `""`    | Unique identifier for the section                      |
| `collapsible` | boolean | `false` | Allows the section to collapse/expand                  |
| `collapsed`   | boolean | `false` | Initial collapsed state (only if `collapsible="true"`) |

## Slots

### `<sgds-sidebar>`

| Slot        | Purpose                                                                              |
| ----------- | ------------------------------------------------------------------------------------ |
| `top`       | Brand/logo content in sidebar header                                                 |
| _(default)_ | `<sgds-sidebar-section>`, `<sgds-sidebar-item>`, and `<sgds-sidebar-group>` elements |
| `bottom`    | Content in sidebar footer (e.g., user menu, logout)                                  |

### `<sgds-sidebar-item>`

| Slot           | Purpose                                                                   |
| -------------- | ------------------------------------------------------------------------- |
| `leading-icon`  | Icon displayed before the label **[REQUIRED for L1/L2, optional for L3]** |
| _(default)_    | Item label text                                                           |
| `trailing-icon` | Icon displayed after the label (optional)                                 |

### `<sgds-sidebar-group>`

| Slot           | Purpose                                                                         |
| -------------- | ------------------------------------------------------------------------------- |
| `leading-icon`  | Icon displayed before the group label **[REQUIRED for L1/L2, optional for L3]** |
| _(default)_    | `<sgds-sidebar-item>` and nested `<sgds-sidebar-group>` children                |
| `trailing-icon` | Icon displayed after the label (optional)                                       |

### `<sgds-sidebar-section>`

| Slot        | Purpose                                                   |
| ----------- | --------------------------------------------------------- |
| _(default)_ | `<sgds-sidebar-item>` and `<sgds-sidebar-group>` elements |

## Events

### `<sgds-sidebar>`

| Event         | When                         | Detail                                               |
| ------------- | ---------------------------- | ---------------------------------------------------- |
| `sgds-select` | An item or group is selected | `{ activeItem: string }` — name of the selected item |

## Keyboard Navigation

| Key               | Behavior                                                              |
| ----------------- | --------------------------------------------------------------------- |
| **Arrow Up/Down** | Navigate between sibling items                                        |
| **Arrow Left**    | Close drawer overlay or move focus to parent                          |
| **Arrow Right**   | Open drawer overlay for Level 1 groups, or navigate into nested items |
| **Enter/Space**   | Activate focused item or toggle group                                 |
| **Escape**        | Close drawer overlay                                                  |
| **Tab**           | Standard focus management to interactive elements                     |

## Responsive Behavior

- **Mobile (width ≤ 768px):** Sidebar automatically collapses to icon-only mode on initial load
- **Level 1 groups:** Show nested items in a drawer overlay that slides from the left when clicked
- **Level 2+ groups:** Show nested items in an inline submenu that toggles on click

## Icon Requirements Summary

| Level                             | Leading Icon | Trailing Icon |
| --------------------------------- | ------------ | ------------- |
| **Level 1** (root items/groups)   | **REQUIRED** | Optional      |
| **Level 2** (nested items/groups) | **REQUIRED** | Optional      |
| **Level 3** (doubly-nested items) | Optional     | Optional      |

---

## Patterns

### Overlay Sidebar with External Toggler

Use the overlay mode (`overlay="true"`) combined with an external toggle button to display the sidebar as a floating panel over page content. This is ideal for responsive mobile layouts and dashboards where you want to save horizontal space.

**Key features:**

- Sidebar floats above page content
- Optional dark scrim overlay for focus
- Click outside the sidebar to close it
- External toggle button controls the collapsed state

**Implementation:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="path/to/sgds/index.ts"></script>
    <link href="path/to/sgds/themes/day.css" rel="stylesheet" />
    <style>
      body {
        margin: 0;
        padding: 0;
      }

      .app-container {
        display: flex;
        height: 100vh;
      }

      .sidebar-wrapper {
        height: 100%;
        position: relative;
      }

      .content {
        flex: 1;
        padding: 24px;
        overflow-y: auto;
      }

      .toggle-header {
        padding: 8px 16px;
        background-color: var(--sgds-surface-raised);
        border-bottom: 1px solid var(--sgds-border-default);
      }
    </style>
  </head>

  <body>
    <!-- Toggle button in header -->
    <div class="toggle-header">
      <sgds-icon-button
        data-sidebar-toggler="true"
        size="xs"
        variant="ghost"
        name="sidebar-expand"
        onclick="handleToggle()"
        aria-label="Toggle sidebar"
      ></sgds-icon-button>
    </div>

    <div class="app-container">
      <!-- Sidebar in overlay mode -->
      <div class="sidebar-wrapper">
        <sgds-sidebar overlay scrim collapsed>
          <div slot="top">My App</div>

          <sgds-sidebar-section title="Navigation" name="navigation" ?collapsible="false">
            <sgds-sidebar-item title="Dashboard" name="dashboard">
              <sgds-icon name="house" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
            <sgds-sidebar-item title="Settings" name="settings">
              <sgds-icon name="gear" slot="leading-icon"></sgds-icon>
            </sgds-sidebar-item>
          </sgds-sidebar-section>
        </sgds-sidebar>
      </div>

      <!-- Main page content -->
      <div class="content">
        <h1>Dashboard</h1>
        <p>Click the toggle button to open the sidebar overlay.</p>
      </div>
    </div>

    <script>
      // Toggle the sidebar's collapsed state
      function handleToggle() {
        const sidebar = document.querySelector("sgds-sidebar");
        if (sidebar) {
          sidebar.toggleCollapsed();
        }
      }
    </script>
  </body>
</html>
```

**Important attributes:**

- `overlay="true"` — Display sidebar as a floating panel over content
- `scrim` — Show a dark overlay behind the sidebar for focus (optional, recommended for mobile)
- `collapsed="true"` — Start with sidebar hidden (optional, default is expanded)
- `data-sidebar-toggler="true"` on toggle button — Identifies this as a sidebar control

**How it works:**

1. The toggle button has `data-sidebar-toggler="true"` attribute and calls `handleToggle()` on click
2. `handleToggle()` finds the sidebar element and calls `toggleCollapsed()`
3. The sidebar's `collapsed` property toggles between `true` (hidden) and `false` (visible)
4. Clicking outside the sidebar automatically closes it in overlay mode
5. The optional `scrim` adds a dark background to emphasize the floating panel

**React example:**

```jsx
import { useRef } from "react";

export default function Dashboard() {
  const sidebarRef = useRef(null);

  const handleToggle = () => {
    if (sidebarRef.current) {
      sidebarRef.current.toggleCollapsed();
    }
  };

  return (
    <>
      <div className="toggle-header">
        <sgds-icon-button
          size="xs"
          variant="ghost"
          name="sidebar-expand"
          onClick={handleToggle}
          aria-label="Toggle sidebar"
        ></sgds-icon-button>
      </div>

      <div className="app-container">
        <div className="sidebar-wrapper">
          <sgds-sidebar ref={sidebarRef} overlay scrim collapsed>
            <div slot="top">My App</div>
            {/* sidebar content */}
          </sgds-sidebar>
        </div>

        <div className="content">{/* page content */}</div>
      </div>
    </>
  );
}
```

**Vue example:**

```vue
<template>
  <div>
    <div class="toggle-header">
      <sgds-icon-button
        size="xs"
        variant="ghost"
        name="sidebar-expand"
        @click="handleToggle"
        aria-label="Toggle sidebar"
      ></sgds-icon-button>
    </div>

    <div class="app-container">
      <div class="sidebar-wrapper">
        <sgds-sidebar ref="sidebar" overlay scrim collapsed>
          <div slot="top">My App</div>
          <!-- sidebar content -->
        </sgds-sidebar>
      </div>

      <div class="content">
        <!-- page content -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const sidebar = ref(null);

const handleToggle = () => {
  if (sidebar.value) {
    sidebar.value.toggleCollapsed();
  }
};
</script>
```

---

**For AI agents**:

1. **Always use sections** — Wrap items in `<sgds-sidebar-section>` for proper organization, even for simple sidebars.
2. **Levels 1 and 2 need icons** — Both `<sgds-sidebar-item>` and `<sgds-sidebar-group>` at these levels MUST have `leading-icon` slot with `<sgds-icon>`. This is a hard requirement for UX consistency.
3. **Drawer behavior** — When a Level 1 group is clicked, its children appear in a right-sliding drawer overlay. The drawer closes by clicking outside, pressing Escape, or navigating away.
4. **Anchors for navigation** — Anchor links can be placed inside items: `<sgds-sidebar-item>...<a href="/page"></a></sgds-sidebar-item>`. When an anchor is present, clicking the item follows the link.
5. **Active state** — Set `active="item-name"` on the root `<sgds-sidebar>` to highlight the current page and automatically open parent groups if needed.
6. **Nesting limit** — Maximum 3 levels deep (Level 1 → Level 2 → Level 3). Deeper nesting is not supported.
7. **Collapsed mode** — When `collapsed="true"`, only icons are visible. Titles hide and the sidebar becomes icon-only. Nested overlays still function normally with keyboard navigation.
8. **Collapsible sections** — Set `collapsible="true"` on `<sgds-sidebar-section>` to allow users to collapse/expand that section independently.
