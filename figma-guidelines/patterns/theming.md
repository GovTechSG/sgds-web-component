# SGDS Theming

Customise the product theme — brand colors, day/night mode, and font — using CSS token overrides.

## Prerequisites

Import `themes/day.css` before your custom CSS. See `overview-setup.md` for the full import order.

---

## Quick Reference

| What to change | Mechanism |
|---|---|
| Product brand color | Override `--sgds-product-primary-{100–900}` |
| Enable dark/night mode | Import `themes/night.css` + add `.sgds-night-theme` to `<html>` |
| Font typeface | Override `--sgds-font-family-brand` |

---

## Changing the Brand Color

Override the full 100–900 primitive scale in `:root`. All primary UI elements update automatically.

```css
/* yourCustomCss.css */
:root {
  --sgds-product-primary-100: #F5B6DA;
  --sgds-product-primary-200: #F186C0;
  --sgds-product-primary-300: #EE4FA6;
  --sgds-product-primary-400: #EE0290;
  --sgds-product-primary-500: #EF0078;
  --sgds-product-primary-600: #DD0074;
  --sgds-product-primary-700: #C6006E;
  --sgds-product-primary-800: #B0006A;
  --sgds-product-primary-900: #880061;
}
```

Import custom CSS **after** the SGDS theme file:

```js
import "@govtechsg/sgds-web-component/themes/day.css";
import "./yourCustomCss.css";
```

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "./yourCustomCss.css";
```

---

## Day Mode (Default)

Day mode is active by default — no extra configuration needed beyond importing `themes/day.css`.

---

## Night Mode (Optional)

Night mode is opt-in. Activate by adding the class `sgds-night-theme` to `<html>`.

**Setup** — import both theme files:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css";
```

**Activate:**

```html
<html class="sgds-night-theme">
```

**Toggle at runtime:**

```js
document.documentElement.classList.toggle("sgds-night-theme");
```

All SGDS components read from the same semantic tokens — toggling the class switches the entire UI without changing any markup.

---

## Changing the Font

Override `--sgds-font-family-brand` in `:root`:

```css
:root {
  --sgds-font-family-brand: "Your Font", system-ui, sans-serif;
}
```

You are responsible for loading the font assets (via `<link>` or `@font-face`). SGDS does not load custom fonts automatically.

---

## Key Rules

1. Always import custom CSS **after** `themes/day.css` — otherwise overrides are overwritten.
2. Brand color overrides target **primitive** tokens (`--sgds-product-primary-{100–900}`), not semantic tokens.
3. Night mode requires **both** `themes/night.css` import **and** the `sgds-night-theme` class on `<html>`.
4. Night mode is optional — only add `themes/night.css` when dark mode is needed.
5. Custom overrides apply to both day and night modes because they target `:root`.
