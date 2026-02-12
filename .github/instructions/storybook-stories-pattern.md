---
description: 'Guidelines for writing Storybook stories in the templates folder'
applyTo: 'stories/templates/**'
---

# Storybook Story Writing Pattern

## Overview

This document defines the standardized pattern for organizing and writing Storybook stories in the `stories/templates/` directory.

## File Structure Pattern

Each component in `stories/templates/` follows this structure:

```
stories/templates/[ComponentName]/
├── basic.js              # Base template, args, and parameters
├── additional.stories.js # Additional story variants
└── additional.mdx        # Documentation for additional stories
```

### File Concatenation Behavior

**Important:** Storybook automatically concatenates `basic.js` with `additional.stories.js` when loading stories. This means:

- Exports from `basic.js` (like `Template`, `args`, `parameters`) are **automatically available** in `additional.stories.js`
- **Do NOT import** from `basic.js` in `additional.stories.js`
- The concatenation happens at build/load time

## File Responsibilities

### basic.js

Contains the primary story setup:

```javascript
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

// Main template function
export const Template = args => html`
  <sgds-component 
    ?prop=${args.prop} 
    attribute=${ifDefined(args.attribute)}
  >
    Component content
  </sgds-component>
`;

// Default args for the template
export const args = {
  prop: true,
  attribute: "value"
};

// Story parameters
export const parameters = {};
```

**Key points:**
- Export `Template` function for reuse
- Export `args` object with default values
- Export `parameters` for story configuration
- Use `ifDefined` directive for optional attributes

### additional.stories.js

Contains additional story variations:

```javascript
import { html } from "lit";

// Template is already available from basic.js - no import needed!

// Custom template for specific story variant
const CustomTemplate = args => {
  return html`
    <sgds-component>
      Custom implementation
    </sgds-component>
  `;
};

// Story using the base Template from basic.js
export const StoryVariant1 = {
  render: Template.bind({}),
  name: "Story Variant 1",
  args: {
    prop: false,
    attribute: "custom"
  },
  parameters: {},
  tags: ["!dev"]
};

// Story using custom template
export const StoryVariant2 = {
  render: CustomTemplate.bind({}),
  name: "Story Variant 2",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
```

**Key points:**
- **No imports from basic.js** - Template, args, parameters are available via concatenation
- Can define additional custom templates for specific variants
- Use `Template.bind({})` to reuse the base template with different args
- Use `tags: ["!dev"]` to hide from development builds if needed

### additional.mdx

Documentation for additional story variants:

```mdx
## Story Variant Name

Description of what this variant demonstrates and when to use it.

**Key features:**
- Feature 1
- Feature 2

<Canvas of={ComponentStories.StoryVariant1}>
  <Story of={ComponentStories.StoryVariant1} />
</Canvas>
```

**Key points:**
- Each story should have a corresponding documentation section
- Use descriptive headings (## Story Variant Name)
- Explain the use case and key behaviors
- Include Canvas and Story components for interactive preview

## Common Patterns

### Using Base Template with Modified Args

```javascript
export const Dismissible = {
  render: Template.bind({}),
  name: "Dismissible",
  args: {
    dismissible: true,
    show: true
  },
  parameters: {},
  tags: ["!dev"]
};
```

### Custom Template for Complex Scenarios

```javascript
const ComplexTemplate = args => {
  return html`
    <sgds-component id="example" ?show=${args.show}>
      <slot-content>Complex content</slot-content>
    </sgds-component>
    
    <sgds-other-component></sgds-other-component>

    <script>
      // Event listeners or complex interactions
      const component = document.querySelector("#example");
      component.addEventListener("custom-event", () => {
        console.log("Event triggered");
      });
    </script>
  `;
};

export const ComplexScenario = {
  render: ComplexTemplate.bind({}),
  name: "Complex Scenario",
  args: {
    show: true
  },
  parameters: {},
  tags: ["!dev"]
};
```

### Multiple Variants with Custom Template

```javascript
const VariantTemplate = args => {
  const variants = [
    { variant: "primary", icon: "check" },
    { variant: "secondary", icon: "info" }
  ];
  
  return html`
    <div class="d-flex-column">
      ${variants.map(v => html`
        <sgds-component variant=${v.variant}>
          <sgds-icon slot="icon" name=${v.icon}></sgds-icon>
          Content for ${v.variant}
        </sgds-component>
      `)}
    </div>
  `;
};

export const AllVariants = {
  render: VariantTemplate.bind({}),
  name: "All Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
```

## Best Practices

### DO:
- ✅ Keep `basic.js` focused on the primary/default story
- ✅ Use `additional.stories.js` for variations and edge cases
- ✅ Reuse `Template` from basic.js when possible
- ✅ Create custom templates for complex scenarios
- ✅ Document each story variant in `additional.mdx`
- ✅ Use meaningful story names that describe the variant
- ✅ Include `tags: ["!dev"]` for stories that shouldn't show in development

### DON'T:
- ❌ Import `Template` from `basic.js` in `additional.stories.js` (it's auto-concatenated)
- ❌ Duplicate template logic across multiple custom templates
- ❌ Create stories without corresponding documentation
- ❌ Use generic names like "Story1", "Story2"
- ❌ Include complex logic in args - use custom templates instead

## Story Naming Conventions

Story names should be:
- **Descriptive**: Clearly indicate what the story demonstrates
- **Concise**: Keep it short but meaningful
- **PascalCase**: For export names (e.g., `NoClampAction`)
- **Title Case**: For display names (e.g., "No Clamp Action")

Examples:
```javascript
export const NoClampAction = {
  name: "No Clamp Action",
  // ...
};

export const DismissibleWithLongContent = {
  name: "Dismissible with Long Content",
  // ...
};

export const CustomEventHandling = {
  name: "Custom Event Handling",
  // ...
};
```

## Documentation Patterns

### Basic Documentation Structure

```mdx
## [Story Name]

Brief description of the story purpose and use case.

**Key behaviors:**
- Behavior 1
- Behavior 2
- Behavior 3

<Canvas of={ComponentStories.StoryName}>
  <Story of={ComponentStories.StoryName} />
</Canvas>
```

### Documentation with Code Example

```mdx
## [Story Name]

Description of the feature.

### Usage Example

\`\`\`javascript
const component = document.querySelector('sgds-component');
component.addEventListener('custom-event', (e) => {
  console.log('Event data:', e.detail);
});
\`\`\`

<Canvas of={ComponentStories.StoryName}>
  <Story of={ComponentStories.StoryName} />
</Canvas>
```

## Examples from Codebase

### Alert Component

```javascript
// stories/templates/Alert/additional.stories.js
import { html } from "lit";

const VariantTemplate = args => {
  const variants = [
    { variant: "Info", icon: "info-circle-fill" },
    { variant: "Success", icon: "check-circle-fill" },
    { variant: "Danger", icon: "exclamation-circle-fill" }
  ];
  return html`
    <div class="d-flex-column">
      ${variants.map(v => html`
        <sgds-alert variant=${v.variant.toLowerCase()} show title="${v.variant} alert">
          <sgds-icon slot="icon" name=${v.icon}></sgds-icon>
          <div>Description</div>
        </sgds-alert>
      `)}
    </div>
  `;
};

export const AllVariants = {
  render: VariantTemplate.bind({}),
  name: "All Variants",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
```

### SystemBanner Component

```javascript
// stories/templates/SystemBanner/additional.stories.js
import { html } from "lit";

const ShowMoreHookTemplate = args => {
  return html`
    <sgds-system-banner show id="banner-example" dismissible>
      <sgds-system-banner-item>
        Long content that will be truncated...
      </sgds-system-banner-item>
    </sgds-system-banner>
    <sgds-modal></sgds-modal>

    <script>
      const banner = document.querySelector("#banner-example");
      const modal = document.querySelector("sgds-modal");
      banner.addEventListener("sgds-show-more", () => {
        modal.show();
      });
    </script>
  `;
};

export const ShowMore = {
  render: ShowMoreHookTemplate.bind({}),
  name: "Show More",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

// Reusing Template from basic.js
export const NoClampAction = {
  render: Template.bind({}),
  name: "No Clamp Action",
  args: {
    show: true,
    noClampAction: true
  },
  parameters: {},
  tags: ["!dev"]
};
```

## Related Documentation

- [Token Mapping & Documentation Workflow](.github/instructions/token-mapping-and-documentation-workflow.md) - For documentation patterns
- [Markdown Standards](.github/instructions/dp.markdown-v1.instructions.md) - For MDX content formatting
- [Copilot Instructions](.github/copilot-instructions.md) - General project conventions
