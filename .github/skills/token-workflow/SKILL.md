---
name: token-workflow
description: Maintains SGDS design token architecture across three layers (primitive tokens in root.css, semantic mappings in day.css/night.css, and Tailwind utilities in utility.css). Use when adding/modifying design tokens, creating new utilities, updating Storybook documentation, or ensuring token consistency across theme files. IMPORTANT - whenever new tokens are requested, ALWAYS complete all three deliverables - (1) utility.css mapping, (2) playground HTML demo in playground/utility/, (3) Storybook story in stories/utilities/. Never do just one without the others.
metadata:
  author: singapore-design-system
  version: "1.0.0"
---

# Token Workflow

## Non-negotiable Rule

Every new `--sgds-*` design token requires ALL THREE deliverables — never partial:

1. **`src/css/utility.css`** — Tailwind custom property mapping
2. **`playground/utility/[name].html`** — Live HTML demo
3. **`stories/utilities/[name].stories.js`** — Storybook story

## Token Architecture

```
src/themes/root.css             Primitive tokens — base values, no theme variation
        ↓
src/themes/day.css + night.css  Semantic mappings — theme-aware, references primitives
        ↓
src/css/utility.css             Tailwind @theme — generates sgds: utility classes
```

## Checklist: Adding New Tokens

- [ ] Add primitive tokens to `root.css` (if new primitives needed)
- [ ] Add semantic mappings to **both** `day.css` and `night.css`
- [ ] Add Tailwind custom property to `src/css/utility.css`
- [ ] Create `playground/utility/[name].html` preview
- [ ] Run `pnpm run utility:dev` and test light/dark theme toggle
- [ ] Create `stories/utilities/[name].stories.js` story
- [ ] Run `pnpm storybook` to verify display

## Checklist: Renaming a Semantic Token

Update all five layers in one commit:

- [ ] `day.css` + `night.css` — rename token definition
- [ ] `src/css/utility.css` — rename custom property and its reference
- [ ] `playground/css/utility.css` — rename CSS variable mapping and `.sgds\:` class
- [ ] `playground/utility/*.html` — update table cell, CSS variable cell, utility class on preview div, and label text
- [ ] `stories/utilities/*.stories.js` — update `ColorItem(...)` call with new token name and variable

## Storybook Introduction Pattern

```
stories/utilities/[category]/introduction.mdx  →  docs/[Category].md
```

```mdx
import { Meta, Markdown } from "@storybook/blocks";
import Docs from "../../../docs/Category.md?raw";

<Meta title="Utilities/Category/Introduction" />
<Markdown>{Docs}</Markdown>
```

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm run utility:dev` | Tailwind watches `playground/utility/*.html` for class generation |
| `pnpm run dev` | Preview playground files in browser |
| `pnpm storybook` | Preview Storybook |
| `pnpm test` | Run unit tests |
| `pnpm build` | Build to `lib/` |

- **tailwind-mapping** - For detailed Tailwind v4 CSS variable conversion rules and playground documentation
