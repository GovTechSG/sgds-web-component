---
name: storybook-stories
description: Writes Storybook stories following the templates folder pattern with automatic file concatenation. Use when creating or updating component stories in stories/component-templates/, organizing story variants, or documenting component usage in Storybook.
metadata:
  author: singapore-design-system
  version: "0.0.0"
  internal: true
---

# Storybook Stories

## Writing style

All prose in `additional.mdx` files and story display names MUST follow the [sgds-writing skill](../../../skills/sgds-writing/SKILL.md). Before writing or editing any `.mdx` documentation, read the sgds-writing skill and apply its rules:

- **Sentence case** for all headings (capitalise first word and proper nouns only)
- **UK English** spelling (colour, behaviour, organisation, customise)
- **No contractions** (use "do not" instead of "don't")
- **No em dashes** (use colons, commas, or separate sentences)
- **No "please"** in instructions (use direct imperatives)
- **No subjective adjectives** (do not say "simple", "easy", "important")
- **Active voice** preferred
- **Oxford comma** in lists of three or more

## File structure

```
stories/component-templates/[ComponentName]/
├── basic.js               Base template, args, and parameters
├── additional.stories.js  Additional story variants
└── additional.mdx         Documentation for additional stories
```

### File concatenation

`basic.js` is automatically concatenated with `additional.stories.js` at load time. Do NOT import from `basic.js` in `additional.stories.js`. `Template`, `args`, and `parameters` are already in scope.

## basic.js Pattern

```javascript
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => html`
  <sgds-component ?prop=${args.prop} attribute=${ifDefined(args.attribute)}></sgds-component>
`;

export const args = { prop: true, attribute: "value" };
export const parameters = {};
```

## additional.stories.js Pattern

```javascript
import { html } from "lit";

// Template is in scope via concatenation — no import needed

export const Dismissible = {
  render: Template.bind({}),
  name: "Dismissible",
  args: { dismissible: true, show: true },
  parameters: {},
  tags: ["!dev"]
};
```

For complex stories, define a local template inline:

```javascript
const ShowMoreTemplate = args => html`
  <sgds-system-banner show id="banner" dismissible>
    <sgds-system-banner-item>Long content...</sgds-system-banner-item>
  </sgds-system-banner>
  <script>
    document.querySelector("#banner").addEventListener("sgds-show-more", () => modal.show());
  </script>
`;

export const ShowMore = {
  render: ShowMoreTemplate.bind({}),
  name: "Show More",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
```

See [reference/examples.md](reference/examples.md) for full real-world component examples.

## DRY rules

The folder name is the namespace. Strip it from filenames and export names.

### File naming

```
stories/utilities/border/
  ✅ color.stories.js       ❌ border-color.stories.js
  ✅ radius.stories.js      ❌ border-radius.stories.js

stories/utilities/spacing/gap/
  ✅ static.stories.js      ❌ gap-static.stories.js
  ✅ form.stories.js        ❌ form-gap.stories.js

stories/utilities/spacing/padding/
  ✅ static.stories.js      ❌ padding.stories.js
  ✅ layout.stories.js      ❌ layout-padding.stories.js
```

### Storybook title

```javascript
// ✅ Folder path already provides context
export default { title: "Utilities/Border/Color" };
export default { title: "Utilities/Spacing/Gap/Form" };

// ❌ Repeats the category
export default { title: "Utilities/Border/Border Color" };
export default { title: "Utilities/Spacing/Gap/Form Gap" };
```

### Export names

```javascript
// In stories/utilities/border/color.stories.js
// title path already contains "Border"
export const Grayscales = ...   // ✅ not BorderGrayscales
export const Primary = ...      // ✅ not PrimaryBorder
```

## Story naming conventions

- **Export name:** PascalCase (`NoClampAction`)
- **Display name:** Sentence case (`"No clamp action"`)
- Be descriptive, not generic. Avoid `Story1`, `Story2`

## Commands

| Command | Purpose |
|---------|---------|
| `pnpm storybook` | Preview stories |
| `pnpm run build:storybook` | Production build |
