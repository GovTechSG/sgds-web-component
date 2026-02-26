---
name: agent-skills-writing
description: Guidelines for writing new agent skills in src/skills/ (user-facing) and .github/skills/ (internal). Use when creating a new skill, adding a reference file, or refactoring an existing skill that has grown too large.
metadata:
  author: singapore-design-system
  version: "0.0.0"
---

# Agent Skills Writing Skill

Standards and patterns for authoring AI agent skills in this repository.

## Skill Locations

| Location | Purpose | Audience |
|----------|---------|---------|
| `src/skills/` | Teach external developers how to use SGDS utilities | `external` |
| `.github/skills/` | Internal tools for SGDS maintainers | `internal` (no `audience` field) |

## SKILL.md Frontmatter

```yaml
---
name: sgds-{skill-name}
description: One sentence. What the skill teaches. Include trigger keywords ("Use when users ask about...").
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external       # external skills only; omit for internal skills
  category: {category}     # e.g. color, border, spacing, typography
---
```

- File starts directly with `---` — no wrapping code fences
- Version stays `"0.0.0"` until officially released; bump major version on breaking changes

## Folder Structure

**Simple skill** (no reference files needed, under ~500 lines):
```
src/skills/{skill-name}/
└── SKILL.md
```

**Complex skill** (semantic categories, would exceed ~500 lines):
```
src/skills/{skill-name}/
├── SKILL.md          ← navigation hub + Quick Decision Guide only
└── reference/
    ├── base.md
    ├── primary.md
    ├── danger.md
    └── ...
```

## When to Extract Reference Files

Split into `reference/` when **any** of these are true:
- SKILL.md would exceed ~500 lines with all token documentation included
- The skill covers multiple semantic categories (primary, danger, success, etc.) that each have enough depth for their own file
- Different categories have meaningfully different design semantics worth documenting separately

Do **not** extract if the skill is a single focused topic (e.g., spacing utilities, opacity).

## SKILL.md Structure (with references)

Model: see `src/skills/background-color/SKILL.md` and `src/skills/border-color/SKILL.md`.

The SKILL.md is a **navigation hub and decision guide** — not an example gallery.

```
# {Name} Utilities Skill

One-line description of what it helps with.

## Prerequisites
## Core Concept
## Token Categories Overview   ← conceptual bullets + links to reference files; NO long code examples
## Quick Decision Guide         ← decision tree (Step 1 / Step 2 / Step 3)
## Reference Documentation      ← one entry per reference file (name, covers, use for)

---
**For AI Agents**: Key principles summary (numbered list, ~8–10 items)
```

### Rules for SKILL.md content
- **No long code examples** in SKILL.md — they belong in reference files
- Token Categories Overview may include 1–2 short inline examples to illustrate a pattern, not to demonstrate every token
- Quick Decision Guide uses bullet lists and `→ token` format, not code blocks
- Reference Documentation section links to every reference file with a `Covers:` and `Use for:` line

## Reference File Structure

Model: see any file in `src/skills/background-color/reference/`.

```markdown
# {Category} {Skill Name} Reference

**Meaning**: One phrase  
**Usage**: One phrase

## Design Semantics

- Bullet list explaining the intent and when to use this category
- Applied at which level (component only / page only / both)
- Contrast with adjacent categories if helpful (e.g., neutral vs purple/cyan)

## Available Tokens

### `sgds:{prefix}-{category}-{modifier}`
**One-line description.**

**When to use:**
- Bullet list of specific use cases

```html
<div class="sgds:{THIS-TOKEN-ONLY}">
  label
</div>
```

(Repeat for each token in the category)

## Common Patterns

> **Note**: Use library components like `<sgds-alert>`, `<sgds-badge>` when available.
> {Category} tokens are for creating custom components when library components don't meet your needs.

### Pattern Name

```html
(pattern example)
```

## Best Practices   ← optional; include only when there are genuine gotchas

## See Also
- **other-category.md** — one-line description
```

## HTML Example Hygiene

**The single most important rule for reference files:**

HTML examples must contain **only the token(s) being documented in that file** — no unrelated utilities.

```html
<!-- ✅ Correct — only the token under documentation -->
<div class="sgds:bg-danger-surface-default">
  Error message
</div>

<!-- ❌ Wrong — noise from other utility categories -->
<div class="sgds:bg-danger-surface-default sgds:p-4 sgds:rounded-lg sgds:text-sm">
  Error message
</div>
```

Rationale: examples teach the *token*, not a complete component. Surrounding utilities distract from what is being demonstrated and create false impressions about required pairings.

Exception: Common Patterns section may combine tokens from the same category (e.g., showing `border-l-4` alongside `border-danger-default` in a border-color reference).

## Shared Semantics Extraction

When **two or more skills** share the same suffix modifier vocabulary (e.g., `default`, `emphasis`, `muted`, `fixed-light`, `fixed-dark`, `inverse`), extract the definitions into a dedicated shared skill rather than duplicating them.

**Pattern used**: `src/skills/color-semantics/SKILL.md` is the shared reference for all suffix modifiers used by `background-color`, `border-color`, and `text-color`.

Each consumer skill replaces its duplicated prose with:
```markdown
For full definitions of suffix modifiers, see **[`color-semantics`](../color-semantics/SKILL.md)**.
```

Apply this pattern whenever you notice the same conceptual definitions appearing verbatim across multiple SKILL.md files.

## Library-First Principle

Every `reference/` file **must** include a library-first note at the top of the Common Patterns section:

```markdown
> **Note**: Use library components like `<sgds-{component}>` when available.
> {Category} tokens are for creating custom components when library components don't meet your needs.
```

Name specific relevant library components (e.g., `<sgds-alert>` in danger/warning files, `<sgds-badge>` in neutral/purple/cyan files). This reminds developers to check the component library before reaching for raw utility tokens.

## Registering a New Skill

### 1. Add to `src/skills/overview/SKILL.md`
Add an entry in the Utility Categories section with a code example and common patterns list.

### 2. Add to `.github/copilot-instructions.md`
Add a line under User-Facing Skills (or Internal Skills):
```markdown
- [skill-name](../src/skills/{skill-name}/SKILL.md) - One-line description
```

### 3. Update overview frontmatter description
Add the skill name to the comma-separated list in the `description` field of `src/skills/overview/SKILL.md`.

## Checklist for New Skills

Before considering a skill complete:

- [ ] SKILL.md starts with `---` frontmatter (no wrapping fences)
- [ ] `version: "0.0.0"` set
- [ ] SKILL.md is a navigation hub — no long code blocks
- [ ] Reference files exist if skill covers multiple semantic categories
- [ ] All HTML examples contain only the token(s) for that file's category
- [ ] Every Common Patterns section has a library-first note
- [ ] Shared modifier definitions link to a shared skill, not duplicated
- [ ] Registered in `src/skills/overview/SKILL.md`
- [ ] Registered in `.github/copilot-instructions.md`

## Related

- **[token-workflow](../token-workflow/SKILL.md)** — Adding or modifying design tokens
- **[tailwind-mapping](../tailwind-mapping/SKILL.md)** — Mapping CSS variables to Tailwind utilities
- [Copilot Instructions](../../.github/copilot-instructions.md) — Where skills are registered
