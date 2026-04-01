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

Apply text sizes using `sgds:text-{size}` where the number matches the pixel value:

```html
<p class="sgds:text-12">12px — captions, fine print</p>
<p class="sgds:text-14">14px — labels, helper text</p>
<p class="sgds:text-16">16px — default body text</p>
<p class="sgds:text-20">20px — lead paragraphs, intro text</p>
<h4 class="sgds:text-24">24px — H4 / card headings</h4>
<h3 class="sgds:text-28">28px — H3</h3>
<h2 class="sgds:text-32">32px — H2</h2>
<h1 class="sgds:text-40">40px — H1</h1>
<h1 class="sgds:text-48">48px — page titles</h1>
<h1 class="sgds:text-56">56px — hero display</h1>
```

### Font Size Scale

- `12` = 12px
- `14` = 14px
- `16` = 16px (default)
- `20` = 20px
- `24` = 24px
- `28` = 28px
- `32` = 32px
- `40` = 40px
- `48` = 48px
- `56` = 56px

Sizes outside this base scale (18, 22, 26, 30, 36, 44, 52) are available for responsive use only.

## Font Weight

Apply font weights using `sgds:font-{weight}`:

```html
<p class="sgds:font-light">Light weight (300)</p>
<p class="sgds:font-regular">Regular weight (400) - default</p>
<p class="sgds:font-semibold">Semibold weight (600)</p>
<p class="sgds:font-bold">Bold weight (700)</p>
```

### Font Weight Scale

- `light` = 300
- `regular` = 400 (default)
- `semibold` = 600
- `bold` = 700

## Line Height

Apply line heights using `sgds:leading-{scale}`:

```html
<!-- Body text (default) -->
<p class="sgds:leading-normal">Normal line height (1.5)</p>

<!-- Display, headings, and subheadings -->
<h1 class="sgds:leading-tight">Tight line height (1.2)</h1>
```

### Line Height Scale

- `normal` = 1.5 (default — body text)
- `tight` = 1.2 (display, headings, subheadings)

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

- `tighter` = -0.0625em
- `tight` = -0.025em
- `normal` = 0em (default)
- `wide` = 0.0625em
- `wider` = 0.125em

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
<h1 class="sgds:text-display-default sgds:text-48 sgds:font-bold sgds:leading-tight sgds:tracking-tight">
  Hero Display Heading
</h1>

<h1 class="sgds:text-display-default sgds:text-56 sgds:font-bold sgds:leading-tight">
  Extra Large Hero
</h1>
```

### Section Headings

```html
<!-- H2 -->
<h2 class="sgds:text-heading-default sgds:text-32 sgds:font-semibold sgds:leading-tight sgds:mb-6">
  Section Heading
</h2>

<!-- H3 -->
<h3 class="sgds:text-heading-default sgds:text-24 sgds:font-semibold sgds:leading-tight sgds:mb-4">
  Subsection Heading
</h3>

<!-- H4 -->
<h4 class="sgds:text-heading-default sgds:text-20 sgds:font-semibold sgds:leading-tight sgds:mb-3">
  Minor Heading
</h4>
```

### Body Text

```html
<!-- Large body text (lead paragraph) -->
<p class="sgds:text-body-default sgds:text-20 sgds:leading-normal sgds:mb-4">
  Lead paragraph with larger text for better readability.
</p>

<!-- Standard body text -->
<p class="sgds:text-body-default sgds:text-16 sgds:leading-normal sgds:mb-4">
  Regular body text for main content.
</p>

<!-- Small body text (captions, metadata) -->
<p class="sgds:text-body-subtle sgds:text-14 sgds:leading-normal">
  Caption or metadata text.
</p>

<!-- Extra small (fine print) -->
<p class="sgds:text-body-subtle sgds:text-12 sgds:leading-normal">
  Fine print or legal text.
</p>
```

### Form Labels

```html
<label class="sgds:text-label-default sgds:text-14 sgds:font-semibold sgds:block sgds:mb-2">
  Form Field Label
</label>

<label class="sgds:text-label-default sgds:text-16 sgds:font-semibold sgds:block sgds:mb-2">
  Larger Form Label
</label>
```

### Links

```html
<a href="#" class="sgds:text-link-default sgds:text-16 sgds:font-regular">
  Standard link
</a>

<a href="#" class="sgds:text-link-default sgds:text-16 sgds:font-semibold">
  Semibold weight link
</a>
```

### Code Blocks

```html
<!-- Inline code -->
<p class="sgds:text-body-default">
  Use the <code class="sgds:font-mono sgds:text-14 sgds:bg-surface-raised sgds:px-1">import</code> statement.
</p>

<!-- Code block -->
<pre class="sgds:font-mono sgds:text-14 sgds:leading-normal sgds:bg-surface-raised sgds:p-4 sgds:rounded">
  function hello() {
    console.log('Hello, world!');
  }
</pre>
```

### Emphasized Text

```html
<p class="sgds:text-body-default sgds:text-16 sgds:leading-normal">
  This is <strong class="sgds:font-semibold">important text</strong> that needs emphasis.
</p>

<p class="sgds:text-body-default sgds:text-16 sgds:leading-normal">
  This is <em class="sgds:font-regular sgds:italic">emphasized text</em> with style.
</p>
```

### Uppercase/Lowercase Text

```html
<!-- Uppercase (e.g., labels, badges) -->
<span class="sgds:text-12 sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  Badge Label
</span>

<!-- Capitalize -->
<h3 class="sgds:text-20 sgds:font-semibold sgds:capitalize">
  capitalize each word
</h3>

<!-- Lowercase -->
<p class="sgds:text-14 sgds:lowercase">
  ALL LOWERCASE TEXT
</p>
```

### Blockquotes

```html
<blockquote class="sgds:text-body-default sgds:text-20 sgds:font-regular sgds:leading-normal sgds:italic sgds:border-l-4 sgds:border-primary-default sgds:pl-6 sgds:my-6">
  "This is an inspiring quote that stands out from the main content."
</blockquote>
```

### Statistics/Numbers

```html
<div class="sgds:text-center">
  <p class="sgds:text-primary-default sgds:text-48 sgds:font-bold sgds:leading-tight sgds:mb-2">
    1,234
  </p>
  <p class="sgds:text-body-subtle sgds:text-14 sgds:font-semibold sgds:uppercase sgds:tracking-wide">
    Active Users
  </p>
</div>
```

### Buttons

```html
<!-- Standard button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-16 sgds:font-semibold sgds:px-6 sgds:py-3 sgds:rounded">
  Button Text
</button>

<!-- Small button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-14 sgds:font-semibold sgds:px-4 sgds:py-2 sgds:rounded">
  Small Button
</button>

<!-- Large button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-20 sgds:font-semibold sgds:px-8 sgds:py-4 sgds:rounded">
  Large Button
</button>
```

### Card with Typography Hierarchy

```html
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
  <h3 class="sgds:text-heading-default sgds:text-24 sgds:font-semibold sgds:leading-tight sgds:mb-2">
    Card Title
  </h3>
  <p class="sgds:text-body-subtle sgds:text-14 sgds:leading-normal sgds:mb-4">
    Updated 2 hours ago
  </p>
  <p class="sgds:text-body-default sgds:text-16 sgds:leading-normal sgds:mb-4">
    Main card description with good readability.
  </p>
  <a href="#" class="sgds:text-link-default sgds:text-14 sgds:font-regular">
    Read more →
  </a>
</div>
```

## Responsive Typography

Combine with responsive prefixes for adaptive sizing:

```html
<!-- Mobile: 24px, Tablet: 32px, Desktop: 40px -->
<h1 class="sgds:text-24 md:sgds:text-32 lg:sgds:text-40 sgds:font-bold">
  Responsive Heading
</h1>

<!-- Adjust line height at different breakpoints -->
<p class="sgds:text-16 sgds:leading-normal md:sgds:text-20">
  Responsive body text
</p>
```

## Best Practices

### DO: Use Semantic Text Size Pairings

```html
<!-- ✅ Good - appropriate size hierarchy -->
<h2 class="sgds:text-32 sgds:font-semibold sgds:mb-4">Section Title</h2>
<p class="sgds:text-16 sgds:leading-relaxed">Body content</p>

<!-- ❌ Avoid - poor hierarchy -->
<h2 class="sgds:text-16 sgds:font-regular">Section Title</h2>
<p class="sgds:text-32">Body content</p>
```

### DO: Pair Font Size with Line Height

```html
<!-- ✅ Good - headings with tight leading (1.2) -->
<h1 class="sgds:text-48 sgds:leading-tight">Display Heading</h1>

<!-- ✅ Good - body text with normal leading (1.5) -->
<p class="sgds:text-16 sgds:leading-normal">Body text</p>

<!-- ❌ Avoid - heading without tight leading -->
<h1 class="sgds:text-48 sgds:leading-normal">Poor heading spacing</h1>
```

### DO: Use Appropriate Weights for Emphasis

```html
<!-- ✅ Good - clear visual hierarchy -->
<h2 class="sgds:font-bold">Bold Heading</h2>
<p class="sgds:font-regular">Regular body text</p>

<!-- ❌ Avoid - everything too bold -->
<h2 class="sgds:font-bold">Bold Heading</h2>
<p class="sgds:font-bold">Bold body text (too heavy)</p>
```

### DO: Use Monospace for Code

```html
<!-- ✅ Good - monospace for code -->
<code class="sgds:font-mono sgds:text-14">const foo = 'bar';</code>

<!-- ❌ Avoid - sans-serif for code -->
<code class="sgds:font-sans sgds:text-14">const foo = 'bar';</code>
```

### DO: Adjust Tracking for Large Text

```html
<!-- ✅ Good - tighter tracking for display text -->
<h1 class="sgds:text-56 sgds:font-bold sgds:tracking-tight">
  Hero Heading
</h1>

<!-- ✅ Good - wider tracking for small caps -->
<span class="sgds:text-12 sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  Label
</span>
```

## Troubleshooting

### Font Size Not Applied

**Problem**: A font size class has no effect

**Solutions**:
1. Only base sizes are utility classes: 12, 14, 16, 20, 24, 28, 32, 40, 48, 56
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
sgds:text-12   /* 12px */
sgds:text-14   /* 14px */
sgds:text-16   /* 16px (default) */
sgds:text-20   /* 20px */
sgds:text-24   /* 24px */
sgds:text-28   /* 28px */
sgds:text-32   /* 32px */
sgds:text-40   /* 40px */
sgds:text-48   /* 48px */
sgds:text-56   /* 56px */
```

### Font Weight
```html
sgds:font-light        /* 300 */
sgds:font-regular      /* 400 (default) */
sgds:font-semibold     /* 600 */
sgds:font-bold         /* 700 */
```

### Line Height
```html
sgds:leading-normal    /* 1.5 (default — body text) */
sgds:leading-tight     /* 1.2 (display, headings, subheadings) */
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

**For AI Agents**: Use only the 10 base font sizes — 12, 14, 16, 20, 24, 28, 32, 40, 48, 56. Use `sgds:text-16` for body, `sgds:text-32` for H2, `sgds:text-40`–`sgds:text-48` for H1, `sgds:text-56` for hero display. Use `sgds:leading-tight` (1.2) for display text and all headings; use `sgds:leading-normal` (1.5) for all body text. Use semibold (600) or bold (700) for headings, regular (400) for body text. Always use monospace font for code.
