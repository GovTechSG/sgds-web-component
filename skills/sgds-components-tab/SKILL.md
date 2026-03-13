---
name: "sgds-components-tab"
description: "Use sgds-tab-group, sgds-tab, and sgds-tab-panel to display tabbed content areas. Apply this skill whenever a user asks about tabs, tabbed navigation, tab panels, content switching, or a tab group with horizontal or vertical orientation in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Tab Component Skill

`<sgds-tab-group>` coordinates `<sgds-tab>` and `<sgds-tab-panel>` elements. Each tab's `panel` attribute must match a tab panel's `name` attribute — this is how the tab and its content are linked.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Visual style?**
- Underline tabs → `variant="underlined"` (default)
- Solid/pill tabs → `variant="solid"`

**Orientation?**
- Horizontal tabs → `orientation="horizontal"` (default)
- Vertical side tabs → `orientation="vertical"`

**Compact spacing?** → `density="compact"` on `<sgds-tab-group>`

**Set initial active tab?** → Add `active` to the specific `<sgds-tab>`

**Set initial active tab (first loaded tab)?** → The first non-disabled tab is active by default

```html
<!-- Basic tab group -->
<sgds-tab-group>
  <sgds-tab slot="nav" panel="home">Home</sgds-tab>
  <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
  <sgds-tab slot="nav" panel="settings" disabled>Settings</sgds-tab>

  <sgds-tab-panel name="home">
    <p>Welcome to the home tab content.</p>
  </sgds-tab-panel>
  <sgds-tab-panel name="profile">
    <p>Profile information goes here.</p>
  </sgds-tab-panel>
  <sgds-tab-panel name="settings">
    <p>Settings are not available.</p>
  </sgds-tab-panel>
</sgds-tab-group>

<!-- Solid variant, compact density -->
<sgds-tab-group variant="solid" density="compact">
  <sgds-tab slot="nav" panel="tab1">Tab One</sgds-tab>
  <sgds-tab slot="nav" panel="tab2" active>Tab Two (starts active)</sgds-tab>
  <sgds-tab-panel name="tab1">Content for tab one.</sgds-tab-panel>
  <sgds-tab-panel name="tab2">Content for tab two.</sgds-tab-panel>
</sgds-tab-group>

<!-- Vertical orientation -->
<sgds-tab-group orientation="vertical">
  <sgds-tab slot="nav" panel="section1">Section 1</sgds-tab>
  <sgds-tab slot="nav" panel="section2">Section 2</sgds-tab>
  <sgds-tab-panel name="section1">Section 1 content.</sgds-tab-panel>
  <sgds-tab-panel name="section2">Section 2 content.</sgds-tab-panel>
</sgds-tab-group>

<!-- Listen to tab change -->
<sgds-tab-group id="my-tabs">
  <sgds-tab slot="nav" panel="a">Tab A</sgds-tab>
  <sgds-tab slot="nav" panel="b">Tab B</sgds-tab>
  <sgds-tab-panel name="a">Content A</sgds-tab-panel>
  <sgds-tab-panel name="b">Content B</sgds-tab-panel>
</sgds-tab-group>

<script>
  document.getElementById("my-tabs").addEventListener("sgds-tab-show", e => {
    console.log("Active tab:", e.detail.name);
  });
</script>
```

## API Summary

### `<sgds-tab-group>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `underlined \| solid` | `underlined` | Visual style of the tab list |
| `orientation` | `horizontal \| vertical` | `horizontal` | Layout direction of the tabs |
| `density` | `default \| compact` | `default` | Spacing of the tab items |

### `<sgds-tab>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `panel` | string | `""` | **Required** — must match the `name` of a `<sgds-tab-panel>` |
| `active` | boolean | `false` | Sets this tab as active on initial load |
| `disabled` | boolean | `false` | Prevents the tab from being selected |

### `<sgds-tab-panel>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `name` | string | — | **Required** — must match the `panel` of a `<sgds-tab>` |

## Slots

| Component | Slot | Purpose |
|---|---|---|
| `<sgds-tab-group>` | `nav` | `<sgds-tab>` elements go here |
| `<sgds-tab-group>` | *(default)* | `<sgds-tab-panel>` elements go here |
| `<sgds-tab>` | *(default)* | Tab label text |
| `<sgds-tab-panel>` | *(default)* | Tab panel content |

## Events (`<sgds-tab-group>`)

| Event | Cancelable | Detail | When |
|---|---|---|---|
| `sgds-tab-show` | No | `{ name: string }` | A tab and its panel are shown |
| `sgds-tab-hide` | No | `{ name: string }` | A tab and its panel are hidden |

---

**For AI agents**:
1. `<sgds-tab>` must have `slot="nav"` and its `panel` must exactly match a `<sgds-tab-panel>`'s `name`.
2. `variant`, `orientation`, and `density` are set on `<sgds-tab-group>` — they propagate automatically to all child `<sgds-tab>` elements.
3. `sgds-tab-show` and `sgds-tab-hide` both carry `event.detail.name` which is the panel name string.
4. To set the initially active tab, add `active` to one `<sgds-tab>` — if none are active, the first non-disabled tab is selected.
5. There are no public methods on the tab group.
