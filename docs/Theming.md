# Theming

## Overview

SGDS uses CSS custom properties (design tokens) for theming. All tokens are prefixed with `--sgds-` and organised into three layers:

| Layer | File | Purpose |
|-------|------|---------|
| **Primitives** | `root.css` | Base values — colours, spacing, typography scales, border radius, elevation |
| **Semantic (Day)** | `day.css` | Light theme mappings — maps primitives to intent-based tokens |
| **Semantic (Night)** | `night.css` | Dark theme mappings — same token names, different values |

## Importing Tokens

Import the theme files from `@govtechsg/sgds-web-component/themes/`:

```jsx
// Required — primitives + day theme
import "@govtechsg/sgds-web-component/themes/root.css";
import "@govtechsg/sgds-web-component/themes/day.css";

// Optional — responsive font sizing
import "@govtechsg/sgds-web-component/themes/responsive.css";
```

For night (dark) mode, import `night.css` and apply the `.sgds-night-theme` class:

```jsx
import "@govtechsg/sgds-web-component/themes/night.css";
```

```html
<body class="sgds-night-theme">
  <!-- components will use night theme tokens -->
</body>
```

## Overriding Tokens

Create a custom CSS file and override any `--sgds-*` token at the `:root` level. Import it **after** the theme files so your overrides take precedence:

```css
/* yourCustomTheme.css */
:root {
  --sgds-product-primary-500: #EF0078;
  --sgds-border-radius-md: 12px;
}
```

```jsx
import "@govtechsg/sgds-web-component/themes/root.css";
import "@govtechsg/sgds-web-component/themes/day.css";
// Your overrides must come after the theme imports
import "./yourCustomTheme.css";
```

## Using Tokens in CSS

Reference any token in your own stylesheets:

```css
.my-card {
  background-color: var(--sgds-color-bg-surface-default);
  border: var(--sgds-border-width-1) solid var(--sgds-color-border-default);
  border-radius: var(--sgds-border-radius-md);
  padding: var(--sgds-density-padding-md);
}
```

## Density

Density tokens adjust padding and gap values globally. Import one of the density files to shift the scale:

```jsx
// Compact — tighter spacing
import "@govtechsg/sgds-web-component/themes/density/compact.css";

// Spacious — more breathing room
import "@govtechsg/sgds-web-component/themes/density/spacious.css";
```

## Next Steps

Browse the token reference pages for the full list of available tokens:

- **Colours** — colour primitives, semantic mappings, and brand overrides
- **Density** — padding and gap density adjustments
- **Border Radius** — border radius token customisation
- **Typography** — font family token customisation
