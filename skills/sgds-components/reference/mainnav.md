# SGDS Mainnav Component Skill

`<sgds-mainnav>` is the primary horizontal navigation bar. It collapses into a hamburger menu on small screens. Navigation items use `<sgds-mainnav-item>` and dropdown menus use `<sgds-mainnav-dropdown>`.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- As the primary horizontal navigation bar for any Singapore Government digital service or web application.
- When users need to navigate between top-level sections of a site from a persistent header.
- When the site has a brand logo that should link back to the homepage.
- When some nav items should expand into dropdown menus with sub-links.
- When right-aligned items (e.g. login button, language toggle) are needed in the navigation bar.

### When NOT to use

- For secondary or section-level navigation — use `<sgds-subnav>` or `<sgds-sidenav>` instead.
- For in-page navigation between sections — use `<sgds-table-of-contents>`.
- As the sole navigation in a sidebar layout — use `<sgds-sidebar>` or `<sgds-sidenav>`.
- When navigation is minimal and does not require a full header bar — consider a simpler standalone link structure.

## Behaviour

- Renders a horizontal navigation bar with a brand area, primary nav items, and optional right-aligned items.
- Collapses into a hamburger menu at the breakpoint defined by `expand` (default `lg`); use `expand="always"` to never collapse or `expand="never"` to always show the hamburger.
- `<sgds-mainnav-item>` renders a nav link; the default slot takes an `<a>` tag.
- `<sgds-mainnav-dropdown>` renders a dropdown trigger with `<sgds-dropdown-item>` children; the `toggler` slot takes the trigger element.
- Items in the `end` slot are right-aligned and also collapse into the hamburger menu on small screens.
- Items in the `non-collapsible` slot remain visible at all screen sizes regardless of the `expand` setting.
- Items in the `profile` slot are positioned at the far right in desktop; in mobile they move into the collapsed menu as the first item. Ideal for user profile dropdowns that need prominent placement in both views.
- `active` on `<sgds-mainnav-item>` highlights the current page link.
- Fires `sgds-show`, `sgds-after-show`, `sgds-hide`, `sgds-after-hide` when the collapsed menu opens or closes (mobile only).

## Component Composition

**`brand` slot** — a single `<img>` with `alt`, `width`, and `src`. Set `brandHref` on `<sgds-mainnav>` to the homepage URL (`"/"`). Always provide brand content.

**Default slot** — `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` elements for primary navigation. Do not place other elements directly in the default slot.

**Inside `<sgds-mainnav-item>`** — a single `<a href="...">Label</a>`. Set `active` on the item matching the current route.

**Inside `<sgds-mainnav-dropdown>`** — a `toggler` slot element (typically `<span>` with the section label) and `<sgds-dropdown-item>` children with `<a>` tags for sub-navigation links.

**`end` slot** — right-aligned secondary actions: login button (`<sgds-button>`), language toggle (`<sgds-mainnav-item>`), or similar. These also collapse into the hamburger menu on small screens.

**`non-collapsible` slot** — items that stay visible at all screen sizes regardless of hamburger collapse state (e.g. a language icon, accessibility toggle).

**`profile` slot** — a `<sgds-mainnav-dropdown>` for the user profile/account menu. In desktop it renders at the far right of the navigation bar (after `non-collapsible`). In mobile it moves into the collapsed menu as the first item, giving it prominent placement. Do not hardcode text colour classes on toggler content — the component manages colour automatically based on `tone` (white text in desktop for brand/gradient tones, default text in mobile menu).

**Avoid placing inside mainnav:**
- Form inputs or search bars in the default slot — use the `end` slot or a dedicated search component
- More than 5–7 primary nav items — consolidate into dropdowns to prevent overflow at mid-size breakpoints

## Advanced Considerations

- **`tone` prop**: controls the visual theme of the navigation bar. Use `"brand"` for a solid primary-colour background, or `"gradient-1"` through `"gradient-4"` for gradient backgrounds. All non-default tones render text and icons in fixed-light (white). When using a non-default tone, pair with `fluid` for a full-width edge-to-edge appearance.
- **`togglerIconName` prop**: customise the mobile menu toggle icon (default `"menu"`). Use `"three-dots-vertical"` for console/dashboard layouts where a hamburger icon is used in the `start` slot for sidebar toggling.
- **`start` slot**: use for items that appear before the brand area (e.g. a hamburger menu icon-button for sidebar toggling in console layouts).
- **`profile` slot**: use for user account/profile dropdowns. It stays at the far right in desktop and becomes the first item in the mobile collapsed menu — the component handles text colour automatically (no need to hardcode `sgds:text-fixed-light` on toggler content).
- **`non-collapsible` slot**: use for items that must always be visible (e.g. a language toggle icon) — these are not hidden when the nav collapses.
- **`end` slot collapse behaviour**: items in `end` collapse into the hamburger menu alongside default slot items — if an item must stay visible on mobile, use `non-collapsible` instead.
- **`<sgds-mainnav-dropdown>` API**: inherits `<sgds-dropdown>` properties — see [dropdown.md](dropdown.md) for `active`, `menuIsOpen`, `close`, and `drop` options.
- **`fluid` layout**: by default the mainnav uses a fixed-width container; set `fluid` for full-width layouts (e.g. dashboards or edge-to-edge designs).
- **Singapore Government requirement**: `<sgds-masthead>` must appear above `<sgds-mainnav>` on all Singapore Government digital services.

## Edge Cases

- **No brand slot content**: the brand area renders empty — always provide an `<img>` in the `brand` slot and set `brandHref`.
- **No `active` item set**: no nav item is highlighted — set `active` on the item matching the current route; update it on route changes in SPAs.
- **`expand="never"` on desktop**: the hamburger menu is always shown even on wide screens — only use `never` for contexts where a collapsed nav is always desired.
- **Dropdown without `toggler` slot content**: the dropdown trigger renders with no label — always provide a `<span>` or button in the `toggler` slot.
- **Many nav items**: the horizontal bar may overflow on mid-size screens — test at the `expand` breakpoint and consider consolidating items into a dropdown.

## Quick Decision Guide

**When does the navbar collapse into hamburger?** → `expand="lg"` (default) — collapses below the `lg` breakpoint

**Never collapse (always expanded)?** → `expand="always"`

**Always collapsed?** → `expand="never"`

**Full-width container?** → Add `fluid`

**Brand logo link?** → Set `brandHref` to the target URL

**Solid brand colour?** → `tone="brand" fluid`

**Gradient background?** → `tone="gradient-1"` (or `gradient-2`, `gradient-3`, `gradient-4`) with `fluid`

**User profile dropdown at far right?** → Use `slot="profile"` on a `<sgds-mainnav-dropdown>`

**Custom mobile toggle icon?** → `togglerIconName="three-dots-vertical"` (or any icon name)

```html
<!-- Default mainnav example -->
<sgds-mainnav brandHref="/">
  <img slot="brand" alt="Site logo" width="130" src="/logo.svg" />

  <!-- Primary nav items -->
  <sgds-mainnav-item>
    <a href="/about">About</a>
  </sgds-mainnav-item>

  <sgds-mainnav-item active>
    <a href="/services">Services</a>
  </sgds-mainnav-item>

  <!-- Dropdown nav item -->
  <sgds-mainnav-dropdown ariaLabel="Resources menu">
    <span slot="toggler">Resources</span>
    <sgds-dropdown-item ariaLabel="Documentation"><a href="/docs">Documentation</a></sgds-dropdown-item>
    <sgds-dropdown-item ariaLabel="FAQ"><a href="/faq">FAQ</a></sgds-dropdown-item>
  </sgds-mainnav-dropdown>

  <!-- Right-aligned items (end slot) -->
  <sgds-mainnav-item slot="end">
    <a href="/contact">Contact Us</a>
  </sgds-mainnav-item>
  <sgds-button slot="end">Login</sgds-button>
</sgds-mainnav>
```

```html
<!-- Mainnav with gradient tone, profile slot, and custom toggler icon -->
<sgds-mainnav tone="gradient-1" fluid togglerIconName="three-dots-vertical">
  <sgds-icon-button name="menu" slot="start" variant="ghost" tone="fixed-light" size="sm"></sgds-icon-button>
  <img slot="brand" alt="Site logo" width="130" src="/logo-white.svg" />
  <sgds-icon-button slot="non-collapsible" name="moon" variant="ghost" tone="fixed-light" size="sm"></sgds-icon-button>
  <sgds-mainnav-dropdown slot="profile" ariaLabel="User menu">
    <div slot="toggler" class="sgds:flex sgds:flex-row sgds:items-center sgds:gap-3">
      <span class="sgds:h-10 sgds:w-10 sgds:rounded-full sgds:bg-neutral-subtle-default"></span>
      <div class="sgds:flex sgds:flex-col sgds:gap-text-2-xs">
        <span class="sgds:text-body-xs sgds:font-semibold sgds:leading-3-xs">User Name</span>
        <span class="sgds:text-body-xs sgds:leading-3-xs">Agency (admin)</span>
      </div>
    </div>
    <sgds-dropdown-item ariaLabel="My profile"><span>My profile</span></sgds-dropdown-item>
    <sgds-dropdown-item ariaLabel="Settings"><span>Settings</span></sgds-dropdown-item>
    <sgds-dropdown-item ariaLabel="Log out"><span>Log out</span></sgds-dropdown-item>
  </sgds-mainnav-dropdown>
</sgds-mainnav>
```

## API Summary

### `<sgds-mainnav>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `tone` | `default \| brand \| gradient-1 \| gradient-2 \| gradient-3 \| gradient-4` | `default` | Visual theme — `brand` uses primary surface colour; `gradient-*` uses a gradient background |
| `expand` | `sm \| md \| lg \| xl \| xxl \| always \| never` | `lg` | Breakpoint below which the nav collapses |
| `brandHref` | string | `""` | URL for the brand logo link |
| `fluid` | boolean | `false` | Uses a full-width container instead of a fixed-width one |
| `togglerIconName` | string | `"menu"` | Icon name for the mobile menu toggle button |

### `<sgds-mainnav-item>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Marks the item as the current active page |
| `disabled` | boolean | `false` | Disables the nav item |

### `<sgds-mainnav-dropdown>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `active` | boolean | `false` | Applies active styles on the dropdown button |
| `disabled` | boolean | `false` | Disables the dropdown toggle |
| `ariaLabel` | string | — | Accessible label forwarded to the toggle button's `aria-label` attribute. **Required** for accessibility — screen readers cannot read slotted toggler text. |

Also inherits `<sgds-dropdown>` properties — see **[components-dropdown](dropdown.md)** for full API (`menuIsOpen`, `close`, `drop`).

## Slots

### `<sgds-mainnav>`

| Slot | Purpose |
|---|---|
| `start` | Items before the brand area (e.g. hamburger icon-button for sidebar toggle) |
| `brand` | Brand logo image |
| *(default)* | `<sgds-mainnav-item>` and `<sgds-mainnav-dropdown>` elements |
| `end` | Items right-aligned in the navbar; also collapses into the hamburger menu |
| `non-collapsible` | Items that stay visible even when the menu is collapsed |
| `profile` | Far right in desktop; moves into collapsed menu as first item in mobile (ideal for user profile dropdowns) |

### `<sgds-mainnav-item>`

| Slot | Purpose |
|---|---|
| *(default)* | Anchor `<a>` tag for navigation |

### `<sgds-mainnav-dropdown>`

| Slot | Purpose |
|---|---|
| `toggler` | The element that toggles the dropdown (typically `<span>` or `<sgds-button>`) |
| *(default)* | `<sgds-dropdown-item>` elements |

## Events (`<sgds-mainnav>`)

| Event | When |
|---|---|
| `sgds-show` | Collapsed menu begins expanding (mobile only) |
| `sgds-after-show` | Collapsed menu fully expanded |
| `sgds-hide` | Collapsed menu begins collapsing |
| `sgds-after-hide` | Collapsed menu fully collapsed |

---

**For AI agents**:
1. Always place the brand logo in the `brand` slot using an `<img>` element; set `brandHref` to `"/"` for home navigation.
2. Regular nav links use `<a>` tags inside `<sgds-mainnav-item>`.
3. Right-aligned items (login button, contact link) go in the `end` slot.
4. User profile/account dropdowns go in the `profile` slot — positioned at far right in desktop, first item in mobile menu.
5. `non-collapsible` slot stays visible on all screen sizes — use for icons that should never collapse.
6. **Do not hardcode colour classes** (e.g. `sgds:text-fixed-light`) on `profile` slot toggler content — the component manages text colour automatically based on `tone`.
7. The collapsed menu events fire only on mobile breakpoints when using the hamburger toggle.
8. Use `<sgds-masthead>` above `<sgds-mainnav>` as required for Singapore Government sites.
9. **Always set `ariaLabel` on `<sgds-mainnav-dropdown>`** — the slotted toggler text is not accessible to screen readers through the shadow DOM boundary. Use a descriptive label like `"Resources menu"`.
10. For console/dashboard layouts with a sidebar toggle, use `slot="start"` for the hamburger icon and `togglerIconName="three-dots-vertical"` to differentiate the mobile menu toggle from the sidebar toggle.
