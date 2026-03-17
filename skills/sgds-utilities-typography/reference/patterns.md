# Typography Patterns Reference

Common HTML patterns combining SGDS typography utilities for real-world content types.

> **Note**: Use library components like `<sgds-button>`, `<sgds-badge>` when available.
> These patterns are for custom components when library components don't meet your needs.

---

## Display Headings (Hero Text)

```html
<!-- sgds-display-lg-bold -->
<div role="heading" aria-level="1" class="sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter">
  Display Large Bold
</div>

<!-- sgds-display-lg-light -->
<div role="heading" aria-level="1" class="sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter">
  Display Large Light
</div>

<!-- sgds-display-md-bold (Default) -->
<div role="heading" aria-level="1" class="sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter">
  Display Medium Bold
</div>

<!-- sgds-display-md-light -->
<div role="heading" aria-level="1" class="sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter">
  Display Medium Light
</div>

<!-- sgds-display-sm-bold -->
<div role="heading" aria-level="1" class="sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter">
  Display Small Bold
</div>

<!-- sgds-display-sm-light -->
<div role="heading" aria-level="1" class="sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter">
  Display Small Light
</div>
```

**When to use:** Page heroes, marketing banners, splash screens.

---

## Section Headings (H1–H4)

```html
<!-- sgds-heading-xl-bold -->
<h1 class="sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight">
  Heading XL Bold
</h1>

<!-- sgds-heading-xl-light -->
<h1 class="sgds:text-heading-xl sgds:font-light sgds:leading-xl sgds:tracking-tight">
  Heading XL Light
</h1>

<!-- sgds-heading-lg-bold -->
<h2 class="sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight">
  Heading Large Bold
</h2>

<!-- sgds-heading-lg-light -->
<h2 class="sgds:text-heading-lg sgds:font-light sgds:leading-lg sgds:tracking-tight">
  Heading Large Light
</h2>

<!-- sgds-heading-md-semibold (Default) -->
<h3 class="sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight">
  Heading Medium Semibold
</h3>

<!-- sgds-heading-md-light -->
<h3 class="sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight">
  Heading Medium Light
</h3>

<!-- sgds-heading-sm-semibold -->
<h4 class="sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight">
  Heading Small Semibold
</h4>

<!-- sgds-heading-sm-light -->
<h4 class="sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight">
  Heading Small Light
</h4>
```

---

## Subtitles (H5–H6)

```html
<!-- sgds-subtitle-md-semibold (Default) -->
<div role="heading" aria-level="5" class="sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
  Subtitle Medium Semibold
</div>

<!-- sgds-subtitle-md-light -->
<div role="heading" aria-level="5" class="sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal">
  Subtitle Medium Light
</div>

<!-- sgds-subtitle-sm-semibold -->
<div role="heading" aria-level="6" class="sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">
  Subtitle Small Semibold
</div>

<!-- sgds-subtitle-sm-light -->
<div role="heading" aria-level="6" class="sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal">
  Subtitle Small Light
</div>
```

---

## Body Text

```html
<!-- sgds-body-lg-semibold -->
<div role="paragraph" class="sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal sgds:mb-xl">
  Body large semibold.
</div>

<!-- sgds-body-lg-regular -->
<div role="paragraph" class="sgds:text-body-lg sgds:leading-md sgds:tracking-normal sgds:mb-xl">
  Body large regular.
</div>

<!-- sgds-body-md-semibold -->
<div role="paragraph" class="sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal sgds:mb-xl">
  Body medium semibold.
</div>

<!-- sgds-body-md-regular (Default) -->
<div role="paragraph" class="sgds:text-body-md sgds:leading-xs sgds:tracking-normal sgds:mb-xl">
  Body medium regular.
</div>

<!-- sgds-body-sm-semibold -->
<div role="paragraph" class="sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-xl">
  Body small semibold.
</div>

<!-- sgds-body-sm-regular -->
<div role="paragraph" class="sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal sgds:mb-xl">
  Body small regular.
</div>
```

---

## Labels

**In form context:** use the SGDS component's built-in label attribute first. Only fall back to `<label>` if the component has no built-in label support. Outside form context: use `<div>`.

```html
<!-- Non-form context: use <div> -->

<!-- sgds-label-lg-semibold — large button, UI label -->
<div class="sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal">Label Large Semibold</div>

<!-- sgds-label-lg-regular — labels in components -->
<div class="sgds:text-label-lg sgds:leading-md sgds:tracking-normal">Label Large Regular</div>

<!-- sgds-label-md-semibold — medium button -->
<div class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">Label Medium Semibold</div>

<!-- sgds-label-md-regular (Default) — labels in components -->
<div class="sgds:text-label-md sgds:leading-xs sgds:tracking-normal">Label Medium Regular</div>

<!-- sgds-label-md-light — placeholder text -->
<div class="sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal">Label Medium Light</div>

<!-- sgds-label-sm-semibold — small button -->
<div class="sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal">Label Small Semibold</div>

<!-- sgds-label-sm-regular — timestamp / tag label -->
<div class="sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal">Label Small Regular</div>

<!-- sgds-label-xs-semibold — timestamp / tag label -->
<div class="sgds:text-label-xs sgds:font-semibold sgds:leading-3-xs sgds:tracking-normal">Label XS Semibold</div>

<!-- sgds-label-xs-regular — timestamp / tag label -->
<div class="sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal">Label XS Regular</div>
```

```html
<!-- Form context: prefer SGDS component built-in label -->
<sgds-input label="Field label"></sgds-input>

<!-- Form context fallback: use <label> only if component has no built-in label support -->
<label class="sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal">
  Field Label
</label>
```

---

## Captions

```html
<!-- sgds-caption-semibold -->
<div role="caption" class="sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
  Caption semibold
</div>

<!-- sgds-caption-regular (Default) -->
<div role="caption" class="sgds:text-caption-md sgds:leading-2-xs sgds:tracking-normal sgds:mb-md">
  Caption regular
</div>
```

**When to use:** Long paragraphs, helper text, field error messages, footnotes, footer copy.

---

## Links

Always use `<a>` with an `href`. All link tokens include underline.

```html
<!-- sgds-link-lg-regular -->
<a href="#" class="sgds:text-link-lg sgds:leading-md sgds:tracking-normal sgds:underline">
  Link large
</a>

<!-- sgds-link-md-regular (Default) -->
<a href="#" class="sgds:text-link-md sgds:leading-xs sgds:tracking-normal sgds:underline">
  Link medium
</a>

<!-- sgds-link-sm-regular -->
<a href="#" class="sgds:text-link-sm sgds:leading-2-xs sgds:tracking-normal sgds:underline">
  Link small
</a>

<!-- sgds-link-xs-regular -->
<a href="#" class="sgds:text-link-xs sgds:leading-3-xs sgds:tracking-normal sgds:underline">
  Link XS
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

## Overline

Always use `<div>` and `sgds:uppercase`. Use for key-value labels and data table header labels.

```html
<!-- sgds-overline-semibold -->
<div class="sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase">
  Overline Semibold
</div>

<!-- sgds-overline-regular (Default) -->
<div class="sgds:text-overline-md sgds:leading-2-xs sgds:tracking-wide sgds:uppercase">
  Overline Regular
</div>
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
