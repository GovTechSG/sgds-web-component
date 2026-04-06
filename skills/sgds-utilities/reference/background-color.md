# SGDS Background Color Utilities Skill

Helps developers use SGDS background color utilities that adapt to light/dark themes using semantic tokens.

## Core Concept

All SGDS background utilities use the `sgds:bg-{variant}-{modifier}` pattern with the `sgds:` prefix.

**Background colors are theme-aware** - they automatically adapt when toggling between day/night themes (unless using `fixed` variants).

## Token Categories Overview

### Component vs Page Level

**The most important distinction:**

- **Surface tokens** (contain "surface") = Component level (cards, badges, forms)
- **Non-surface tokens** = Page level (sections, full-width areas, body)

### Token Naming Pattern

All tokens follow: `sgds:bg-{semantic}-{level}-{emphasis}`

**Examples:**
- `sgds:bg-surface-default` - Component, no semantic meaning, default emphasis
- `sgds:bg-primary-surface-emphasis` - Component, primary brand color, strong emphasis
- `sgds:bg-success-default` - Page level, success color, default emphasis

### Foundational Backgrounds

**Component Level:**
- `surface-default` - Default component background (first choice)
- `surface-raised` - Differentiate from surface-default (badges on cards)
- `surface-emphasis` - Highlighted or active component state
- `surface-subtle` - De-emphasised component background
- `surface-muted` - Muted background (read-only, disabled)
- `surface-inverse` - Opposite theme color (dark in light theme)
- `surface-fixed-light/dark` - Never changes with theme (image overlays)

**Page Level:**
- `default` - Default page/body background
- `alternate` - Distinguish sections (create visual rhythm)
- `overlay` - Full-screen modal/drawer backdrops only
- `fixed-light/dark` - Page sections with fixed colors
- `translucent/subtle` - Semi-transparent (hover/active states)
- `transparent` - No visible color (maintain box model)

See **[`surface.md`](background-color/surface.md)** and **[`base.md`](background-color/base.md)** for detailed examples.

### Semantic Color Meanings

For full definitions of semantic categories (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`) and what each suffix modifier means (`default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`, `inverse`, `surface`, `alternate`, `overlay`, `translucent`, `transparent`), see **[color-semantics](color-semantics.md)**.

Each semantic color has these variants (background-specific):
- `{color}-default` — Page level, default emphasis
- `{color}-muted` — Reduced emphasis (page level)
- `{color}-surface-default` — Component level, standard
- `{color}-surface-emphasis` — Component level, strong
- `{color}-surface-muted` — Component level, subtle

See **[`semantic.md`](background-color/semantic.md)** for all eight color variants with detailed examples.

### Form Backgrounds

Form-specific tokens for inputs, selects, textareas only.

See **[`form.md`](background-color/form.md)** for details.

## Quick Decision Guide

Use this guide to quickly choose the right background token:

**Step 1: Component or Page?**
- Component (card, badge, form, panel) → Use `surface` tokens
- Page (section, body, full-width area) → Use non-`surface` tokens

**Step 2: Choose Base Token**

**For Components:**
- Default component bg → `sgds:bg-surface-default`
- Need differentiation (badge on card) → `sgds:bg-surface-raised`
- Want inverse look → `sgds:bg-surface-inverse`
- Over unchanging content (image) → `sgds:bg-surface-fixed-{light|dark}`
- Hover/active state → `sgds:bg-translucent` or `sgds:bg-subtle`
- Transparent but maintain box → `sgds:bg-transparent`

**For Pages:**
- Default page bg → `sgds:bg-default`
- Alternate section → `sgds:bg-alternate`
- Full-screen overlay → `sgds:bg-overlay`
- Fixed color section → `sgds:bg-fixed-{light|dark}`

**Step 3: Add Semantic Color (if needed)**
- Brand emphasis → `primary`
- Information/links → `accent`
- Positive feedback → `success`
- Negative feedback → `danger`
- Caution → `warning`
- No meaning, variety → `purple`, `cyan`
- No meaning, neutral → `neutral`

**Step 4: Adjust Emphasis**
- Strong emphasis → `-emphasis` (component only)
- Default emphasis → `-default`
- Reduced emphasis → `-muted`

## Reference Documentation

For detailed guidance on specific background color categories, see the following reference files:

### Foundational Backgrounds

**[`surface.md`](background-color/surface.md)** - Component-level surface backgrounds
Covers: `surface-default`, `surface-raised`, `surface-inverse`, `surface-fixed-light/dark`
Use for: Cards, panels, badges, raised components, image overlays

**[`base.md`](background-color/base.md)** - Page-level base backgrounds
Covers: `base-default`, `base-alternate`, `base-overlay`, `base-fixed-light/dark`, `base-translucent-*`
Use for: Page backgrounds, sections, modal backdrops, translucent overlays

### Brand & Informational Colors

**[`semantic.md`](background-color/semantic.md)** — All semantic color backgrounds in one file
Covers: `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral` — each with page-level and component-level (`surface`) variants
Use for: Any page section or component needing brand, state, or feedback color as background

### Form Specific

**[`form.md`](background-color/form.md)** - Form input backgrounds
Covers: `form-default`
Use for: Text inputs, textareas, select dropdowns, search boxes

---

**For AI Agents**: When users ask about background colors, **refer to the Token Usage Guidelines** and **consult the appropriate reference file** for detailed examples. Key principles:

1. **Surface tokens** = component level (cards, badges, forms)
2. **Non-surface tokens** = page level (sections, full-width areas)
3. **`surface-default`** is the default choice for any component
4. **`surface-raised`** when differentiating from component background (badges on cards)
5. **Fixed colors** only when content doesn't change with theme (images)
6. **Primary** = brand emphasis, **Accent** = informational/links, **Neutral** = no semantic meaning
7. **Muted** = reduce emphasis, **Emphasis** = increase attention
8. **Form colors** only for form components (checkboxes, inputs)
9. Always pair backgrounds with appropriate text colors for accessibility
10. Use `overlay` only for full-screen modal/drawer backdrops

When unsure, ask: "Is this component or page level?" then "What semantic meaning?" then choose the appropriate token from the guidelines and consult the reference file for the selected color category.
