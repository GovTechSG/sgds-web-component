# SGDS Typography Utilities Skill

Helps developers apply consistent text sizing, weights, line heights, letter spacing, and font families using SGDS typography utilities.

## Core Concept

All SGDS typography utilities use the `sgds:` prefix. The main properties:

- **Font weight** — `sgds:font-{weight}` (light / regular / semibold / bold)
- **Letter spacing** — `sgds:tracking-{size}` (tighter / tight / normal / wide / wider)
- **Font family** — `sgds:font-sans` / `sgds:font-mono`

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
| Label Large Semibold | `sgds:text-16 sgds:font-semibold sgds:leading-24` |
| Label Large Regular | `sgds:text-16 sgds:leading-24` |
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
| [`type-properties.md`](typography/type-properties.md) | Full scale tables for all six type properties and usage rules |
| [`patterns.md`](typography/patterns.md) | HTML patterns for all content types |

---

**For AI Agents**: Apply tracking by role: display → `tracking-tighter`, headings → `tracking-tight`, subtitles → `tracking-normal`, overlines → `tracking-wide`. Always apply `sgds:font-mono` to `<code>` and `<pre>`. See reference files for full property tables.

