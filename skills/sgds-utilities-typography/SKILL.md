---
name: sgds-utilities-typography
description: "Use SGDS typography utilities with the sgds: prefix for font size, font weight, line height, letter spacing, and font family. Semantic font-size utilities (sgds:text-display-*, sgds:text-heading-*, sgds:text-body-*, sgds:text-label-*, etc.) and semantic line-height utilities (sgds:leading-xs, sgds:leading-md, sgds:leading-xl, etc.) are always preferred over raw numeric utilities — they are responsive and change with screen size. Apply this skill whenever a user asks about text sizing, heading styles, display text, body text, labels, captions, font weights, line spacing, letter spacing, monospace code fonts, or any text formatting in SGDS designs."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: typography
---

# SGDS Typography Utilities Skill

Helps developers apply consistent text sizing, weights, spacing, and font families using SGDS typography utilities.

## Prerequisites

Complete setup from **sgds-utilities-setup** skill first.

Typography utilities require the utility CSS import but do **not** require theme files — they are not theme-aware.

## Core Concept

All SGDS typography utilities use the `sgds:` prefix. The four main properties:

- **Font size** — semantic role utilities (preferred) or raw scale `sgds:text-{size}` (xs → 9-xl)
- **Font weight** — `sgds:font-{weight}` (thin → black)
- **Line height** — semantic size utilities (preferred) or raw pixel utilities `sgds:leading-{px}`
- **Letter spacing** — `sgds:tracking-{size}` (tighter → widest)
- **Font family** — `sgds:font-sans` / `sgds:font-mono`

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
| `sgds:leading-sm` | `--sgds-line-height-24` |
| `sgds:leading-md` | `--sgds-line-height-28` |
| `sgds:leading-lg` | `--sgds-line-height-32` |
| `sgds:leading-xl` | `--sgds-line-height-40` |
| `sgds:leading-2-xl` | `--sgds-line-height-44` |
| `sgds:leading-3-xl` | `--sgds-line-height-48` |

Only fall back to raw pixel utilities (`sgds:leading-16` … `sgds:leading-64`) when you need a fixed line height that must never adapt.

## Quick Decision Guide

**Styling a hero/display heading?**

Display tokens are **larger than `h1`** at desktop breakpoints. Using `<h1>` risks `reboot.css` overriding the font size. Use `<div role="heading" aria-level="1">` instead.

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

`reboot.css` sets `h5`/`h6` to specific sizes and weights; using those elements risks overrides. Use `<div role="heading">` with the correct `aria-level` instead.

| Token | `aria-level` | Classes |
|-------|----------|---------|
| `sgds-subtitle-md-semibold` *(default)* | 5 | `sgds:text-subtitle-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| `sgds-subtitle-md-light` | 5 | `sgds:text-subtitle-md sgds:font-light sgds:leading-xs sgds:tracking-normal` |
| `sgds-subtitle-sm-semibold` | 6 | `sgds:text-subtitle-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-subtitle-sm-light` | 6 | `sgds:text-subtitle-sm sgds:font-light sgds:leading-2-xs sgds:tracking-normal` |

**Styling body content?**

| Token | Classes |
|-------|---------|
| `sgds-body-lg-semibold` | `sgds:text-body-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal` |
| `sgds-body-lg-regular` | `sgds:text-body-lg sgds:leading-md sgds:tracking-normal` |
| `sgds-body-md-semibold` | `sgds:text-body-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| `sgds-body-md-regular` *(default)* | `sgds:text-body-md sgds:leading-xs sgds:tracking-normal` |
| `sgds-body-sm-semibold` | `sgds:text-body-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-body-sm-regular` | `sgds:text-body-sm sgds:leading-2-xs sgds:tracking-normal` |

All body tokens include `sgds-paragraph-spacing-xl` — apply `sgds:mb-xl` between consecutive paragraphs. Use `<div role="paragraph">` rather than `<p>` to avoid any margin resets that `reboot.css` may apply to paragraph elements.

**Styling a form label or UI label?**

| Token | Use case | Classes |
|-------|----------|---------|
| `sgds-label-lg-semibold` | Large button | `sgds:text-label-lg sgds:font-semibold sgds:leading-md sgds:tracking-normal` |
| `sgds-label-lg-regular` | Labels in components | `sgds:text-label-lg sgds:leading-md sgds:tracking-normal` |
| `sgds-label-md-semibold` | Medium button | `sgds:text-label-md sgds:font-semibold sgds:leading-xs sgds:tracking-normal` |
| `sgds-label-md-regular` *(default)* | Labels in components | `sgds:text-label-md sgds:leading-xs sgds:tracking-normal` |
| `sgds-label-md-light` | Placeholder text | `sgds:text-label-md sgds:font-light sgds:leading-xs sgds:tracking-normal` |
| `sgds-label-sm-semibold` | Small button | `sgds:text-label-sm sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-label-sm-regular` | Timestamp / tag label | `sgds:text-label-sm sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-label-xs-semibold` | Timestamp / tag label | `sgds:text-label-xs sgds:font-semibold sgds:leading-3-xs sgds:tracking-normal` |
| `sgds-label-xs-regular` | Timestamp / tag label | `sgds:text-label-xs sgds:leading-3-xs sgds:tracking-normal` |

In form context: use the component's built-in label attribute first. Only use a `<label>` element if the SGDS component has no built-in label support. Outside form context: use `<div>`.

**Styling a small uppercase badge or overline?**

| Token | Classes |
|-------|---------|
| `sgds-overline-semibold` | `sgds:text-overline-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |
| `sgds-overline-regular` *(default)* | `sgds:text-overline-md sgds:leading-2-xs sgds:tracking-wide sgds:uppercase` |

Always use `<div>` and always apply `sgds:uppercase`. Use for key-value labels and data table header labels.

**Styling a caption or helper text?**

| Token | Classes |
|-------|---------|
| `sgds-caption-semibold` | `sgds:text-caption-md sgds:font-semibold sgds:leading-2-xs sgds:tracking-normal` |
| `sgds-caption-regular` *(default)* | `sgds:text-caption-md sgds:leading-2-xs sgds:tracking-normal` |

Both caption tokens include `sgds-paragraph-spacing-md` — apply `sgds:mb-md` between consecutive captions. Use `<div role="caption">` — the native `<caption>` HTML element is scoped to `<table>` and causes layout issues outside tables.

**Styling a link?**

| Token | Classes |
|-------|---------|
| `sgds-link-lg-regular` | `sgds:text-link-lg sgds:leading-md sgds:tracking-normal sgds:underline` |
| `sgds-link-md-regular` *(default)* | `sgds:text-link-md sgds:leading-xs sgds:tracking-normal sgds:underline` |
| `sgds-link-sm-regular` | `sgds:text-link-sm sgds:leading-2-xs sgds:tracking-normal sgds:underline` |
| `sgds-link-xs-regular` | `sgds:text-link-xs sgds:leading-3-xs sgds:tracking-normal sgds:underline` |

Always use `<a>` with an `href`. All link tokens are always underlined.

**Styling inline code or a code block?**
→ `sgds:font-mono` + `sgds:text-body-sm` + `sgds:leading-md`

**Unsure what size/weight to pair?**
→ See [`reference/patterns.md`](reference/patterns.md) for common content-type patterns.

## Reference Documentation

| File | Covers | Use for |
|------|--------|---------|
| [`reference/type-properties.md`](reference/type-properties.md) | Full scale tables for font-size, font-weight, line-height, letter-spacing, font-family with all token values | Looking up exact values, picking the right token from the scale |
| [`reference/patterns.md`](reference/patterns.md) | Common HTML patterns: display headings, section headings, body text, form labels, links, code blocks, buttons, blockquotes, statistics | Implementing a specific content type or component |

---

**For AI Agents**: Always prefer semantic font-size utilities (`sgds:text-display-*`, `sgds:text-heading-*`, `sgds:text-body-*`, etc.) over raw scale utilities (`sgds:text-xs`, `sgds:text-base`, etc.) — only use raw scale when no semantic role matches. Always prefer semantic line-height utilities (`sgds:leading-xs`, `sgds:leading-md`, `sgds:leading-xl`, etc.) over raw pixel utilities. Both semantic font-size and line-height tokens are responsive and defined in `responsive.css`.

**Element and ARIA guidance** (critical — `reboot.css` overrides will silently break your styles if ignored):
- **Display**: use `<div role="heading" aria-level="1">` — display tokens exceed `h1` desktop size and `reboot.css` would constrain the font size
- **Headings (xl/lg/md/sm)**: use native `<h1>`–`<h4>` — `reboot.css` sizes for these match the SGDS heading tokens exactly
- **Subtitles**: use `<div role="heading" aria-level="5">` or `aria-level="6"` — avoids `reboot.css` weight overrides on `h5`/`h6`
- **Body**: use `<div role="paragraph">` — avoids `reboot.css` margin resets on `<p>`
- **Captions**: use `<div role="caption">` — native `<caption>` is table-scoped
- **Links**: always use `<a href="...">` with `sgds:underline`
- **Code**: inline → `<code>`, block → `<pre>`, both with `sgds:font-mono`

Pair smaller leading with large display text, larger leading with body/reading text. Redirect to reference files for exact token values or specific patterns.

