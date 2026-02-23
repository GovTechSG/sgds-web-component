---
name: token-workflow
description: Maintains SGDS design token architecture across three layers (primitive tokens in root.css, semantic mappings in day.css/night.css, and Tailwind utilities in utility.css). Use when adding/modifying design tokens, creating new utilities, updating Storybook documentation, or ensuring token consistency across theme files.
metadata:
  author: singapore-design-system
  version: "1.0.0"
---

# Token Workflow Skill

Maintains consistency in the SGDS design token system and documentation workflows.

## Token Architecture

### Three-Layer System

```
root.css (Primitive Tokens)
    ↓
day.css + night.css (Semantic Token Mappings)
    ↓
utility.css (Tailwind v4 CSS Configuration)
```

### Token Layers

**1. Primitive Tokens (`src/themes/root.css`)**
- Base design values with no semantic meaning
- Examples: `--sgds-gray-000`, `--sgds-product-primary-100`, `--sgds-blue-600`
- Categories: Colors, Spacing, Typography, Layout
- No theme variations (same for day and night)

**2. Semantic Token Mappings (`src/themes/day.css` + `night.css`)**
- Theme-aware tokens that reference primitive tokens
- Examples: `--sgds-bg-default`, `--sgds-color-subtle`, `--sgds-primary-surface-emphasis`
- Categories: Default colors, Status-specific colors, Form-specific colors
- Each token has two definitions (one per theme)

**3. Tailwind CSS Configuration (`src/css/utility.css`)**
- Converts SGDS semantic tokens into Tailwind v4 CSS custom properties
- Uses `@supports` to detect Tailwind v4 capability
- Generates utility classes with `sgds:` prefix

## When Tokens Change in root.css

### Checklist for Token Updates

- [ ] **Verify semantic token usage** in `src/themes/day.css` and `src/themes/night.css`
  - Check if any semantic tokens reference the changed primitive token
  - Update semantic token values if necessary
  - Ensure both day and night themes are updated consistently

- [ ] **Update utility.css** if semantic tokens changed
  - Add corresponding Tailwind CSS mapping for new semantic tokens
  - Remove mappings for deleted tokens
  - Run Tailwind build to verify no config errors

- [ ] **Review affected stories**
  - Color changes: `stories/utilities/border-color.stories.js`, `stories/utilities/text-color.stories.js`
  - Spacing changes: `stories/utilities/spacing/` folder
  - Typography changes: `stories/utilities/font-size.stories.js`, `stories/utilities/line-height.stories.js`, etc.
  - Update Value columns in story tables to reflect new token values

- [ ] **Update documentation**
  - Add new semantic tokens to relevant docs files (`docs/FoundationalStyles.md`, etc.)
  - Update design rationale in `docs/Spacing.md`, `docs/Grid.md`, or other related docs
  - Verify Storybook import stories still render correctly

## Documentation Pattern for Utilities & Layouts

### Pattern Flow

```
stories/utilities/[category]/introduction.mdx
  ↓ imports
docs/[Category].md (source documentation)
  ↓ renders with
<Markdown>{ImportedMarkdown}</Markdown>
```

### Implementation Pattern

**1. Create documentation source** in `docs/` folder:
```markdown
# Category Name

Documentation content here...
```

**2. Create Storybook story** using Markdown import pattern:
```mdx
import { Meta, Markdown } from "@storybook/blocks";
import CategoryDocs from "../../../docs/Category.md?raw";

<Meta title="Utilities/Category/Introduction" />

<Markdown>{CategoryDocs}</Markdown>
```

### Existing Patterns

**Utilities:**
- `stories/utilities/spacing/introduction.mdx` ← imports → `docs/Spacing.md`
- `stories/utilities/grid/introduction.mdx` ← imports → `docs/Grid.md`

**Layouts:**
- `stories/layouts/Introduction.mdx` ← imports → `docs/Layouts.md`

### Documentation File Organization

**Location:** `docs/[Name].md`
- Filename matches category name (PascalCase)
- One markdown file per category

**Content Sections:**
1. Overview/Description
2. Core Concepts or Setup Instructions
3. Scale/Values table (for tokens)
4. Utilities Breakdown (if applicable)
5. Practical Examples
6. Related Utilities or Best Practices

## Adding New Utilities

### Complete Checklist

**1. Token Setup**
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

**2. Developer Preview (Fast, Internal)**
- [ ] **Create HTML preview** in playground file
  - Create `.html` file in `playground/utility/`
  - Display token values in table format
  - Include live examples with appropriate contrast

- [ ] **Test in playground**
  - Run `pnpm run utility:dev` (Tailwind scans playground files)
  - Run `pnpm run dev` (preview in browser)
  - Test theme toggle for light/dark mode compatibility

**3. Documentation (Storybook)**
- [ ] **Create Storybook story**
  - Create `.stories.js` in `stories/utilities/`
  - Add data structures for token information
  - Export multiple story variations
  - Include copy-to-clipboard functionality

- [ ] **Create/update documentation** (if applicable)
  - Create new `docs/[Name].md` if needed
  - Include scale/reference table with values
  - Provide practical examples
  - For categories with multiple utilities: Use subfolder structure with `introduction.mdx` that imports docs

- [ ] **Preview in Storybook**
  - Run `pnpm run storybook`
  - Verify all token values display correctly
  - Check responsive behavior if applicable

- [ ] **Update navigation** in `.storybook/preview.ts` (if establishing new top-level category)
  - Add to `storySort.order`

- [ ] **Update navigation** in `.storybook/preview.ts`
  - Add to `storySort.order` if establishing new top-level category

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

## Example: Adding a New Spacing Token

**Scenario:** Add new spacing token `--sgds-spacer-13: 10rem;`

### Steps:

**1. Token Setup**
```css
/* Update root.css */
--sgds-spacer-13: 10rem;
```

```css
/* Update day.css & night.css (if needed for semantic variants) */
/* Both files reference same primitive */
--sgds-margin-6-xl: var(--sgds-spacer-13);
```

```css
/* Update utility.css */
theme.spacing.m-\\d+: var(--sgds-margin-*);
/* Automatically picks up new token via Tailwind */
```

**2. Developer Preview**
- Create/update `playground/utility/spacing.html` with new token preview
- Run `pnpm run utility:dev` (Tailwind generates utilities)
- Run `pnpm run dev` (preview in browser)
- Test `sgds:m-13` class works in light/dark themes

**3. Documentation**
- Update `stories/utilities/spacing/*.stories.js` with new token data
- Update `docs/Spacing.md` scale table to include new value
- Run `pnpm run storybook` to preview documentation
- Verify token displays correctly with copy-to-clipboard functionality

## Commands

### Developer Preview (Fast, Internal)
- **Utility Dev:** `pnpm run utility:dev` (Tailwind scans playground/utility/*.html)
- **Dev Server:** `pnpm run dev` (preview playground files in browser)

### Documentation Preview
- **Storybook:** `pnpm storybook` (component explorer and documentation)

### Testing & Production
- **Test:** `pnpm test` (runs unit tests)
- **Build:** `pnpm build` (outputs to `lib/`)

## Related Skills

- **tailwind-mapping** - For detailed Tailwind v4 CSS variable conversion rules and playground documentation
