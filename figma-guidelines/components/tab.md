# Tab

**Purpose**: Tabbed content areas for switching between related panels within the same page section. Use when content areas are mutually exclusive and labels can fit on one row.

**Components**: `<sgds-tab-group>` + `<sgds-tab>` + `<sgds-tab-panel>`

---

## Usage

```html
<!-- Basic tabs -->
<sgds-tab-group>
  <sgds-tab slot="nav" panel="overview">Overview</sgds-tab>
  <sgds-tab slot="nav" panel="features">Features</sgds-tab>
  <sgds-tab slot="nav" panel="pricing">Pricing</sgds-tab>

  <sgds-tab-panel name="overview">
    <p>Overview content here.</p>
  </sgds-tab-panel>
  <sgds-tab-panel name="features">
    <p>Features content here.</p>
  </sgds-tab-panel>
  <sgds-tab-panel name="pricing">
    <p>Pricing content here.</p>
  </sgds-tab-panel>
</sgds-tab-group>

<!-- Variants -->
<sgds-tab-group variant="underlined">
  <sgds-tab slot="nav" panel="tab1" active>Tab 1</sgds-tab>
  <sgds-tab slot="nav" panel="tab2">Tab 2</sgds-tab>
  <sgds-tab-panel name="tab1">Underlined tab content</sgds-tab-panel>
  <sgds-tab-panel name="tab2">Tab 2 content</sgds-tab-panel>
</sgds-tab-group>

<sgds-tab-group variant="solid">
  <sgds-tab slot="nav" panel="a" active>Tab A</sgds-tab>
  <sgds-tab slot="nav" panel="b">Tab B</sgds-tab>
  <sgds-tab-panel name="a">Solid tab content</sgds-tab-panel>
  <sgds-tab-panel name="b">Tab B content</sgds-tab-panel>
</sgds-tab-group>

<!-- Vertical orientation -->
<sgds-tab-group orientation="vertical">
  <sgds-tab slot="nav" panel="section1" active>Section 1</sgds-tab>
  <sgds-tab slot="nav" panel="section2">Section 2</sgds-tab>

  <sgds-tab-panel name="section1">Section 1 content.</sgds-tab-panel>
  <sgds-tab-panel name="section2">Section 2 content.</sgds-tab-panel>
</sgds-tab-group>

<!-- Density -->
<sgds-tab-group density="compact">
  <sgds-tab slot="nav" panel="x" active>Compact Tab</sgds-tab>
  <sgds-tab slot="nav" panel="y">Another Tab</sgds-tab>
  <sgds-tab-panel name="x">Compact content</sgds-tab-panel>
  <sgds-tab-panel name="y">More content</sgds-tab-panel>
</sgds-tab-group>

<!-- Disabled tab -->
<sgds-tab-group>
  <sgds-tab slot="nav" panel="enabled" active>Available</sgds-tab>
  <sgds-tab slot="nav" panel="locked" disabled>Locked</sgds-tab>
  <sgds-tab-panel name="enabled">Content</sgds-tab-panel>
  <sgds-tab-panel name="locked">This panel cannot be selected</sgds-tab-panel>
</sgds-tab-group>

<!-- Listen to tab change -->
<sgds-tab-group id="my-tabs">
  <sgds-tab slot="nav" panel="p1" active>Tab 1</sgds-tab>
  <sgds-tab slot="nav" panel="p2">Tab 2</sgds-tab>
  <sgds-tab-panel name="p1">Panel 1</sgds-tab-panel>
  <sgds-tab-panel name="p2">Panel 2</sgds-tab-panel>
</sgds-tab-group>
<script>
  document.getElementById("my-tabs").addEventListener("sgds-tab-show", (e) => {
    console.log("Active tab:", e.detail.name); // panel name value
  });
</script>
```

---

## `<sgds-tab-group>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `variant` | `underlined \| solid` | `underlined` | Tab visual style |
| `orientation` | `horizontal \| vertical` | `horizontal` | Layout direction |
| `density` | `default \| compact` | `default` | Tab spacing |

## `<sgds-tab>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `panel` | string | — | **Required** — must match the `name` of the corresponding `<sgds-tab-panel>` |
| `active` | boolean | `false` | Set on the initially active tab |
| `disabled` | boolean | `false` | Disables the tab |

## `<sgds-tab>` Slots

| Slot | Usage |
|---|---|
| `slot="nav"` | **Required** — tab triggers must go in the `nav` slot |
| *(default)* | Tab label text |

## `<sgds-tab-panel>` Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `name` | string | — | **Required** — must match the `panel` value on the corresponding `<sgds-tab>` |

## Events (`<sgds-tab-group>`)

| Event | Description |
|---|---|
| `sgds-tab-show` | Fires when a tab is activated. `event.detail.name` = panel name. |
| `sgds-tab-hide` | Fires when a tab is deactivated. `event.detail.name` = panel name. |

---

## Critical Rules

- The `panel` attribute on `<sgds-tab>` **must match** the `name` attribute on `<sgds-tab-panel>` — they are linked by this value.
- Always put `slot="nav"` on every `<sgds-tab>`.
- Mark one tab as `active` to set the default open tab.
