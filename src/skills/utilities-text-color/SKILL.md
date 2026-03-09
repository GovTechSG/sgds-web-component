---
name: sgds-utilities-text-color
description: "Use SGDS text color utilities with the sgds: prefix for theme-aware and semantic text styling. Apply this skill whenever a user asks about text colors, heading colors, link colors, body text colors, form label colors, theme-aware text, or color hierarchy in SGDS designs."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: color
---

# SGDS Text Color Utilities Skill

SGDS text color utilities use the `sgds:text-{token}` pattern. All colors are theme-aware (automatically switching between day/night) unless a `fixed` variant is used.

## Prerequisites

**Required**: Complete setup from **sgds-utilities-setup** skill first.

**Theme files required**: Text color utilities require both utility CSS and theme files (`day.css` and `night.css`) for theme-aware colors.

## Core Concept

All SGDS text utilities follow the `sgds:text-{variant}-{modifier}` pattern with the `sgds:` prefix.

For definitions of suffix modifiers (`default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`, `inverse`, `surface`), see **[`utilities-color-semantics`](../utilities-color-semantics/SKILL.md)**.

## Quick Decision Guide

| What you need | Token to use |
|---|---|
| Body / paragraph text | `sgds:text-default`, `sgds:text-subtle`, `sgds:text-muted` |
| Inverted surface text | `sgds:text-inverse` |
| On a fixed dark background | `sgds:text-fixed-light` |
| On a fixed light background | `sgds:text-fixed-dark` |
| Headings | `sgds:text-heading-default` |
| Display / hero headline | `sgds:text-display-default` |
| Body copy | `sgds:text-body-default` or `sgds:text-body-subtle` |
| Form labels | `sgds:text-label-default` |
| Links | `sgds:text-link-default` / `sgds:text-link-emphasis` |
| Success / error / warning messages | `sgds:text-{success\|danger\|warning}-default` |
| Brand-colored text | `sgds:text-primary-default` or `sgds:text-accent-default` |

## Token Categories

Three categories cover all text color needs:

**1. Semantic base** — content hierarchy that adapts to theme (`text-default`, `text-subtle`, `text-muted`, `text-inverse`, `text-fixed-light`, `text-fixed-dark`)

**2. Contextual** — named semantic colors for specific meanings (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral` — each with `default`, `emphasis`, `fixed-light`, `fixed-dark`)

**3. Typography roles** — purpose-specific tokens for structured content (`display-default`, `heading-default`, `body-default`, `body-subtle`, `label-default`, `link-default`, `link-emphasis`)

## Reference Documentation

| Topic | File |
|---|---|
| Semantic base colors (default, subtle, muted, inverse, fixed) | [reference/base.md](reference/base.md) |
| Contextual colors (primary, success, danger, warning…) | [reference/contextual.md](reference/contextual.md) |
| Typography role tokens (display, heading, body, label, link) | [reference/typography-roles.md](reference/typography-roles.md) |

---

**For AI agents**: When no specific color is requested, start with typography role tokens (`heading-default`, `body-default`, `label-default`, `link-default`) for structured content. Use semantic base tokens for generic text hierarchy. Reserve contextual colors for state or brand meaning. Prefer SGDS components (`<sgds-*>`) when available.

