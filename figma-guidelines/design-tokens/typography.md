# SGDS Typography Design Tokens

SGDS typography utilities use the `sgds:` prefix. They do **not** require theme files.

**Always prefer semantic font-size and line-height utilities** over raw numeric ones — semantic tokens are responsive and encode design intent.

---

## Font Size — Semantic Utilities (Always Prefer)

| Role | Utilities |
|---|---|
| Display | `sgds:text-display-sm` `sgds:text-display-md` `sgds:text-display-lg` |
| Heading | `sgds:text-heading-sm` `sgds:text-heading-md` `sgds:text-heading-lg` `sgds:text-heading-xl` |
| Subtitle | `sgds:text-subtitle-sm` `sgds:text-subtitle-md` |
| Body | `sgds:text-body-sm` `sgds:text-body-md` `sgds:text-body-lg` |
| Label | `sgds:text-label-xs` `sgds:text-label-sm` `sgds:text-label-md` `sgds:text-label-lg` |
| Caption | `sgds:text-caption-md` |
| Overline | `sgds:text-overline-md` |

Only fall back to raw scale (`sgds:text-xs` through `sgds:text-9-xl`) when no semantic role fits.

---

## Line Height — Semantic Utilities (Always Prefer)

| Utility | Use for |
|---|---|
| `sgds:leading-3-xs` | Very tight (display headings) |
| `sgds:leading-2-xs` | Tight (labels, captions) |
| `sgds:leading-xs` | Compact (UI labels) |
| `sgds:leading-sm` | Form elements |
| `sgds:leading-md` | Default body text |
| `sgds:leading-lg` | Section headings |
| `sgds:leading-xl` | Display text |
| `sgds:leading-2-xl` | Hero headings |
| `sgds:leading-3-xl` | Large display |

Only use raw pixel utilities (`sgds:leading-16` etc.) when a fixed non-responsive height is needed.

---

## Font Weight

| Class | Weight |
|---|---|
| `sgds:font-thin` | 100 |
| `sgds:font-light` | 300 |
| `sgds:font-normal` | 400 |
| `sgds:font-medium` | 500 |
| `sgds:font-semibold` | 600 |
| `sgds:font-bold` | 700 |
| `sgds:font-black` | 900 |

---

## Letter Spacing

| Class | Use for |
|---|---|
| `sgds:tracking-tighter` | Very tight (large display) |
| `sgds:tracking-tight` | Slightly tight (display headings) |
| `sgds:tracking-normal` | Default body text |
| `sgds:tracking-wide` | Labels, captions |
| `sgds:tracking-wider` | Overlines, small caps |
| `sgds:tracking-widest` | All-caps badge text |

---

## Font Family

| Class | Use for |
|---|---|
| `sgds:font-sans` | Default UI text (Inter) |
| `sgds:font-mono` | Code, monospace content |

---

## Quick Decision Guide

**Hero/display heading?**
→ `sgds:text-display-lg` + `sgds:font-bold` + `sgds:leading-2-xl` + `sgds:tracking-tight`

**Section heading (H2/H3)?**
→ `sgds:text-heading-lg` / `sgds:text-heading-md` + `sgds:font-semibold` + `sgds:leading-lg`

**Body content?**
→ `sgds:text-body-md` + `sgds:font-normal` + `sgds:leading-md`

**Form label?**
→ `sgds:text-label-sm` / `sgds:text-label-md` + `sgds:font-semibold` + `sgds:leading-sm`

**Small badge or overline?**
→ `sgds:text-overline-md` + `sgds:font-semibold` + `sgds:uppercase` + `sgds:tracking-wider`

**Caption or helper text?**
→ `sgds:text-caption-md` + `sgds:font-normal` + `sgds:leading-xs`

**Inline code?**
→ `sgds:font-mono` + `sgds:text-body-sm` + `sgds:leading-md`
