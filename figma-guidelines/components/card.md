# Card

**Purpose**: Display grouped content (image, icon, title, description, footer) in a card container. Variants exist for general content (`<sgds-card>`), icon-led (`<sgds-icon-card>`), image-led (`<sgds-image-card>`), thumbnail (`<sgds-thumbnail-card>`).

> This file covers the general-purpose `<sgds-card>`. See [icon-card.md](./icon-card.md), [image-card.md](./image-card.md), [thumbnail-card.md](./thumbnail-card.md) for specialised cards.

**Component**: `<sgds-card>`

---

## Usage

```html
<!-- Basic text card with title and description -->
<sgds-card>
  <div slot="title">Card Title</div>
  <div slot="description">Short supporting text goes here.</div>
</sgds-card>

<!-- Card with image header -->
<sgds-card imageAdjustment="cover">
  <img slot="image" src="photo.jpg" alt="Description" />
  <div slot="title">Image Card</div>
  <div slot="description">Content below the image.</div>
</sgds-card>

<!-- Card with icon and footer actions -->
<sgds-card>
  <sgds-icon slot="icon" name="file-earmark-text" size="lg"></sgds-icon>
  <div slot="title">Document Title</div>
  <div slot="description">Supporting description text.</div>
  <div slot="footer">
    <sgds-button variant="primary" size="sm">Open</sgds-button>
  </div>
</sgds-card>

<!-- Horizontal card -->
<sgds-card orientation="horizontal">
  <img slot="image" src="thumbnail.jpg" alt="Thumbnail" />
  <div slot="title">Horizontal Layout</div>
  <div slot="description">Image left, content right.</div>
</sgds-card>

<!-- Clickable card with stretched link -->
<sgds-card stretchedLink>
  <div slot="title">
    <a href="/details">Clickable Area</a>
  </div>
  <div slot="description">Entire card surface is clickable.</div>
</sgds-card>

<!-- Disabled -->
<sgds-card disabled>
  <div slot="title">Unavailable</div>
  <div slot="description">This card is not interactive.</div>
</sgds-card>

<!-- Tinted background, no border -->
<sgds-card tinted hideBorder>
  <div slot="title">Tinted Card</div>
  <div slot="description">No border, tinted background.</div>
</sgds-card>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Layout direction |
| `stretchedLink` | boolean | `false` | Stretches the first link in `title` slot to fill the whole card click area |
| `disabled` | boolean | `false` | Applies disabled styling |
| `tinted` | boolean | `false` | Tinted background |
| `hideBorder` | boolean | `false` | Removes card border |
| `imageAdjustment` | `cover \| contain` | `cover` | Object-fit for the image slot |

## Slots

| Slot | Content |
|---|---|
| `image` | Top image (`<img>`) |
| `icon` | Icon above the title |
| `subtitle` | Subtitle text |
| `title` | Main heading |
| `description` | Supporting body text |
| `lower` | Additional content below description |
| `footer` | Bottom action area (buttons, links) |
| `menu` | Overflow menu action (top-right) |

---

## Notes

- Do not use a deprecated `link` slot — use the `footer` slot for action links.
- For cards with only icons (no images), use `<sgds-icon-card>` instead.
- For cards with large hero images, use `<sgds-image-card>` instead.
