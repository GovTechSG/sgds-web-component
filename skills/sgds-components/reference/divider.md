# SGDS Divider Component Skill

`<sgds-divider>` renders a separator line to visually group or divide adjacent content. Use it instead of a native `<hr>` whenever SGDS consistent styling is needed.

## Component Definition

The Divider component renders a horizontal or vertical separator line to visually separate or group adjacent sections of content. It is a non-interactive, presentational element used to improve layout clarity and readability.

## Purpose

- Visually separate distinct sections of content.
- Improve scannability by creating clear groupings.
- Provide consistent separator styling aligned with the SGDS design system.

## Usage Guideline

### When to use

- Between rows of content to separate sections (e.g. between form groups, list items, or card sections).
- Between side-by-side columns to visually divide regions — use `orientation="vertical"`.
- As a structural aid when whitespace alone is insufficient to communicate separation.

### When NOT to use

- As a decorative element with no semantic meaning — avoid overusing dividers simply to add visual interest.
- To replace adequate whitespace or padding; prefer spacing over lines when content is already well-separated.
- Inside tightly compact layouts where the divider reduces rather than improves readability.
- Do not use a raw `<hr>` or border utility — always use `<sgds-divider>` for consistent SGDS styling.

## Behaviour

- Renders as a horizontal line by default (`orientation="horizontal"`).
- Set `orientation="vertical"` for a vertical separator — requires a flex or grid parent with an explicit `height`, otherwise the divider collapses to zero height.
- `thickness` controls the visual weight: `thin` (default), `thick`, or `thicker`.
- `role="separator"` and `aria-orientation` are set automatically — do not add them manually.
- The component has no interactive states, slots, events, or public methods.

## Content Guideline

- Dividers are purely visual; they carry no text content.
- Do not place text or other elements inside `<sgds-divider>` — it has no slots.
- Rely on surrounding labels or headings to communicate the meaning of the separation, not the divider itself.

## Interaction Guideline

- The divider is non-interactive and non-focusable.
- Screen readers will announce it as a separator via the automatic `role="separator"` — no additional ARIA attributes are needed.
- Ensure sufficient spacing above and below the divider to make the separation visually clear on all screen sizes.

## Best Practices

**Do**
- Use `<sgds-divider>` as a semantic separator between meaningfully distinct content groups.
- Use `orientation="vertical"` to divide side-by-side columns inside a flex or grid container.
- Choose `thickness` based on the visual hierarchy needed: `thin` for subtle separation, `thicker` for strong section breaks.
- Ensure the parent container has an explicit `height` whenever `orientation="vertical"` is used.

**Don't**
- Overuse dividers — too many separators reduce rather than improve clarity.
- Use a raw `<hr>` or CSS border utilities instead of `<sgds-divider>`.
- Place content inside `<sgds-divider>` — it has no slots.
- Add `role`, `aria-orientation`, or other ARIA attributes manually — they are set automatically.

## Common Use Cases

- Separating sections within a card or panel.
- Dividing items in a navigation menu or list.
- Separating form sections (e.g. personal details vs. contact details).
- Dividing columns in a two-panel or sidebar layout using `orientation="vertical"`.
- Separating footer links or metadata rows.

## Advanced Considerations

- **Vertical divider height**: the divider has no intrinsic height when vertical — always ensure the parent has `display: flex` (or `display: grid`) and an explicit `height`.
- **Thickness scale**: use `thin` (default) for subtle in-context separators, `thick` for moderate section boundaries, and `thicker` for strong top-level section breaks.
- **No CSS parts exposed**: no custom properties or CSS parts are available — styling is fixed by the design system.

## Edge Cases

- **Vertical divider collapses**: if a `vertical` divider appears invisible, the parent container likely has no explicit `height` — add `height` to the parent or set it via flex/grid sizing.
- **Nested dividers**: avoid nesting dividers or placing them inside components that already manage their own internal separation (e.g. inside table cells).
- **Responsive layouts**: a vertical divider in a responsive column that wraps to a stacked layout will remain vertical — consider switching to horizontal via a conditional attribute if the layout changes orientation.

## Quick Decision Guide

**Which `orientation`?**
- Separates stacked rows of content → `horizontal` (default)
- Separates side-by-side columns → `vertical`

> Vertical dividers require an explicit height on the parent container. Without one, a vertical divider collapses to zero height.

**Which `thickness`?**
- Subtle separator → `thin` (default)
- Moderate emphasis → `thick`
- Strong emphasis → `thicker`

```html
<!-- Default horizontal divider -->
<sgds-divider></sgds-divider>

<!-- Thicker horizontal divider -->
<sgds-divider thickness="thicker"></sgds-divider>

<!-- Vertical divider — parent must have an explicit height -->
<div style="display: flex; height: 100px;">
  <sgds-divider orientation="vertical"></sgds-divider>
</div>

<!-- Vertical with thickness -->
<div style="display: flex; height: 100px;">
  <sgds-divider orientation="vertical" thickness="thick"></sgds-divider>
</div>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `orientation` | `horizontal \| vertical` | `horizontal` | Direction of the separator line |
| `thickness` | `thin \| thick \| thicker` | `thin` | Visual weight of the line |

## Slots

None.

## Events

None.

---

**For AI agents**:
1. Always use `<sgds-divider>` for separator lines — do not suggest raw `<hr>` elements or border utilities.
2. Vertical dividers require a flex or grid parent with an explicit `height`; warn users when they request `orientation="vertical"` without mentioning a container height.
3. `role="separator"` and `aria-orientation` are set automatically — never add them manually.
4. There are no slots, events, or public methods on this component.
5. When dividing columns, use `orientation="vertical"`; when dividing rows, use the default `orientation="horizontal"`.
