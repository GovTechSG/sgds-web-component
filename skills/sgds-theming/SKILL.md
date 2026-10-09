---
name: "sgds-theming"
description: "Customising the visual theme of an SGDS application — product brand colours, day/night mode, and font. Use when users ask about changing the primary colour, theming their app, enabling dark mode, night mode, overriding CSS tokens, or customising the font. Apply this skill whenever theming, branding, or CSS token overrides are mentioned."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: theming
---

# SGDS Theming Skill

How to customise the product theme — brand colours, day/night mode, and font — using SGDS CSS token overrides.

---

## Prerequisites

Import `themes/day.css` before your custom CSS. See **[sgds-getting-started](../sgds-getting-started/SKILL.md)** for the full import order.

---

## Quick Decision Guide

| What you want to change | Token / mechanism | Reference |
|-------------------------|-------------------|-----------|
| Product brand colour (custom) | Override `--sgds-product-primary-{100–900}` | [brand-colour.md](reference/brand-colour.md) |
| Product brand colour (GovTech) | Import one `themes/gt/<colour>.css` + map to `--sgds-product-primary-*` | [brand-colour.md](reference/brand-colour.md) |
| Enable dark/night mode | Import `themes/night.css` + add `.sgds-night-theme` to `<html>` | See below |
| Font typeface (all roles) | Override `--sgds-font-family-brand` | [typography.md](reference/typography.md) |
| Font typeface (per role) | Override individual `--sgds-font-family-{display,heading,subtitle,body,label,code}` | [typography.md](reference/typography.md) |
| Border radius | Override semantic `--sgds-{purpose}-border-radius` tokens | [border-radius.md](reference/border-radius.md) |

---

## Day Mode (Default)

Day mode is the default. Importing `themes/day.css` is all that is needed — no extra configuration required.

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
```

---

## Night Mode (Optional)

Night mode is opt-in. It is applied by adding the class `sgds-night-theme` to the `<html>` element, which activates the `:root.sgds-night-theme` selector defined in `themes/night.css`.

### Setup

Import both theme files:

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "@govtechsg/sgds-web-component/themes/night.css";
```

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css";
```

### Activating night mode

Add the class to the `<html>` element to switch all tokens to their dark equivalents:

```html
<html class="sgds-night-theme">
```

Toggle it at runtime via JavaScript:

```js
document.documentElement.classList.toggle("sgds-night-theme");
```

### How it works

`themes/night.css` redefines the same semantic tokens as `themes/day.css` but scoped to `:root.sgds-night-theme`. All SGDS components read from the same semantic tokens, so toggling the class switches the entire UI without changing any component markup.

---

## For AI Agents

1. Always tell users to import their custom CSS **after** `themes/day.css` — otherwise the override will be overwritten.
2. Night mode requires **both** the `themes/night.css` import **and** the `sgds-night-theme` class on `<html>`. Either alone is not enough.
3. Night mode is **optional** — only add `themes/night.css` when the user explicitly needs dark mode support.
4. Day mode is always active by default; there is no `sgds-day-theme` class to add.
5. Custom overrides apply to both day and night mode simultaneously because they target `:root`, which both theme selectors inherit from.
6. For brand colour theming, read [brand-colour.md](reference/brand-colour.md).
7. For typography/font theming, read [typography.md](reference/typography.md).
8. For border radius theming, read [border-radius.md](reference/border-radius.md). Override **semantic** tokens (`--sgds-{purpose}-border-radius`), referencing primitive values via `var(--sgds-border-radius-{size})`.
