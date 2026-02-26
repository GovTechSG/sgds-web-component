---
name: sgds-utilities-setup
description: Setup instructions for using SGDS utility classes. This is a prerequisite skill for all SGDS utility categories (spacing, colors, typography, etc.). Use when users need help with initial setup or imports.
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: setup
---

# SGDS Utilities Setup Skill

Setup instructions for using SGDS utility classes with the `sgds:` prefix.

## Core Concept: sgds: Prefix

All SGDS utility classes use the `sgds:` prefix (Tailwind v4 @theme syntax):

```html
<!-- ✅ Correct -->
<div class="sgds:p-4 sgds:bg-primary-default sgds:text-white">Content</div>

<!-- ❌ Wrong - missing prefix -->
<div class="p-4 bg-primary-default text-white">Content</div>
```

## Required Setup

### Import Utility CSS

Users **must** import the utility CSS file before using any `sgds:` prefixed classes:

```javascript
// ES modules
import '@govtechsg/sgds-web-component/css/utility.css';
```

```html
<!-- CDN -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/css/utility.css">
```

**Without this import, utility classes will not work.**

## Optional: Theme Setup

For theme-aware utilities that adapt to light/dark mode (background colors, text colors, border colors):

```javascript
import '@govtechsg/sgds-web-component/themes/day.css';
import '@govtechsg/sgds-web-component/themes/night.css';
```

### When Theme Setup is Required

Import theme files when using:
- **Background colors**: `sgds:bg-surface-default`, `sgds:bg-primary-default`, etc.
- **Text colors**: `sgds:text-default`, `sgds:text-primary-default`, etc.
- **Border colors**: `sgds:border-default`, `sgds:border-primary-default`, etc.

### When Theme Setup is Optional

Theme files are NOT required for:
- **Spacing**: `sgds:p-4`, `sgds:m-2`, `sgds:gap-6`
- **Typography sizing**: `sgds:text-xl`, `sgds:font-bold`
- **Border radius**: `sgds:rounded-lg`
- **Opacity**: `sgds:opacity-50`
- **Layout**: `sgds:flex`, `sgds:grid`

## Theme Switching

To toggle between light and dark themes programmatically:

```html
<button id="theme-toggle">Toggle Theme</button>

<script>
  const toggleButton = document.getElementById('theme-toggle');
  toggleButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('sgds-theme-night');
  });
</script>
```

Classes with theme-aware tokens automatically update when the theme changes.

## Verification

Test that setup is complete:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/css/utility.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/themes/day.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/themes/night.css">
</head>
<body class="sgds:bg-default sgds:p-6">
  <div class="sgds:bg-surface-raised sgds:p-4 sgds:rounded-lg">
    <h1 class="sgds:text-heading-default sgds:text-2-xl sgds:font-bold sgds:mb-4">
      Setup Test
    </h1>
    <p class="sgds:text-body-default sgds:mb-4">
      If this text is styled correctly, your setup is complete.
    </p>
    <button 
      class="sgds:bg-primary-default sgds:text-white sgds:px-4 sgds:py-2 sgds:rounded"
      onclick="document.documentElement.classList.toggle('sgds-theme-night')"
    >
      Toggle Theme
    </button>
  </div>
</body>
</html>
```

## Troubleshooting

### Utilities Not Working

**Problem**: Classes like `sgds:p-4` have no effect

**Solutions**:
1. Ensure utility CSS is imported in your entry file or HTML
2. Check browser console for 404 errors on CSS files
3. Verify the import path matches your package installation
4. Clear browser cache and reload

### Theme Colors Not Working

**Problem**: Background/text colors don't appear or don't change with theme

**Solutions**:
1. Import theme CSS files (`day.css` and `night.css`)
2. Check that semantic color tokens are used (not fixed colors)
3. Verify theme toggle adds/removes `sgds-theme-night` class on `<html>` element
4. Check browser console for CSS import errors

### CDN vs Package Manager

**Using CDN**: Link directly in HTML (good for quick prototypes)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds-web-component/css/utility.css">
```

**Using npm/pnpm**: Import in JavaScript (recommended for production)
```javascript
import '@govtechsg/sgds-web-component/css/utility.css';
```

Both methods work identically once loaded.

## Framework-Specific Setup

Since SGDS utilities are built on Tailwind v4, you must first set up Tailwind CSS for your framework before importing the SGDS CSS files.

**Step 1**: Follow the Tailwind CSS guide for your framework:

| Framework | Guide |
|-----------|-------|
| Next.js | https://tailwindcss.com/docs/installation/framework-guides/nextjs |
| Nuxt (Vue) | https://tailwindcss.com/docs/installation/framework-guides/nuxt |
| Angular | https://tailwindcss.com/docs/installation/framework-guides/angular |
| SvelteKit | https://tailwindcss.com/docs/installation/framework-guides/sveltekit |
| Astro | https://tailwindcss.com/docs/installation/framework-guides/astro |
| Gatsby | https://tailwindcss.com/docs/installation/framework-guides/gatsby |
| React Router | https://tailwindcss.com/docs/installation/framework-guides/react-router |
| Vite (generic) | https://tailwindcss.com/docs/installation/using-vite |

Not listed? See the full list at https://tailwindcss.com/docs/installation/framework-guides.

**Step 2**: After Tailwind is set up, import the SGDS CSS files as described in [Required Setup](#required-setup) above.

## Next Steps

Once setup is complete, explore the specialized utility skills:
- **sgds-spacing** - Margin, padding, gap utilities
- **sgds-background-color** - Background colors and surfaces
- **sgds-text-color** - Text colors and typography colors
- **sgds-border-color** - Border colors
- **sgds-border-width** - Border thickness and sides
- **sgds-border-radius** - Rounded corners
- **sgds-typography** - Font sizes, weights, spacing
- **sgds-opacity** - Transparency and overlays

---

**For AI Agents**: Always verify users have completed this setup before suggesting utility classes. If utilities aren't working, refer back to this setup guide first.
