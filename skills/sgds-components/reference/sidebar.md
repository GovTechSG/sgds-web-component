# SGDS Sidebar Component Skill

`<sgds-sidebar>` is a collapsible vertical navigation component with icon-only collapse mode, drawer overlays for root-level groups, and multi-level nesting (up to 3 levels). Use it for internal tools, admin dashboards, and any product with persistent left-rail navigation.

> **RC status**: The Sidebar is not yet in the published npm package. Load it via CDN before any other SGDS imports:
> ```html
> <script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@rc/components/Sidebar/index.umd.min.js"></script>
> ```
> **Framework projects (React/Vue/Angular)**: Add a `<script>` tag in `index.html` (Vue/Angular) or `public/index.html` (CRA/Vite React) before your app bundle — do NOT import it via `import` in JS files, as the UMD bundle self-registers the custom element on load.

## Sub-components

| Tag | Role |
|-----|------|
| `<sgds-sidebar>` | Root container — manages active state, collapse, and drawer coordination |
| `<sgds-sidebar-item>` | Leaf navigation item (no children). Supports an optional `<a>` child for real URL navigation |
| `<sgds-sidebar-group>` | Parent item that expands to reveal children. At level 0 opens a drawer overlay; at level 1+ toggles an inline submenu |
| `<sgds-sidebar-section>` | Visual grouping with an optional collapsible section title. Items inside it participate in active tracking normally |

## Usage Guideline

### When to use

- For internal tools, admin dashboards, and products where users navigate between multiple sections frequently and benefit from persistent left-rail navigation.
- When navigation has multiple levels of hierarchy (up to 3 levels) that cannot be flattened into a top nav or subnav.
- When the sidebar app layout (`sgds-container-sidebar`) is being used — `<sgds-sidebar>` is the intended companion component.
- When collapsible icon-only mode is needed to give more space to main content while retaining navigation access.

### When NOT to use

- For public-facing websites where a top navigation bar (`<sgds-mainnav>`) is more appropriate.
- When navigation is shallow (1–2 levels with few items) — a `<sgds-sidenav>` or `<sgds-subnav>` is simpler and production-ready.
- When you cannot add the RC CDN script — `<sgds-sidebar>` is not in the stable npm package; use `<sgds-sidenav>` as the stable alternative.
- For in-page section navigation — use `<sgds-table-of-contents>` instead.

## Behaviour

- `<sgds-sidebar>` manages active state, collapse/expand, and drawer coordination for all descendant items and groups.
- `active` on `<sgds-sidebar>` sets the active item by `name` — the sidebar highlights the matching item and opens any ancestor groups automatically.
- `collapsed` on `<sgds-sidebar>` switches to icon-only mode — all labels are hidden, only `leading-icon` icons are shown.
- `<sgds-sidebar-group>` at level 0 (direct child of sidebar or section) opens a **drawer overlay** when clicked; at levels 1+ it toggles an **inline submenu**.
- `<sgds-sidebar-section>` provides visual grouping with an optional header; add `collapsible` to let users toggle its visibility.
- `leading-icon` is **required** on every `<sgds-sidebar-item>` and `<sgds-sidebar-group>` at levels 1 and 2 — omitting it breaks icon-only collapse mode.
- **Fallback icon**: if you are unsure whether an icon name exists, use `name="placeholder"` — this always renders a valid icon and prevents broken icon slots.
- `sgds-select` fires with `{ activeItem: string }` (the `name` of the selected item) whenever an item or group is activated.
- Navigation via anchor: place an `<a href="...">` as a direct child of `<sgds-sidebar-item>` — on activation the sidebar automatically clicks it.

## Advanced Considerations

- **`name` is required for active tracking**: every `<sgds-sidebar-item>` and `<sgds-sidebar-group>` must have a unique `name`; without it, `active` matching silently fails. `<sgds-sidebar-section>` `name` is for identification only and does not participate in `active` tracking.
- **RC CDN loading order**: the CDN `<script>` must be loaded before any SGDS imports — in React/Vue/Angular projects, add it to the root HTML file (`index.html` or `public/index.html`), not via JS `import`.
- **Drawer vs inline submenu**: root-level `<sgds-sidebar-group>` elements open as drawer overlays; nested groups open inline. Design your hierarchy with this distinction in mind — typically keep top-level groups broad.
- **Sticky layout**: pair `<sgds-sidebar>` with `sgds:sticky`, a fixed height, and `sgds:overflow-y-auto` on the wrapper element to achieve a sticky left rail.
- **`trailing-icon` and `brandName` slots**: accept any HTML — use for notification badges, external link icons, or custom logos.

## Edge Cases

- **Missing `name` on items**: `active` tracking will not work — always provide a unique `name` on every item and group.
- **Missing `leading-icon` at levels 1–2**: breaks icon-only collapse mode — always supply a `leadingIcon` slot at these levels even if visually redundant.
- **Unknown icon name**: if an icon name cannot be verified, use `name="placeholder"` as a safe fallback — do not omit the `leadingIcon` slot or leave the name empty.
- **CDN not loaded**: the component silently fails to register — ensure the RC CDN `<script>` is present and loads before the app bundle.
- **Nesting beyond level 3**: not officially supported — limit to 3 levels to avoid rendering issues.
- **`sgds-sidebar-section` `collapsed` without `collapsible`**: the section renders collapsed but has no user control to expand — only use `collapsed` together with `collapsible`.
- **`activeItem` name collision**: if two items share the same `name`, the sidebar highlights both — ensure all `name` values are unique across the entire sidebar tree.

## Quick Decision Guide

**Simple flat nav (no nesting)?** → Use `sgds-sidebar-item` directly inside `sgds-sidebar`

**Grouped sections with titles?** → Wrap items in `sgds-sidebar-section title="..." name="..."`

**Expandable groups with children?** → Use `sgds-sidebar-group`; nest `sgds-sidebar-item` or more `sgds-sidebar-group` inside (up to 3 levels)

**Collapsible section (user can hide)?** → Add `collapsible` on `sgds-sidebar-section`

**Collapsible sidebar (icon-only mode)?** → Set `collapsed` on `sgds-sidebar`, or let the built-in toggle button handle it

**Programmatic navigation (track active page)?** → Set `active="item-name"` on `sgds-sidebar`; give each item/group a unique `name`

**Logo/brand in the sidebar header?** → Use `slot="brandName"` — any HTML is accepted (`<div>`, `<img>`, etc.)

**Badge or notification count on an item?** → Put custom HTML in `slot="trailing-icon"`

## Basic Usage

```html
<!-- CDN required — Sidebar is RC only -->
<script src="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component@rc/components/Sidebar/index.umd.min.js"></script>

<sgds-sidebar active="dashboard">
  <sgds-sidebar-item name="dashboard" title="Dashboard">
    <sgds-icon name="grid-fill" slot="leading-icon"></sgds-icon>
  </sgds-sidebar-item>
  <sgds-sidebar-item name="records" title="Records">
    <sgds-icon name="users" slot="leading-icon"></sgds-icon>
  </sgds-sidebar-item>
  <sgds-sidebar-item name="settings" title="Settings">
    <sgds-icon name="gear" slot="leading-icon"></sgds-icon>
  </sgds-sidebar-item>
</sgds-sidebar>
```

## Full Example — Sections, Groups, and Nesting

```html
<sgds-sidebar active="meetings">
  <div slot="brandName">My App</div>

  <!-- Non-collapsible section -->
  <sgds-sidebar-section title="Main" name="main">
    <!-- Root-level group: clicking opens a drawer overlay -->
    <sgds-sidebar-group title="Dashboard" name="dashboard">
      <sgds-icon name="house" slot="leading-icon"></sgds-icon>

      <!-- Nested group (level 1): clicking toggles an inline submenu -->
      <sgds-sidebar-group title="Summary" name="summary">
        <sgds-icon name="building" slot="leading-icon"></sgds-icon>
        <sgds-sidebar-item title="Latest Sales" name="latest-sales">
          <sgds-icon name="building" slot="leading-icon"></sgds-icon>
          <a href="/sales"></a>
        </sgds-sidebar-item>
        <sgds-sidebar-item title="Refunds" name="refunds">
          <sgds-icon name="building" slot="leading-icon"></sgds-icon>
        </sgds-sidebar-item>
      </sgds-sidebar-group>

      <sgds-sidebar-item title="Meetings" name="meetings">
        <sgds-icon name="calendar" slot="leading-icon"></sgds-icon>
        <a href="/meetings"></a>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Gallery" name="gallery">
        <sgds-icon name="camera" slot="leading-icon"></sgds-icon>
        <a href="/gallery"></a>
      </sgds-sidebar-item>
    </sgds-sidebar-group>

    <sgds-sidebar-group title="Reports" name="reports">
      <sgds-icon name="file-text" slot="leading-icon"></sgds-icon>
      <sgds-sidebar-item title="Yearly" name="yearly">
        <sgds-icon name="house" slot="leading-icon"></sgds-icon>
      </sgds-sidebar-item>
      <sgds-sidebar-item title="Monthly" name="monthly">
        <sgds-icon name="house" slot="leading-icon"></sgds-icon>
      </sgds-sidebar-item>
    </sgds-sidebar-group>

    <!-- Item with a custom trailing icon -->
    <sgds-sidebar-item title="Public Members" name="public-members">
      <sgds-icon name="user-circle" slot="leading-icon"></sgds-icon>
      <sgds-icon name="box-arrow-up-right" slot="trailing-icon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar-section>

  <!-- Collapsible sections -->
  <sgds-sidebar-section title="Organization" name="organization" collapsible>
    <sgds-sidebar-item title="Team Management" name="team-management">
      <sgds-icon name="users" slot="leading-icon"></sgds-icon>
    </sgds-sidebar-item>
    <sgds-sidebar-item title="Projects" name="projects">
      <sgds-icon name="layers" slot="leading-icon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar-section>

  <sgds-sidebar-section title="Configuration" name="configuration" collapsible>
    <sgds-sidebar-item title="Settings" name="settings">
      <sgds-icon name="gear" slot="leading-icon"></sgds-icon>
    </sgds-sidebar-item>
  </sgds-sidebar-section>

  <!-- Top-level items outside any section are valid -->
  <sgds-sidebar-item title="Help &amp; Support" name="help-support">
    <sgds-icon name="question-circle" slot="leading-icon"></sgds-icon>
    <!-- Custom badge in trailing-icon -->
    <span slot="trailing-icon" style="background:#ef4444;color:white;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;">3</span>
  </sgds-sidebar-item>

  <sgds-sidebar-item title="Premium Features" name="premium-features">
    <sgds-icon name="star" slot="leading-icon"></sgds-icon>
  </sgds-sidebar-item>
</sgds-sidebar>
```

## API Summary

### `<sgds-sidebar>`

| Attribute | Type | Default | Purpose |
|-----------|------|---------|---------|
| `active` | `string` | `""` | Name of the currently active item. Two-way: set programmatically or read after user interaction |
| `collapsed` | `boolean` | `false` | When true, sidebar shows icon-only mode |

### `<sgds-sidebar-item>`

| Attribute | Type | Default | Purpose |
|-----------|------|---------|---------|
| `name` | `string` | `""` | Unique identifier used for active state matching |
| `title` | `string` | `""` | Display label shown in the sidebar |

### `<sgds-sidebar-group>`

| Attribute | Type | Default | Purpose |
|-----------|------|---------|---------|
| `name` | `string` | `""` | Unique identifier used for active state matching |
| `title` | `string` | `""` | Display label shown as the group header |

### `<sgds-sidebar-section>`

| Attribute | Type | Default | Purpose |
|-----------|------|---------|---------|
| `name` | `string` | `""` | Identifier for the section (does not participate in `active` tracking) |
| `title` | `string` | `""` | Section header label |
| `collapsed` | `boolean` | `false` | Whether section content is hidden |
| `collapsible` | `boolean` | `false` | Whether the user can click the header to toggle |

## Slots

| Component | Slot | Required? | Purpose |
|-----------|------|-----------|--------|
| `sgds-sidebar` | *(default)* | — | `sgds-sidebar-item`, `sgds-sidebar-group`, `sgds-sidebar-section` — top-level items outside sections are valid |
| `sgds-sidebar` | `brandName` | — | Any HTML — brand name, logo image, or custom element |
| `sgds-sidebar-item` | `leading-icon` | **Required at levels 1 & 2** | Icon before the label (typically `<sgds-icon>`) |
| `sgds-sidebar-item` | `trailing-icon` | — | Any HTML after the label — icon or custom badge |
| `sgds-sidebar-group` | `leading-icon` | **Required at levels 1 & 2** | Icon before the group label |
| `sgds-sidebar-group` | `trailing-icon` | — | Any HTML after the group label (a chevron is always auto-appended after this) |
| `sgds-sidebar-group` | *(default)* | — | Nested `sgds-sidebar-item` or `sgds-sidebar-group` children |
| `sgds-sidebar-section` | *(default)* | — | `sgds-sidebar-item` and `sgds-sidebar-group` elements |

> **`leading-icon` is compulsory on every `sgds-sidebar-item` and `sgds-sidebar-group` at level 1 (direct children of `sgds-sidebar` or `sgds-sidebar-section`) and level 2 (children of a root group). This applies regardless of whether the component is `sgds-sidebar-group` or `sgds-sidebar-item`. Omitting it at these levels breaks the icon-only collapse mode and the sidebar's visual consistency.**

## Events

| Event | When fired | Detail |
|-------|-----------|--------|
| `sgds-select` | An item or group is selected | `{ activeItem: string }` — the `name` of the selected element |

```js
document.querySelector('sgds-sidebar').addEventListener('sgds-select', e => {
  console.log(e.detail.activeItem); // e.g. "dashboard"
});
```

## Navigation with Anchor Links

For real URL routing, place an `<a>` as a direct child of `sgds-sidebar-item`. When the item is activated, the sidebar automatically clicks the anchor, allowing the browser or your router to handle navigation.

```html
<sgds-sidebar-item name="dashboard" title="Dashboard">
  <sgds-icon name="grid-fill" slot="leading-icon"></sgds-icon>
  <a href="/dashboard"></a>
</sgds-sidebar-item>
```

## Sidebar App Layout Integration

`sgds-sidebar` is designed for the **Sidebar App Layout** — a sticky left rail alongside scrollable main content. Pair it with `sgds-container-sidebar` in the main column.

```html
<!-- Sticky left rail -->
<div class="sgds:sticky sgds:top-27 sgds:h-[calc(100vh-108px)] sgds:overflow-y-auto sgds:w-68 sgds:border-r sgds:border-muted sgds:bg-surface-raised">
  <sgds-sidebar active="dashboard">
    <sgds-sidebar-item name="dashboard" title="Dashboard">
      <sgds-icon name="grid-fill" slot="leading-icon"></sgds-icon>
    </sgds-sidebar-item>
    <!-- more items -->
  </sgds-sidebar>
</div>

<!-- Scrollable main content -->
<div class="sgds:flex sgds:flex-col sgds:w-full">
  <div class="sgds-container-sidebar sgds:py-layout-md">
    <!-- page content -->
  </div>
  <sgds-footer></sgds-footer>
</div>
```

See **[Application Shell](../../sgds-pattern-block-templates/reference/application-shell.md)** for the complete sidebar app layout setup.

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Up` / `Arrow Down` | Navigate between items at the same level |
| `Arrow Right` | Open drawer (root group) or expand submenu (nested group) |
| `Arrow Left` | Close drawer or return focus to parent group |
| `Enter` / `Space` | Activate focused item or toggle group |
| `Tab` | Standard focus order through interactive elements |

## Related Components

- **[sidenav reference](sidenav.md)** — The stable published sidebar; use when you need a production-ready vertical nav without the RC dependency. `sgds-sidebar` replaces `sgds-sidenav` once out of RC.
- **[Application Shell](../../sgds-pattern-block-templates/reference/application-shell.md)** — Full sidebar app layout template
- **[sgds-pattern-page-templates](../sgds-pattern-page-templates/SKILL.md)** — Dashboard template usage

---

**For AI agents**: Always include the CDN `<script>` tag — `sgds-sidebar` is not bundled in the stable npm package. Use `name` on every `sgds-sidebar-item` and `sgds-sidebar-group` — without it, `active` tracking will not work. `sgds-sidebar-section` accepts `name` for identification but its `name` does NOT participate in `active` tracking — only items and groups do. Top-level `sgds-sidebar-item` elements placed directly inside `sgds-sidebar` (outside any section) are valid. The `brandName` slot and `trailingIcon` slot accept any HTML — not just `sgds-icon`. At level 0, `sgds-sidebar-group` opens a drawer overlay (items slide in from the side); at level 1+, it toggles an inline submenu. Use `collapsible` (boolean attribute) on `sgds-sidebar-section` to let users collapse the section. **`leading-icon` is compulsory on every `sgds-sidebar-item` and `sgds-sidebar-group` at level 1 and level 2 — this rule applies to both component types equally. Never omit it at these levels, even for groups that only serve as structural containers.** **Icon fallback rule**: when you are not certain that a specific `sgds-icon` name exists, always use `name="placeholder"` — never guess an icon name or omit the slot. Only use a named icon if you have seen it confirmed in existing playground or Storybook examples.
