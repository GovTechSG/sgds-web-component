---
name: sgds-border
description: Teaches AI agents how to help developers use SGDS border utilities (color, width, radius) with the sgds: prefix. Use when users ask about borders, border colors, rounded corners, border styles, or card edges in SGDS designs.
metadata:
  author: singapore-design-system
  version: "1.0.0"
  audience: external
  category: border
---

# SGDS Border Utilities Skill

Helps developers use SGDS border utilities including colors, widths, and border radius.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

**Theme files required for colors**: Border color utilities require theme files (`day.css` and `night.css`) for theme-aware colors. Border width and radius utilities work without theme files.

## Core Concept

All SGDS border utilities use the `sgds:` prefix with patterns like:
- `sgds:border-{color}` for colors
- `sgds:border-{width}` for widths
- `sgds:rounded-{size}` for border radius

## Border Width

Apply border width to elements:

```html
<!-- Single pixel border (all sides) -->
<div class="sgds:border">Default 1px border</div>

<!-- Specific widths -->
<div class="sgds:border-0">No border</div>
<div class="sgds:border-2">2px border</div>
<div class="sgds:border-4">4px border</div>
<div class="sgds:border-8">8px border</div>

<!-- Individual sides -->
<div class="sgds:border-t">Top border only</div>
<div class="sgds:border-r">Right border only</div>
<div class="sgds:border-b">Bottom border only</div>
<div class="sgds:border-l">Left border only</div>

<!-- Specific width per side -->
<div class="sgds:border-l-4 sgds:border-t">4px left, 1px top</div>
```

### Border Width Classes

- `sgds:border` - 1px all sides (default)
- `sgds:border-{n}` - n pixels all sides (0, 2, 4, 8)
- `sgds:border-{side}` - 1px specific side (t, r, b, l)
- `sgds:border-{side}-{n}` - n pixels specific side
- `sgds:border-x` - Horizontal borders
- `sgds:border-y` - Vertical borders

## Border Colors

### Semantic Border Colors

Theme-aware borders that adapt to light/dark mode:

```html
<!-- Standard borders -->
<div class="sgds:border sgds:border-default">Default border</div>
<div class="sgds:border sgds:border-emphasis">Emphasized border</div>
<div class="sgds:border sgds:border-muted">Muted border</div>
<div class="sgds:border sgds:border-subtle">Subtle border</div>
```

### Contextual Border Colors

```html
<!-- Primary borders -->
<div class="sgds:border sgds:border-primary-default">Primary border</div>
<div class="sgds:border sgds:border-primary-emphasis">Emphasized primary</div>

<!-- Success borders -->
<div class="sgds:border sgds:border-success-default">Success border</div>
<div class="sgds:border-2 sgds:border-success-emphasis">Thick success border</div>

<!-- Danger/Error borders -->
<div class="sgds:border sgds:border-danger-default">Error border</div>
<div class="sgds:border-l-4 sgds:border-danger-default">Left error indicator</div>

<!-- Warning borders -->
<div class="sgds:border sgds:border-warning-default">Warning border</div>

<!-- Accent borders -->
<div class="sgds:border sgds:border-accent-default">Accent border</div>
```

**Available variants**: `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`

**Border Modifiers**: `default`, `emphasis`, `muted`, `subtle`

### Transparent Border

```html
<!-- Transparent border (for spacing without visible border) -->
<div class="sgds:border sgds:border-transparent">
  Invisible border that maintains spacing
</div>
```

## Border Radius

Apply rounded corners to elements:

```html
<!-- Standard radius sizes -->
<div class="sgds:rounded-none">No border radius (square corners)</div>
<div class="sgds:rounded-sm">Small border radius (2px)</div>
<div class="sgds:rounded">Default border radius (4px)</div>
<div class="sgds:rounded-md">Medium border radius (6px)</div>
<div class="sgds:rounded-lg">Large border radius (8px)</div>
<div class="sgds:rounded-xl">Extra large border radius (12px)</div>
<div class="sgds:rounded-2-xl">2XL border radius (16px)</div>
<div class="sgds:rounded-3-xl">3XL border radius (24px)</div>

<!-- Full radius (pill shape) -->
<div class="sgds:rounded-full">Fully rounded (circle/pill)</div>

<!-- Individual corners -->
<div class="sgds:rounded-tl-lg">Top-left rounded</div>
<div class="sgds:rounded-tr-lg">Top-right rounded</div>
<div class="sgds:rounded-br-lg">Bottom-right rounded</div>
<div class="sgds:rounded-bl-lg">Bottom-left rounded</div>

<!-- Top/bottom edges -->
<div class="sgds:rounded-t-lg">Top corners rounded</div>
<div class="sgds:rounded-b-lg">Bottom corners rounded</div>
<div class="sgds:rounded-l-lg">Left corners rounded</div>
<div class="sgds:rounded-r-lg">Right corners rounded</div>
```

### Border Radius Classes

**Sizes**:
- `none` = 0px
- `sm` = 2px
- (default) = 4px
- `md` = 6px
- `lg` = 8px
- `xl` = 12px
- `2-xl` = 16px
- `3-xl` = 24px
- `full` = 9999px (circle/pill)

**Sides**:
- `rounded-{size}` - All corners
- `rounded-t-{size}` - Top corners
- `rounded-r-{size}` - Right corners
- `rounded-b-{size}` - Bottom corners
- `rounded-l-{size}` - Left corners
- `rounded-tl-{size}` - Top-left
- `rounded-tr-{size}` - Top-right
- `rounded-br-{size}` - Bottom-right
- `rounded-bl-{size}` - Bottom-left

## Common Use Cases

### Card Component

```html
<div class="sgds:bg-surface-raised sgds:border sgds:border-subtle sgds:rounded-lg sgds:p-6">
  <h3 class="sgds:text-heading-default sgds:mb-4">Card Title</h3>
  <p class="sgds:text-body-default">Card content</p>
</div>
```

### Alert Banners with Left Border

```html
<!-- Success alert -->
<div class="sgds:bg-success-surface-default sgds:border-l-4 sgds:border-success-default sgds:rounded sgds:p-4">
  <p class="sgds:text-success-default sgds:font-medium">Success message</p>
</div>

<!-- Warning alert -->
<div class="sgds:bg-warning-surface-default sgds:border-l-4 sgds:border-warning-default sgds:rounded sgds:p-4">
  <p class="sgds:text-warning-default sgds:font-medium">Warning message</p>
</div>

<!-- Error alert -->
<div class="sgds:bg-danger-surface-default sgds:border-l-4 sgds:border-danger-default sgds:rounded sgds:p-4">
  <p class="sgds:text-danger-default sgds:font-medium">Error message</p>
</div>
```

### Form Inputs

```html
<!-- Default input -->
<input class="sgds:border sgds:border-default sgds:rounded sgds:p-2 sgds:w-full" />

<!-- Success state -->
<input class="sgds:border-2 sgds:border-success-default sgds:rounded sgds:p-2 sgds:w-full" />

<!-- Error state -->
<input class="sgds:border-2 sgds:border-danger-default sgds:rounded sgds:p-2 sgds:w-full" />

<!-- Focus state (with pseudo-class) -->
<input class="sgds:border sgds:border-default focus:sgds:border-primary-default sgds:rounded sgds:p-2" />
```

### Buttons

```html
<!-- Primary button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:border sgds:border-transparent sgds:rounded sgds:px-4 sgds:py-2">
  Primary Button
</button>

<!-- Outline button -->
<button class="sgds:bg-transparent sgds:text-primary-default sgds:border sgds:border-primary-default sgds:rounded sgds:px-4 sgds:py-2">
  Outline Button
</button>

<!-- Pill button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:border sgds:border-transparent sgds:rounded-full sgds:px-6 sgds:py-2">
  Pill Button
</button>
```

### Badges

```html
<span class="sgds:bg-primary-surface-default sgds:text-primary-default sgds:border sgds:border-primary-default sgds:rounded-full sgds:px-3 sgds:py-1 sgds:text-sm">
  Badge with border
</span>

<span class="sgds:bg-success-surface-default sgds:text-success-default sgds:rounded-full sgds:px-3 sgds:py-1 sgds:text-sm">
  Badge without border
</span>
```

### Dividers

```html
<!-- Top border divider -->
<section class="sgds:border-t sgds:border-default sgds:pt-6">
  Section content below divider
</section>

<!-- Emphasized divider -->
<hr class="sgds:border-t-2 sgds:border-emphasis sgds:my-8">
```

### Avatar/Profile Image

```html
<!-- Circular avatar -->
<img src="avatar.jpg" class="sgds:w-12 sgds:h-12 sgds:rounded-full sgds:border-2 sgds:border-primary-default">

<!-- Rounded square avatar -->
<img src="avatar.jpg" class="sgds:w-12 sgds:h-12 sgds:rounded-lg sgds:border-2 sgds:border-default">
```

### Modal

```html
<div class="sgds:bg-surface-raised sgds:border sgds:border-subtle sgds:rounded-xl sgds:p-6 sgds:max-w-lg">
  <h2 class="sgds:text-heading-default sgds:mb-4">Modal Title</h2>
  <p class="sgds:text-body-default sgds:mb-6">Modal content</p>
  <div class="sgds:border-t sgds:border-subtle sgds:pt-4 sgds:flex sgds:gap-2">
    <button class="sgds:rounded sgds:px-4 sgds:py-2">Cancel</button>
    <button class="sgds:rounded sgds:px-4 sgds:py-2">Confirm</button>
  </div>
</div>
```

### Tab Navigation

```html
<nav class="sgds:border-b sgds:border-default">
  <button class="sgds:px-4 sgds:py-2 sgds:border-b-2 sgds:border-primary-default sgds:text-primary-default">
    Active Tab
  </button>
  <button class="sgds:px-4 sgds:py-2 sgds:border-b-2 sgds:border-transparent sgds:text-default">
    Inactive Tab
  </button>
</nav>
```

### Focus Indicator

```html
<button class="sgds:border-2 sgds:border-primary-default sgds:rounded sgds:p-2 focus:sgds:border-primary-emphasis">
  Focused element
</button>
```

## Best Practices

### DO: Pair Border Colors with Background Colors

```html
<!-- ✅ Good - semantic pairing -->
<div class="sgds:bg-success-surface-default sgds:border sgds:border-success-default sgds:p-4">
  Success message
</div>

<!-- ❌ Avoid - mismatched semantics -->
<div class="sgds:bg-success-surface-default sgds:border sgds:border-danger-default sgds:p-4">
  Confusing color combination
</div>
```

### DO: Use Subtle Borders for Cards

```html
<!-- ✅ Good - subtle card border -->
<div class="sgds:bg-surface-raised sgds:border sgds:border-subtle sgds:rounded-lg sgds:p-6">
  Card content
</div>

<!-- ❌ Avoid - overly prominent border -->
<div class="sgds:bg-surface-raised sgds:border-4 sgds:border-emphasis sgds:rounded-lg sgds:p-6">
  Too bold
</div>
```

### DO: Use Accent Borders for Indicators

```html
<!-- ✅ Good - clear visual indicator -->
<div class="sgds:border-l-4 sgds:border-primary-default sgds:pl-4">
  Important callout
</div>

<!-- ❌ Avoid - subtle indicator -->
<div class="sgds:border-l sgds:border-muted sgds:pl-4">
  Barely noticeable
</div>
```

### DO: Combine Border Radius Logically

```html
<!-- ✅ Good - consistent corner treatment -->
<div class="sgds:rounded-lg">
  All corners rounded
</div>

<!-- ✅ Good - modal with rounded top -->
<div class="sgds:rounded-t-lg">
  Modal header with top corners rounded
</div>

<!-- ❌ Avoid - inconsistent corner treatment -->
<div class="sgds:rounded-tl-lg sgds:rounded-br-lg">
  Oddly asymmetrical
</div>
```

### DO: Use Transparent Borders for Alignment

```html
<!-- ✅ Good - maintains consistent spacing -->
<button class="sgds:border sgds:border-primary-default sgds:px-4 sgds:py-2">Primary</button>
<button class="sgds:border sgds:border-transparent sgds:px-4 sgds:py-2">Secondary</button>

<!-- ❌ Avoid - misaligned buttons -->
<button class="sgds:border sgds:border-primary-default sgds:px-4 sgds:py-2">Primary</button>
<button class="sgds:px-4 sgds:py-2">Secondary (wrong size)</button>
```

## Troubleshooting

### Border Not Visible

**Problem**: Border classes don't show a visible border

**Solutions**:
1. Ensure `sgds:border` class is present (not just color)
2. Check that border color contrasts with background
3. Verify border width is sufficient (try `sgds:border-2`)
4. Verify setup is complete (see **sgds-utilities-setup** skill)

### Border Colors Not Theme-Aware

**Problem**: Border colors don't change with theme

**Solutions**:
1. Verify theme files are imported (see **sgds-utilities-setup** skill)
2. Use semantic tokens (e.g., `sgds:border-default` not custom colors)

### Rounded Corners Not Working

**Problem**: `sgds:rounded-*` classes have no effect

**Solutions**:
1. Check for `overflow: hidden` on parent elements
2. Verify utility CSS is imported
3. Ensure element has dimensions (width/height)
4. Check for conflicting CSS that overrides border-radius

### Border Width Issues

**Problem**: Border appears thicker/thinner than expected

**Solutions**:
1. Remember default `sgds:border` is 1px
2. Use specific widths: `sgds:border-2`, `sgds:border-4`
3. Check for box-sizing conflicts
4. Verify no conflicting border styles from other CSS

## Quick Reference

### Border Width
```html
sgds:border          /* 1px all sides */
sgds:border-{n}      /* n pixels (0, 2, 4, 8) */
sgds:border-{side}   /* 1px one side (t, r, b, l) */
sgds:border-x        /* Horizontal borders */
sgds:border-y        /* Vertical borders */
```

### Border Colors
```html
sgds:border-default    /* Standard border */
sgds:border-emphasis   /* Emphasized border */
sgds:border-muted      /* Muted border */
sgds:border-subtle     /* Subtle border */
sgds:border-transparent  /* Invisible border */

sgds:border-{variant}-default   /* Contextual border */
sgds:border-{variant}-emphasis  /* Emphasized contextual */
```

**Variants**: `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`

### Border Radius
```html
sgds:rounded-none     /* 0px */
sgds:rounded-sm       /* 2px */
sgds:rounded          /* 4px (default) */
sgds:rounded-md       /* 6px */
sgds:rounded-lg       /* 8px */
sgds:rounded-xl       /* 12px */
sgds:rounded-2-xl     /* 16px */
sgds:rounded-3-xl     /* 24px */
sgds:rounded-full     /* 9999px (pill/circle) */

sgds:rounded-{side}-{size}   /* Specific sides */
```

---

**For AI Agents**: When users ask about borders, recommend theme-aware semantic border colors. Use `sgds:border-subtle` for cards, thick accent borders (sgds:border-l-4) for alerts, and transparent borders to maintain consistent spacing. Combine borders with appropriate border radius for polished UI components.
