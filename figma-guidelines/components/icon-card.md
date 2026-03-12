# Icon Card

**Purpose**: Icon-led content card. Use when the primary visual element is an icon (not a photo). Supports horizontal and vertical layouts.

**Component**: `<sgds-icon-card>`

---

## Usage

```html
<!-- Vertical icon card (default) -->
<sgds-icon-card>
  <sgds-icon slot="icon" name="file-earmark-text-fill" size="xl"></sgds-icon>
  <div slot="title">Document Library</div>
  <div slot="description">Access all your uploaded documents.</div>
</sgds-icon-card>

<!-- Horizontal layout (icon left, content right) -->
<sgds-icon-card orientation="horizontal">
  <sgds-icon slot="icon" name="shield-lock-fill" size="xl"></sgds-icon>
  <div slot="title">Security Settings</div>
  <div slot="description">Manage two-factor authentication.</div>
</sgds-icon-card>

<!-- No padding variant -->
<sgds-icon-card noPadding>
  <sgds-icon slot="icon" name="bell-fill" size="xl"></sgds-icon>
  <div slot="title">Notifications</div>
</sgds-icon-card>

<!-- Clickable (stretched link) -->
<sgds-icon-card stretchedLink>
  <sgds-icon slot="icon" name="arrow-right-circle-fill" size="xl"></sgds-icon>
  <div slot="title">
    <a href="/get-started">Get Started</a>
  </div>
  <div slot="description">Click anywhere on this card.</div>
</sgds-icon-card>

<!-- Disabled -->
<sgds-icon-card disabled>
  <sgds-icon slot="icon" name="lock-fill" size="xl"></sgds-icon>
  <div slot="title">Feature Locked</div>
  <div slot="description">Upgrade plan to access.</div>
</sgds-icon-card>

<!-- With footer actions -->
<sgds-icon-card>
  <sgds-icon slot="icon" name="bar-chart-fill" size="xl"></sgds-icon>
  <div slot="title">Analytics</div>
  <div slot="description">View your usage statistics.</div>
  <div slot="footer">
    <sgds-button variant="outline" size="sm">View Report</sgds-button>
  </div>
</sgds-icon-card>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Layout direction |
| `stretchedLink` | boolean | `false` | Stretches the first link in `title` slot to fill the card |
| `noPadding` | boolean | `false` | Removes card inner padding |
| `disabled` | boolean | `false` | Applies disabled styling |
| `hideBorder` | boolean | `false` | Removes card border |
| `tinted` | boolean | `false` | Tinted background |

## Slots

| Slot | Content |
|---|---|
| `icon` | Icon element (`<sgds-icon>`) |
| `title` | Card heading |
| `description` | Supporting text |
| `footer` | Footer actions |
| `menu` | Overflow menu (top-right) |
