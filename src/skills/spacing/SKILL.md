---
name: sgds-spacing
description: Teaches AI agents how to help developers use SGDS spacing utilities (margin, padding, gap) with the sgds: prefix. Use when users ask about spacing, margins, padding, gaps, or layout spacing in SGDS designs.
metadata:
  author: singapore-design-system
  version: "1.0.0"
  audience: external
  category: spacing
---

# SGDS Spacing Utilities Skill

Helps developers use SGDS spacing utilities (margin, padding, gap) based on the 4px scale system.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

Spacing utilities require the utility CSS import but do NOT require theme files.

## Core Concept

**Base Unit**: Every spacing value = **multiplier × 4px**

All SGDS spacing utilities use the `sgds:` prefix (Tailwind v4 @theme syntax).

## Padding Utilities

Apply padding to elements using `sgds:p-{multiplier}`:

```html
<!-- All sides -->
<div class="sgds:p-4">16px padding all sides (4 × 4px)</div>
<div class="sgds:p-6">24px padding all sides (6 × 4px)</div>
<div class="sgds:p-8">32px padding all sides (8 × 4px)</div>

<!-- Axis-specific -->
<div class="sgds:px-4 sgds:py-2">16px horizontal, 8px vertical</div>
<div class="sgds:px-6 sgds:py-4">24px horizontal, 16px vertical</div>

<!-- Side-specific -->
<div class="sgds:pt-8">32px padding top</div>
<div class="sgds:pr-4">16px padding right</div>
<div class="sgds:pb-6">24px padding bottom</div>
<div class="sgds:pl-2">8px padding left</div>

<!-- Combining sides -->
<div class="sgds:pt-8 sgds:pb-4">Different top and bottom padding</div>
<div class="sgds:px-6 sgds:pt-4 sgds:pb-8">Different spacing per side</div>
```

### Padding Classes

- `sgds:p-{n}` - All sides
- `sgds:px-{n}` - Horizontal (left + right)
- `sgds:py-{n}` - Vertical (top + bottom)
- `sgds:pt-{n}` - Top
- `sgds:pr-{n}` - Right
- `sgds:pb-{n}` - Bottom
- `sgds:pl-{n}` - Left

## Margin Utilities

Apply margins to elements using `sgds:m-{multiplier}`:

```html
<!-- All sides -->
<div class="sgds:m-4">16px margin all sides</div>
<div class="sgds:m-6">24px margin all sides</div>
<div class="sgds:m-8">32px margin all sides</div>

<!-- Centering horizontally -->
<div class="sgds:mx-auto">Center element horizontally</div>
<div class="sgds:mx-auto sgds:max-w-4-xl">Centered with max width</div>

<!-- Axis-specific -->
<div class="sgds:mx-4 sgds:my-2">16px horizontal, 8px vertical</div>
<div class="sgds:mx-6 sgds:my-4">24px horizontal, 16px vertical</div>

<!-- Side-specific -->
<div class="sgds:mt-8">32px margin top</div>
<div class="sgds:mr-4">16px margin right</div>
<div class="sgds:mb-6">24px margin bottom</div>
<div class="sgds:ml-2">8px margin left</div>

<!-- Spacing between sections -->
<section class="sgds:mb-12">Section with 48px bottom margin</section>
<section class="sgds:mb-8">Section with 32px bottom margin</section>

<!-- Negative margins -->
<div class="sgds:-mt-4">-16px margin top (pull up)</div>
<div class="sgds:-ml-2">-8px margin left</div>
```

### Margin Classes

- `sgds:m-{n}` - All sides
- `sgds:mx-{n}` - Horizontal (left + right)
- `sgds:my-{n}` - Vertical (top + bottom)
- `sgds:mt-{n}` - Top
- `sgds:mr-{n}` - Right
- `sgds:mb-{n}` - Bottom
- `sgds:ml-{n}` - Left
- `sgds:mx-auto` - Auto horizontal (centering)
- `sgds:-m{side}-{n}` - Negative margins

## Gap Utilities

Apply gaps between flex or grid children using `sgds:gap-{multiplier}`:

```html
<!-- Flexbox with gap -->
<div class="sgds:flex sgds:gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <!-- 16px gap between all items -->
</div>

<!-- Grid with gap -->
<div class="sgds:grid sgds:grid-cols-3 sgds:gap-6">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
  <!-- 24px gap between all cells -->
</div>

<!-- Column direction with gap -->
<div class="sgds:flex sgds:flex-col sgds:gap-4">
  <div>Top item</div>
  <div>Middle item</div>
  <div>Bottom item</div>
  <!-- 16px gap between stacked items -->
</div>

<!-- Axis-specific gaps -->
<div class="sgds:grid sgds:gap-x-4 sgds:gap-y-8">
  <!-- 16px horizontal gap, 32px vertical gap -->
</div>

<!-- Different gap sizes -->
<div class="sgds:flex sgds:gap-2">Small gap (8px)</div>
<div class="sgds:flex sgds:gap-4">Medium gap (16px)</div>
<div class="sgds:flex sgds:gap-6">Large gap (24px)</div>
<div class="sgds:flex sgds:gap-8">Extra large gap (32px)</div>
```

### Gap Classes

- `sgds:gap-{n}` - Gap between all children
- `sgds:gap-x-{n}` - Horizontal gap only
- `sgds:gap-y-{n}` - Vertical gap only

## Available Multipliers

Common spacing values (n × 4px):

- `0` = 0px
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px
- `10` = 40px
- `12` = 48px
- `16` = 64px
- `20` = 80px
- `24` = 96px
- `32` = 128px
- `40` = 160px
- `48` = 192px

Any numeric value works with the 4px scale.

## Common Use Cases

### Card Component

```html
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
  <h3 class="sgds:mb-4">Card Title</h3>
  <p class="sgds:mb-4">Card description text</p>
  <button class="sgds:px-4 sgds:py-2">Action</button>
</div>
```

### Form Layout

```html
<form class="sgds:flex sgds:flex-col sgds:gap-4">
  <div>
    <label class="sgds:block sgds:mb-2">Name</label>
    <input class="sgds:p-2">
  </div>
  <div>
    <label class="sgds:block sgds:mb-2">Email</label>
    <input class="sgds:p-2">
  </div>
  <button class="sgds:px-6 sgds:py-3 sgds:mt-4">Submit</button>
</form>
```

### Grid Layout with Consistent Spacing

```html
<div class="sgds:grid sgds:grid-cols-3 sgds:gap-6 sgds:p-6">
  <div class="sgds:p-4">Item 1</div>
  <div class="sgds:p-4">Item 2</div>
  <div class="sgds:p-4">Item 3</div>
</div>
```

### Section Spacing

```html
<main>
  <section class="sgds:py-12 sgds:px-6">
    <h2 class="sgds:mb-8">Section Title</h2>
    <div class="sgds:flex sgds:gap-6">
      <div class="sgds:flex-1 sgds:p-6">Content 1</div>
      <div class="sgds:flex-1 sgds:p-6">Content 2</div>
    </div>
  </section>
  
  <section class="sgds:py-12 sgds:px-6">
    <h2 class="sgds:mb-8">Another Section</h2>
    <p class="sgds:mb-4">Section content</p>
  </section>
</main>
```

### Button Group

```html
<div class="sgds:flex sgds:gap-2">
  <button class="sgds:px-4 sgds:py-2">Cancel</button>
  <button class="sgds:px-4 sgds:py-2">Save</button>
  <button class="sgds:px-4 sgds:py-2">Submit</button>
</div>
```

### Centered Container

```html
<div class="sgds:mx-auto sgds:px-4 sgds:py-8 sgds:max-w-4-xl">
  <h1 class="sgds:mb-6">Page Title</h1>
  <div class="sgds:flex sgds:flex-col sgds:gap-4">
    <p>Content paragraph 1</p>
    <p>Content paragraph 2</p>
  </div>
</div>
```

## Best Practices

### DO: Use Consistent Spacing Scale

```html
<!-- ✅ Good - follows 4px scale -->
<div class="sgds:p-4 sgds:gap-4 sgds:mb-6">Content</div>

<!-- ❌ Avoid - arbitrary values break scale consistency -->
<div style="padding: 17px; gap: 19px; margin-bottom: 23px">Content</div>
```

### DO: Use Gap for Flexbox/Grid Spacing

```html
<!-- ✅ Good - gap automatically handles spacing -->
<div class="sgds:flex sgds:gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- ❌ Avoid - manual margins on children -->
<div class="sgds:flex">
  <div class="sgds:mr-4">Item 1</div>
  <div class="sgds:mr-4">Item 2</div>
  <div>Item 3</div>
</div>
```

### DO: Use Axis-Specific Classes

```html
<!-- ✅ Good - clear intent -->
<div class="sgds:px-6 sgds:py-4">Different horizontal and vertical padding</div>

<!-- ❌ Avoid - verbose -->
<div class="sgds:pt-4 sgds:pr-6 sgds:pb-4 sgds:pl-6">Same result</div>
```

### DO: Combine with Layout Utilities

```html
<!-- ✅ Good - spacing works with layout -->
<div class="sgds:flex sgds:items-center sgds:gap-4 sgds:p-6">
  <img class="sgds:mr-4" src="icon.svg">
  <div class="sgds:flex-1">
    <h3 class="sgds:mb-2">Title</h3>
    <p>Description</p>
  </div>
</div>
```

## Troubleshooting

### Spacing Not Applied

**Problem**: Classes like `sgds:p-4` have no effect

**Solutions**:
1. Verify setup is complete (see **sgds-utilities-setup** skill)
2. Check that `sgds:` prefix is included
3. Verify no CSS specificity conflicts

### Gap Not Working

**Problem**: `sgds:gap-4` doesn't create space between children

**Solutions**:
1. Ensure parent has `sgds:flex` or `sgds:grid` display
2. Check browser support for gap property (modern browsers only)
3. Verify children are direct descendants

### Auto Margin Not Centering

**Problem**: `sgds:mx-auto` doesn't center element

**Solutions**:
1. Ensure element has a defined width or max-width
2. Element must be a block-level element
3. Parent must have sufficient width

## Quick Reference

```html
<!-- Padding -->
sgds:p-{n}     /* All sides */
sgds:px-{n}    /* Horizontal */
sgds:py-{n}    /* Vertical */
sgds:pt/pr/pb/pl-{n}  /* Individual sides */

<!-- Margin -->
sgds:m-{n}     /* All sides */
sgds:mx-{n}    /* Horizontal */
sgds:my-{n}    /* Vertical */
sgds:mt/mr/mb/ml-{n}  /* Individual sides */
sgds:mx-auto   /* Center horizontally */
sgds:-m{side}-{n}  /* Negative margins */

<!-- Gap -->
sgds:gap-{n}   /* Both directions */
sgds:gap-x-{n} /* Horizontal only */
sgds:gap-y-{n} /* Vertical only */
```

**Formula**: Value in pixels = multiplier × 4px

---

**For AI Agents**: When users ask about spacing, always use the 4px scale system. Recommend `gap` for flex/grid layouts, use axis-specific classes when appropriate, and suggest semantic groupings (e.g., `sgds:py-12` for section spacing, `sgds:px-4 sgds:py-2` for button padding).
