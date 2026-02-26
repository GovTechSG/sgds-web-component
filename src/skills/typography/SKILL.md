---
name: sgds-typography
description: Teaches AI agents how to help developers use SGDS typography utilities (font-size, font-weight, line-height, letter-spacing) with the sgds: prefix. Use when users ask about text sizing, font weights, line spacing, or typography styling in SGDS designs.
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: typography
---

# SGDS Typography Utilities Skill

Helps developers use SGDS typography utilities for consistent text sizing, weights, spacing, and formatting.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

Typography utilities require the utility CSS import but do NOT require theme files.

## Core Concept

All SGDS typography utilities use the `sgds:` prefix for font sizes, weights, line heights, and letter spacing.

## Font Size

Apply text sizes using `sgds:text-{size}`:

```html
<!-- Extra small to base sizes -->
<p class="sgds:text-xs">Extra small text (12px)</p>
<p class="sgds:text-sm">Small text (14px)</p>
<p class="sgds:text-base">Base text (16px) - default size</p>
<p class="sgds:text-lg">Large text (18px)</p>
<p class="sgds:text-xl">Extra large text (20px)</p>

<!-- 2XL to 4XL sizes (headings) -->
<h4 class="sgds:text-2-xl">2XL text (24px)</h4>
<h3 class="sgds:text-3-xl">3XL text (30px)</h3>
<h2 class="sgds:text-4-xl">4XL text (36px)</h2>
<h1 class="sgds:text-5-xl">5XL text (48px)</h1>

<!-- Extra large sizes (display) -->
<h1 class="sgds:text-6-xl">6XL text (60px)</h1>
<h1 class="sgds:text-7-xl">7XL text (72px)</h1>
<h1 class="sgds:text-8-xl">8XL text (96px)</h1>
<h1 class="sgds:text-9-xl">9XL text (128px)</h1>
```

### Font Size Scale

- `xs` = 12px
- `sm` = 14px
- `base` = 16px (default)
- `lg` = 18px
- `xl` = 20px
- `2-xl` = 24px
- `3-xl` = 30px
- `4-xl` = 36px
- `5-xl` = 48px
- `6-xl` = 60px
- `7-xl` = 72px
- `8-xl` = 96px
- `9-xl` = 128px

## Font Weight

Apply font weights using `sgds:font-{weight}`:

```html
<!-- Thin to light -->
<p class="sgds:font-thin">Thin weight (100)</p>
<p class="sgds:font-extralight">Extra light weight (200)</p>
<p class="sgds:font-light">Light weight (300)</p>

<!-- Normal to medium -->
<p class="sgds:font-normal">Normal weight (400) - default</p>
<p class="sgds:font-medium">Medium weight (500)</p>

<!-- Semibold to black -->
<p class="sgds:font-semibold">Semibold weight (600)</p>
<p class="sgds:font-bold">Bold weight (700)</p>
<p class="sgds:font-extrabold">Extra bold weight (800)</p>
<p class="sgds:font-black">Black weight (900)</p>
```

### Font Weight Scale

- `thin` = 100
- `extralight` = 200
- `light` = 300
- `normal` = 400 (default)
- `medium` = 500
- `semibold` = 600
- `bold` = 700
- `extrabold` = 800
- `black` = 900

## Line Height

Apply line heights using `sgds:leading-{size}`:

```html
<!-- Tight line heights (headings) -->
<h2 class="sgds:leading-none">No line height (1)</h2>
<h2 class="sgds:leading-tight">Tight line height (1.25)</h2>
<h3 class="sgds:leading-snug">Snug line height (1.375)</h3>

<!-- Normal line heights (body text) -->
<p class="sgds:leading-normal">Normal line height (1.5)</p>
<p class="sgds:leading-relaxed">Relaxed line height (1.625)</p>

<!-- Loose line heights (long-form content) -->
<p class="sgds:leading-loose">Loose line height (2)</p>
```

### Line Height Scale

- `none` = 1
- `tight` = 1.25
- `snug` = 1.375
- `normal` = 1.5 (default)
- `relaxed` = 1.625
- `loose` = 2

## Letter Spacing

Apply letter spacing using `sgds:tracking-{size}`:

```html
<!-- Tighter spacing -->
<p class="sgds:tracking-tighter">Tighter letter spacing (-0.05em)</p>
<p class="sgds:tracking-tight">Tight letter spacing (-0.025em)</p>

<!-- Normal spacing -->
<p class="sgds:tracking-normal">Normal letter spacing (0em)</p>

<!-- Wider spacing -->
<p class="sgds:tracking-wide">Wide letter spacing (0.025em)</p>
<p class="sgds:tracking-wider">Wider letter spacing (0.05em)</p>
<p class="sgds:tracking-widest">Widest letter spacing (0.1em)</p>
```

### Letter Spacing Scale

- `tighter` = -0.05em
- `tight` = -0.025em
- `normal` = 0em (default)
- `wide` = 0.025em
- `wider` = 0.05em
- `widest` = 0.1em

## Font Family

Apply font families using `sgds:font-{family}`:

```html
<!-- Sans-serif (default) -->
<p class="sgds:font-sans">
  System sans-serif font stack
</p>

<!-- Monospace (code) -->
<code class="sgds:font-mono">
  Monospace font for code
</code>
```

### Font Families

- `sans` - System sans-serif stack (Inter, system-ui, etc.)
- `mono` - Monospace stack (jetbrainsmono, 'Courier New', etc.)

## Common Use Cases

### Display Headings (Hero Text)

```html
<h1 class="sgds:text-display-default sgds:text-5-xl sgds:font-bold sgds:leading-tight sgds:tracking-tight">
  Hero Display Heading
</h1>

<h1 class="sgds:text-display-default sgds:text-6-xl sgds:font-bold sgds:leading-none">
  Extra Large Hero
</h1>
```

### Section Headings

```html
<!-- H2 -->
<h2 class="sgds:text-heading-default sgds:text-3-xl sgds:font-semibold sgds:leading-tight sgds:mb-6">
  Section Heading
</h2>

<!-- H3 -->
<h3 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:leading-snug sgds:mb-4">
  Subsection Heading
</h3>

<!-- H4 -->
<h4 class="sgds:text-heading-default sgds:text-xl sgds:font-medium sgds:leading-snug sgds:mb-3">
  Minor Heading
</h4>
```

### Body Text

```html
<!-- Large body text (lead paragraph) -->
<p class="sgds:text-body-default sgds:text-lg sgds:leading-relaxed sgds:mb-4">
  Lead paragraph with larger text for better readability.
</p>

<!-- Standard body text -->
<p class="sgds:text-body-default sgds:text-base sgds:leading-normal sgds:mb-4">
  Regular body text for main content.
</p>

<!-- Small body text (captions, metadata) -->
<p class="sgds:text-body-subtle sgds:text-sm sgds:leading-normal">
  Caption or metadata text.
</p>

<!-- Extra small (fine print) -->
<p class="sgds:text-body-subtle sgds:text-xs sgds:leading-normal">
  Fine print or legal text.
</p>
```

### Form Labels

```html
<label class="sgds:text-label-default sgds:text-sm sgds:font-medium sgds:block sgds:mb-2">
  Form Field Label
</label>

<label class="sgds:text-label-default sgds:text-base sgds:font-medium sgds:block sgds:mb-2">
  Larger Form Label
</label>
```

### Links

```html
<a href="#" class="sgds:text-link-default sgds:text-base sgds:font-normal">
  Standard link
</a>

<a href="#" class="sgds:text-link-default sgds:text-base sgds:font-medium">
  Medium weight link
</a>
```

### Code Blocks

```html
<!-- Inline code -->
<p class="sgds:text-body-default">
  Use the <code class="sgds:font-mono sgds:text-sm sgds:bg-surface-raised sgds:px-1">import</code> statement.
</p>

<!-- Code block -->
<pre class="sgds:font-mono sgds:text-sm sgds:leading-relaxed sgds:bg-surface-raised sgds:p-4 sgds:rounded">
  function hello() {
    console.log('Hello, world!');
  }
</pre>
```

### Emphasized Text

```html
<p class="sgds:text-body-default sgds:text-base sgds:leading-normal">
  This is <strong class="sgds:font-semibold">important text</strong> that needs emphasis.
</p>

<p class="sgds:text-body-default sgds:text-base sgds:leading-normal">
  This is <em class="sgds:font-medium sgds:italic">emphasized text</em> with style.
</p>
```

### Uppercase/Lowercase Text

```html
<!-- Uppercase (e.g., labels, badges) -->
<span class="sgds:text-xs sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  Badge Label
</span>

<!-- Capitalize -->
<h3 class="sgds:text-xl sgds:font-semibold sgds:capitalize">
  capitalize each word
</h3>

<!-- Lowercase -->
<p class="sgds:text-sm sgds:lowercase">
  ALL LOWERCASE TEXT
</p>
```

### Blockquotes

```html
<blockquote class="sgds:text-body-default sgds:text-lg sgds:font-medium sgds:leading-relaxed sgds:italic sgds:border-l-4 sgds:border-primary-default sgds:pl-6 sgds:my-6">
  "This is an inspiring quote that stands out from the main content."
</blockquote>
```

### Statistics/Numbers

```html
<div class="sgds:text-center">
  <p class="sgds:text-primary-default sgds:text-5-xl sgds:font-bold sgds:leading-none sgds:mb-2">
    1,234
  </p>
  <p class="sgds:text-body-subtle sgds:text-sm sgds:font-medium sgds:uppercase sgds:tracking-wide">
    Active Users
  </p>
</div>
```

### Buttons

```html
<!-- Standard button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-base sgds:font-medium sgds:px-6 sgds:py-3 sgds:rounded">
  Button Text
</button>

<!-- Small button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-sm sgds:font-medium sgds:px-4 sgds:py-2 sgds:rounded">
  Small Button
</button>

<!-- Large button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-lg sgds:font-semibold sgds:px-8 sgds:py-4 sgds:rounded">
  Large Button
</button>
```

### Card with Typography Hierarchy

```html
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
  <h3 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:leading-tight sgds:mb-2">
    Card Title
  </h3>
  <p class="sgds:text-body-subtle sgds:text-sm sgds:leading-normal sgds:mb-4">
    Updated 2 hours ago
  </p>
  <p class="sgds:text-body-default sgds:text-base sgds:leading-relaxed sgds:mb-4">
    Main card description with good readability.
  </p>
  <a href="#" class="sgds:text-link-default sgds:text-sm sgds:font-medium">
    Read more →
  </a>
</div>
```

## Responsive Typography

Combine with responsive prefixes for adaptive sizing:

```html
<!-- Mobile: 2xl, Tablet: 3xl, Desktop: 4xl -->
<h1 class="sgds:text-2-xl md:sgds:text-3-xl lg:sgds:text-4-xl sgds:font-bold">
  Responsive Heading
</h1>

<!-- Adjust line height at different breakpoints -->
<p class="sgds:text-base sgds:leading-normal md:sgds:text-lg md:sgds:leading-relaxed">
  Responsive body text
</p>
```

## Best Practices

### DO: Use Semantic Text Size Pairings

```html
<!-- ✅ Good - appropriate size hierarchy -->
<h2 class="sgds:text-3-xl sgds:font-semibold sgds:mb-4">Section Title</h2>
<p class="sgds:text-base sgds:leading-relaxed">Body content</p>

<!-- ❌ Avoid - poor hierarchy -->
<h2 class="sgds:text-base sgds:font-normal">Section Title</h2>
<p class="sgds:text-3-xl">Body content</p>
```

### DO: Pair Font Size with Line Height

```html
<!-- ✅ Good - smaller text with tighter leading -->
<h1 class="sgds:text-5-xl sgds:leading-tight">Display Heading</h1>

<!-- ✅ Good - body text with comfortable leading -->
<p class="sgds:text-base sgds:leading-relaxed">Body text</p>

<!-- ❌ Avoid - large text with excessive spacing -->
<h1 class="sgds:text-5-xl sgds:leading-loose">Awkward spacing</h1>
```

### DO: Use Appropriate Weights for Emphasis

```html
<!-- ✅ Good - clear visual hierarchy -->
<h2 class="sgds:font-bold">Bold Heading</h2>
<p class="sgds:font-normal">Normal body text</p>

<!-- ❌ Avoid - everything too bold -->
<h2 class="sgds:font-bold">Bold Heading</h2>
<p class="sgds:font-bold">Bold body text (too heavy)</p>
```

### DO: Use Monospace for Code

```html
<!-- ✅ Good - monospace for code -->
<code class="sgds:font-mono sgds:text-sm">const foo = 'bar';</code>

<!-- ❌ Avoid - sans-serif for code -->
<code class="sgds:font-sans sgds:text-sm">const foo = 'bar';</code>
```

### DO: Adjust Tracking for Large Text

```html
<!-- ✅ Good - tighter tracking for display text -->
<h1 class="sgds:text-6-xl sgds:font-bold sgds:tracking-tight">
  Hero Heading
</h1>

<!-- ✅ Good - wider tracking for small caps -->
<span class="sgds:text-xs sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  Label
</span>
```

## Troubleshooting

### Font Size Not Applied

**Problem**: Classes like `sgds:text-lg` have no effect

**Solutions**:
1. Verify setup is complete (see **sgds-utilities-setup** skill)
2. Check that `sgds:` prefix is included
3. Verify no CSS specificity conflicts from other stylesheets
4. Check for `!important` rules overriding the utility

### Line Height Issues

**Problem**: Line height appears incorrect

**Solutions**:
1. Remember font size utilities include default line heights
2. Override with explicit `sgds:leading-*` classes if needed
3. Check for inherited line-height values from parent elements

### Font Weight Not Changing

**Problem**: Font weight utilities don't change weight

**Solutions**:
1. Ensure the font family supports the weight you're using
2. Verify font files are loaded correctly
3. Check browser font rendering settings
4. Try a different weight to test if font supports it

### Text Too Tight/Loose

**Problem**: Letter spacing looks wrong

**Solutions**:
1. Use `sgds:tracking-tight` for large headings
2. Use `sgds:tracking-wider` for small uppercase text
3. Leave normal tracking for body text
4. Avoid extreme tracking values

## Quick Reference

### Font Size
```html
sgds:text-xs       /* 12px */
sgds:text-sm       /* 14px */
sgds:text-base     /* 16px (default) */
sgds:text-lg       /* 18px */
sgds:text-xl       /* 20px */
sgds:text-2-xl     /* 24px */
sgds:text-3-xl     /* 30px */
sgds:text-4-xl     /* 36px */
sgds:text-5-xl     /* 48px */
sgds:text-6-xl     /* 60px */
sgds:text-7-xl     /* 72px */
sgds:text-8-xl     /* 96px */
sgds:text-9-xl     /* 128px */
```

### Font Weight
```html
sgds:font-thin         /* 100 */
sgds:font-extralight   /* 200 */
sgds:font-light        /* 300 */
sgds:font-normal       /* 400 (default) */
sgds:font-medium       /* 500 */
sgds:font-semibold     /* 600 */
sgds:font-bold         /* 700 */
sgds:font-extrabold    /* 800 */
sgds:font-black        /* 900 */
```

### Line Height
```html
sgds:leading-none      /* 1 */
sgds:leading-tight     /* 1.25 */
sgds:leading-snug      /* 1.375 */
sgds:leading-normal    /* 1.5 (default) */
sgds:leading-relaxed   /* 1.625 */
sgds:leading-loose     /* 2 */
```

### Letter Spacing
```html
sgds:tracking-tighter  /* -0.05em */
sgds:tracking-tight    /* -0.025em */
sgds:tracking-normal   /* 0em (default) */
sgds:tracking-wide     /* 0.025em */
sgds:tracking-wider    /* 0.05em */
sgds:tracking-widest   /* 0.1em */
```

### Font Family
```html
sgds:font-sans  /* System sans-serif */
sgds:font-mono  /* Monospace */
```

---

**For AI Agents**: When users ask about typography, recommend semantic size pairings (e.g., `sgds:text-3-xl` for H2, `sgds:text-base` for body). Pair large text with tighter line heights and tracking. Use semibold (600) or bold (700) for headings, normal (400) or medium (500) for body text. Always use monospace font for code.
