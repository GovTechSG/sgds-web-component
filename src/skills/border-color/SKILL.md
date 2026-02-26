---
name: sgds-border-color
description: Teaches AI agents how to help developers use SGDS border color utilities with the sgds: prefix. Use when users ask about border colors, semantic borders, theme-aware borders, or colored card/component edges in SGDS designs.
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: border
---

# SGDS Border Color Utilities Skill

Helps developers apply theme-aware semantic border colors to components and containers.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

**Theme files required**: Border color utilities require both utility CSS and theme files (`day.css` and `night.css`) for theme-aware colors.

**Related skills**:
- **[border-width](../border-width/SKILL.md)** — Border thickness and side selection (`sgds:border`, `sgds:border-2`, `sgds:border-l-4`, etc.)
- **[border-radius](../border-radius/SKILL.md)** — Rounded corners (`sgds:rounded-lg`, `sgds:rounded-full`, etc.)

## Core Concept

All SGDS border color utilities use the `sgds:border-{semantic}-{modifier}` pattern with the `sgds:` prefix.

**Border colors are theme-aware** — they automatically adapt when toggling between day/night themes (unless using `fixed` variants).

**Border colors are component and container level only** — unlike background tokens, there is no page-level distinction.

## Token Categories Overview

### Token Naming Pattern

- `sgds:border-{modifier}` — Foundational borders (no semantic color)
- `sgds:border-{color}-{modifier}` — Semantic color borders

**Examples:**
- `sgds:border-default` — Standard neutral border
- `sgds:border-primary-default` — Brand-colored border, default emphasis
- `sgds:border-danger-emphasis` — Error border, strong emphasis

### Foundational Borders

- `default` — Standard border (first choice for cards, containers)
- `emphasis` — Strong, high-visibility border
- `muted` — Subtle, de-emphasized border
- `fixed-light` — Never changes with theme (always light)
- `fixed-dark` — Never changes with theme (always dark)
- `translucent` — Semi-transparent border
- `transparent` — Invisible border (preserves box model spacing)

See **[`base.md`](reference/base.md)** for detailed examples.

### Semantic Color Meanings

For full definitions of semantic categories (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`) and what each suffix modifier means (`default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`), see **[`color-semantics`](../color-semantics/SKILL.md)**.

Each semantic color has these variants:
- `{color}-default` — Standard emphasis
- `{color}-emphasis` — Strong, high-visibility
- `{color}-muted` — Subtle presence

See **[`primary.md`](reference/primary.md)**, **[`accent.md`](reference/accent.md)**, **[`success.md`](reference/success.md)**, **[`danger.md`](reference/danger.md)**, **[`warning.md`](reference/warning.md)**, **[`purple.md`](reference/purple.md)**, **[`cyan.md`](reference/cyan.md)**, **[`neutral.md`](reference/neutral.md)** for detailed usage.

### Form Borders

Form-specific tokens for `<input>`, `<select>`, `<textarea>`, and `<form>` elements only.

See **[`form.md`](reference/form.md)** for details.

## Quick Decision Guide

Use this guide to quickly choose the right border color token:

**Step 1: Choose Semantic Meaning**
- No special meaning, structural — `base` (use `sgds:border-default`)
- Brand / active / selected state → `primary`
- Informational / links → `accent`
- Positive feedback → `success`
- Negative feedback / error → `danger`
- Caution → `warning`
- Visual variety, no meaning → `purple`, `cyan`
- Equal importance, no meaning → `neutral`
- Form HTML elements → `form` tokens (see `form.md`)

**Step 2: Adjust Emphasis**
- Strong / high-visibility → `-emphasis`
- Standard → `-default`
- Subtle / reduced → `-muted`

**Step 3: Fixed or Theme-Aware?**
- Adapts to light/dark theme → use standard tokens
- Must always be light → `-fixed-light`
- Must always be dark → `-fixed-dark`

## Reference Documentation

For detailed guidance on specific border color categories, see the following reference files:

### Foundational Borders

**[`base.md`](reference/base.md)** — Neutral structural borders
Covers: `border-default`, `border-emphasis`, `border-muted`, `border-fixed-light/dark`, `border-translucent`, `border-transparent`
Use for: Cards, dividers, layout separators, row borders, invisible borders for spacing

### Brand & Informational Colors

**[`primary.md`](reference/primary.md)** — Brand color borders
Covers: `primary-default/emphasis/muted`
Use for: Active/selected states, brand-accented components, focus indicators, CTA containers

**[`accent.md`](reference/accent.md)** — Informational borders
Covers: `accent-default/emphasis/muted`
Use for: Info callouts, link-adjacent borders, non-urgent indicators

### State & Feedback Colors

**[`success.md`](reference/success.md)** — Positive feedback borders
Covers: `success-default/emphasis/muted`
Use for: Valid form fields, success alerts, completion indicators

**[`danger.md`](reference/danger.md)** — Error/negative feedback borders
Covers: `danger-default/emphasis/muted`
Use for: Invalid form fields, error alerts, destructive action borders

**[`warning.md`](reference/warning.md)** — Caution borders
Covers: `warning-default/emphasis/muted`
Use for: Warning alerts, fields requiring review, caution callouts

### Additional Colors

**[`purple.md`](reference/purple.md)** — Visual variety (no semantic meaning)
Covers: `purple-default/emphasis/muted`
Use for: Non-semantic category borders, visual differentiation, alternating with cyan

**[`cyan.md`](reference/cyan.md)** — Visual variety (no semantic meaning)
Covers: `cyan-default/emphasis/muted`
Use for: Non-semantic category borders, visual differentiation, alternating with purple

**[`neutral.md`](reference/neutral.md)** — Equal importance borders
Covers: `neutral-default/emphasis/muted`
Use for: Tags with equal importance, non-semantic groupings, uniform appearance

### Form Specific

**[`form.md`](reference/form.md)** — Form element borders
Covers: form default, disabled, and validation state tokens
Use for: `<input>`, `<select>`, `<textarea>`, `<form>` elements only

---

**For AI Agents**: When users ask about border colors, choose the right semantic category first, then consult the appropriate reference file for detailed examples. Key principles:

1. **All border colors** = component/container level (never page level)
2. **`border-default`** is the first choice for cards and generic containers
3. **`border-subtle`** for low-emphasis internal separators
4. **`border-transparent`** to maintain consistent sizing when toggling borders
5. **Semantic colors** should match the semantic of the parent component (e.g., `border-danger-default` on an error input)
6. **Muted** = reduce visual weight, **Emphasis** = increase prominence
7. **Form tokens** only for native HTML form elements
8. Always combine border color with a border-width class (`sgds:border`) — color alone produces no visible border
