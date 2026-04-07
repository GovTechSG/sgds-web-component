# SGDS Icon List Component Skill

`<sgds-icon-list>` renders a list where each item is prefixed by an `<sgds-icon>`. Use it for feature highlights, summaries, or any list that benefits from an icon prefix.

## Usage Guideline

### When NOT to use

- For plain text lists with no icons — use a native `<ul>` or `<ol>` instead.
- For interactive list items (e.g. menu items, selectable options) — `<sgds-icon-list>` is non-interactive and presentational only.
- When list items require complex content (e.g. nested elements, buttons) — manage layout manually instead.

## Behaviour

- Renders a list container with each slotted `<div role="listitem">` displayed with an icon–text layout.
- `size` controls the text size of list items: `sm`, `md` (default), or `lg`.
- Icon size is **not** auto-scaled by `size` — it must be set explicitly on each `<sgds-icon>`: `sm→md`, `md→lg`, `lg→xl`.
- The component is non-interactive — it has no events or public methods.

## Advanced Considerations

- **Icon size mapping**: the size relationship between `<sgds-icon-list size>` and `<sgds-icon size>` is manual — always pair `sm→md`, `md→lg`, `lg→xl`. Mismatches cause visual misalignment.
- **Card integration**: `<sgds-icon-list>` is designed to work inside `<sgds-icon-card>`, `<sgds-image-card>`, and `<sgds-thumbnail-card>` — it slots naturally into the card's content area.
- **No CSS parts**: custom properties and CSS parts are not exposed — styling is fixed by the design system.

## Edge Cases

- **Missing icon size**: omitting `size` on `<sgds-icon>` when the list is `sm` or `lg` causes icon–text size mismatch — always set `size` explicitly.
- **Long item text**: wraps within the item; the icon aligns to the first line. Keep items concise for scannability.
- **Empty list**: rendering `<sgds-icon-list>` with no children produces an empty container — always include at least one `<div role="listitem">`.
- **Icon without name**: `<sgds-icon>` without a `name` attribute renders an empty space — always provide a valid icon name.

## Quick Decision Guide

**Each list item** must be a `<div role="listitem">` containing an `<sgds-icon>` followed by the item text.

**Icon size is not managed automatically** — set the icon `size` to match the list `size`:
- List `size="sm"` → use `<sgds-icon size="md">`
- List `size="md"` (default) → use `<sgds-icon>` (default `lg`)
- List `size="lg"` → use `<sgds-icon size="xl">`

```html
<!-- Default size -->
<sgds-icon-list>
  <div role="listitem"><sgds-icon name="check-circle-fill"></sgds-icon>Feature one</div>
  <div role="listitem"><sgds-icon name="check-circle-fill"></sgds-icon>Feature two</div>
  <div role="listitem"><sgds-icon name="check-circle-fill"></sgds-icon>Feature three</div>
</sgds-icon-list>

<!-- Small size — use size="md" on icons -->
<sgds-icon-list size="sm">
  <div role="listitem"><sgds-icon size="md" name="calendar"></sgds-icon>12 September</div>
  <div role="listitem"><sgds-icon size="md" name="laptop"></sgds-icon>Online</div>
</sgds-icon-list>

<!-- Large size — use size="xl" on icons -->
<sgds-icon-list size="lg">
  <div role="listitem"><sgds-icon size="xl" name="placeholder"></sgds-icon>Item one</div>
  <div role="listitem"><sgds-icon size="xl" name="placeholder"></sgds-icon>Item two</div>
</sgds-icon-list>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `size` | `sm \| md \| lg` | `md` | Controls text size of list items (does not auto-scale icon size) |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | `<div role="listitem">` elements, each containing an `<sgds-icon>` and item text |

## Events

None.

---

**For AI agents**:
1. Each item must be a `<div role="listitem">` — never use `<li>` or raw text.
2. Icon size is **not** auto-scaled from list `size` — always set icon `size` explicitly to match: `sm→md`, `md→lg` (default), `lg→xl`.
3. Place the `<sgds-icon>` before the text content inside each `<div role="listitem">`.
4. There are no custom events or public methods on this component.
5. `<sgds-icon-list>` is commonly used inside card components (`<sgds-icon-card>`, `<sgds-image-card>`, `<sgds-thumbnail-card>`) to display metadata like dates and locations.
