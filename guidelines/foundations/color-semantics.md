# Color Token Semantics

All SGDS color utilities — background, text, and border — share the same set of suffix modifiers. Learn the pattern once, apply it everywhere.

---

## Semantic Color Categories

| Category | Meaning |
|---|---|
| `primary` | Brand colour — emphasis, identity |
| `accent` | Informational / links — neutral, no urgency |
| `success` | Positive feedback, completion |
| `danger` | Errors, destructive actions |
| `warning` | Caution, needs attention |
| `purple` | Visual variety — no semantic meaning |
| `cyan` | Visual variety — no semantic meaning |
| `neutral` | Equal importance — no differentiation |

Use `purple` and `cyan` when you need a third distinguishable colour without implying priority or meaning.

---

## Emphasis Modifiers

Applied to all semantic categories:

| Modifier | Strength | Use for |
|---|---|---|
| `muted` | Subtle | Secondary info, inactive states, low-priority |
| `default` | Standard | Typical states, normal frequency |
| `emphasis` | Strong | Active states, CTAs, high-priority signals |

Progression: `muted → default → emphasis`

---

## Theme Behaviour Modifiers

| Modifier | Behaviour | Use when |
|---|---|---|
| `fixed-light` | Always light, never changes with theme | Region always on a light surface (e.g. image background) |
| `fixed-dark` | Always dark, never changes with theme | Region always dark (e.g. branded hero) |
| `inverse` | Opposite of current theme | High-contrast elements standing out from the page |

---

## Transparency Modifiers

| Modifier | Behaviour |
|---|---|
| `translucent` | Semi-transparent — for hover/active overlays on images or gradients |
| `transparent` | Fully invisible — for outline-style components that need consistent sizing |

---

## Background-Specific Modifiers

These modifiers only apply to background-color tokens:

| Modifier | Scope | Use for |
|---|---|---|
| `surface` | Component level (cards, badges, inputs, panels) | Any component background |
| *(no surface)* | Page level (body, sections, full-width areas) | Page-section backgrounds |
| `alternate` | Page level | Second background for visual rhythm between sections |
| `overlay` | Full viewport | Modal and drawer backdrops — never use on components |

**Key distinction:** `sgds:bg-primary-default` → page section background; `sgds:bg-primary-surface-default` → component background (card, badge). Never swap them.

---

## Quick Selector

**Step 1 — Pick the category:**
- Error or destructive → `danger`
- Completion or positive → `success`
- Informational or link → `accent`
- Brand identity → `primary`
- Non-semantic variety → `purple` or `cyan`
- Equal weight items → `neutral`
- Caution → `warning`

**Step 2 — Pick the emphasis:**
- Standard → `default`
- Draw attention / active / hover → `emphasis`
- Supporting / secondary / inactive → `muted`

**Step 3 — Pick the scope (backgrounds only):**
- Applying to a card, badge, input, or panel → include `surface` in the token name
- Applying to a page section or full-width area → omit `surface`

---

## Do and Don't

**Do:**
- Use `danger` for errors, validation failures, and destructive actions
- Use `accent` for informational content and links
- Use `success` only for genuinely positive outcomes (saved, completed, verified)
- Use `warning` for non-blocking caution — not for errors
- Use `surface` in the token name when the target element is a component

**Don't:**
- Use `danger` for general alerts that are not errors
- Use `primary` for every coloured element — reserve it for brand and identity
- Mix `fixed-light` text with a theme-aware background — contrast is not guaranteed
- Use `overlay` on components — it is for full-screen modal/drawer backdrops only
