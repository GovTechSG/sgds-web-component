---
description: 'Guidelines for maintaining token mappings and documentation across design system files'
applyTo: '**'
---

# Token Mapping & Documentation Workflow

## Overview

This document outlines the relationship between design token files and how to maintain consistency across token changes and documentation updates.

## Token Mapping Architecture

### File Dependency Flow

```
root.css (Primitive Tokens)
    ↓
day.css + night.css (Semantic Token Mappings)
    ↓
utility.css (Tailwind v4 CSS Configuration)
```

### Token Layer Definitions

**1. Primitive Tokens (root.css)**
- Base design values with no semantic meaning
- Examples: `--sgds-gray-000`, `--sgds-product-primary-100`, `--sgds-blue-600`
- Categories:
  - Colors: `--sgds-[color]-[shade]` (e.g., `--sgds-gray-000` through `--sgds-gray-1100`)
  - Spacing: `--sgds-spacer-0` through `--sgds-spacer-12`, `--sgds-dimension-*`
  - Typography: `--sgds-font-size-*`, `--sgds-font-weight-*`, `--sgds-line-height-*`, `--sgds-letter-spacing-*`
  - Layout: `--sgds-breakpoint-*`, `--sgds-border-radius-*`, `--sgds-border-width-*`
- No theme variations (same for day and night)
- Source of truth for design values

**2. Semantic Token Mappings (day.css + night.css)**
- Theme-aware tokens that use primitive tokens as values
- Examples: `--sgds-bg-default`, `--sgds-color-subtle`, `--sgds-primary-surface-emphasis`
- Categories:
  - Default colors (bg, surface, color, border-color)
  - Status-specific colors (primary, accent, success, danger, warning, etc.)
  - Form-specific colors and dimensions
- Each semantic token has two definitions (one in day.css, one in night.css)
- Provides theme switching capability without code changes

**3. Tailwind CSS Configuration (utility.css)**
- Converts SGDS semantic tokens into Tailwind v4 CSS custom properties
- Uses `@supports` to detect Tailwind v4 capability
- Maps semantic tokens to Tailwind theme categories using the naming pattern defined in `tailwind-css-variable-mapping.md`
- For detailed Tailwind v4 conversion rules, property categories, and naming conventions, see [tailwind-css-variable-mapping.md](#related-documentation-files)

### Specific Token Mapping Examples

#### Color Tokens

**Primitive → Semantic → Tailwind**

Day theme example:
- Primitive: `--sgds-gray-1000: #1a1a1a`
- Semantic (day.css): `--sgds-color-default: var(--sgds-gray-1000)`
- Tailwind (utility.css): Generates `sgds:text-default` utility class

Dark theme example:
- Primitive: `--sgds-gray-100: #f3f3f3`
- Semantic (night.css): `--sgds-color-default: var(--sgds-gray-100)`
- Tailwind (utility.css): Same utility class, different runtime value

For complete mapping patterns (background, surface, text, border colors), see [tailwind-css-variable-mapping.md](#related-documentation-files).

#### Spacing Tokens

Semantic spacing tokens reference primitives:
- `--sgds-padding-md: var(--sgds-spacer-5)` which is `1rem` (16px)
- `--sgds-margin-lg: var(--sgds-spacer-6)` which is `1.25rem` (20px)
- `--sgds-gap-xl: var(--sgds-spacer-7)` which is `1.5rem` (24px)

Tailwind maps these consistently across margin, padding, and gap utilities.

### Token Categories (High-Level Overview)

**Colors:**
- Default colors (appearance context-dependent)
- Status-specific colors (primary, accent, success, danger, warning, purple, cyan, neutral)
- Fixed colors (same across themes)
- Translucent colors (with opacity)

---

## When Tokens Change in root.css

### Checklist for Token Updates

If you modify, add, or remove tokens in `src/themes/root.css`:

- [ ] **Verify semantic token usage** in `src/themes/day.css` and `src/themes/night.css`
  - Check if any semantic tokens reference the changed primitive token
  - Update semantic token values if necessary
  - Ensure both day and night themes are updated consistently

- [ ] **Update utility.css** if semantic tokens changed
  - If new semantic tokens added: Add corresponding Tailwind CSS mapping
  - If tokens removed: Remove corresponding Tailwind CSS mappings
  - Run Tailwind build to verify no config errors

- [ ] **Review affected stories**
  - If color changes: `stories/utilities/border-color.stories.js`, `stories/utilities/text-color.stories.js`
  - If spacing changes: `stories/utilities/spacing/` folder
  - If typography changes: `stories/utilities/font-size.stories.js`, `stories/utilities/line-height.stories.js`, etc.
  - Update Value columns in story tables to reflect new token values

- [ ] **Update documentation**
  - If new semantic tokens: Add to relevantdocs files (docs/FoundationalStyles.md, etc.)
  - If design rationale changed: Update docs/Spacing.md, docs/Grid.md, or other related docs
  - Verify Storybook import stories still render correctly

---

## Documentation Pattern for Utilities & Layouts

### Established Structure

All utility and layout documentation follows a consistent pattern:

**Pattern Flow:**
```
stories/utilities/[category]/introduction.mdx (or stories/layouts/Introduction.mdx)
  ↓ imports
docs/[Category].md (source documentation)
  ↓ renders with
<Markdown>{ImportedMarkdown}</Markdown>
```

### Implementation Pattern

**1. Create documentation source** in `docs/` folder
```markdown
# Category Name

Documentation content here...
```

**2. Create Storybook story** using Markdown import pattern
```mdx
import { Meta, Markdown } from "@storybook/blocks";
import CategoryDocs from "../../../docs/Category.md?raw";

<Meta title="Utilities/Category/Introduction" />

<Markdown>{CategoryDocs}</Markdown>
```

### Files Following This Pattern

**Utilities:**
- `stories/utilities/spacing/introduction.mdx` ← imports → `docs/Spacing.md`
- `stories/utilities/grid/introduction.mdx` ← imports → `docs/Grid.md`
- `stories/utilities/introduction.mdx` ← imports → `docs/Utilities.md` (when created)

**Layouts/Templates:**
- `stories/layouts/Introduction.mdx` ← imports → `docs/Layouts.md`

**Getting Started:**
- `stories/getting-started/About.mdx` ← imports → `docs/WebComponents.md`

### Documentation File Organization Rules

**Location:** `docs/[Name].md`
- Filename matches category name
- PascalCase for filenames
- One markdown file per category/section

**Content Sections (recommended):**
1. Overview/Description
2. Core Concepts or Setup Instructions
3. Scale/Values table (for tokens)
4. Utilities Breakdown (if applicable)
5. Practical Examples
6. Related Utilities or Best Practices

**Storybook Story Organization:**
```
stories/
├── utilities/
│   ├── introduction.mdx (main overview)
│   ├── spacing/
│   │   ├── introduction.mdx (imports Spacing.md)
│   │   ├── margin.stories.js
│   │   ├── padding.stories.js
│   │   └── gap.stories.js
│   ├── text-color.stories.js
│   ├── border-radius.stories.js
│   └── ... (other utilities)
├── layouts/
│   └── Introduction.mdx (imports Layouts.md)
└── getting-started/
    └── About.mdx (imports WebComponents.md)
```

---

## When Adding New Utilities

### Complete Checklist

- [ ] **Add tokens to root.css** (if needed)
  - Add primitive tokens with values
  - Follow naming convention: `--sgds-[category]-[variant]`

- [ ] **Add semantic mappings** to day.css and night.css
  - Map to primitive tokens with theme variations
  - Ensure consistency across both theme files

- [ ] **Add Tailwind CSS mapping** to utility.css
  - Map semantic tokens to Tailwind theme categories
  - Use `@supports` for Tailwind v4 detection
  - Follow existing pattern for other utilities

- [ ] **Create Storybook story**
  - Create `.stories.js` or organize in subfolder with `introduction.mdx`
  - Display token values in table format
  - Include code examples

- [ ] **Create/update documentation**
  - Create new `docs/[Name].md` if needed
  - Include scale/reference table with values
  - Provide practical examples
  - For categories with multiple related utilities (like spacing): Use subfolder structure with `introduction.mdx` that imports docs

- [ ] **Update navigation** in `.storybook/preview.ts`
  - Add to `storySort.order` if establishing new top-level category

---

## Token Validation Checklist

Before pushing changes:

- [ ] All primitive tokens in `root.css` have values
- [ ] All semantic tokens in `day.css` reference valid primitives
- [ ] All semantic tokens in `night.css` reference valid primitives
- [ ] Day and night versions of each semantic token exist
- [ ] All semantic tokens used in `utility.css` are defined
- [ ] Utility.css Tailwind mappings match semantic token names
- [ ] No circular references between token layers
- [ ] Stories display correct token values
- [ ] Documentation markdown renders without errors in Storybook
- [ ] No broken links in documentation

---

## Example: Adding a New Spacing Token

**Scenario:** Add new spacing token `--sgds-spacer-13: 10rem;`

### Steps:

1. **Update root.css**
   ```css
   --sgds-spacer-13: 10rem;
   ```

2. **Update day.css & night.css** (if needed for semantic variants)
   ```css
   /* Both files reference same primitive */
   --sgds-margin-6-xl: var(--sgds-spacer-13);
   ```

3. **Update utility.css**
   ```css
   theme.spacing.m-\\d+: var(--sgds-margin-*);
   /* Automatically picks up new token via Tailwind */
   ```

4. **Update stories/utilities/spacing/introduction.mdx**
   - Update Spacing.md scale table to include new value

5. **Test**
   - Run `pnpm build`
   - Verify in Storybook
   - Check utility class renders: `sgds:m-13`

---

## Related Documentation Files

- **[tailwind-css-variable-mapping.md](tailwind-css-variable-mapping.md)** - Detailed Tailwind v4 CSS variable conversion rules, property categories, naming conventions, and playground documentation requirements
- `.github/instructions/dp.self-explanatory-code-commenting-v1.instructions.md` - Code commenting standards
- `.github/instructions/dp.markdown-v1.instructions.md` - Markdown documentation standards
- `.github/copilot-instructions.md` - General project structure and conventions
