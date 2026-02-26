---
name: sgds-opacity
description: Teaches AI agents how to help developers use SGDS opacity utilities with the sgds: prefix. Use when users ask about transparency, opacity levels, fading elements, or semi-transparent overlays in SGDS designs.
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: visual-effects
---

# SGDS Opacity Utilities Skill

Helps developers use SGDS opacity utilities for controlling element transparency.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

Opacity utilities require the utility CSS import but do NOT require theme files.

## Core Concept

All SGDS opacity utilities use the `sgds:opacity-{value}` pattern with the `sgds:` prefix.

Opacity values range from 0 (fully transparent) to 100 (fully opaque).

## Opacity Levels

Apply opacity to elements:

```html
<!-- Fully transparent -->
<div class="sgds:opacity-0">Invisible (0% opacity)</div>

<!-- Subtle transparency -->
<div class="sgds:opacity-5">5% opacity</div>
<div class="sgds:opacity-10">10% opacity</div>
<div class="sgds:opacity-20">20% opacity</div>
<div class="sgds:opacity-25">25% opacity</div>

<!-- Moderate transparency -->
<div class="sgds:opacity-30">30% opacity</div>
<div class="sgds:opacity-40">40% opacity</div>
<div class="sgds:opacity-50">50% opacity (half transparent)</div>
<div class="sgds:opacity-60">60% opacity</div>
<div class="sgds:opacity-70">70% opacity</div>

<!-- Mostly opaque -->
<div class="sgds:opacity-75">75% opacity</div>
<div class="sgds:opacity-80">80% opacity</div>
<div class="sgds:opacity-90">90% opacity</div>
<div class="sgds:opacity-95">95% opacity</div>

<!-- Fully opaque -->
<div class="sgds:opacity-100">Fully visible (100% opacity, default)</div>
```

## Common Opacity Values

**Most commonly used**:
- `0` - Fully transparent (hidden)
- `10` - Very faint
- `25` - Subtle presence
- `50` - Half visible
- `75` - Mostly visible
- `100` - Fully visible (default)

## Common Use Cases

### Modal Overlays

```html
<!-- Dark overlay behind modal -->
<div class="sgds:fixed sgds:inset-0 sgds:bg-fixed-dark sgds:opacity-50">
  <!-- Modal backdrop -->
</div>

<!-- Lighter overlay -->
<div class="sgds:fixed sgds:inset-0 sgds:bg-fixed-dark sgds:opacity-30">
  <!-- Subtle backdrop -->
</div>
```

### Disabled States

```html
<!-- Disabled button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:rounded sgds:opacity-50 sgds:cursor-not-allowed" disabled>
  Disabled Button
</button>

<!-- Disabled form input -->
<input class="sgds:border sgds:border-default sgds:p-2 sgds:opacity-60 sgds:cursor-not-allowed" disabled />

<!-- Disabled text -->
<p class="sgds:text-default sgds:opacity-50">Disabled content</p>
```

### Image Overlays

```html
<!-- Image with text overlay -->
<div class="sgds:relative">
  <img src="hero.jpg" class="sgds:w-full">
  <div class="sgds:absolute sgds:inset-0 sgds:bg-fixed-dark sgds:opacity-40"></div>
  <div class="sgds:absolute sgds:inset-0 sgds:flex sgds:items-center sgds:justify-center">
    <h2 class="sgds:text-fixed-light sgds:text-4-xl sgds:font-bold">Hero Text</h2>
  </div>
</div>

<!-- Gradient-style overlay -->
<div class="sgds:relative">
  <img src="card.jpg" class="sgds:w-full sgds:rounded-lg">
  <div class="sgds:absolute sgds:bottom-0 sgds:inset-x-0 sgds:bg-fixed-dark sgds:opacity-70 sgds:p-6 sgds:rounded-b-lg">
    <h3 class="sgds:text-fixed-light sgds:text-xl sgds:font-semibold">Card Title</h3>
  </div>
</div>
```

### Hover Effects

```html
<!-- Image hover effect -->
<div class="sgds:relative sgds:overflow-hidden sgds:rounded-lg">
  <img src="thumbnail.jpg" class="sgds:w-full sgds:opacity-100 hover:sgds:opacity-80 sgds:transition">
</div>

<!-- Card hover effect -->
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg sgds:opacity-90 hover:sgds:opacity-100 sgds:transition">
  <h3 class="sgds:text-heading-default">Hover to reveal</h3>
</div>
```

### Loading States

```html
<!-- Loading skeleton -->
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
  <div class="sgds:bg-default sgds:opacity-20 sgds:h-6 sgds:w-3/4 sgds:rounded sgds:mb-4"></div>
  <div class="sgds:bg-default sgds:opacity-20 sgds:h-4 sgds:w-full sgds:rounded sgds:mb-2"></div>
  <div class="sgds:bg-default sgds:opacity-20 sgds:h-4 sgds:w-5/6 sgds:rounded"></div>
</div>

<!-- Loading content indicator -->
<div class="sgds:opacity-50">
  <p>Content is loading...</p>
</div>
```

### Watermarks

```html
<!-- Watermark on document -->
<div class="sgds:relative">
  <div class="sgds:p-8">
    <!-- Document content -->
  </div>
  <div class="sgds:absolute sgds:inset-0 sgds:flex sgds:items-center sgds:justify-center sgds:pointer-events-none">
    <p class="sgds:text-6-xl sgds:font-bold sgds:text-default sgds:opacity-10 sgds:rotate-45">
      DRAFT
    </p>
  </div>
</div>
```

### Tooltips and Popovers

```html
<!-- Tooltip -->
<div class="sgds:bg-fixed-dark sgds:text-fixed-light sgds:text-sm sgds:px-3 sgds:py-2 sgds:rounded sgds:opacity-90">
  Tooltip content
</div>

<!-- Popover -->
<div class="sgds:bg-surface-raised sgds:border sgds:border-default sgds:p-4 sgds:rounded-lg sgds:opacity-95">
  <p class="sgds:text-body-default">Popover information</p>
</div>
```

### Badge Notifications

```html
<!-- Subtle badge -->
<span class="sgds:bg-danger-default sgds:text-white sgds:text-xs sgds:px-2 sgds:py-1 sgds:rounded-full sgds:opacity-80">
  New
</span>

<!-- Prominent badge -->
<span class="sgds:bg-danger-default sgds:text-white sgds:text-xs sgds:px-2 sgds:py-1 sgds:rounded-full sgds:opacity-100">
  5
</span>
```

### Placeholder Content

```html
<!-- Placeholder image -->
<div class="sgds:bg-surface-raised sgds:w-full sgds:h-48 sgds:flex sgds:items-center sgds:justify-center sgds:rounded-lg">
  <p class="sgds:text-default sgds:opacity-40">No image available</p>
</div>

<!-- Empty state -->
<div class="sgds:text-center sgds:py-12">
  <p class="sgds:text-default sgds:opacity-50 sgds:text-lg">No items to display</p>
</div>
```

### Dividers

```html
<!-- Subtle divider -->
<hr class="sgds:border-t sgds:border-default sgds:opacity-30 sgds:my-6">

<!-- Medium divider -->
<hr class="sgds:border-t sgds:border-default sgds:opacity-50 sgds:my-4">
```

### Background Patterns

```html
<!-- Subtle pattern overlay -->
<div class="sgds:relative sgds:bg-primary-default sgds:p-12">
  <div class="sgds:absolute sgds:inset-0 sgds:opacity-10" style="background-image: url('pattern.svg')"></div>
  <div class="sgds:relative">
    <h2 class="sgds:text-fixed-light sgds:text-3-xl">Content over pattern</h2>
  </div>
</div>
```

## Responsive Opacity

Combine with responsive prefixes for adaptive opacity:

```html
<!-- Mobile: 50%, Desktop: 80% -->
<div class="sgds:opacity-50 md:sgds:opacity-80">
  Responsive opacity
</div>

<!-- Hidden on mobile, visible on desktop -->
<div class="sgds:opacity-0 md:sgds:opacity-100">
  Shown only on larger screens
</div>
```

## Best Practices

### DO: Use Appropriate Opacity for Overlays

```html
<!-- ✅ Good - readable with sufficient backdrop -->
<div class="sgds:bg-fixed-dark sgds:opacity-50">
  <p class="sgds:text-fixed-light">Text over overlay</p>
</div>

<!-- ❌ Avoid - too faint, doesn't provide enough contrast -->
<div class="sgds:bg-fixed-dark sgds:opacity-10">
  <p class="sgds:text-fixed-light">Hard to read background</p>
</div>
```

### DO: Use Opacity for Disabled States

```html
<!-- ✅ Good - clear disabled state -->
<button class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:opacity-50 sgds:cursor-not-allowed" disabled>
  Disabled
</button>

<!-- ❌ Avoid - same as enabled state -->
<button class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:opacity-100" disabled>
  Not obviously disabled
</button>
```

### DO: Combine with Transitions

```html
<!-- ✅ Good - smooth opacity change -->
<div class="sgds:opacity-0 hover:sgds:opacity-100 sgds:transition sgds:duration-300">
  Fades in on hover
</div>

<!-- ❌ Avoid - abrupt change -->
<div class="sgds:opacity-0 hover:sgds:opacity-100">
  Jumps in on hover
</div>
```

### DO: Use Subtle Opacity for Watermarks

```html
<!-- ✅ Good - visible but not distracting -->
<p class="sgds:text-6-xl sgds:font-bold sgds:opacity-10">DRAFT</p>

<!-- ❌ Avoid - too prominent -->
<p class="sgds:text-6-xl sgds:font-bold sgds:opacity-70">DRAFT</p>
```

### DON'T: Use Opacity for Important Content

```html
<!-- ✅ Good - clear, readable content -->
<p class="sgds:text-body-default sgds:opacity-100">Important message</p>

<!-- ❌ Avoid - hard to read important content -->
<p class="sgds:text-body-default sgds:opacity-40">Important message</p>
```

## Troubleshooting

### Opacity Not Applied

**Problem**: Classes like `sgds:opacity-50` have no effect

**Solutions**:
1. Verify setup is complete (see **sgds-utilities-setup** skill)
2. Check that `sgds:` prefix is included
3. Verify no CSS specificity conflicts
4. Check for `!important` rules overriding the utility

### Element Completely Invisible

**Problem**: Element with opacity is not visible

**Solutions**:
1. Check if `sgds:opacity-0` is applied (fully transparent)
2. Verify element has content or dimensions
3. Check parent element's opacity (opacity is inherited)
4. Look for `display: none` or `visibility: hidden` styles

### Opacity Looks Wrong

**Problem**: Opacity doesn't look as expected

**Solutions**:
1. Remember opacity is a percentage (0-100)
2. Check if multiple opacity values are stacked (parent + child)
3. Verify background color behind transparent element
4. Test on different backgrounds to verify effect

### Text Hard to Read

**Problem**: Text with opacity is difficult to read

**Solutions**:
1. Increase opacity value (e.g., from `sgds:opacity-50` to `sgds:opacity-75`)
2. Use semantic text colors instead of opacity (e.g., `sgds:text-subtle`)
3. Ensure sufficient contrast between text and background
4. Avoid using opacity on body text; use for decorative elements only

## Quick Reference

### Common Opacity Values
```html
sgds:opacity-0      /* Fully transparent (invisible) */
sgds:opacity-10     /* Very faint */
sgds:opacity-25     /* Subtle */
sgds:opacity-50     /* Half transparent */
sgds:opacity-75     /* Mostly visible */
sgds:opacity-100    /* Fully opaque (default) */
```

### All Available Values
```html
sgds:opacity-0
sgds:opacity-5
sgds:opacity-10
sgds:opacity-20
sgds:opacity-25
sgds:opacity-30
sgds:opacity-40
sgds:opacity-50
sgds:opacity-60
sgds:opacity-70
sgds:opacity-75
sgds:opacity-80
sgds:opacity-90
sgds:opacity-95
sgds:opacity-100
```

### Use Cases by Opacity Level

**0-20%**: Watermarks, subtle patterns, very faint dividers  
**25-40%**: Disabled states, loading skeletons, image overlays  
**50-70%**: Modal backgrounds, hover effects, tooltips  
**75-90%**: Popovers, subtle hover states, semi-transparent cards  
**95-100%**: Normal visible content

---

**For AI Agents**: When users ask about opacity, recommend appropriate levels based on use case: 40-50% for modal overlays, 50-60% for disabled states, 10-20% for watermarks. Always combine opacity with transitions for smooth interactions. Avoid using opacity on important text content; use semantic color tokens like `sgds:text-subtle` or `sgds:text-muted` instead.
