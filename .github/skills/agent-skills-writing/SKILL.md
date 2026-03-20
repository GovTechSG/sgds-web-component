---
name: agent-skills-writing
description: Guidelines for writing new agent skills in skills/ (user-facing) and .github/skills/ (internal). Use when creating a new skill, adding a reference file, or refactoring an existing skill that has grown too large.
metadata:
  author: singapore-design-system
  version: "0.0.0"
  internal: true
---

# Agent Skills Writing Skill

Standards and patterns for authoring AI agent skills in this repository.

## Skill Locations

| Location | Purpose | Audience |
|----------|---------|---------|
| `skills/sgds-utilities/` | All SGDS utility classes in one consolidated skill with a reference file per utility category | `external` |
| `skills/sgds-components/` | All 46 SGDS web components in one consolidated skill with a reference file per component | `external` |
| `.github/skills/` | Internal tools for SGDS maintainers | `internal` (no `audience` field) |

**Folder naming convention**: All `skills/` folders use a domain prefix so agents and users can discover them by category:
- `sgds-utilities` — consolidated skill for all SGDS utility classes (`sgds:` Tailwind prefix); reference files in `sgds-utilities/reference/`
- `sgds-components` — consolidated skill for all SGDS web components (`<sgds-*>`); reference files in `sgds-components/reference/`

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

**Consolidated skill** (many related items grouped into one skill with a reference file per item):
```
skills/sgds-components/
├── SKILL.md          ← setup content + component index table with links to reference/
└── reference/
    ├── accordion.md
    ├── alert.md
    ├── button.md
    └── ...            ← one file per component, no frontmatter, no Prerequisites section
```

Use the consolidated pattern when a domain has many parallel items (e.g., all SGDS web components) that would otherwise create dozens of top-level skill folders. The consolidated SKILL.md acts as both the setup guide and the navigation index.

## When to Extract Reference Files

Split into `reference/` when **any** of these are true:
- SKILL.md would exceed ~500 lines with all token documentation included
- The skill covers multiple semantic categories (primary, danger, success, etc.) that each have enough depth for their own file
- Different categories have meaningfully different design semantics worth documenting separately
- The domain has many parallel items that are better served by a consolidated skill (use the consolidated pattern above)

Do **not** extract if the skill is a single focused topic (e.g., spacing utilities, opacity).

## Consolidated Skill Reference Files

Reference files in a consolidated skill differ from standalone SKILL.md files:

- **No YAML frontmatter** — reference files start directly with the `#` heading
- **No Prerequisites section** — setup instructions live only in the parent SKILL.md; reference files do not duplicate them
- **Cross-references** — links to the parent SKILL.md use `../SKILL.md`; links to sibling reference files use `./other.md` or just `other.md`
- **Content** — everything else from the original SKILL.md (Quick Decision Guide, API Summary, Slots, Events, For AI agents) is preserved verbatim

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

Model: see `skills/sgds-components/reference/button.md`.

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

All SGDS utility categories live in the consolidated `skills/sgds-utilities/` skill. To add a new utility category reference:

1. Create `skills/sgds-utilities/reference/{category-name}.md` — no frontmatter, no Prerequisites section.
   - If the category has multiple sub-topics, create a hub file `reference/{category-name}.md` + a subfolder `reference/{category-name}/` with individual topic files.
2. Add a row for the category in the `## Available Utilities` table in `skills/sgds-utilities/SKILL.md`.
3. Update the `description` frontmatter of `skills/sgds-utilities/SKILL.md` to include the new category.
4. Update `CLAUDE.md` if the description blurb for `sgds-utilities` needs updating.

### Component skills

All SGDS web components live in the consolidated `skills/sgds-components/` skill. To add a new component reference:

1. Create `skills/sgds-components/reference/{component-name}.md` — no frontmatter, no Prerequisites section.
2. Add a row for the component in the `## Available Components` table in `skills/sgds-components/SKILL.md`.
3. Update the `description` frontmatter of `skills/sgds-components/SKILL.md` to include the new component name.
4. Update `CLAUDE.md` if the description blurb for `sgds-components` needs updating.

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
- [ ] Shared modifier definitions link to `color-semantics.md`, not duplicated
- [ ] Row added to `## Available Utilities` table in `skills/sgds-utilities/SKILL.md`
- [ ] Category name added to `sgds-utilities` frontmatter `description`

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
