---
name: agent-skills-writing
description: Guidelines for writing new agent skills in skills/ (user-facing) and .github/skills/ (internal). Use when creating a new skill, adding a reference file, or refactoring an existing skill that has grown too large.
metadata:
  author: singapore-design-system
  version: "0.0.0"
---

# Agent Skills Writing Skill

Standards and patterns for authoring AI agent skills in this repository.

## Skill Locations

| Location | Purpose | Audience |
|----------|---------|---------|
| `skills/utilities-*/` | Teach external developers how to use SGDS foundational style utilities (the Utilities API) | `external` |
| `skills/components-*/` | Teach external developers how to use SGDS web components | `external` |
| `.github/skills/` | Internal tools for SGDS maintainers | `internal` (no `audience` field) |

**Folder naming convention**: All `skills/` folders use a domain prefix so agents and users can discover them by category:
- `utilities-{name}` — foundational styles exposed via the `sgds:` Tailwind prefix
- `components-{name}` — usage guidance for SGDS web components (`<sgds-*>`)

## SKILL.md Frontmatter

```yaml
---
name: sgds-utilities-{skill-name}   # or sgds-components-{skill-name}
description: "One sentence. What the skill teaches. Include trigger keywords (Use when users ask about...)."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external       # external skills only; omit for internal skills
  category: {category}     # e.g. color, border, spacing, typography, component
---
```

> **Important**: Always quote the `description` value. YAML will error if the value contains a colon (e.g., `sgds: prefix`).

- File starts directly with `---` — no wrapping code fences
- Version stays `"0.0.0"` until officially released; bump major version on breaking changes

## Folder Structure

**Simple skill** (no reference files needed, under ~500 lines):
```
skills/utilities-{name}/
└── SKILL.md

skills/components-{name}/
└── SKILL.md
```

**Complex skill** (semantic categories, would exceed ~500 lines):
```
skills/utilities-{name}/
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

## Utility Skill Structure (with references)

Model: see `skills/utilities-background-color/SKILL.md` and `skills/utilities-border-color/SKILL.md`.

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

## Component Skill Structure

Model: see `skills/components-button/SKILL.md`.

Component skills document an `<sgds-*>` element's usage. Their SKILL.md structure differs from utility skills:

```
# SGDS {Name} Component Skill

One-line role of the component and when to prefer it over a native element.

## Prerequisites
## Quick Decision Guide   ← variant/tone/size/mode decision tree
## API Summary            ← all attributes as a compact table (name | type | default | purpose)
## Slots                  ← slot name + purpose table
## Events                 ← event name | when fired | React prop
## Reference Documentation

---
**For AI agents**: Key rules — default element to reach for, dangerous combinations to avoid,
                   related components to mention.
```

### Rules specific to component skills
- **Lead with the element tag, not attribute tables** — the first code example in Quick Decision Guide must be `<sgds-{name}>` HTML
- **Slots get a dedicated table** in the hub — they are not optional documentation
- **Events table** lists event name and when it fires only — framework-specific syntax (React prop names, Vue `@event`, Angular `(event)`) belongs in **sgds-components-setup**, not the individual component skill
- **Reference `components-setup` in Prerequisites** — every component skill's Prerequisites section links to **sgds-components-setup**
- **Mention sibling components** where relevant (e.g., `<sgds-icon-button>` from a `<sgds-button>` skill)
- **No library-first note** needed — this skill *is* the library component; instead, note when to use raw utilities to *extend* it
- HTML examples in `reference/` may combine the component's own attributes freely — the single-token isolation rule applies to utility skills only

## Reference File Structure

Model: see any file in `skills/utilities-background-color/reference/`.

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

**Pattern used**: `skills/utilities-color-semantics/SKILL.md` is the shared reference for all suffix modifiers used by `utilities-background-color`, `utilities-border-color`, and `utilities-text-color`.

Each consumer skill replaces its duplicated prose with:
```markdown
For full definitions of suffix modifiers, see **[`utilities-color-semantics`](../utilities-color-semantics/SKILL.md)**.
```

Apply this pattern whenever you notice the same conceptual definitions appearing verbatim across multiple SKILL.md files.

## Library-First Principle

Every `reference/` file **must** include a library-first note at the top of the Common Patterns section:

```markdown
> **Note**: Use library components like `<sgds-{component}>` when available.
> {Category} tokens are for creating custom components when library components don't meet your needs.
```

Name specific relevant library components (e.g., `<sgds-alert>` in danger/warning files, `<sgds-badge>` in neutral/purple/cyan files). This reminds developers to check the component library before reaching for raw utility tokens.

## Eval Workspace Convention

When running the skill-creator eval loop for any skill in `skills/`, always place the workspace directory under:

```
test/skills/{skill-folder-name}-workspace/
```

For example:
- `skills/components-masthead/` → `test/skills/components-masthead-workspace/`
- `skills/utilities-spacing/` → `test/skills/utilities-spacing-workspace/`

This keeps generated eval artefacts (iteration dirs, benchmark.json, grading files, feedback.json) out of `src/` and co-located with the project's other test outputs in `test/`.

---

## Registering a New Skill

### Utilities skills

1. Add an entry in `skills/utilities-overview/SKILL.md` under Utility Categories.
2. Add the skill name to the `description` field of `skills/utilities-overview/SKILL.md`.
3. Add a line to `.github/copilot-instructions.md` under **Utilities Skills**:
   ```markdown
   - [utilities-{name}](../skills/utilities-{name}/SKILL.md) - One-line description
   ```

### Component skills

1. Add a line to `.github/copilot-instructions.md` under **Component Skills**:
   ```markdown
   - [components-{name}](../skills/components-{name}/SKILL.md) - One-line description
   ```
2. Once 3+ component skills exist, create `skills/components-overview/SKILL.md` as a navigation hub (same pattern as `utilities-overview`). Until then, `copilot-instructions.md` is the only registry.

## Checklist for New Skills

Before considering a skill complete:

**All skills**
- [ ] SKILL.md starts with `---` frontmatter (no wrapping fences)
- [ ] `version: "0.0.0"` set
- [ ] `description` value is quoted (required if it contains a colon)
- [ ] SKILL.md is a navigation hub — no long code blocks
- [ ] Reference files exist if skill covers multiple semantic categories or would exceed ~500 lines
- [ ] Registered in `.github/copilot-instructions.md`

**Utilities skills only**
- [ ] All HTML examples contain only the token(s) for that file's category
- [ ] Every Common Patterns section has a library-first note
- [ ] Shared modifier definitions link to a shared skill, not duplicated
- [ ] Registered in `skills/utilities-overview/SKILL.md`
- [ ] Skill name added to `utilities-overview` frontmatter `description`

**Component skills only**
- [ ] First code example in hub is raw `<sgds-*>` HTML
- [ ] Slots documented in a table in the hub
- [ ] Events table includes React prop name
- [ ] React import path mentioned if wrapper exists in `lib/react/`
- [ ] Related/sibling components noted

## Related

- **[skill-creator](../skill-creator/SKILL.md)** — General methodology for drafting, evaluating, and iterating on any skill. Use alongside this guide: `skill-creator` covers the process, `agent-skills-writing` covers SGDS-specific conventions
- **[token-workflow](../token-workflow/SKILL.md)** — Adding or modifying design tokens
- **[tailwind-mapping](../tailwind-mapping/SKILL.md)** — Mapping CSS variables to Tailwind utilities
- [Copilot Instructions](../../.github/copilot-instructions.md) — Where skills are registered
