# SGDS Typography Utilities Skill

Helps developers apply consistent text sizing, weights, line heights, letter spacing, and font families using SGDS typography utilities.

## Core Concept

All SGDS typography utilities use the `sgds:` prefix. The main properties:

- **Font size** — `sgds:text-{size}` where size is the pixel value (e.g. `sgds:text-16`)
- **Font weight** — `sgds:font-{weight}` (light / regular / semibold / bold)
- **Line height** — `sgds:leading-{size}` where size is the pixel value (e.g. `sgds:leading-24`)
- **Letter spacing** — `sgds:tracking-{size}` (tighter / tight / normal / wide / wider)
- **Font family** — `sgds:font-sans` / `sgds:font-mono`

## Font Size Scale

| Token | Pixel value | Typical use |
|-------|-------------|-------------|
| `sgds:text-12` | 12px | Label (compact) |
| `sgds:text-14` | 14px | Caption, overline |
| `sgds:text-16` | 16px | Body, label, subtitle |
| `sgds:text-20` | 20px | Lead body, subtitle |
| `sgds:text-24` | 24px | H4 |
| `sgds:text-28` | 28px | H3 |
| `sgds:text-32` | 32px | H2 |
| `sgds:text-40` | 40px | H1, Display |
| `sgds:text-48` | 48px | Display |
| `sgds:text-56` | 56px | Display |

## Line Height — Ratio Rule

Line height is calculated from the font size and rounded to the nearest 4-point grid token:

- **1.5×** — body text, captions (e.g. `sgds:text-16` → `sgds:leading-24`)
- **1.2×** — headings, subtitles, display (e.g. `sgds:text-48` → `sgds:leading-56`)

For `sgds:text-16`: use `sgds:leading-24` for body, `sgds:leading-20` for label or subtitle.
For `sgds:text-20`: use `sgds:leading-32` for lead body, `sgds:leading-24` for subtitle.

## Letter Spacing by Role

| Role | Tracking |
|------|----------|
| Display | `sgds:tracking-tighter` |
| Headings (H1–H4) | `sgds:tracking-tight` |
| Subtitles | `sgds:tracking-normal` |
| Overline | `sgds:tracking-wide` |
| Body, labels, captions | no class needed (normal is default) |

## Quick Decision Guide

**Styling a display heading?**

Use `<h1>`.

| Variant | Classes |
|---------|---------|
| Display Large Bold | `sgds:text-56 sgds:font-bold sgds:leading-64 sgds:tracking-tighter` |
| Display Large Light | `sgds:text-56 sgds:font-light sgds:leading-64 sgds:tracking-tighter` |
| Display Medium Bold *(default)* | `sgds:text-48 sgds:font-bold sgds:leading-56 sgds:tracking-tighter` |
| Display Medium Light | `sgds:text-48 sgds:font-light sgds:leading-56 sgds:tracking-tighter` |
| Display Small Bold | `sgds:text-40 sgds:font-bold sgds:leading-48 sgds:tracking-tighter` |
| Display Small Light | `sgds:text-40 sgds:font-light sgds:leading-48 sgds:tracking-tighter` |

**Styling a section heading (H1–H4)?**

| Variant | Element | Classes |
|---------|---------|---------|
| H1 Bold | `<h1>` | `sgds:text-40 sgds:font-bold sgds:leading-48 sgds:tracking-tight` |
| H1 Light | `<h1>` | `sgds:text-40 sgds:font-light sgds:leading-48 sgds:tracking-tight` |
| H2 Bold | `<h2>` | `sgds:text-32 sgds:font-bold sgds:leading-40 sgds:tracking-tight` |
| H2 Light | `<h2>` | `sgds:text-32 sgds:font-light sgds:leading-40 sgds:tracking-tight` |
| H3 Semibold *(default)* | `<h3>` | `sgds:text-28 sgds:font-semibold sgds:leading-32 sgds:tracking-tight` |
| H3 Light | `<h3>` | `sgds:text-28 sgds:font-light sgds:leading-32 sgds:tracking-tight` |
| H4 Semibold | `<h4>` | `sgds:text-24 sgds:font-semibold sgds:leading-28 sgds:tracking-tight` |
| H4 Light | `<h4>` | `sgds:text-24 sgds:font-light sgds:leading-28 sgds:tracking-tight` |

**Styling a subtitle (H5–H6)?**

| Variant | Element | Classes |
|---------|---------|---------|
| Subtitle Medium Semibold *(default)* | `<h5>` | `sgds:text-20 sgds:font-semibold sgds:leading-24 sgds:tracking-normal` |
| Subtitle Medium Light | `<h5>` | `sgds:text-20 sgds:font-light sgds:leading-24 sgds:tracking-normal` |
| Subtitle Small Semibold | `<h6>` | `sgds:text-16 sgds:font-semibold sgds:leading-20 sgds:tracking-normal` |
| Subtitle Small Light | `<h6>` | `sgds:text-16 sgds:font-light sgds:leading-20 sgds:tracking-normal` |

**Styling body content?**

Use `<p>`.

| Variant | Classes |
|---------|---------|
| Body Large Semibold | `sgds:text-20 sgds:font-semibold sgds:leading-32 sgds:mb-paragraph-md` |
| Body Large Regular | `sgds:text-20 sgds:leading-32 sgds:mb-paragraph-md` |
| Body Medium Semibold | `sgds:text-16 sgds:font-semibold sgds:leading-24 sgds:mb-paragraph-md` |
| Body Medium Regular *(default)* | `sgds:text-16 sgds:leading-24 sgds:mb-paragraph-md` |
| Body Small Semibold | `sgds:text-14 sgds:font-semibold sgds:leading-20 sgds:mb-paragraph-md` |
| Body Small Regular | `sgds:text-14 sgds:leading-20 sgds:mb-paragraph-md` |

**Styling a form label or UI label?**

In form context: prefer the component's built-in `label` attribute. Use `<label>` only if the component has no built-in label support. Outside form context: use `<div>`.

| Variant | Classes |
|---------|---------|
| Label Large Semibold | `sgds:text-16 sgds:font-semibold sgds:leading-20` |
| Label Large Regular | `sgds:text-16 sgds:leading-20` |
| Label Small Semibold | `sgds:text-12 sgds:font-semibold sgds:leading-16` |
| Label Small Regular | `sgds:text-12 sgds:leading-16` |

**Styling a caption or helper text?**

Use `<div>`.

| Variant | Classes |
|---------|---------|
| Caption Semibold | `sgds:text-14 sgds:font-semibold sgds:leading-20 sgds:mb-paragraph-sm` |
| Caption Regular *(default)* | `sgds:text-14 sgds:leading-20 sgds:mb-paragraph-sm` |

**Styling an overline?**

Always use `<div>` with `sgds:uppercase`.

| Variant | Classes |
|---------|---------|
| Overline Semibold | `sgds:text-14 sgds:font-semibold sgds:leading-20 sgds:uppercase sgds:tracking-wide` |
| Overline Regular *(default)* | `sgds:text-14 sgds:leading-20 sgds:uppercase sgds:tracking-wide` |

**Styling a link?**

Always use `<a href="...">`. All link patterns include underline.

| Variant | Classes |
|---------|---------|
| Link Large | `sgds:text-20 sgds:leading-32 sgds:underline` |
| Link Medium *(default)* | `sgds:text-16 sgds:leading-24 sgds:underline` |
| Link Small | `sgds:text-14 sgds:leading-20 sgds:underline` |
| Link XS | `sgds:text-12 sgds:leading-16 sgds:underline` |

**Styling code?**

Always apply `sgds:font-mono` to `<code>` and `<pre>`.

```html
<code class="sgds:font-mono sgds:text-14">inline code</code>
<pre class="sgds:font-mono sgds:text-14 sgds:leading-20">block code</pre>
```

## Reference Documentation

| File | Covers |
|------|--------|
| [`type-properties.md`](typography/type-properties.md) | Full scale tables for all eight type properties, ratio rules, and pairing guide |
| [`patterns.md`](typography/patterns.md) | HTML patterns for all content types |

---

**For AI Agents**: Use numeric pixel tokens — `sgds:text-{px}` for font size and `sgds:leading-{px}` for line height. Apply the 1.5× ratio (body/caption) or 1.2× ratio (heading/display) rounded to the nearest 4-point grid token. Apply tracking by role: display → `tracking-tighter`, headings → `tracking-tight`, subtitles → `tracking-normal`, overlines → `tracking-wide`. See reference files for full pairing tables.


## Font Size — Semantic Utilities (Always Prefer These)

SGDS provides **semantic font-size utilities** named by typographic role. **Always use these in preference to raw numeric scale utilities** (`sgds:text-xs`, `sgds:text-base`, etc.) — they encode design intent and stay consistent if the underlying token values change.

| Role | Utilities |
|------|-----------|
| Display | `sgds:text-display-sm` `sgds:text-display-md` `sgds:text-display-lg` |
| Heading | `sgds:text-heading-sm` `sgds:text-heading-md` `sgds:text-heading-lg` `sgds:text-heading-xl` |
| Subtitle | `sgds:text-subtitle-sm` `sgds:text-subtitle-md` |
| Body | `sgds:text-body-sm` `sgds:text-body-md` `sgds:text-body-lg` |
| Label | `sgds:text-label-xs` `sgds:text-label-sm` `sgds:text-label-md` `sgds:text-label-lg` |
| Caption | `sgds:text-caption-md` |
| Overline | `sgds:text-overline-md` |

Only fall back to raw scale utilities (`sgds:text-xs` … `sgds:text-9-xl`) when none of the semantic roles above fit the use case.

## Line Height — Semantic Utilities (Always Prefer These)

SGDS provides **semantic line-height utilities** named by size scale. **Always use these in preference to raw numeric pixel utilities** (`sgds:leading-16`, `sgds:leading-20`, etc.) — they are defined in `responsive.css` and will adapt as the design system evolves.

| Utility | Maps to |
|---------|----------|
| `sgds:leading-3-xs` | `--sgds-line-height-16` |
| `sgds:leading-2-xs` | `--sgds-line-height-20` |
| `sgds:leading-xs` | `--sgds-line-height-24` |
| `sgds:leading-sm` | `--sgds-line-height-28` |
| `sgds:leading-md` | `--sgds-line-height-32` |
| `sgds:leading-lg` | `--sgds-line-height-40` |
| `sgds:leading-xl` | `--sgds-line-height-48` |
| `sgds:leading-2-xl` | `--sgds-line-height-56` |
| `sgds:leading-3-xl` | `--sgds-line-height-64` |

Only fall back to raw pixel utilities (`sgds:leading-16` … `sgds:leading-64`) when you need a fixed line height that must never adapt.

## Quick Decision Guide

**Styling a hero/display heading?**

Use `<h1>` — utilities in `@layer utilities` always override `reboot.css` defaults in `@layer base`.

| Token | Classes |
|-------|---------|
| `sgds-display-lg-bold` | `sgds:text-display-lg sgds:font-bold sgds:leading-3-xl sgds:tracking-tighter` |
| `sgds-display-lg-light` | `sgds:text-display-lg sgds:font-light sgds:leading-3-xl sgds:tracking-tighter` |
| `sgds-display-md-bold` *(default)* | `sgds:text-display-md sgds:font-bold sgds:leading-2-xl sgds:tracking-tighter` |
| `sgds-display-md-light` | `sgds:text-display-md sgds:font-light sgds:leading-2-xl sgds:tracking-tighter` |
| `sgds-display-sm-bold` | `sgds:text-display-sm sgds:font-bold sgds:leading-xl sgds:tracking-tighter` |
| `sgds-display-sm-light` | `sgds:text-display-sm sgds:font-light sgds:leading-xl sgds:tracking-tighter` |

**Styling a section heading (H1–H4)?**

Use native `<h1>`–`<h4>` elements — `reboot.css` font sizes for these match the SGDS heading tokens exactly, so no override risk.

| Token | H-level | Classes |
|-------|---------|---------|
| `sgds-heading-xl-bold` | H1 | `sgds:text-heading-xl sgds:font-bold sgds:leading-xl sgds:tracking-tight` |
| `sgds-heading-xl-light` | H1 | `sgds:text-heading-xl sgds:font-light sgds:leading-xl sgds:tracking-tight` |
| `sgds-heading-lg-bold` | H2 | `sgds:text-heading-lg sgds:font-bold sgds:leading-lg sgds:tracking-tight` |
| `sgds-heading-lg-light` | H2 | `sgds:text-heading-lg sgds:font-light sgds:leading-lg sgds:tracking-tight` |
| `sgds-heading-md-semibold` *(default)* | H3 | `sgds:text-heading-md sgds:font-semibold sgds:leading-md sgds:tracking-tight` |
| `sgds-heading-md-light` | H3 | `sgds:text-heading-md sgds:font-light sgds:leading-md sgds:tracking-tight` |
| `sgds-heading-sm-semibold` | H4 | `sgds:text-heading-sm sgds:font-semibold sgds:leading-sm sgds:tracking-tight` |
| `sgds-heading-sm-light` | H4 | `sgds:text-heading-sm sgds:font-light sgds:leading-sm sgds:tracking-tight` |

**Styling a subtitle or lead text?**

Use native `<h5>`/`<h6>` — utilities override `@layer base` so `reboot.css` defaults will not conflict.

| Token | Element | Classes |
|-------|---------|---------|
| `sgds-subtitle-md-semibold` *(default)* | `<h5>` | `sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| `sgds-subtitle-md-light` | `<h5>` | `sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal` |
| `sgds-subtitle-sm-semibold` | `<h6>` | `sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-subtitle-sm-light` | `<h6>` | `sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal` |

**Styling body content?**

| Token | Classes |
|-------|---------|
| `sgds-body-lg-semibold` | `sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal` |
| `sgds-body-lg-regular` | `sgds:text-body-lg sgds:font-regular sgds:leading-md sgds:tracking-normal` |
| `sgds-body-md-semibold` | `sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| `sgds-body-md-regular` *(default)* | `sgds:text-body-md sgds:font-regular sgds:leading-xs sgds:tracking-normal` |
| `sgds-body-sm-semibold` | `sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-body-sm-regular` | `sgds:text-body-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal` |

All body tokens include `sgds-paragraph-spacing-xl` — apply `sgds:mb-xl` between consecutive paragraphs. Use `<p>` — utilities override `@layer base` so `reboot.css` margin resets will not conflict.

**Styling a form label or UI label?**

| Token | Use case | Classes |
|-------|----------|---------|
| `sgds-label-lg-semibold` | Large button | `sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal` |
| `sgds-label-lg-regular` | Labels in components | `sgds:text-label-lg sgds:font-regular sgds:leading-md sgds:tracking-normal` |
| `sgds-label-md-semibold` | Medium button | `sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| `sgds-label-md-regular` *(default)* | Labels in components | `sgds:text-label-md sgds:font-regular sgds:leading-xs sgds:tracking-normal` |
| `sgds-label-md-light` | Placeholder text | `sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal` |
| `sgds-label-sm-semibold` | Small button | `sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-label-sm-regular` | Timestamp / tag label | `sgds:text-label-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-label-xs-semibold` | Timestamp / tag label | `sgds:text-label-xs sgds:font-semibold sgds:leading-3-xs sgds:tracking-normal` |
| `sgds-label-xs-regular` | Timestamp / tag label | `sgds:text-label-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal` |

In form context: use the component's built-in label attribute first. Only use a `<label>` element if the SGDS component has no built-in label support. Outside form context: use `<div>`.

**Styling an overline?**

| Token | Classes |
|-------|---------|
| `sgds-overline-semibold` | `sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |
| `sgds-overline-regular` *(default)* | `sgds:text-overline-md sgds:font-regular sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |

Always use `<div>` and always apply `sgds:uppercase`. Use for key-value labels and data table header labels.

**Styling a caption or helper text?**

| Token | Classes |
|-------|---------|
| `sgds-caption-semibold` | `sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-caption-regular` *(default)* | `sgds:text-caption-md sgds:font-regular sgds:leading-2-xs sgds:tracking-normal` |

Both caption tokens include `sgds-paragraph-spacing-md` — apply `sgds:mb-md` between consecutive captions. Use `<div>` for caption text.

**Styling a link?**

| Token | Classes |
|-------|---------|
| `sgds-link-lg-regular` | `sgds:text-link-lg sgds:font-regular sgds:leading-md sgds:tracking-normal sgds:underline` |
| `sgds-link-md-regular` *(default)* | `sgds:text-link-md sgds:font-regular sgds:leading-xs sgds:tracking-normal sgds:underline` |
| `sgds-link-sm-regular` | `sgds:text-link-sm sgds:font-regular sgds:leading-2-xs sgds:tracking-normal sgds:underline` |
| `sgds-link-xs-regular` | `sgds:text-link-xs sgds:font-regular sgds:leading-3-xs sgds:tracking-normal sgds:underline` |

Always use `<a>` with an `href`. All link tokens are always underlined.

**Unsure what size/weight to pair?**
→ See [`patterns.md`](typography/patterns.md) for common content-type patterns.

## Reference Documentation

| File | Covers | Use for |
|------|--------|---------|
| [`type-properties.md`](typography/type-properties.md) | Full scale tables for font-size, font-weight, line-height, letter-spacing, font-family with all token values | Looking up exact values, picking the right token from the scale |
| [`patterns.md`](typography/patterns.md) | Common HTML patterns: display headings, section headings, body text, form labels, links | Implementing a specific content type or component |

---

**For AI Agents**: Always prefer semantic font-size utilities (`sgds:text-display-*`, `sgds:text-heading-*`, `sgds:text-body-*`, etc.) over raw scale utilities (`sgds:text-xs`, `sgds:text-base`, etc.) — only use raw scale when no semantic role matches. Always prefer semantic line-height utilities (`sgds:leading-xs`, `sgds:leading-md`, `sgds:leading-xl`, etc.) over raw pixel utilities. Both semantic font-size and line-height tokens are responsive and defined in `responsive.css`.

**Element guidance** (utilities in `@layer utilities` override `reboot.css` in `@layer base`):
- **Display**: use `<h1>` — utilities override reboot so display tokens apply correctly
- **Headings (xl/lg/md/sm)**: use native `<h1>`–`<h4>`
- **Subtitles**: use native `<h5>`–`<h6>`
- **Body**: use `<p>`
- **Captions**: use `<div>`
- **Links**: always use `<a href="...">` with `sgds:underline`

Pair smaller leading with large display text, larger leading with body/reading text. Redirect to reference files for exact token values or specific patterns.
