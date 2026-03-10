# Conversion Rules Reference

Full per-category details for SGDS → Tailwind custom property mappings.

## Table of Contents

- [Semantic Color Variants](#semantic-color-variants)
- [Background Colors](#background-colors)
- [Surface Colors](#surface-colors)
- [Text Colors](#text-colors)
- [Border Colors](#border-colors)
- [Typography Colors](#typography-colors)
- [Form Colors](#form-colors)
- [Naming Convention Rules](#naming-convention-rules)

---

## Semantic Color Variants

Applicable to background, surface, text, and border patterns:

`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`

### Common Modifiers by Property Type

| Property Type | Modifiers |
|---|---|
| Background (`bg`) | `default`, `muted`, `translucent` |
| Surface | `default`, `emphasis`, `muted`, `translucent` |
| Text (`color`) | `default`, `emphasis`, `fixed-light`, `fixed-dark` |
| Border (`border-color`) | `default`, `emphasis`, `muted` |

---

## Background Colors

**SGDS Pattern:** `--sgds-{variant}-bg-{modifier}`  
**Tailwind Property:** `--background-color-{variant}-{modifier}`  
**Generated Class:** `sgds:bg-{variant}-{modifier}`

```css
--background-color-primary-default: var(--sgds-primary-bg-default);
/* Generates: sgds:bg-primary-default */
```

---

## Surface Colors

Surfaces are backgrounds with a semantic "raised" or "layered" meaning.

**SGDS Pattern:** `--sgds-{variant}-surface-{modifier}`  
**Tailwind Property:** `--background-color-{variant}-surface-{modifier}`  
**Generated Class:** `sgds:bg-{variant}-surface-{modifier}`

```css
--background-color-primary-surface-default: var(--sgds-primary-surface-default);
/* Generates: sgds:bg-primary-surface-default */
```

---

## Text Colors

**SGDS Pattern:** `--sgds-{variant}-color-{modifier}`  
**Tailwind Property:** `--text-color-{variant}-{modifier}`  
**Generated Class:** `sgds:text-{variant}-{modifier}`

```css
--text-color-primary-default: var(--sgds-primary-color-default);
/* Generates: sgds:text-primary-default */
```

---

## Border Colors

**SGDS Pattern:** `--sgds-{variant}-border-color-{modifier}`  
**Tailwind Property:** `--border-color-{variant}-{modifier}`  
**Generated Class:** `sgds:border-{variant}-{modifier}`

```css
--border-color-primary-default: var(--sgds-primary-border-color-default);
/* Generates: sgds:border-primary-default */
```

---

## Typography Colors

**SGDS Pattern:** `--sgds-{type}-color-{modifier}`  
**Tailwind Property:** `--text-color-{type}-{modifier}`  
**Generated Class:** `sgds:text-{type}-{modifier}`

| Typography Type | Modifiers |
|---|---|
| `display` | `default`, `subtle` |
| `heading` | `default`, `subtle` |
| `body` | `default`, `subtle` |
| `label` | `default`, `subtle` |
| `link` | `default`, `emphasis` |

```css
--text-color-display-default: var(--sgds-display-color-default);
/* Generates: sgds:text-display-default */
```

---

## Form Colors

Form colors use a compound `form-{subcategory}` structure.

### Form Surface / Background

**SGDS Pattern:** `--sgds-form-surface-{modifier}`  
**Tailwind Property:** `--background-color-form-surface-{modifier}`  
**Generated Class:** `sgds:bg-form-surface-{modifier}`

**Modifiers:** `default`, `raised`, `emphasis`, `subtle`, `muted`, `inverse`, `fixed-light`, `fixed-dark`

### Form Text

**SGDS Pattern:** `--sgds-form-color-{modifier}`  
**Tailwind Property:** `--text-color-form-{modifier}`  
**Generated Class:** `sgds:text-form-{modifier}`

**Modifiers:** `default`, `subtle`, `muted`, `inverse`, `fixed-light`, `fixed-dark`

### Form Variant Colors (primary, success, danger)

```css
/* Surface */
--background-color-form-primary-surface-default: var(--sgds-form-primary-surface-default);

/* Text */
--text-color-form-success-default: var(--sgds-form-success-color-default);

/* Border */
--border-color-form-danger-default: var(--sgds-form-danger-border-color-default);
```

---

## Naming Convention Rules

1. **Drop `--sgds-` prefix** from the source variable
2. **Add property type prefix** (`background-color`, `text-color`, or `border-color`)
3. **Keep category and modifier** structure intact
4. **Special keyword mappings:**

| Source keyword | Maps to |
|---|---|
| `bg` | `background-color` |
| `color` (text context) | `text-color` |
| `border-color` | `border-color` (unchanged) |
| `surface` | `background-color-{variant}-surface-{modifier}` |
| `line-height` | `--leading-{modifier}` |
| `font-size` | `--text-{modifier}` |
