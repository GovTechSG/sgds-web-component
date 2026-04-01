# Typography Type Properties Reference

Full reference for all SGDS typography utility classes — scale tables, usage rules, do/don't guidance, and complete examples.

---

## Overview

SGDS typography utilities control eight visual properties of text. Each property is applied via a dedicated `sgds:` Tailwind utility class. All classes are available after importing `utility.css` — no additional setup is needed beyond the standard SGDS utility setup.

The eight properties are: **font family**, **font weight**, **font size**, **line height**, **letter spacing**, **paragraph spacing**, **text decoration**, and **text transform**.

---

## Principles

- **Use the scale, not arbitrary values.** Every property has a defined SGDS scale. Apply scale tokens rather than inline styles or custom values.
- **Defaults require no class.** The reboot sets body-safe defaults (sans-serif, regular weight, 16px, 1.5 line height). Only add a class when deviating from the default.
- **Combine properties intentionally.** Font size, line height, and letter spacing work together. Large text needs tighter leading and tracking; small text needs looser.
- **Monospace for code, always.** Apply `sgds:font-mono` on every `<code>` and `<pre>` element without exception.

---

## 1. Font Family

Apply with `sgds:font-{family}`:

### Scale / Values

| Token | Stack | Use for |
|-------|-------|---------|
| `sgds:font-sans` | Inter, system-ui, sans-serif | All prose, headings, labels (reboot default) |
| `sgds:font-mono` | JetBrainsMono, Courier New, monospace | All code — inline and block |

### Roles & Usage

- **Prose and UI text** — reboot applies `font-sans` globally; no class needed on regular content.
- **Code** — always apply `sgds:font-mono` to `<code>`, `<pre>`, and `<kbd>` elements.
- Never use `sgds:font-sans` on `<code>` or `<pre>` elements.

```html
<!-- No class needed for regular text — reboot default -->
<p>Regular body text</p>

<!-- Always set mono on code -->
<code class="sgds:font-mono sgds:text-14">const value = 42;</code>
<pre class="sgds:font-mono sgds:text-14 sgds:leading-20">
  function hello() {
    return 'world';
  }
</pre>
```

---

## 2. Font Weight

Apply with `sgds:font-{weight}`:

### Scale / Values

| Token | Numeric weight | Typical use |
|-------|---------------|-------------|
| `sgds:font-light` | 300 | Large display text; use sparingly |
| `sgds:font-regular` | 400 | Reboot default — body text |
| `sgds:font-semibold` | 600 | Subtitles, labels, button labels |
| `sgds:font-bold` | 700 | Headings, strong emphasis |

### Roles & Usage

- **Body text** — reboot applies `font-regular` globally; no class needed.
- **Subtitles and labels** → `sgds:font-semibold`
- **Headings** → `sgds:font-bold`
- **Display / hero text** → `sgds:font-bold` or `sgds:font-light` for large low-weight treatments

```html
<p>Body text — no weight class needed</p>
<label class="sgds:font-semibold sgds:text-14">Form label</label>
<h3 class="sgds:font-semibold sgds:text-24">Subtitle</h3>
<h1 class="sgds:font-bold sgds:text-48">Page heading</h1>
```

---

## 3. Font Size

Apply with `sgds:text-{size}` where the number is the pixel value:

### Scale / Values

| Token | Pixel value | Typical use |
|-------|-------------|-------------|
| `sgds:text-12` | 12px | Fine print, captions, badge labels |
| `sgds:text-14` | 14px | Secondary labels, helper text, code |
| `sgds:text-16` | 16px | Default body text, subtiles |
| `sgds:text-20` | 20px | Lead paragraphs, intro text, body large, subtiles |
| `sgds:text-24` | 24px | H4 / card headings |
| `sgds:text-28` | 28px | H3 |
| `sgds:text-32` | 32px | H2 |
| `sgds:text-40` | 40px | Display, H1 |
| `sgds:text-48` | 48px | Display |
| `sgds:text-56` | 56px | Display |

**Responsive sizes** (use in media query breakpoints only — not for base styles):

| Token | Pixel value |
|-------|-------------|
| `sgds:text-18` | 18px |
| `sgds:text-22` | 22px |
| `sgds:text-26` | 26px |
| `sgds:text-30` | 30px |
| `sgds:text-36` | 36px |
| `sgds:text-44` | 44px |
| `sgds:text-52` | 52px |

### Roles & Usage

- Match font size to content role: larger for headings, `sgds:text-16` for standard body.
- Pair each font size with the appropriate line height (see Line Height section).
- Avoid skipping more than two steps in heading hierarchies.

```html
<p class="sgds:text-12">Fine print or legal text</p>
<p class="sgds:text-16">Standard body text</p>
<h3 class="sgds:text-28 sgds:font-semibold sgds:leading-32">Section heading</h3>
<h1 class="sgds:text-48 sgds:font-bold sgds:leading-56">Page title</h1>
```

---

## 4. Line Height

Apply with `sgds:leading-{size}` where the number is the pixel value:

### Scale / Values

| Token | Pixel value |
|-------|-------------|
| `sgds:leading-16` | 16px |
| `sgds:leading-20` | 20px |
| `sgds:leading-24` | 24px |
| `sgds:leading-28` | 28px |
| `sgds:leading-32` | 32px |
| `sgds:leading-36` | 36px |
| `sgds:leading-40` | 40px |
| `sgds:leading-44` | 44px |
| `sgds:leading-48` | 48px |
| `sgds:leading-52` | 52px |
| `sgds:leading-56` | 56px |
| `sgds:leading-60` | 60px |
| `sgds:leading-64` | 64px |

### Ratio Rule

Two ratios determine line height, calculated then rounded to the nearest 4-point grid token:

- **1.5×** — body text, labels, captions
- **1.2×** — headings, subtitles, display

### Font-Size-to-Leading Pairing

**Base scale:**

| Font size | Role | Ratio | Calculated | Leading token |
|-----------|------|-------|------------|--------------|
| `sgds:text-12` | Label | 1.2× | 14.4 → 16 | `sgds:leading-16` |
| `sgds:text-14` | Footnote, Caption, overline | 1.5× | 21 → 20 | `sgds:leading-20` |
| `sgds:text-16` | Body | 1.5× | 24 | `sgds:leading-24` |
| `sgds:text-16` | Subtitle | 1.2× | 19.2 → 20 | `sgds:leading-20` |
| `sgds:text-20` | Lead body | 1.5× | 30 → 32 | `sgds:leading-32` |
| `sgds:text-20` | Subtitle | 1.2× | 24 | `sgds:leading-24` |
| `sgds:text-24` | H4 | 1.2× | 28.8 → 28 | `sgds:leading-28` |
| `sgds:text-28` | H3 | 1.2× | 33.6 → 32 | `sgds:leading-32` |
| `sgds:text-32` | H2 | 1.2× | 38.4 → 40 | `sgds:leading-40` |
| `sgds:text-40` | H1, Display | 1.2× | 48 | `sgds:leading-48` |
| `sgds:text-48` | Display | 1.2× | 57.6 → 56 | `sgds:leading-56` |
| `sgds:text-56` | Display | 1.2× | 67.2 → 64 | `sgds:leading-64` |

### Roles & Usage

- For `sgds:text-16`, choose based on role: `sgds:leading-24` for body, `sgds:leading-20` for label or subtitle.
- For `sgds:text-20`, choose based on role: `sgds:leading-32` for lead body, `sgds:leading-24` for subtitle.
- Do not mix line heights within a single heading element.

```html
<!-- Body and caption — 1.5× ratio -->
<p class="sgds:text-14 sgds:leading-20">Caption or overline text</p>
<p class="sgds:text-16 sgds:leading-24">Standard body text</p>
<p class="sgds:text-20 sgds:leading-32">Lead paragraph</p>

<!-- Labels, headings and display — 1.2× ratio -->
<span class="sgds:text-12 sgds:leading-16">Compact label</span>
<span class="sgds:text-16 sgds:font-semibold sgds:leading-20">Label or subtitle</span>
<h3 class="sgds:text-20 sgds:font-semibold sgds:leading-24">Subtitle</h3>
<h3 class="sgds:text-24 sgds:font-semibold sgds:leading-28">H4</h3>
<h2 class="sgds:text-32 sgds:font-bold sgds:leading-40">H2</h2>
<h1 class="sgds:text-48 sgds:font-bold sgds:leading-56">Page title</h1>
```

---

## 5. Letter Spacing

Apply with `sgds:tracking-{size}`:

### Scale / Values

| Token | Value | Typical use |
|-------|-------|-------------|
| `sgds:tracking-tighter` | −1px | Very large display headings |
| `sgds:tracking-tight` | −0.4px | Large headings (48px and above) |
| `sgds:tracking-normal` | 0px | Default — all body text |
| `sgds:tracking-wide` | 1px | Slightly open body text |
| `sgds:tracking-wider` | 2px | Small uppercase labels and badges |

### Roles & Usage

- **Body text** — leave at `normal`; no class needed.
- **Large headings (48px+)** → `sgds:tracking-tight` or `sgds:tracking-tighter`
- **Small uppercase labels** → `sgds:tracking-wider`
- Never apply wide tracking to large text — it reduces readability.

```html
<h1 class="sgds:text-56 sgds:font-bold sgds:leading-64 sgds:tracking-tighter">
  Hero heading
</h1>
<h2 class="sgds:text-48 sgds:font-bold sgds:leading-56 sgds:tracking-tight">
  Page title
</h2>
<p class="sgds:text-16">Body text — tracking-normal is the default, no class needed</p>
<span class="sgds:text-12 sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  Badge label
</span>
```

---

## 6. Paragraph Spacing

Apply with `sgds:mb-paragraph-{size}` on the paragraph element:

### Scale / Values

| Token | Value | Typical use |
|-------|-------|-------------|
| `sgds:mb-paragraph-none` | 0 | Reset — remove spacing between paragraphs |
| `sgds:mb-paragraph-sm` | 0.5rem (8px) | Compact content, dense UI |
| `sgds:mb-paragraph-md` | 1rem (16px) | Standard body content |
| `sgds:mb-paragraph-lg` | 1.5rem (24px) | Long-form reading, articles |
| `sgds:mb-paragraph-xl` | 2rem (32px) | Landing pages, editorial layouts |

### Roles & Usage

- Apply to the paragraph element, not its container.
- Use `sgds:mb-paragraph-md` for standard content; increase for long-form reading.
- Use `sgds:mb-paragraph-none` to reset spacing in tightly controlled layouts.

```html
<!-- Standard article content -->
<p class="sgds:mb-paragraph-md">First paragraph with standard spacing.</p>
<p class="sgds:mb-paragraph-md">Second paragraph follows with the same gap.</p>

<!-- Long-form reading -->
<p class="sgds:mb-paragraph-lg">Longer editorial content benefits from more air between paragraphs.</p>
<p class="sgds:mb-paragraph-lg">This breathing room improves reading stamina.</p>
```

---

## 7. Text Decoration

Apply with the decoration class directly:

### Scale / Values

| Token | Effect | Typical use |
|-------|--------|-------------|
| `sgds:underline` | Underline | Links, emphasised inline terms |
| `sgds:overline` | Overline | Decorative labels |
| `sgds:line-through` | Strikethrough | Deleted content, prices |
| `sgds:no-underline` | Remove underline | Remove default link underline |

### Roles & Usage

- **Links** — apply `sgds:underline` to make links clearly identifiable.
- **Deleted/struck content** — use `sgds:line-through` paired with `<del>` for semantic accuracy.
- **Removing underlines** — use `sgds:no-underline` when link styling is handled by colour or weight instead.

```html
<a href="#" class="sgds:text-link-default sgds:underline">Standard link</a>

<p>
  Original price: <span class="sgds:line-through sgds:text-14">$99</span>
  Sale price: <strong class="sgds:font-bold">$59</strong>
</p>

<!-- Navigation link — underline removed, colour conveys the link -->
<a href="#" class="sgds:text-link-default sgds:no-underline sgds:font-semibold">
  Nav item
</a>
```

---

## 8. Text Transform

Apply with the transform class directly:

### Scale / Values

| Token | Effect | Typical use |
|-------|--------|-------------|
| `sgds:uppercase` | ALL CAPS | Badge labels, category tags, section markers |
| `sgds:lowercase` | all lowercase | Stylistic use; rare in UI |
| `sgds:capitalize` | Title Case | Auto-capitalise proper names |
| `sgds:normal-case` | Reset | Remove inherited transform |

### Roles & Usage

- **Uppercase labels** — always pair with `sgds:tracking-wider` and a small font size for readability.
- **Capitalize** — use on dynamic content where casing is unknown (e.g. user names).
- **Normal-case** — use to reset an inherited `uppercase` from a parent element.

```html
<!-- Badge / category tag -->
<span class="sgds:text-12 sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  New
</span>

<!-- Section marker -->
<p class="sgds:text-14 sgds:font-semibold sgds:uppercase sgds:tracking-wider sgds:text-body-subtle">
  Overview
</p>

<!-- Reset inherited transform -->
<button class="sgds:uppercase">
  Parent is uppercase
  <span class="sgds:normal-case">but this is not</span>
</button>
```

---

## Do & Don't

**Font weight**
- ✅ Use `sgds:font-semibold` for labels and subtitles, `sgds:font-bold` for headings
- ❌ Do not apply `sgds:font-bold` to every element — it destroys visual hierarchy

**Font size**
- ✅ Match size to content role: `sgds:text-16` for body, `sgds:text-30`+ for headings
- ❌ Do not use large sizes for body text or small sizes for headings

**Line height**
- ✅ Pair heading line height with the token closest to 1.2× the font size; `sgds:leading-24` for 16px body
- ❌ Do not use too large a leading on headings — multi-line headings become too loose

**Letter spacing**
- ✅ Tighten tracking on large text; widen for small uppercase labels
- ❌ Do not apply `sgds:tracking-wider` to large text — it reduces legibility severely

**Uppercase**
- ✅ Pair `sgds:uppercase` with `sgds:tracking-wider` and a small font size
- ❌ Do not use `sgds:uppercase` on long paragraphs — all-caps body text is hard to read

**Monospace**
- ✅ Always use `sgds:font-mono` on `<code>` and `<pre>`
- ❌ Never use `sgds:font-sans` on code elements

---

## Examples

### Page heading with subtitle

```html
<div class="sgds:mb-paragraph-xl">
  <h1 class="sgds:text-48 sgds:font-bold sgds:leading-56 sgds:tracking-tight sgds:mb-paragraph-sm">
    Design System
  </h1>
  <p class="sgds:text-18 sgds:font-regular sgds:leading-28 sgds:text-body-subtle">
    Build consistent, accessible Singapore Government digital services.
  </p>
</div>
```

### Article body

```html
<article>
  <h2 class="sgds:text-36 sgds:font-bold sgds:leading-44 sgds:mb-paragraph-md">
    Section Title
  </h2>
  <p class="sgds:text-16 sgds:leading-24 sgds:mb-paragraph-lg">
    First paragraph of the section. Standard body size with comfortable line height.
  </p>
  <p class="sgds:text-16 sgds:leading-24 sgds:mb-paragraph-lg">
    Second paragraph follows with the same spacing for a consistent reading rhythm.
  </p>
</article>
```

### Badge and label

```html
<span class="sgds:text-12 sgds:font-semibold sgds:uppercase sgds:tracking-wider">
  Beta
</span>

<label class="sgds:text-14 sgds:font-semibold sgds:block sgds:mb-paragraph-sm">
  Email address
</label>
```

### Code block

```html
<pre class="sgds:font-mono sgds:text-14 sgds:leading-20 sgds:bg-surface-raised sgds:p-md sgds:rounded">
  const greeting = 'hello';
  console.log(greeting);
</pre>
```

### Link with decoration

```html
<a href="#" class="sgds:text-link-default sgds:text-16 sgds:underline sgds:font-regular">
  Read the full documentation
</a>
```

---

## For AI

When generating typography markup with SGDS utilities:

- **Font family**: No class needed for prose; always add `sgds:font-mono` to `<code>` and `<pre>`.
- **Font weight**: `sgds:font-semibold` for subtitles and labels; `sgds:font-bold` for H1–H2; `sgds:font-regular` for body (default, no class needed).
- **Font size**: Use numeric token matching the pixel size — `sgds:text-16` for body, `sgds:text-30` for H3, `sgds:text-48` for H1.
- **Line height**: Use the font-size-to-leading pairing table in Section 4. Body/label/caption uses 1.5× ratio; headings/subtitles/display uses 1.2×. Both are rounded to the nearest 4-point grid token (e.g. `sgds:text-16` → `sgds:leading-24`, `sgds:text-48` → `sgds:leading-56`).
- **Letter spacing**: `sgds:tracking-tight` for 48px+ headings; `sgds:tracking-wider` for small uppercase labels; no class for body.
- **Paragraph spacing**: `sgds:mb-paragraph-md` for standard content; `sgds:mb-paragraph-lg` for long-form reading.
- **Text decoration**: `sgds:underline` on links; `sgds:line-through` for deleted/struck content; `sgds:no-underline` when colour conveys link state.
- **Text transform**: Always pair `sgds:uppercase` with `sgds:tracking-wider` and a size of `sgds:text-12` or `sgds:text-14`.

## See Also

- **[patterns.md](patterns.md)** — Common HTML patterns pairing these properties for headings, body, forms, code, buttons
