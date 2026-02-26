---
name: sgds-utilities-overview
description: Overview of SGDS utility classes with the sgds: prefix. Use for general utility class questions or when the specific category is unclear. For specialized help, refer to category-specific skills (setup, spacing, background-color, text-color, border, typography, opacity).
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: overview
---

# SGDS Utilities Overview Skill

Introduction to SGDS design system utility classes for styling applications with Singapore Government Design System tokens.

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

### **sgds-spacing** - Spacing Utilities
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

### **sgds-background-color** - Background Colors
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

### **sgds-text-color** - Text Colors
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

### **sgds-border** - Border Utilities
Border colors, widths, and border radius.

```html
<div class="sgds:border sgds:border-default sgds:rounded-lg">
  Border utilities
</div>
```

**Common patterns**:
- `sgds:border`, `sgds:border-{n}` - Border width
- `sgds:border-{color}-default` - Border colors
- `sgds:rounded-{size}` - Border radius
- `sgds:border-{side}` - Side-specific borders

**Theme files**: Required for colors only

---

### **sgds-typography** - Typography Utilities
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

### **sgds-opacity** - Opacity Utilities
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

## Common Component Patterns

### Card Component

```html
<div class="sgds:bg-surface-raised sgds:border sgds:border-subtle sgds:rounded-lg sgds:p-6">
  <h3 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:mb-4">
    Card Title
  </h3>
  <p class="sgds:text-body-default sgds:mb-4">Card description text</p>
  <button class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:rounded">
    Action
  </button>
</div>
```

Combines: background-color, border, spacing, text-color, typography

### Alert Banner

```html
<div class="sgds:bg-warning-surface-default sgds:border-l-4 sgds:border-warning-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-warning-default sgds:font-medium sgds:mb-1">Warning</p>
  <p class="sgds:text-warning-default sgds:text-sm">Please review your input.</p>
</div>
```

Combines: background-color, border, spacing, text-color, typography

### Form Input with Validation

```html
<!-- Success state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2 sgds:font-medium">Email</label>
  <input class="sgds:border-2 sgds:border-success-default sgds:bg-surface-default sgds:p-2 sgds:rounded sgds:w-full">
  <p class="sgds:text-success-default sgds:text-sm sgds:mt-1">Valid email address</p>
</div>

<!-- Error state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2 sgds:font-medium">Password</label>
  <input class="sgds:border-2 sgds:border-danger-default sgds:bg-surface-default sgds:p-2 sgds:rounded sgds:w-full">
  <p class="sgds:text-danger-default sgds:text-sm sgds:mt-1">Password is required</p>
</div>
```

Combines: text-color, border, background-color, spacing, typography

### Modal with Overlay

```html
<!-- Overlay -->
<div class="sgds:fixed sgds:inset-0 sgds:bg-fixed-dark sgds:opacity-50"></div>

<!-- Modal -->
<div class="sgds:fixed sgds:inset-0 sgds:flex sgds:items-center sgds:justify-center">
  <div class="sgds:bg-surface-raised sgds:border sgds:border-subtle sgds:rounded-xl sgds:p-6 sgds:max-w-lg">
    <h2 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:mb-4">Modal Title</h2>
    <p class="sgds:text-body-default sgds:mb-6">Modal content</p>
    <div class="sgds:flex sgds:gap-2 sgds:justify-end">
      <button class="sgds:px-4 sgds:py-2 sgds:rounded sgds:border sgds:border-default">Cancel</button>
      <button class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:rounded">Confirm</button>
    </div>
  </div>
</div>
```

Combines: opacity, background-color, border, spacing, text-color, typography

## Best Practices

### ✅ DO: Use Theme-Aware Tokens

```html
<!-- ✅ Good - adapts to theme -->
<div class="sgds:bg-surface-raised sgds:text-default">Content</div>

<!-- ❌ Avoid - hardcoded colors -->
<div style="background: #ffffff; color: #000000">Content</div>
```

### ✅ DO: Follow the 4px Spacing Scale

```html
<!-- ✅ Good - follows scale -->
<div class="sgds:p-4 sgds:gap-4 sgds:mb-6">Content</div>

<!-- ❌ Avoid - arbitrary values -->
<div style="padding: 17px; gap: 19px">Content</div>
```

### ✅ DO: Use Semantic Color Pairings

```html
<!-- ✅ Good - semantic pairing -->
<div class="sgds:bg-primary-surface-default sgds:text-primary-default sgds:border-primary-default">
  Primary section
</div>
```

### ✅ DO: Combine Typography Utilities

```html
<!-- ✅ Good - complete typography styling -->
<h1 class="sgds:text-heading-default sgds:text-4-xl sgds:font-bold sgds:leading-tight sgds:tracking-tight">
  Display Heading
</h1>
```

### ❌ DON'T: Mix Utility Styles

```html
<!-- ❌ Wrong - mixing SGDS with inline styles -->
<div class="sgds:p-4" style="margin: 20px">Content</div>

<!-- ✅ Correct - all utilities -->
<div class="sgds:p-4 sgds:m-5">Content</div>
```

## Quick Reference by Use Case

**Layout & Spacing**: → **sgds-spacing** skill  
**Card Backgrounds**: → **sgds-background-color** skill  
**Text Content**: → **sgds-text-color** skill  
**Borders & Rounded Corners**: → **sgds-border** skill  
**Headings & Text Sizes**: → **sgds-typography** skill  
**Transparent Overlays**: → **sgds-opacity** skill  
**Setup Issues**: → **sgds-utilities-setup** skill

## Learning Path

1. **Start**: Complete **sgds-utilities-setup** skill
2. **Layout**: Learn **sgds-spacing** for margins, padding, gaps
3. **Colors**: Learn **sgds-background-color** and **sgds-text-color**
4. **Polish**: Learn **sgds-border** and **sgds-typography**
5. **Advanced**: Learn **sgds-opacity** for effects

---

**For AI Agents**: Use this overview to direct users to specific category skills. Always ensure setup is complete before troubleshooting. Suggest complete component patterns that combine multiple utility categories.
