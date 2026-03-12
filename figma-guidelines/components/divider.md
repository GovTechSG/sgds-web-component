# Divider

**Purpose**: A visual separator between sections of content. Supports horizontal and vertical orientations with three thickness values.

**Component**: `<sgds-divider>`

---

## Usage

```html
<!-- Default horizontal divider -->
<sgds-divider></sgds-divider>

<!-- Thickness variants -->
<sgds-divider thickness="thin"></sgds-divider>
<sgds-divider thickness="thick"></sgds-divider>
<sgds-divider thickness="thicker"></sgds-divider>

<!-- Horizontal divider between sections -->
<p>First section content.</p>
<sgds-divider></sgds-divider>
<p>Second section content.</p>

<!-- Vertical divider — parent must have an explicit height -->
<div style="display: flex; align-items: stretch; height: 40px; gap: 8px;">
  <span>Item 1</span>
  <sgds-divider orientation="vertical"></sgds-divider>
  <span>Item 2</span>
  <sgds-divider orientation="vertical"></sgds-divider>
  <span>Item 3</span>
</div>
```

---

## Props

| Attribute | Type | Default | Description |
|---|---|---|---|
| `orientation` | `horizontal \| vertical` | `horizontal` | Direction of the divider |
| `thickness` | `thin \| thick \| thicker` | `thin` | Line thickness |

## Slots

None.

## Events

None.

---

## Notes

- Vertical dividers require the parent container to have a defined height and `display: flex`.
- Use `align-items: stretch` on the flex parent so the vertical divider fills the full height.
