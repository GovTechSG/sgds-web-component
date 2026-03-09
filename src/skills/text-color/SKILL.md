---
name: sgds-text-color
description: "Teaches AI agents how to help developers use SGDS text color utilities with the sgds: prefix. Use when users ask about text colors, typography colors, link colors, or theme-aware text styling in SGDS designs."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: color
---

# SGDS Text Color Utilities Skill

Helps developers use SGDS text color utilities that adapt to light/dark themes using semantic tokens.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

**Theme files required**: Text color utilities require both utility CSS and theme files (`day.css` and `night.css`) for theme-aware colors.

## Core Concept

All SGDS text utilities use the `sgds:text-{variant}-{modifier}` pattern with the `sgds:` prefix.

**Text colors are theme-aware** - they automatically adapt when toggling between day/night themes (unless using `fixed` variants).

## Semantic Text Colors

For definitions of suffix modifiers used here (`default`, `muted`, `fixed-light`, `fixed-dark`, `inverse`, `emphasis`), see **[`color-semantics`](../color-semantics/SKILL.md)**.

Basic text colors for content hierarchy:

```html
<!-- Standard text -->
<p class="sgds:text-default">
  Primary text color that adapts to theme
</p>

<!-- Secondary text -->
<p class="sgds:text-subtle">
  De-emphasized secondary text (captions, helper text)
</p>

<!-- Tertiary text -->
<p class="sgds:text-muted">
  Tertiary text with lower contrast (timestamps, metadata)
</p>

<!-- Inverted text -->
<div class="sgds:bg-surface-inverse sgds:p-4">
  <p class="sgds:text-inverse">For use on inverted backgrounds</p>
</div>
```

## Fixed Text Colors

Text colors that never change with theme:

```html
<!-- Always light text -->
<div class="sgds:bg-fixed-dark">
  <p class="sgds:text-fixed-light">Always light text (use on dark backgrounds)</p>
</div>

<!-- Always dark text -->
<div class="sgds:bg-fixed-light">
  <p class="sgds:text-fixed-dark">Always dark text (use on light backgrounds)</p>
</div>
```

**Use fixed text colors when**:
- Background is fixed and requires guaranteed contrast
- Brand guidelines require specific text colors
- Overlaying text on images with known brightness

## Contextual Text Colors

Semantic colors with meaning:

### Primary Text

```html
<!-- Standard primary -->
<span class="sgds:text-primary-default">Primary brand color</span>

<!-- Emphasized primary -->
<span class="sgds:text-primary-emphasis">Emphasized primary (hover, active)</span>

<!-- Fixed primary -->
<span class="sgds:text-primary-fixed-light">Always light primary</span>
<span class="sgds:text-primary-fixed-dark">Always dark primary</span>
```

### Success Text

```html
<span class="sgds:text-success-default">Success message</span>
<span class="sgds:text-success-emphasis">Emphasized success</span>
```

### Danger/Error Text

```html
<span class="sgds:text-danger-default">Error message</span>
<span class="sgds:text-danger-emphasis">Emphasized error</span>
```

### Warning Text

```html
<span class="sgds:text-warning-default">Warning message</span>
<span class="sgds:text-warning-emphasis">Emphasized warning</span>
```

### Accent Text

```html
<span class="sgds:text-accent-default">Accent color</span>
<span class="sgds:text-accent-emphasis">Emphasized accent</span>
```

### Other Color Variants

**Available variants**: `purple`, `cyan`, `neutral`

```html
<span class="sgds:text-purple-default">Purple text</span>
<span class="sgds:text-cyan-default">Cyan text</span>
<span class="sgds:text-neutral-default">Neutral text</span>
```

## Typography-Specific Text Colors

Text colors designed for specific typography roles:

### Display Text (Hero Headlines)

```html
<h1 class="sgds:text-display-default sgds:text-4-xl sgds:font-bold">
  Hero display heading
</h1>
```

### Heading Text

```html
<h2 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold">
  Section heading
</h2>
<h3 class="sgds:text-heading-default sgds:text-xl sgds:font-semibold">
  Subsection heading
</h3>
```

### Body Text

```html
<!-- Standard body text -->
<p class="sgds:text-body-default">
  Primary body text for main content
</p>

<!-- Subtle body text -->
<p class="sgds:text-body-subtle">
  Secondary body text (descriptions, captions)
</p>
```

### Label Text

```html
<label class="sgds:text-label-default sgds:block sgds:mb-2">
  Form label text
</label>
```

### Link Text

```html
<!-- Default link -->
<a href="#" class="sgds:text-link-default">
  Link text
</a>

<!-- Hovered/active link -->
<a href="#" class="sgds:text-link-emphasis">
  Emphasized link (hover state)
</a>
```

## Text Modifiers

### For Contextual Colors
- `default` - Standard color
- `emphasis` - Emphasized version (darker/more saturated)
- `fixed-light` - Always light (use on dark backgrounds)
- `fixed-dark` - Always dark (use on light backgrounds)

### For Typography Roles
- `default` - Standard text
- `subtle` - De-emphasized text
- `emphasis` - Emphasized text (for links)

## Common Use Cases

### Form with Validation

```html
<!-- Success state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2">Email</label>
  <input class="sgds:border sgds:border-success-default sgds:p-2">
  <p class="sgds:text-success-default sgds:text-sm sgds:mt-1">Valid email address</p>
</div>

<!-- Error state -->
<div class="sgds:mb-4">
  <label class="sgds:text-label-default sgds:block sgds:mb-2">Password</label>
  <input class="sgds:border sgds:border-danger-default sgds:p-2">
  <p class="sgds:text-danger-default sgds:text-sm sgds:mt-1">Password is required</p>
</div>
```

### Content Hierarchy

```html
<article>
  <h2 class="sgds:text-heading-default sgds:text-2-xl sgds:font-bold sgds:mb-4">
    Article Title
  </h2>
  <p class="sgds:text-body-subtle sgds:text-sm sgds:mb-4">
    Published on January 1, 2024
  </p>
  <p class="sgds:text-body-default sgds:mb-4">
    Main article content with primary text color.
  </p>
  <p class="sgds:text-body-subtle">
    Secondary information or footnotes.
  </p>
</article>
```

### Link States

```html
<nav>
  <a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis">
    Navigation Link
  </a>
</nav>

<p class="sgds:text-body-default">
  Read more in our 
  <a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis">
    documentation
  </a>
  for details.
</p>
```

### Alert Messages

```html
<!-- Success alert -->
<div class="sgds:bg-success-surface-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-success-default sgds:font-medium sgds:mb-1">Success!</p>
  <p class="sgds:text-success-default sgds:text-sm">Your changes have been saved.</p>
</div>

<!-- Warning alert -->
<div class="sgds:bg-warning-surface-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-warning-default sgds:font-medium sgds:mb-1">Warning</p>
  <p class="sgds:text-warning-default sgds:text-sm">Please review your input.</p>
</div>

<!-- Error alert -->
<div class="sgds:bg-danger-surface-default sgds:p-4 sgds:rounded">
  <p class="sgds:text-danger-default sgds:font-medium sgds:mb-1">Error</p>
  <p class="sgds:text-danger-default sgds:text-sm">Something went wrong.</p>
</div>
```

### Hero Section

```html
<section class="sgds:bg-primary-default sgds:py-12 sgds:px-6">
  <div class="sgds:max-w-4-xl sgds:mx-auto">
    <h1 class="sgds:text-fixed-light sgds:text-4-xl sgds:font-bold sgds:mb-4">
      Welcome to SGDS
    </h1>
    <p class="sgds:text-fixed-light sgds:text-xl sgds:mb-6">
      Build better government digital services
    </p>
    <button class="sgds:bg-white sgds:text-primary-default sgds:px-6 sgds:py-3">
      Get Started
    </button>
  </div>
</section>
```

### Card with Metadata

```html
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
  <h3 class="sgds:text-heading-default sgds:text-xl sgds:font-semibold sgds:mb-2">
    Card Title
  </h3>
  <p class="sgds:text-muted sgds:text-sm sgds:mb-4">
    Updated 2 hours ago
  </p>
  <p class="sgds:text-body-default sgds:mb-4">
    Main card description text
  </p>
  <a href="#" class="sgds:text-link-default sgds:text-sm">
    Read more →
  </a>
</div>
```

### Status Indicators

```html
<div class="sgds:flex sgds:items-center sgds:gap-2">
  <span class="sgds:text-success-default">● Online</span>
</div>

<div class="sgds:flex sgds:items-center sgds:gap-2">
  <span class="sgds:text-danger-default">● Offline</span>
</div>

<div class="sgds:flex sgds:items-center sgds:gap-2">
  <span class="sgds:text-warning-default">● Pending</span>
</div>
```

## Theme Switching

Toggle between light and dark themes:

```html
<button id="theme-toggle">Toggle Theme</button>

<script>
  const toggleButton = document.getElementById('theme-toggle');
  toggleButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('sgds-theme-night');
  });
</script>
```

Text colors with theme-aware tokens automatically update when theme changes.

## Best Practices

### DO: Use Semantic Text Colors

```html
<!-- ✅ Good - semantic and theme-aware -->
<p class="sgds:text-default">Main content</p>
<p class="sgds:text-subtle">Secondary content</p>
<p class="sgds:text-muted">Tertiary content</p>

<!-- ❌ Avoid - arbitrary colors -->
<p style="color: #333333">Main content</p>
<p style="color: #666666">Secondary content</p>
```

### DO: Match Text Colors to Typography Roles

```html
<!-- ✅ Good - using typography-specific tokens -->
<h2 class="sgds:text-heading-default">Section Heading</h2>
<p class="sgds:text-body-default">Body text</p>
<a class="sgds:text-link-default">Link text</a>

<!-- ❌ Avoid - generic text color for all -->
<h2 class="sgds:text-default">Section Heading</h2>
<p class="sgds:text-default">Body text</p>
<a class="sgds:text-default">Link text</a>
```

### DO: Pair Text with Appropriate Backgrounds

```html
<!-- ✅ Good - sufficient contrast -->
<div class="sgds:bg-primary-default sgds:text-fixed-light sgds:p-4">
  Light text on dark background
</div>

<!-- ❌ Avoid - poor contrast -->
<div class="sgds:bg-primary-default sgds:text-primary-default sgds:p-4">
  Hard to read
</div>
```

### DO: Use Contextual Colors for States

```html
<!-- ✅ Good - semantic state colors -->
<p class="sgds:text-success-default">✓ Completed</p>
<p class="sgds:text-danger-default">✗ Failed</p>
<p class="sgds:text-warning-default">⚠ Pending</p>

<!-- ❌ Avoid - same color for all states -->
<p class="sgds:text-default">✓ Completed</p>
<p class="sgds:text-default">✗ Failed</p>
<p class="sgds:text-default">⚠ Pending</p>
```

### DO: Use Fixed Colors on Fixed Backgrounds

```html
<!-- ✅ Good - fixed pairing -->
<div class="sgds:bg-fixed-dark sgds:text-fixed-light">
  Consistent contrast in any theme
</div>

<!-- ❌ Avoid - theme-aware text on fixed background -->
<div class="sgds:bg-fixed-dark sgds:text-default">
  May have contrast issues in some themes
</div>
```

## Troubleshooting

### Text Colors Not Working

**Problem**: Classes like `sgds:text-primary-default` have no effect

**Solutions**:
1. Verify setup is complete (see **sgds-utilities-setup** skill)
2. Ensure theme files are imported for theme-aware colors
3. Check that `sgds:` prefix is included
4. Verify no CSS specificity conflicts from other stylesheets

### Colors Not Theme-Aware

**Problem**: Text colors don't change when toggling theme

**Solutions**:
1. Verify theme files are imported (see **sgds-utilities-setup** skill)
2. Use semantic tokens (e.g., `sgds:text-default` not `sgds:text-fixed-dark`)
3. Avoid using `fixed` variants if you want theme adaptation

### Poor Contrast

**Problem**: Text hard to read on background

**Solutions**:
1. Use appropriate pairings:
   - Light backgrounds → `sgds:text-default`, `sgds:text-subtle`
   - Dark backgrounds → `sgds:text-fixed-light`, `sgds:text-inverse`
   - Colored backgrounds → `sgds:text-fixed-light` or `sgds:text-white`
2. Test with theme toggling to ensure contrast in both modes
3. Use emphasis variants for better contrast when needed

### Links Not Distinct

**Problem**: Links don't stand out from body text

**Solutions**:
1. Use `sgds:text-link-default` instead of `sgds:text-body-default`
2. Add underline with `sgds:underline`
3. Use `sgds:text-link-emphasis` for hover states
4. Consider adding icons or other visual indicators

## Quick Reference

### Semantic Text
```html
sgds:text-default   /* Primary text */
sgds:text-subtle    /* Secondary text */
sgds:text-muted     /* Tertiary text */
sgds:text-inverse   /* Inverted text */
```

### Fixed Text
```html
sgds:text-fixed-light  /* Always light */
sgds:text-fixed-dark   /* Always dark */
```

### Contextual Text
```html
sgds:text-{variant}-default   /* Standard color */
sgds:text-{variant}-emphasis  /* Emphasized color */
sgds:text-{variant}-fixed-light  /* Fixed light */
sgds:text-{variant}-fixed-dark   /* Fixed dark */
```

**Variants**: `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`

### Typography Text
```html
sgds:text-display-default  /* Display headings */
sgds:text-heading-default  /* Section headings */
sgds:text-body-default     /* Body text */
sgds:text-body-subtle      /* Secondary body */
sgds:text-label-default    /* Form labels */
sgds:text-link-default     /* Links */
sgds:text-link-emphasis    /* Hovered links */
```

---

**For AI Agents**: When users ask about text colors, always recommend theme-aware semantic tokens over fixed colors unless branding requires it. Use typography-specific tokens (display, heading, body, label, link) for better semantic meaning. Pair text colors with appropriate backgrounds for accessibility.
