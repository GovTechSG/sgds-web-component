# SGDS Color Design Tokens

All color utilities use the `sgds:` prefix and are **theme-aware** — they automatically switch between day (light) and night (dark) mode unless a `fixed` variant is used.

**Theme files required**: Import `themes/day.css` (and optionally `themes/night.css`) before using any color tokens. See `overview-setup.md`.

---

## Semantic Color Categories

All color tokens share these semantic category names:

| Category | Meaning |
|---|---|
| `primary` | Brand color — emphasis, identity |
| `accent` | Informational / links — neutral, no urgency |
| `success` | Positive feedback, completion |
| `danger` | Errors, destructive actions |
| `warning` | Caution, needs attention |
| `purple` | Visual variety — no semantic meaning |
| `cyan` | Visual variety — no semantic meaning |
| `neutral` | Equal importance — no differentiation |

---

## Emphasis Modifiers

Applied to all semantic colors:

| Modifier | Meaning |
|---|---|
| `default` | Balanced, standard appearance — the baseline |
| `emphasis` | Strong, high-visibility — maximum attention |
| `muted` | Reduced, subtle — lower priority |

Progression: `muted` → `default` → `emphasis`

## Theme Behavior Modifiers

| Modifier | Behavior |
|---|---|
| `fixed-light` | Always light — never changes with theme mode |
| `fixed-dark` | Always dark — never changes with theme mode |
| `inverse` | Opposite of current theme (dark in light mode, light in dark mode) |
| `translucent` | Semi-transparent — allows underlying content to show through |
| `transparent` | Fully invisible — occupies space but no visible color |

---

## Background Colors (`sgds:bg-*`)

### The Most Important Distinction: Component vs Page Level

- **Surface tokens** (contain `surface`) → Component level (cards, badges, forms)
- **Non-surface tokens** → Page level (sections, full-width areas, body)

### Foundational Background Tokens

| Class | Level | Use for |
|---|---|---|
| `sgds:bg-surface-default` | Component | Default component background (first choice for cards, panels) |
| `sgds:bg-surface-raised` | Component | Differentiate from `surface-default` (badges on cards) |
| `sgds:bg-surface-inverse` | Component | Opposite theme color |
| `sgds:bg-surface-fixed-light` | Component | Always light — over images |
| `sgds:bg-surface-fixed-dark` | Component | Always dark — over images |
| `sgds:bg-default` | Page | Default page/body background |
| `sgds:bg-alternate` | Page | Distinguish sections (alternate rhythm) |
| `sgds:bg-overlay` | Page | Full-screen modal/drawer backdrop ONLY |
| `sgds:bg-fixed-light` | Page | Page sections locked to light color |
| `sgds:bg-fixed-dark` | Page | Page sections locked to dark color |
| `sgds:bg-translucent` | Component | Semi-transparent hover/active states |
| `sgds:bg-transparent` | Component | Invisible, maintains box model |

### Semantic Background Tokens

Each semantic color (`primary`, `accent`, `success`, `danger`, `warning`, `purple`, `cyan`, `neutral`) has:

```
sgds:bg-{color}-default          — Page level, default emphasis
sgds:bg-{color}-muted            — Page level, reduced emphasis
sgds:bg-{color}-surface-default  — Component level, standard
sgds:bg-{color}-surface-emphasis — Component level, strong
sgds:bg-{color}-surface-muted    — Component level, subtle
```

Examples:
```html
<div class="sgds:bg-primary-surface-default">Brand-tinted card</div>
<div class="sgds:bg-danger-surface-default">Error state panel</div>
<div class="sgds:bg-success-default">Full-width success banner section</div>
```

### Form Backgrounds

For native form elements only:
```html
<input class="sgds:bg-form-default" />
```

---

## Text Colors (`sgds:text-*`)

### Quick Decision Guide

| What you need | Token |
|---|---|
| Body / paragraph text | `sgds:text-default`, `sgds:text-subtle`, `sgds:text-muted` |
| Inverted surface text | `sgds:text-inverse` |
| On fixed dark background | `sgds:text-fixed-light` |
| On fixed light background | `sgds:text-fixed-dark` |
| Headings | `sgds:text-heading-default` |
| Display / hero headline | `sgds:text-display-default` |
| Body copy | `sgds:text-body-default` or `sgds:text-body-subtle` |
| Form labels | `sgds:text-label-default` |
| Links | `sgds:text-link-default` / `sgds:text-link-emphasis` |
| Success / error / warning | `sgds:text-{success\|danger\|warning}-default` |
| Brand-colored text | `sgds:text-primary-default` or `sgds:text-accent-default` |

### Text Color Categories

**Semantic base** — content hierarchy:
```html
<p class="sgds:text-default">Primary text</p>
<p class="sgds:text-subtle">Secondary text</p>
<p class="sgds:text-muted">Tertiary/disabled text</p>
```

**Contextual** — named semantic colors:
```html
<span class="sgds:text-primary-default">Brand colored</span>
<span class="sgds:text-danger-default">Error message</span>
<span class="sgds:text-success-default">Success message</span>
```

**Typography roles** — purpose-specific:
```html
<h1 class="sgds:text-heading-default">Heading</h1>
<p class="sgds:text-body-default">Body text</p>
<label class="sgds:text-label-default">Form label</label>
<a class="sgds:text-link-default">Link text</a>
```

---

## Border Colors (`sgds:border-*`)

Border colors are component/container level only (no page-level variants).

**Always combine a border color class with a border width class** — color alone produces no visible border:
```html
<div class="sgds:border sgds:border-default">Standard border</div>
```

### Foundational Border Tokens

| Class | Use for |
|---|---|
| `sgds:border-default` | Standard neutral border (first choice for cards) |
| `sgds:border-emphasis` | Strong, high-visibility border |
| `sgds:border-muted` | Subtle, de-emphasized border |
| `sgds:border-transparent` | Invisible border (preserves spacing) |

### Semantic Border Tokens

```
sgds:border-{color}-default    — Standard emphasis
sgds:border-{color}-emphasis   — Strong, high-visibility
sgds:border-{color}-muted      — Subtle presence
```

Examples:
```html
<div class="sgds:border sgds:border-primary-default">Active state</div>
<div class="sgds:border sgds:border-danger-default">Error field</div>
<div class="sgds:border sgds:border-success-muted">Subtle success</div>
```
