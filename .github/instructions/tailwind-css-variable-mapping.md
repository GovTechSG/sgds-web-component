---
description: 'Rules for mapping SGDS CSS variables to Tailwind v4 utility tokens'
applyTo: 'src/css/utility.css, playground/utility/**'
---

# SGDS to Tailwind CSS Variable Mapping Rules

## Overview
This document defines the conversion rules for mapping SGDS design tokens (CSS variables) to Tailwind v4 utility classes through the `utility.css` theme configuration.

## Core Conversion Pattern

```
SGDS Variable → Tailwind Custom Property → Generated Utility Class
--sgds-{category} → --{property}-color-{category} → sgds:{property}-{category}
```

## Property Categories

### Background Colors
**SGDS Pattern:** `--sgds-{variant}-bg-{modifier}`  
**Tailwind Property:** `--background-color-{variant}-{modifier}`  
**Generated Class:** `sgds:bg-{variant}-{modifier}`

```css
/* Example */
--background-color-primary-default: var(--sgds-primary-bg-default);
/* Generates: sgds:bg-primary-default */
```

### Surface Colors (Background)
**SGDS Pattern:** `--sgds-{variant}-surface-{modifier}`  
**Tailwind Property:** `--background-color-{variant}-surface-{modifier}`  
**Generated Class:** `sgds:bg-{variant}-surface-{modifier}`

```css
/* Example */
--background-color-primary-surface-default: var(--sgds-primary-surface-default);
/* Generates: sgds:bg-primary-surface-default */
```

### Text Colors
**SGDS Pattern:** `--sgds-{variant}-color-{modifier}`  
**Tailwind Property:** `--text-color-{variant}-{modifier}`  
**Generated Class:** `sgds:text-{variant}-{modifier}`

```css
/* Example */
--text-color-primary-default: var(--sgds-primary-color-default);
/* Generates: sgds:text-primary-default */
```

### Border Colors
**SGDS Pattern:** `--sgds-{variant}-border-color-{modifier}`  
**Tailwind Property:** `--border-color-{variant}-{modifier}`  
**Generated Class:** `sgds:border-{variant}-{modifier}`

```css
/* Example */
--border-color-primary-default: var(--sgds-primary-border-color-default);
/* Generates: sgds:border-primary-default */
```

## Semantic Color Variants

Semantic colors follow the standard property patterns above with these variants:
- `primary`
- `accent`
- `success`
- `danger`
- `warning`
- `purple`
- `cyan`
- `neutral`

### Common Modifiers
- Background: `default`, `muted`, `translucent`
- Surface: `default`, `emphasis`, `muted`, `translucent`
- Text: `default`, `emphasis`, `fixed-light`, `fixed-dark`
- Border: `default`, `emphasis`, `muted`, `subtle`

## Typography Colors

**SGDS Pattern:** `--sgds-{type}-color-{modifier}`  
**Tailwind Property:** `--text-color-{type}-{modifier}`  
**Generated Class:** `sgds:text-{type}-{modifier}`

### Typography Types
- `display` (modifiers: `default`, `subtle`)
- `heading` (modifiers: `default`, `subtle`)
- `body` (modifiers: `default`, `subtle`)
- `label` (modifiers: `default`, `subtle`)
- `link` (modifiers: `default`, `emphasis`)

```css
/* Example */
--text-color-display-default: var(--sgds-display-color-default);
/* Generates: sgds:text-display-default */
```

## Form Colors

Form colors use a compound category structure: `form-{subcategory}`

### Form Surface/Background
**SGDS Pattern:** `--sgds-form-surface-{modifier}`  
**Tailwind Property:** `--background-color-form-surface-{modifier}`  
**Generated Class:** `sgds:bg-form-surface-{modifier}`

**Modifiers:** `default`, `raised`, `emphasis`, `subtle`, `muted`, `inverse`, `fixed-light`, `fixed-dark`

```css
/* Example */
--background-color-form-surface-default: var(--sgds-form-surface-default);
/* Generates: sgds:bg-form-surface-default */
```

### Form Text
**SGDS Pattern:** `--sgds-form-color-{modifier}`  
**Tailwind Property:** `--text-color-form-{modifier}`  
**Generated Class:** `sgds:text-form-{modifier}`

**Modifiers:** `default`, `subtle`, `muted`, `inverse`, `fixed-light`, `fixed-dark`

```css
/* Example */
--text-color-form-default: var(--sgds-form-color-default);
/* Generates: sgds:text-form-default */
```

### Form Variant Colors
For semantic form variants (primary, success, danger):

**SGDS Pattern:** `--sgds-form-{variant}-surface-{modifier}`  
**Tailwind Property:** `--background-color-form-{variant}-surface-{modifier}`  
**Generated Class:** `sgds:bg-form-{variant}-surface-{modifier}`

**SGDS Pattern:** `--sgds-form-{variant}-color-{modifier}`  
**Tailwind Property:** `--text-color-form-{variant}-{modifier}`  
**Generated Class:** `sgds:text-form-{variant}-{modifier}`

**SGDS Pattern:** `--sgds-form-{variant}-border-color-{modifier}`  
**Tailwind Property:** `--border-color-form-{variant}-{modifier}`  
**Generated Class:** `sgds:border-form-{variant}-{modifier}`

```css
/* Examples */
--background-color-form-primary-surface-default: var(--sgds-form-primary-surface-default);
/* Generates: sgds:bg-form-primary-surface-default */

--text-color-form-success-default: var(--sgds-form-success-color-default);
/* Generates: sgds:text-form-success-default */

--border-color-form-danger-default: var(--sgds-form-danger-border-color-default);
/* Generates: sgds:border-form-danger-default */
```

## Naming Convention Rules

1. **Remove `sgds` prefix**: Drop the `--sgds-` prefix from the SGDS variable
2. **Add property prefix**: Add the appropriate property type (`background-color`, `text-color`, `border-color`)
3. **Preserve structure**: Keep the category and modifier structure intact
4. **Handle special cases**:
   - `bg` → `background-color`
   - `color` (when referring to text) → `text-color`
   - `border-color` → `border-color` (no change needed)
   - `surface` → `background-color-{variant}-surface-{modifier}` (surfaces are backgrounds)

## Utility Class Prefix

All generated utility classes use the `sgds:` prefix (configured in Tailwind v4).

## Documentation Requirements

When adding new mappings, ensure corresponding documentation is added to playground files:

1. **background-color.html** - for background and surface colors
2. **text-color.html** - for text/color variants
3. **border-color.html** - for border colors

Each documentation section should include:
- Section heading with semantic name
- SGDS table with three columns:
  - SGDS Tailwind Token (e.g., `sgds:bg-primary-default`)
  - CSS Variable (e.g., `--sgds-primary-bg-default`)
  - Preview (live demonstration with appropriate contrast)

## Preview Guidelines

- **Fixed-light backgrounds**: Use `sgds:text-fixed-dark` for contrast
- **Fixed-dark backgrounds**: Use `sgds:text-fixed-light` for contrast
- **Light/bright colors** (warning/yellow): Use `sgds:text-fixed-dark`
- **Dark colors**: Use `sgds:text-fixed-light`
- **Border demos**: Use `.border-demo` class (2px solid border) with `sgds:p-md`

## Complete Mapping Workflow

1. Identify SGDS CSS variable in theme files (`src/themes/*.css`)
2. Determine the property category (background, text, border)
3. Apply conversion pattern to create Tailwind custom property
4. Add to `src/css/utility.css` under appropriate comment section
5. Add documentation section to corresponding playground file
6. Include live preview with appropriate contrast
7. Test theme toggle to ensure colors work in both light/dark modes

## Example Complete Mapping

```css
/* In src/css/utility.css */

/* Semantic - Primary Colors */
--background-color-primary-default: var(--sgds-primary-bg-default);
--background-color-primary-muted: var(--sgds-primary-bg-muted);
--background-color-primary-surface-default: var(--sgds-primary-surface-default);
--text-color-primary-default: var(--sgds-primary-color-default);
--text-color-primary-emphasis: var(--sgds-primary-color-emphasis);
--border-color-primary-default: var(--sgds-primary-border-color-default);
```

```html
<!-- In playground/utility/background-color.html -->
<section class="sgds:mb-2-xl">
  <h2>Primary Background Colors</h2>
  <sgds-table>
    <sgds-table-row>
      <sgds-table-head>SGDS Tailwind Token</sgds-table-head>
      <sgds-table-head>CSS Variable</sgds-table-head>
      <sgds-table-head>Preview</sgds-table-head>
    </sgds-table-row>
    <sgds-table-row>
      <sgds-table-cell><code>sgds:bg-primary-default</code></sgds-table-cell>
      <sgds-table-cell><code>--sgds-primary-bg-default</code></sgds-table-cell>
      <sgds-table-cell>
        <div class="sgds:bg-primary-default sgds:text-fixed-light sgds:p-md">
          Primary background
        </div>
      </sgds-table-cell>
    </sgds-table-row>
  </sgds-table>
</section>
```

## Summary

The key principle is systematic transformation of SGDS semantic variables into Tailwind v4 custom properties that generate utility classes with the `sgds:` prefix. The naming structure preserves semantic meaning while following Tailwind conventions for property-based utilities (bg-, text-, border-).

---

## See Also

- **[token-mapping-and-documentation-workflow.md](token-mapping-and-documentation-workflow.md)** - High-level token architecture, layer definitions, and documentation patterns for Storybook. Use this for understanding the complete flow from primitive tokens through semantic mappings to Tailwind utility generation, as well as guidelines for adding new utilities and updating documentation.
