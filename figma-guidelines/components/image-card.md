# Image Card

**Purpose**: Photo-led card with a prominent hero image. Supports overlay badges and action buttons on the image. Use for article listings, product showcases, media cards.

**Component**: `<sgds-image-card>`

---

## Usage

```html
<!-- Basic image card -->
<sgds-image-card>
  <img slot="image" src="article-photo.jpg" alt="Article cover" />
  <div slot="title">Article Title</div>
  <div slot="description">Short summary of the article content.</div>
</sgds-image-card>

<!-- With image badge (status label on top of image) -->
<sgds-image-card>
  <img slot="image" src="product.jpg" alt="Product" />
  <sgds-badge slot="image-badge" variant="success">New</sgds-badge>
  <div slot="title">Product Name</div>
  <div slot="description">Product short description.</div>
</sgds-image-card>

<!-- With image action button (overlay on image) -->
<sgds-image-card>
  <img slot="image" src="photo.jpg" alt="Photo" />
  <sgds-icon-button
    slot="image-action"
    name="heart-fill"
    label="Add to favourites">
  </sgds-icon-button>
  <div slot="title">Photo Title</div>
</sgds-image-card>

<!-- With footer actions -->
<sgds-image-card>
  <img slot="image" src="event.jpg" alt="Event" />
  <div slot="title">Upcoming Event</div>
  <div slot="description">Join us for this exciting event.</div>
  <div slot="footer">
    <sgds-button variant="primary" size="sm">Register</sgds-button>
    <sgds-button variant="ghost" size="sm">Learn More</sgds-button>
  </div>
</sgds-image-card>

<!-- Clickable card (stretched link) -->
<sgds-image-card stretchedLink>
  <img slot="image" src="news.jpg" alt="News" />
  <div slot="title">
    <a href="/news/story">Read the full story</a>
  </div>
  <div slot="description">Entire card is clickable.</div>
</sgds-image-card>

<!-- Horizontal layout -->
<sgds-image-card orientation="horizontal">
  <img slot="image" src="thumbnail.jpg" alt="Thumbnail" />
  <div slot="title">Horizontal Image Card</div>
  <div slot="description">Image on the left, content on the right.</div>
</sgds-image-card>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Layout direction |
| `stretchedLink` | boolean | `false` | Stretches the first link in `title` slot to fill the card |
| `imageAdjustment` | `cover \| contain` | `cover` | Object-fit for the image |
| `disabled` | boolean | `false` | Applies disabled styling |
| `tinted` | boolean | `false` | Tinted background |
| `hideBorder` | boolean | `false` | Removes card border |

## Slots

| Slot | Content |
|---|---|
| `image` | Hero image (`<img>`) |
| `image-badge` | Badge overlaid on the image (top-left) |
| `image-action` | Action button overlaid on the image (bottom-right) |
| `title` | Card heading |
| `description` | Supporting text |
| `footer` | Footer action area |
| `menu` | Overflow menu (top-right of card) |
