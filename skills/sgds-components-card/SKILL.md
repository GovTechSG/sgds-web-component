---
name: "sgds-components-card"
description: "Use the sgds-card web component to display content in a card container with image, icon, title, description, and footer areas. Apply this skill whenever a user asks about cards, content cards, image cards with text, stretched link cards, card orientation, or card layout in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Card Component Skill

`<sgds-card>` is a general-purpose content card supporting images, icons, titles, descriptions, and a footer link area. For image-forward cards with overlays use `<sgds-image-card>`; for icon-led cards use `<sgds-icon-card>`; for thumbnail cards use `<sgds-thumbnail-card>`.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Quick Decision Guide

**Which card type?**
- General content with image or icon → `<sgds-card>` (this component)
- Image-forward with badge/action overlays → `<sgds-image-card>`
- Icon-led vertically centered layout → `<sgds-icon-card>`
- Small thumbnail image beside content → `<sgds-thumbnail-card>`

**Orientation?**
- Image/icon stacked above content → `vertical` (default)
- Image/icon beside content → `horizontal`

**Entire card clickable?**
- Add `stretchedLink` — the href is sourced automatically from the `<a>` inside the `footer` slot

**Image adjustment?**
- Default image sizing → `imageAdjustment="default"` (default)
- Padding around image → `imageAdjustment="padding around"`
- Fixed aspect ratio → `imageAdjustment="aspect ratio"`

```html
<!-- Basic image card -->
<sgds-card>
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="subtitle">SUBTITLE</span>
  <span slot="title">Card Title</span>
  <span slot="description">Some descriptive text about this card.</span>
  <sgds-link slot="footer">
    <a href="/page">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
  </sgds-link>
</sgds-card>

<!-- Icon card variant (icon instead of image) -->
<sgds-card>
  <sgds-icon slot="icon" name="placeholder" size="3-xl"></sgds-icon>
  <span slot="subtitle">SUBTITLE</span>
  <span slot="title">Icon Card</span>
  <span slot="description">Card with an icon instead of an image.</span>
  <sgds-link slot="footer">
    <a href="/page">Go somewhere <sgds-icon name="arrow-right"></sgds-icon></a>
  </sgds-link>
</sgds-card>

<!-- Horizontal orientation -->
<sgds-card orientation="horizontal">
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="title">Horizontal Card</span>
  <span slot="description">Image is placed beside the content.</span>
  <sgds-link slot="footer"><a href="#">Read more</a></sgds-link>
</sgds-card>

<!-- Stretched link — entire card is clickable -->
<sgds-card stretchedLink>
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="title">Clickable Card</span>
  <span slot="description">Clicking anywhere on the card navigates to the footer link.</span>
  <sgds-link slot="footer"><a href="/destination">Go somewhere</a></sgds-link>
</sgds-card>

<!-- Disabled state -->
<sgds-card disabled>
  <img slot="image" alt="Description" src="image.jpg" />
  <span slot="title">Disabled Card</span>
  <span slot="description">This card is not interactive.</span>
</sgds-card>

<!-- Tinted background -->
<sgds-card tinted>
  <span slot="title">Tinted Card</span>
  <span slot="description">Card with a tinted background.</span>
</sgds-card>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `orientation` | `vertical \| horizontal` | `vertical` | Image/icon above or beside content |
| `stretchedLink` | boolean | `false` | Makes entire card a link; href sourced from `footer` slot anchor |
| `disabled` | boolean | `false` | Applies disabled styling |
| `hideBorder` | boolean | `false` | Removes the card border |
| `tinted` | boolean | `false` | Applies a tinted background |
| `imagePosition` | `before \| after` | `before` | Image position relative to content |
| `imageAdjustment` | `default \| padding around \| aspect ratio` | `default` | How the image fills its container |

## Slots

| Slot | Purpose |
|---|---|
| `image` | Image or SVG element (single element only) |
| `icon` | Icon element (single element only; used when no image) |
| `upper` | Above subtitle; overrides the image/icon area |
| `menu` | Overflow/contextual menu (top-right corner) |
| `subtitle` | Subtitle text |
| `title` | Card title |
| `description` | Descriptive paragraph text |
| *(default)* | Additional content below the description |
| `lower` | Content below description (badges, metadata) |
| `footer` | Footer area — place `<sgds-link>` here for the card CTA |
| `link` | **Deprecated since 3.3.2** — use `footer` instead |

## Events

None.

---

**For AI agents**:
1. Always place the card CTA in the `footer` slot using `<sgds-link>` — the `link` slot is deprecated since 3.3.2.
2. For `stretchedLink`, the href is sourced from the `<a>` tag inside the `footer` slot — no `href` on the card itself.
3. Use `image` slot for images, `icon` slot for icons — they are mutually exclusive in layout; using both may produce unexpected results.
4. `imageAdjustment="aspect ratio"` and `imageAdjustment="padding around"` are string values with spaces — pass them exactly.
5. For specific card types (image-focused, icon-focused, thumbnail), prefer `<sgds-image-card>`, `<sgds-icon-card>`, or `<sgds-thumbnail-card>` respectively.
6. There are no custom events or public methods on this component.
