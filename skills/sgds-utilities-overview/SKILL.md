---
name: sgds-utilities-overview
description: "Overview of all SGDS utility classes available with the sgds: prefix. Apply this skill for general utility class questions or when the specific category is unclear. For specialized help, refer to category-specific skills: utilities-setup, utilities-spacing, utilities-color-semantics, utilities-background-color, utilities-text-color, utilities-border-color, utilities-border-width, utilities-border-radius, utilities-typography, utilities-opacity."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: overview
---

# SGDS Utilities Overview Skill

The skills in this category represent the **foundational styles** of the Singapore Government Design System (SGDS) — covering spacing, color, typography, borders, and visual effects as defined in the design system's token architecture.

From a **developer perspective**, these foundational styles are exposed as the **Utilities API**: a set of atomic classes powered by Tailwind v4, scoped under the `sgds:` prefix. Developers apply SGDS design decisions directly in markup using this syntax rather than writing custom CSS.

## Getting Started

**First**: Complete setup using the **sgds-utilities-setup** skill.

All SGDS utility classes use the `sgds:` prefix (Tailwind v4 @theme syntax):

```html
<!-- ✅ Correct -->
<div class="sgds:p-4 sgds:bg-primary-default sgds:text-white">Content</div>

<!-- ❌ Wrong - missing prefix -->
<div class="p-4 bg-primary-default text-white">Content</div>
```

## Utility Categories

SGDS utilities are organized into specialized categories. For detailed information, refer to the category-specific skills:

### **sgds-utilities-setup** ⭐ Start Here
Setup instructions for importing utility CSS and theme files.

**Required for all utilities.**

---

### **sgds-utilities-spacing** - Spacing Utilities
Margin, padding, and gap utilities based on the 4px scale system.

```html
<div class="sgds:p-6 sgds:m-4 sgds:flex sgds:gap-4">
  Padding, margin, and gap
</div>
```

**Common patterns**:
- `sgds:p-{n}`, `sgds:px-{n}`, `sgds:py-{n}` - Padding
- `sgds:m-{n}`, `sgds:mx-{n}`, `sgds:my-{n}` - Margin
- `sgds:gap-{n}`, `sgds:gap-x-{n}`, `sgds:gap-y-{n}` - Gap
- **Base unit**: Value in pixels = multiplier × 4px

**Theme files**: Not required

---

### **sgds-utilities-color-semantics** - Color Token Suffix Reference
Shared definitions for suffix modifiers (`default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`, `inverse`, `surface`, etc.) used across all color skills.

**Use when**: unsure what a color token suffix means, or implementing a new color skill.

---

### **sgds-utilities-background-color** - Background Colors
Theme-aware background colors for surfaces, pages, and semantic states.

```html
<div class="sgds:bg-surface-raised sgds:bg-primary-default">
  Background colors
</div>
```

**Common patterns**:
- `sgds:bg-surface-{variant}` - Surface colors
- `sgds:bg-{color}-default` - Solid semantic colors
- `sgds:bg-{color}-surface-{modifier}` - Tinted surfaces
- `sgds:bg-fixed-{light|dark}` - Fixed colors

**Theme files**: Required

---

### **sgds-utilities-text-color** - Text Colors
Theme-aware text colors for content hierarchy and semantic states.

```html
<p class="sgds:text-default sgds:text-primary-default">
  Text colors
</p>
```

**Common patterns**:
- `sgds:text-default`, `sgds:text-subtle`, `sgds:text-muted` - Content hierarchy
- `sgds:text-{color}-default` - Semantic text colors
- `sgds:text-{typography}-default` - Typography-specific colors
- `sgds:text-fixed-{light|dark}` - Fixed colors

**Theme files**: Required

---

### **sgds-utilities-border-color** - Border Colors
Theme-aware semantic border colors for components and containers.

```html
<div class="sgds:border sgds:border-default">Standard border</div>
<div class="sgds:border sgds:border-primary-default">Brand border</div>
<div class="sgds:border sgds:border-danger-default">Error border</div>
```

**Common patterns**:
- `sgds:border-default` / `sgds:border-emphasis` / `sgds:border-muted` - Base borders
- `sgds:border-{color}-default` - Semantic border colors
- `sgds:border-transparent` - Invisible border (preserves spacing)

**Theme files**: Required

---

### **sgds-utilities-border-width** - Border Width
Border thickness and side selection.

```html
<div class="sgds:border-2">2px all sides</div>
<div class="sgds:border-l-4">4px left side</div>
<div class="sgds:border-b">1px bottom only</div>
```

**Common patterns**:
- `sgds:border`, `sgds:border-{n}` - All sides (0, 2, 4, 8)
- `sgds:border-{side}` - One side (t, r, b, l)
- `sgds:border-{side}-{n}` - Specific width per side

**Theme files**: Not required

---

### **sgds-utilities-border-radius** - Border Radius
Rounded corners for components and interactive elements.

```html
<div class="sgds:rounded-lg">Card (8px)</div>
<span class="sgds:rounded-full">Badge / pill</span>
<img class="sgds:rounded-full sgds:w-12 sgds:h-12" src="avatar.jpg">
```

**Common patterns**:
- `sgds:rounded-{size}` - All corners (sm, md, lg, xl, 2-xl, 3-xl, full)
- `sgds:rounded-{side}-{size}` - Top/bottom/left/right corners
- `sgds:rounded-full` - Pill shape or circle

**Theme files**: Not required

---

### **sgds-utilities-typography** - Typography Utilities
Font sizes, weights, line heights, and letter spacing.

```html
<h1 class="sgds:text-3-xl sgds:font-bold sgds:leading-tight">
  Typography utilities
</h1>
```

**Common patterns**:
- `sgds:text-{size}` - Font sizes (xs to 9-xl)
- `sgds:font-{weight}` - Font weights (thin to black)
- `sgds:leading-{size}` - Line heights
- `sgds:tracking-{size}` - Letter spacing

**Theme files**: Not required

---

### **sgds-utilities-opacity** - Opacity Utilities
Transparency levels for overlays, disabled states, and effects.

```html
<div class="sgds:opacity-50 sgds:opacity-80">
  Opacity utilities
</div>
```

**Common patterns**:
- `sgds:opacity-{value}` - Opacity levels (0-100)
- Common values: 0, 10, 25, 50, 75, 100

**Theme files**: Not required

---

## Quick Reference by Use Case

**Layout & Spacing**: → **sgds-utilities-spacing** skill  
**Color Token Suffixes (default, emphasis, muted, etc.)**: → **sgds-utilities-color-semantics** skill  
**Card Backgrounds**: → **sgds-utilities-background-color** skill  
**Text Content**: → **sgds-utilities-text-color** skill  
**Borders & Rounded Corners**: → **sgds-utilities-border-color**, **sgds-utilities-border-width**, **sgds-utilities-border-radius** skills  
**Headings & Text Sizes**: → **sgds-utilities-typography** skill  
**Transparent Overlays**: → **sgds-utilities-opacity** skill  
**Setup Issues**: → **sgds-utilities-setup** skill

---

**For AI Agents**: Use this overview to direct users to specific category skills. Always ensure setup is complete before troubleshooting. Suggest complete component patterns that combine multiple utility categories.
