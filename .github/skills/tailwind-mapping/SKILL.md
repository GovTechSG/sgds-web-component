---
name: tailwind-mapping
description: Converts SGDS CSS variables to Tailwind v4 utility classes in src/css/utility.css and creates playground documentation in playground/utility/ HTML files. Use when adding Tailwind mappings, creating utility class documentation, or implementing new color/spacing/typography utilities with proper preview examples.
metadata:
  author: singapore-design-system
  version: "1.0.0"
---

# Tailwind Mapping Skill

Implements Tailwind CSS variable mappings for SGDS design tokens.

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

Semantic colors follow the standard property patterns with these variants:
- `primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`

### Common Modifiers

- Background: `default`, `muted`, `translucent`
- Surface: `default`, `emphasis`, `muted`, `translucent`
- Text: `default`, `emphasis`, `fixed-light`, `fixed-dark`
- Border: `default`, `emphasis`, `muted`

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

Form colors use compound category structure: `form-{subcategory}`

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

### Form Variant Colors

For semantic form variants (primary, success, danger):

**SGDS Pattern:** `--sgds-form-{variant}-surface-{modifier}`  
**Tailwind Property:** `--background-color-form-{variant}-surface-{modifier}`  
**Generated Class:** `sgds:bg-form-{variant}-surface-{modifier}`

```css
/* Examples */
--background-color-form-primary-surface-default: var(--sgds-form-primary-surface-default);
--text-color-form-success-default: var(--sgds-form-success-color-default);
--border-color-form-danger-default: var(--sgds-form-danger-border-color-default);
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

When adding new mappings, add documentation to:

1. **Playground files** (`playground/utility/*.html`) - Live HTML previews
   - `background-color.html` - background and surface colors
   - `text-color.html` - text/color variants
   - `border-color.html` - border colors
   - `font-size.html` - font size tokens
   - etc.
**Playground HTML files** should include:
- Section heading with semantic name
- SGDS table with three columns:
  - SGDS Tailwind Token (e.g., `sgds:bg-primary-default`)
  - CSS Variable (e.g., `--sgds-primary-bg-default`)
  - Preview (live demonstration with appropriate contrast)

**Storybook stories** should include:
- Data arrays with token information (class, variable, value/responsive)
- Table row rendering functions
- Multiple exported stories for different categories
- Copy-to-clipboard functionality
### Documentation Structure

Each section should include:
- Section heading with semantic name
- SGDS table with three columns:
  - SGDS Tailwind Token (e.g., `sgds:bg-primary-default`)
  - CSS Variable (e.g., `--sgds-primary-bg-default`)
  - Preview (live demonstration with appropriate contrast)

### Preview Guidelines

- **Fixed-light backgrounds**: Use `sgds:text-fixed-dark` for contrast
- **Fixed-dark backgrounds**: Use `sgds:text-fixed-light` for contrast
- **Light/bright colors** (warning/yellow): Use `sgds:text-fixed-dark`
- **Dark colors**: Use `sgds:text-fixed-light`
- **Border demos**: Use `sgds:border-2 sgds:border-{color} sgds:p-md` — `sgds:border-2` applies the width/style, the color class sets the color

## Complete Mapping Workflow

### Developer Preview Flow (Fast, Internal)

1. Identify SGDS CSS variable in theme files (`src/themes/*.css`)
2. Determine the property category (background, text, border)
3. Apply conversion pattern to create Tailwind custom property
4. Add to `src/css/utility.css` under appropriate comment section
5. Create HTML preview in corresponding playground file (`playground/utility/*.html`)
6. Include live preview with appropriate contrast
7. **Run `pnpm run utility:dev`** (Tailwind scans playground/utility/*.html)
8. **Run `pnpm run dev`** (preview playground files in browser)
9. Test theme toggle to ensure colors work in both light/dark modes

### Documentation Flow (Storybook)

10. Create corresponding Storybook documentation in `stories/utilities/*.stories.js`
11. Add data structures for token tables
12. Export multiple story variations
13. Include copy-to-clipboard functionality
14. **Run `pnpm run storybook`** (preview Storybook documentation)

## Example Complete Mapping

### In src/css/utility.css

```css
/* Semantic - Primary Colors */
--background-color-primary-default: var(--sgds-primary-bg-default);
--background-color-primary-muted: var(--sgds-primary-bg-muted);
--background-color-primary-surface-default: var(--sgds-primary-surface-default);
--text-color-primary-default: var(--sgds-primary-color-default);
--text-color-primary-emphasis: var(--sgds-primary-color-emphasis);
--border-color-primary-default: var(--sgds-primary-border-color-default);
```

### In playground/utility/background-color.html

```html
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

## Commands

### Developer Preview
- **Utility Dev:** `pnpm run utility:dev` (Tailwind scans playground/utility/*.html files)
- **Dev Server:** `pnpm run dev` (preview playground files in browser)

### Documentation Preview
- **Storybook:** `pnpm run storybook` (preview Storybook documentation)

### Production
- **Build:** `pnpm build` (production build)

## Related Skills

- **token-workflow** - For high-level token architecture and documentation patterns
