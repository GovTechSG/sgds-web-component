# Theming

How to customise the product theme — brand colours, day/night mode, and font — using CSS token overrides.

---

## Quick Decision Guide

| What to change | Mechanism |
|---|---|
| Product brand colour (custom) | Override `--sgds-product-primary-{100–900}` in `:root` |
| Product brand colour (GovTech) | Import `themes/gt/<colour>.css` + map to `--sgds-product-primary-*` |
| Enable dark/night mode | Import `themes/night.css` + add `.sgds-night-theme` to `<html>` |
| Font typeface | Override `--sgds-font-family-brand` |

---

## Custom Brand Colour

The default primary colour is purple. Override the full 100–900 scale to retheme all primary UI elements at once.

Create a custom CSS file and add it **after** the SGDS theme import:

```css
/* yourBrand.css */
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

Import order in CSS:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "./yourBrand.css";   /* must come after day.css */
@import "@govtechsg/sgds-web-component/css/sgds.css";
@import "@govtechsg/sgds-web-component/css/utility.css";
```

Changing primitive tokens (`--sgds-product-primary-*`) automatically flows through to all components that use the primary colour.

---

## GovTech Brand Colours

GovTech products must use one of the pre-approved palettes from `themes/gt/`. Pick **exactly one** — never import more than one GT colour file.

| File | Colour |
|---|---|
| `themes/gt/blue.css` | Blue |
| `themes/gt/cyan.css` | Cyan |
| `themes/gt/magenta.css` | Magenta |
| `themes/gt/pink.css` | Pink |
| `themes/gt/purple.css` | Purple |
| `themes/gt/red.css` | Red |

Map the GT colour onto the product primary scale in your custom CSS:

```css
/* yourBrand.css */
:root {
  --sgds-product-primary-100: var(--gt-color-100);
  --sgds-product-primary-200: var(--gt-color-200);
  --sgds-product-primary-300: var(--gt-color-300);
  --sgds-product-primary-400: var(--gt-color-400);
  --sgds-product-primary-500: var(--gt-color-500);
  --sgds-product-primary-600: var(--gt-color-600);
  --sgds-product-primary-700: var(--gt-color-700);
  --sgds-product-primary-800: var(--gt-color-800);
  --sgds-product-primary-900: var(--gt-color-900);
}
```

Import order — the GT file must come before your custom mapping:

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/gt/blue.css";  /* pick one only */
@import "./yourBrand.css";
@import "@govtechsg/sgds-web-component/css/sgds.css";
@import "@govtechsg/sgds-web-component/css/utility.css";
```

---

## Day Mode (Default)

Day mode is active by default when `themes/day.css` is imported. No additional configuration is needed.

---

## Night Mode (Optional)

Night mode is opt-in. Requires two things — both are necessary:

1. Import `themes/night.css` in your CSS file
2. Add the class `sgds-night-theme` to the `<html>` element

```css
@import "@govtechsg/sgds-web-component/themes/day.css";
@import "@govtechsg/sgds-web-component/themes/night.css";
```

```html
<html class="sgds-night-theme">
```

Toggle at runtime:

```js
document.documentElement.classList.toggle("sgds-night-theme");
```

All SGDS components read from the same semantic tokens, so toggling the class switches the entire UI without changing any component markup.

---

## Custom Font

Override `--sgds-font-family-brand` to change the typeface. You must load the font assets yourself separately (via `<link>` or `@font-face`):

```css
:root {
  --sgds-font-family-brand: "Your Font", system-ui, sans-serif;
}
```
