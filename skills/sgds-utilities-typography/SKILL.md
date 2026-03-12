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
→ `sgds:text-display-lg` + `sgds:font-bold` + `sgds:leading-2-xl` + `sgds:tracking-tight`

**Styling a section heading (H2/H3)?**
→ `sgds:text-heading-lg` / `sgds:text-heading-md` + `sgds:font-semibold` + `sgds:leading-lg`

**Styling a subtitle or lead text?**
→ `sgds:text-subtitle-md` / `sgds:text-subtitle-sm` + `sgds:font-normal` + `sgds:leading-md`

**Styling body content?**
→ `sgds:text-body-md` + `sgds:font-normal` + `sgds:leading-md`

**Styling a form label or UI label?**
→ `sgds:text-label-sm` / `sgds:text-label-md` + `sgds:font-semibold` + `sgds:leading-sm`

**Styling a small uppercase badge or overline?**
→ `sgds:text-overline-md` + `sgds:font-semibold` + `sgds:uppercase` + `sgds:tracking-wider`

**Styling a caption or helper text?**
→ `sgds:text-caption-md` + `sgds:font-normal` + `sgds:leading-xs`

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

**For AI Agents**: Always prefer semantic font-size utilities (`sgds:text-display-*`, `sgds:text-heading-*`, `sgds:text-body-*`, etc.) over raw scale utilities (`sgds:text-xs`, `sgds:text-base`, etc.) — only use raw scale when no semantic role matches. Always prefer semantic line-height utilities (`sgds:leading-xs`, `sgds:leading-md`, `sgds:leading-xl`, etc.) over raw pixel utilities (`sgds:leading-16`, `sgds:leading-20`, etc.) — both font-size and line-height semantic tokens are responsive and defined in `responsive.css`. Pair smaller leading with large display text, larger leading with body/reading text. Use `sgds:font-mono` for all code. For heading hierarchy use semibold/bold; for body use normal/medium. Redirect to reference files for exact token values or specific patterns.

