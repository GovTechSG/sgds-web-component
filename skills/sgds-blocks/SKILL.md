---
name: sgds-blocks
description: |
  Complete catalog of 39 reusable UI blocks for building full SGDS pages and sections. Use this skill whenever the user wants to build pages, design layouts, create sections, or compose multiple sections together. Trigger on ANY mention of: hero sections, CTAs (call-to-action), buttons with text, cards, card grids, feature sections, product benefits, statistics displays, metrics, page headers, page titles, filter interfaces, search filters, data tables, detail cards, session details, application details, forms, landing pages, dashboards, or any major page component. Also use for: "I need a filter", "build a form", "create a call to action", "design a landing page", "show statistics", "display details", or similar requests for page-level UI. Each block category (hero.md, cta.md, feature.md, stats.md, cards.md, header.md, details.md, filter.md, form.md) links directly to raw HTML templates for implementation.
compatibility: Requires sgds-utilities and sgds-components skills for prerequisite setup
---

# SGDS Blocks

This skill catalogs all reusable UI blocks available in SGDS. Blocks are complete, production-ready sections that combine SGDS components and utilities to create larger page elements.

## When to Use This Skill

Use this skill whenever you need to:
- Build a **hero section** (full-bleed, with/without images, centered, light backgrounds)
- Create a **CTA (Call-To-Action) block** (primary, raised, alternate, centered, contained, or full-bleed)
- Design a **feature section** (with images, components, cards, various grid ratios)
- Display **statistics/metrics** (3, 4, 5, or 6 columns, with right-aligned options)
- Build a **data table with filters** or **search interface**
- Create a **page header** (with/without breadcrumbs)
- Design a **details/session card**
- Build a **card grid** (3-column or 4-column layouts)
- Create any **full-page or major section layout** in SGDS

## Prerequisites

Before implementing any block, ensure you have:

1. **sgds-getting-started**: Initial application setup (Inter font, foundation CSS imports, component registration)
2. **sgds-utilities**: Understanding of SGDS utility classes (spacing, grid, typography, color, etc.)
3. **sgds-components**: Knowledge of SGDS web components used within blocks

Refer to these skills before asking how to implement a block.

## Current Blocks

39 production-ready blocks organized by functional purpose. Use the category links below to find specific blocks:

- **[Hero](./references/hero.md)** (6): Hero sections with multiple layout and background options
- **[Feature](./references/feature.md)** (11): Feature showcase sections with image/component positioning and grid ratios
- **[CTA](./references/cta.md)** (8): Call-to-action sections with multiple style and alignment options
- **[Stats](./references/stats.md)** (5): Statistics/metrics display with multiple column counts
- **[Cards](./references/cards.md)** (2): Grid layouts for card components
- **[Header](./references/header.md)** (2): Page headers with optional breadcrumbs
- **[Details](./references/details.md)** (2): Detail cards and session information displays
- **[Filter](./references/filter.md)** (2): Filter interfaces and filter sidebars
- **[Form](./references/form.md)** (1): Shared form component at root level

## How to Use a Block

1. **Find the block** you need using the category links above or by referencing the specific category files
2. **Get the raw HTML template** from the GitHub URL (e.g., `https://raw.githubusercontent.com/GovTechSG/sgds-web-component/refs/heads/master/stories/blocks/hero/hero-center.stories.js`)
3. **Extract the template** (the `const XxxTemplate = () => html\`....\`` part) — this is the markup to implement
4. **Adapt to your content** — replace placeholder text and adjust SGDS utility classes as needed
5. **Combine with other blocks** to create full pages (e.g., Header + Hero + Feature + CTA + Footer)

## Block Naming Convention

Block files follow this naming scheme:

```
stories/blocks/[Category]/[BlockName]-[variant].stories.js
```

Or at root level:

```
stories/blocks/[BlockName].stories.js
```

Examples:
- `hero/hero-center.stories.js` → Hero section, center-aligned
- `cards/cards-3.stories.js` → Card grid, 3-column layout
- `cta/fullbleed-primary.stories.js` → Full-bleed CTA, primary style
- `stats/stats-3.stories.js` → Statistics display, 3 columns
- `form.stories.js` → Root-level form component

Variants indicate:
- **Layout**: `-center`, `-left` (alignment)
- **Style**: `-primary`, `-raised`, `-alternate` (visual style)
- **Grid**: `-3`, `-4` (column count)
- **Image position**: `-img-left`, `-img-right` (image placement)
- **Size**: `-lg`, `-md`, `-sm` (sizing variants)

---

## Integration Example

Here's how to build a simple landing page using blocks:

```html
<!-- Import SGDS foundation styles and components -->
<link rel="stylesheet" href="@govtechsg/sgds-web-component/lib/index.css" />
<script type="module" src="@govtechsg/sgds-web-component/lib/index.js"></script>

<!-- Hero Section -->
<!-- Template from: stories/blocks/hero/hero-center.stories.js -->
<section class="sgds:bg-surface-light sgds:py-2xl">
  <!-- Hero block markup here -->
</section>

<!-- Feature Section -->
<!-- Template from: stories/blocks/feature/feature-6-6-img-left.stories.js -->
<section class="sgds:py-2xl">
  <!-- Feature block markup here -->
</section>

<!-- CTA Section -->
<!-- Template from: stories/blocks/cta/fullbleed-primary.stories.js -->
<section class="sgds:bg-primary-default sgds:py-2xl">
  <!-- CTA block markup here -->
</section>

<!-- Stats Section -->
<!-- Template from: stories/blocks/stats/stats-4.stories.js -->
<section class="sgds:py-2xl">
  <!-- Stats block markup here -->
</section>
```

Combine blocks to create complete pages, adjusting spacing and styling as needed.

---

## Accessing Block Files

All blocks are stored in the repository at `stories/blocks/` and available on GitHub. Use the category reference files above to find the exact URL for any block:

```
https://raw.githubusercontent.com/GovTechSG/sgds-web-component/refs/heads/master/stories/blocks/[Category]/[BlockName].stories.js
```

Each category reference file contains a table with direct links to all blocks in that category.
