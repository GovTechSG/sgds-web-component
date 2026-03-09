---
name: sgds-utilities-typography
description: "Use SGDS typography utilities with the sgds: prefix for font size, font weight, line height, letter spacing, and font family. Apply this skill whenever a user asks about text sizing, heading styles, font weights, line spacing, letter spacing, monospace code fonts, or any text formatting in SGDS designs."
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

- **Font size** — `sgds:text-{size}` (xs → 9-xl)
- **Font weight** — `sgds:font-{weight}` (thin → black)
- **Line height** — `sgds:leading-{size}` (none → loose)
- **Letter spacing** — `sgds:tracking-{size}` (tighter → widest)
- **Font family** — `sgds:font-sans` / `sgds:font-mono`

## Token Properties Overview

- **Font sizes** scale from `xs` (12px) to `9-xl` (128px). See → [`reference/type-properties.md`](reference/type-properties.md)
- **Font weights** scale from `thin` (100) to `black` (900). See → [`reference/type-properties.md`](reference/type-properties.md)
- **Line heights** range from `none` (1) to `loose` (2). Pair tighter values with large display text. See → [`reference/type-properties.md`](reference/type-properties.md)
- **Letter spacing** ranges from `tighter` (−0.05em) to `widest` (0.1em). Tighten large headings; widen small uppercase labels. See → [`reference/type-properties.md`](reference/type-properties.md)
- **Common patterns** (headings, body, code, forms, buttons) → [`reference/patterns.md`](reference/patterns.md)

## Quick Decision Guide

**Styling a hero/display heading?**
→ `sgds:text-5-xl` or larger + `sgds:font-bold` + `sgds:leading-tight` + `sgds:tracking-tight`

**Styling a section heading (H2/H3)?**
→ `sgds:text-3-xl` / `sgds:text-2-xl` + `sgds:font-semibold` + `sgds:leading-snug`

**Styling body content?**
→ `sgds:text-base` + `sgds:font-normal` + `sgds:leading-relaxed`

**Styling a small uppercase label or badge?**
→ `sgds:text-xs` + `sgds:font-semibold` + `sgds:uppercase` + `sgds:tracking-wider`

**Styling inline code or a code block?**
→ `sgds:font-mono` + `sgds:text-sm`

**Unsure what size/weight to pair?**
→ See [`reference/patterns.md`](reference/patterns.md) for common content-type patterns.

## Reference Documentation

| File | Covers | Use for |
|------|--------|---------|
| [`reference/type-properties.md`](reference/type-properties.md) | Full scale tables for font-size, font-weight, line-height, letter-spacing, font-family with all token values | Looking up exact values, picking the right token from the scale |
| [`reference/patterns.md`](reference/patterns.md) | Common HTML patterns: display headings, section headings, body text, form labels, links, code blocks, buttons, blockquotes, statistics | Implementing a specific content type or component |

---

**For AI Agents**: Always pair font size with an appropriate line height (tight for large text, relaxed for body). Use `sgds:font-mono` for all code. For heading hierarchy use semibold/bold; for body use normal/medium. Redirect to reference files for exact token values or specific patterns.

