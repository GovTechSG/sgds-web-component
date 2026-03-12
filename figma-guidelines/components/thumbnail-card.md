# Thumbnail Card

**Purpose**: Compact card with a small thumbnail image alongside title and description. Suits lists of items like articles, documents, or products where images are secondary.

**Component**: `<sgds-thumbnail-card>`

---

## Usage

```html
<!-- Vertical thumbnail card (image on top) -->
<sgds-thumbnail-card>
  <img slot="image" src="thumbnail.jpg" alt="Item thumbnail" />
  <div slot="title">Item Title</div>
  <div slot="description">Brief item description.</div>
</sgds-thumbnail-card>

<!-- Horizontal (image left, content right) — default for thumbnails -->
<sgds-thumbnail-card orientation="horizontal">
  <img slot="image" src="doc-icon.jpg" alt="Document" />
  <div slot="title">Document Name</div>
  <div slot="description">PDF · 2.4 MB · Updated Jan 2024</div>
</sgds-thumbnail-card>

<!-- Clickable (stretched link) -->
<sgds-thumbnail-card stretchedLink>
  <img slot="image" src="article.jpg" alt="Article" />
  <div slot="title">
    <a href="/articles/123">Click the whole card</a>
  </div>
  <div slot="description">Published 15 January 2024</div>
</sgds-thumbnail-card>

<!-- With footer actions -->
<sgds-thumbnail-card>
  <img slot="image" src="product.jpg" alt="Product" />
  <div slot="title">Product Name</div>
  <div slot="description">$29.99</div>
  <div slot="footer">
    <sgds-button variant="primary" size="sm">Add to Cart</sgds-button>
  </div>
</sgds-thumbnail-card>

<!-- Disabled -->
<sgds-thumbnail-card disabled>
  <img slot="image" src="item.jpg" alt="Unavailable" />
  <div slot="title">Out of Stock</div>
  <div slot="description">Currently unavailable</div>
</sgds-thumbnail-card>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `horizontal` | Layout direction |
| `stretchedLink` | boolean | `false` | Stretches the first link in `title` to fill card |
| `disabled` | boolean | `false` | Applies disabled styling |
| `tinted` | boolean | `false` | Tinted background |
| `hideBorder` | boolean | `false` | Removes card border |
| `imageAdjustment` | `cover \| contain` | `cover` | Object-fit on the thumbnail |

## Slots

| Slot | Content |
|---|---|
| `image` | Thumbnail image (`<img>`) |
| `title` | Item heading |
| `description` | Supporting text |
| `footer` | Action area |
| `menu` | Overflow menu (top-right) |
