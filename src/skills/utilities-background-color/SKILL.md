---
name: sgds-utilities-background-color
description: "Use SGDS background color utilities with the sgds: prefix for theme-aware surface colors and color tokens. Apply this skill whenever a user asks about background colors, surface colors, theme-aware backgrounds, or background color tokens in SGDS designs."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external

  category: color
---

# SGDS Background Color Utilities Skill

Helps developers use SGDS background color utilities that adapt to light/dark themes using semantic tokens.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

**Theme files required**: Background color utilities require both utility CSS and theme files (`day.css` and `night.css`) for theme-aware colors.

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
- `surface-inverse` - Opposite theme color (dark in light theme)
- `surface-fixed-light/dark` - Never changes with theme (image overlays)

**Page Level:**
- `default` - Default page/body background
- `alternate` - Distinguish sections (create visual rhythm)
- `overlay` - Full-screen modal/drawer backdrops only
- `fixed-light/dark` - Page sections with fixed colors
- `translucent/subtle` - Semi-transparent (hover/active states)
- `transparent` - No visible color (maintain box model)

See **[`surface.md`](reference/surface.md)** and **[`base.md`](reference/base.md)** for detailed examples.

### Semantic Color Meanings

For full definitions of semantic categories (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`) and what each suffix modifier means (`default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`, `inverse`, `surface`, `alternate`, `overlay`, `translucent`, `transparent`), see **[`utilities-color-semantics`](../utilities-color-semantics/SKILL.md)**.

Each semantic color has these variants (background-specific):
- `{color}-default` — Page level, default emphasis
- `{color}-muted` — Reduced emphasis (page level)
- `{color}-surface-default` — Component level, standard
- `{color}-surface-emphasis` — Component level, strong
- `{color}-surface-muted` — Component level, subtle

See **[`primary.md`](reference/primary.md)**, **[`accent.md`](reference/accent.md)**, **[`success.md`](reference/success.md)**, **[`danger.md`](reference/danger.md)**, **[`warning.md`](reference/warning.md)**, **[`purple.md`](reference/purple.md)**, **[`cyan.md`](reference/cyan.md)**, **[`neutral.md`](reference/neutral.md)** for detailed usage.

### Form Backgrounds

Form-specific tokens for inputs, selects, textareas only.

See **[`form.md`](reference/form.md)** for details.

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

**[`surface.md`](reference/surface.md)** - Component-level surface backgrounds  
Covers: `surface-default`, `surface-raised`, `surface-inverse`, `surface-fixed-light/dark`  
Use for: Cards, panels, badges, raised components, image overlays

**[`base.md`](reference/base.md)** - Page-level base backgrounds  
Covers: `base-default`, `base-alternate`, `base-overlay`, `base-fixed-light/dark`, `base-translucent-*`  
Use for: Page backgrounds, sections, modal backdrops, translucent overlays

### Brand & Informational Colors

**[`primary.md`](reference/primary.md)** - Brand color backgrounds  
Covers: `primary-default/muted`, `primary-surface-default/emphasis/muted`  
Use for: Hero sections, CTAs, brand emphasis, primary actions

**[`accent.md`](reference/accent.md)** - Informational backgrounds   
Covers: `accent-default/muted`, `accent-surface-default/emphasis/muted`  
Use for: Informational content, links, info banners, non-urgent notices

### State & Feedback Colors

**[`success.md`](reference/success.md)** - Positive feedback backgrounds  
Covers: `success-default/muted`, `success-surface-default/emphasis/muted`  
Use for: Success messages, form validation, completion states, positive badges

**[`danger.md`](reference/danger.md)** - Error/negative feedback backgrounds  
Covers: `danger-default/muted`, `danger-surface-default/emphasis/muted`  
Use for: Error alerts, failed states, destructive actions, critical warnings

**[`warning.md`](reference/warning.md)** - Caution backgrounds  
Covers: `warning-default/muted`, `warning-surface-default/emphasis/muted`  
Use for: Warning messages, caution notices, actions requiring review

### Additional Colors

**[`purple.md`](reference/purple.md)** - Visual variety color (no semantic meaning)  
Covers: `purple-default/muted`, `purple-surface-default/emphasis/muted`  
Use for: Non-semantic tags, visual differentiation, decorative accents

**[`cyan.md`](reference/cyan.md)** - Visual variety color (no semantic meaning)  
Covers: `cyan-default/muted`, `cyan-surface-default/emphasis/muted`  
Use for: Non-semantic tags, visual differentiation, alternating with purple

**[`neutral.md`](reference/neutral.md)** - Equal importance backgrounds  
Covers: `neutral-surface-default/emphasis/muted`  
Use for: Tags with equal importance, non-semantic categorization, uniform appearance

### Form Specific

**[`form.md`](reference/form.md)** - Form input backgrounds  
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

