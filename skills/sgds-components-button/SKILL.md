---
name: sgds-components-button
description: "Use the sgds-button web component for interactive buttons in forms, dialogs, and navigation. Apply this skill whenever a user asks about buttons, CTAs, form submission, loading states, icon buttons, link-styled buttons, or button variants (primary, outline, ghost, danger) in SGDS."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: component
---

# SGDS Button Component Skill

`<sgds-button>` is the standard action element for forms, dialogs, and navigation. Use it instead of a native `<button>` whenever SGDS styling and behaviour are needed.

## Prerequisites

See **[sgds-components-setup](../sgds-components-setup/SKILL.md)** for installation and framework integration (React 19+ vs React ≤18, Vue, Angular).

## Quick Decision Guide

**Which `variant`?**
- Default action → `primary` (default)
- Secondary / non-destructive alternative → `outline` or `ghost`
- Destructive action (delete, remove) → `danger` combined with `tone="danger"` or keep `tone="brand"` for softer emphasis

**Which `tone`?**
- Standard brand color → `brand` (default)
- Destructive / irreversible action → `danger`

**Which `size`?**
- Default → `md`
- Compact UI (table rows, toolbars) → `sm` or `xs`
- Prominent CTA → `lg`

**Button or link?**
- Triggers an action / submits a form → omit `href` (renders `<button>`)
- Navigates to a URL → set `href` (renders `<a role="button">`)

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `variant` | `primary \| outline \| ghost \| danger` | `primary` | Visual style |
| `tone` | `brand \| danger` | `brand` | Semantic tone |
| `size` | `xs \| sm \| md \| lg` | `md` | Size |
| `type` | `button \| submit \| reset` | `button` | Form behaviour |
| `disabled` | boolean | `false` | Disables interaction |
| `loading` | boolean | `false` | Shows spinner, blocks interaction |
| `active` | boolean | `false` | Forces active/pressed appearance |
| `fullWidth` | boolean | `false` | Stretches button to container width |
| `href` | string | — | Renders as `<a>`, navigates to URL |
| `target` | string | — | `_blank`, `_self`, etc. (with `href`) |
| `download` | string | — | Triggers file download (with `href`) |
| `form` | string | — | Associates with a form by id |
| `formaction` | string | — | Overrides form `action` |
| `formmethod` | `post \| get` | — | Overrides form `method` |
| `formnovalidate` | boolean | — | Skips form validation on submit |
| `formtarget` | string | — | Overrides form `target` |
| `ariaLabel` | string | — | Accessible label (use when no visible text) |

## Slots

| Slot | Purpose |
|---|---|
| *(default)* | Button label text |
| `leftIcon` | Icon displayed to the left of the label |
| `rightIcon` | Icon displayed to the right of the label |

SSR: set `hasLeftIconSlot` / `hasRightIconSlot` boolean attributes when using icon slots server-side.

## Events

| Event | When fired |
|---|---|
| `sgds-blur` | Button loses focus |
| `sgds-focus` | Button gains focus |

For framework-specific event syntax (React 19+ vs ≤18, Vue, Angular), see **[sgds-components-setup](../sgds-components-setup/SKILL.md)**.

## Reference Documentation

| Topic | File |
|---|---|
| All attributes with full examples and edge cases | [reference/attributes.md](reference/attributes.md) |
| Common patterns (form submit, icons, loading, link button) | [reference/patterns.md](reference/patterns.md) |

---

**For AI agents**: Default to `<sgds-button>` for all interactive buttons — do not suggest `<button>` with raw utility classes. Use `variant="danger" tone="danger"` for destructive actions. Set `type="submit"` for form submission buttons. For icon-only buttons, prefer `<sgds-icon-button>` and mention it to the user.
