---
name: sgds-utilities-color-semantics
description: "Shared definitions for color token suffix modifiers used across all SGDS color utility skills (background-color, border-color, text-color). Use when clarifying what default, emphasis, muted, fixed-light, fixed-dark, inverse, alternate, or surface means in the context of SGDS color tokens."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: color
---

# SGDS Color Token Suffix Semantics

Shared reference for suffix modifiers used consistently across all SGDS color utilities — background, border, and text.

## Semantic Color Categories

All color utilities share the same set of semantic category names:

| Category | Meaning |
|----------|---------|
| `primary` | Brand color — emphasis, identity |
| `accent` | Informational / links — neutral, no urgency |
| `success` | Positive feedback, completion |
| `danger` | Errors, destructive actions |
| `warning` | Caution, needs attention |
| `purple` | Visual variety — no semantic meaning |
| `cyan` | Visual variety — no semantic meaning |
| `neutral` | Equal importance — no differentiation |

**Purple and Cyan** are non-semantic alternatives used for visual variety. Use them when primary and accent colors are similar and you need a third distinguishable color, or when you want alternating colors without implying priority.

## Emphasis Modifiers

Applied to all semantic color tokens (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`):

### `default`
Balanced, standard appearance — the baseline.

- Use for typical states and common-frequency elements
- Neither draws maximum attention nor recedes into the background

### `emphasis`
Strong, high-visibility appearance.

- Use when the element must draw attention
- Maximum saturation/contrast within the color family
- For active states, call-to-action indicators, high-priority signals

### `muted`
Reduced, subtle appearance.

- Use when color should be present but not dominate
- Lower saturation or lighter tint
- For secondary information, inactive states, or low-priority indicators

**Emphasis progression (weakest → strongest):**

```
muted → default → emphasis
```

## Theme Behavior Modifiers

### `fixed-light`
**Always light — never changes with theme mode.**

- The color is locked to its light-mode value regardless of the user's current theme (day or night)
- Use when a specific region must always appear on a light surface — e.g., a section with a background image that requires light borders or text

### `fixed-dark`
**Always dark — never changes with theme mode.**

- The color is locked to its dark-mode value regardless of theme
- Use for regions that must always appear dark — e.g., a footer or hero that never inverts

### `inverse`
**Opposite of the current theme.**

- In light (day) mode → renders as dark
- In dark (night) mode → renders as light
- Use for high-contrast elements that should visually stand out from the surrounding theme background

## Transparency Modifiers

### `translucent`
Semi-transparent — allows underlying content to show through.

- Use for hover/active state overlays on buttons or interactive elements
- Use on elements layered over images or gradients where full opacity would look harsh

### `transparent`
Fully invisible — no visible color, but the element still occupies space.

- Use for outline-style components that need consistent sizing with their filled variants
- Maintains box model without rendering any color

## Background-Specific Modifiers

These modifiers exist only in background-color tokens:

### `alternate`
Second page-level background for creating visual rhythm.

- Alternate between `default` and `alternate` across page sections to create clear visual separation
- Neither value is "primary" — they are equals used for alternation

### `overlay`
Full-screen backdrop — never use on components.

- Exclusively for modal, drawer, and dialog backdrops
- Should always span the full viewport

### `surface`
**Component-level scope** — the key distinction from page-level tokens.

- Background tokens containing `surface` → scoped to components (cards, badges, panels, inputs)
- Background tokens without `surface` → scoped to page sections (body, section, full-width areas)
- Border and text tokens do not use `surface` — they apply at component/container level only

**Background level summary:**

| Token pattern | Scope |
|--------------|-------|
| `sgds:bg-{color}-default` | Page level |
| `sgds:bg-{color}-surface-default` | Component level |
| `sgds:bg-surface-default` | Component (foundational, no semantic color) |

## Quick Reference

| Modifier | Meaning | Changes with theme? |
|----------|---------|-------------------|
| `default` | Standard | ✅ Yes |
| `emphasis` | Strong | ✅ Yes |
| `muted` | Subtle | ✅ Yes |
| `fixed-light` | Always light | ❌ No |
| `fixed-dark` | Always dark | ❌ No |
| `inverse` | Opposite theme | ✅ Yes (inverted) |
| `translucent` | Semi-transparent | ✅ Yes |
| `transparent` | Invisible | N/A |
| `alternate` | Section rhythm (bg only) | ✅ Yes |
| `overlay` | Full-screen backdrop (bg only) | ✅ Yes |
| `surface` | Component scope (bg only) | ✅ Yes |

## See Also

- **[utilities-background-color](../sgds-utilities-background-color/SKILL.md)** — Background color utilities
- **[utilities-border-color](../sgds-utilities-border-color/SKILL.md)** — Border color, width, and radius utilities
- **[utilities-text-color](../sgds-utilities-text-color/SKILL.md)** — Text color utilities
