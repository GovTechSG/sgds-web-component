# Typography Patterns Reference

Common HTML patterns combining SGDS typography utilities for real-world content types.

> **Note**: Use library components like `<sgds-button>`, `<sgds-badge>` when available.
> These patterns are for custom components when library components don't meet your needs.

---

## Display Headings (Hero Text)

```html
<h1 class="sgds:text-display-default sgds:text-5-xl sgds:font-bold sgds:leading-tight sgds:tracking-tight">
  Page Hero Heading
</h1>

<h1 class="sgds:text-display-default sgds:text-7-xl sgds:font-bold sgds:leading-none sgds:tracking-tighter">
  Extra Large Display
</h1>
```

**When to use:** Page heroes, marketing banners, splash screens.

---

## Section Headings (H2 / H3 / H4)

```html
<h2 class="sgds:text-heading-default sgds:text-3-xl sgds:font-semibold sgds:leading-tight sgds:mb-6">
  Section Heading
</h2>

<h3 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:leading-snug sgds:mb-4">
  Subsection Heading
</h3>

<h4 class="sgds:text-heading-default sgds:text-xl sgds:font-medium sgds:leading-snug sgds:mb-3">
  Minor Heading
</h4>
```

---

## Body Text

```html
<!-- Lead paragraph -->
<p class="sgds:text-body-default sgds:text-lg sgds:leading-relaxed sgds:mb-4">
  Lead paragraph with larger text for better readability.
</p>

<!-- Standard body -->
<p class="sgds:text-body-default sgds:text-base sgds:leading-relaxed sgds:mb-4">
  Regular body text for main content areas.
</p>

<!-- Caption / secondary text -->
<p class="sgds:text-body-subtle sgds:text-sm sgds:leading-normal">
  Caption or metadata text.
</p>

<!-- Fine print -->
<p class="sgds:text-body-subtle sgds:text-xs sgds:leading-normal">
  Fine print or legal disclaimer text.
</p>
```

---

## Form Labels

```html
<label class="sgds:text-label-default sgds:text-sm sgds:font-medium sgds:block sgds:mb-2">
  Field Label
</label>

<p class="sgds:text-body-subtle sgds:text-xs sgds:mt-1">
  Helper text below an input field.
</p>
```

---

## Links

```html
<a href="#" class="sgds:text-link-default sgds:text-base sgds:font-normal">
  Standard link
</a>

<a href="#" class="sgds:text-link-default hover:sgds:text-link-emphasis sgds:text-base sgds:font-medium">
  Link with hover state
</a>
```

---

## Code

```html
<!-- Inline code -->
<p class="sgds:text-body-default">
  Use the <code class="sgds:font-mono sgds:text-sm sgds:bg-surface-raised sgds:px-1 sgds:rounded">import</code> statement.
</p>

<!-- Code block -->
<pre class="sgds:font-mono sgds:text-sm sgds:leading-relaxed sgds:bg-surface-raised sgds:p-4 sgds:rounded">
  function hello() {
    return 'world';
  }
</pre>
```

---

## Uppercase Labels and Badges

```html
<span class="sgds:text-xs sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  Badge Label
</span>

<span class="sgds:text-xs sgds:font-semibold sgds:uppercase sgds:tracking-widest">
  Category Tag
</span>
```

---

## Blockquotes

```html
<blockquote class="sgds:text-body-default sgds:text-lg sgds:font-medium sgds:leading-relaxed sgds:italic sgds:border-l-4 sgds:border-primary-default sgds:pl-6 sgds:my-6">
  "A meaningful quote that stands out from the main content."
</blockquote>
```

---

## Statistics / Numbers

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

---

## Buttons

```html
<!-- Standard button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-base sgds:font-medium sgds:px-6 sgds:py-3 sgds:rounded">
  Button Text
</button>

<!-- Small button -->
<button class="sgds:bg-primary-default sgds:text-white sgds:text-sm sgds:font-medium sgds:px-4 sgds:py-2 sgds:rounded">
  Small Button
</button>
```

---

## Card with Typography Hierarchy

```html
<div class="sgds:bg-surface-raised sgds:p-6 sgds:rounded-lg">
  <h3 class="sgds:text-heading-default sgds:text-2-xl sgds:font-semibold sgds:leading-tight sgds:mb-2">
    Card Title
  </h3>
  <p class="sgds:text-body-subtle sgds:text-sm sgds:leading-normal sgds:mb-4">
    Updated 2 hours ago
  </p>
  <p class="sgds:text-body-default sgds:text-base sgds:leading-relaxed sgds:mb-4">
    Main card description with comfortable readability.
  </p>
  <a href="#" class="sgds:text-link-default sgds:text-sm sgds:font-medium">
    Read more →
  </a>
</div>
```

---

## Best Practices

**Pair font size with appropriate line height:**

| Context | Size | Leading |
|---------|------|---------|
| Display | 5-xl+ | tight / none |
| Headings | 2-xl – 4-xl | snug |
| Body | base – lg | relaxed |
| Labels / captions | xs – sm | normal |

**Font weight for hierarchy:**
- Display / H1 → `bold`
- H2 / H3 → `semibold`
- Body → `normal` or `medium`
- Labels → `medium`

**Tighten tracking for large text, widen for small caps:**
- `text-5-xl` and above → `tracking-tight`
- `text-xs uppercase` → `tracking-wider` or `tracking-widest`

## See Also

- **[type-properties.md](type-properties.md)** — Full scale tables for all token values
