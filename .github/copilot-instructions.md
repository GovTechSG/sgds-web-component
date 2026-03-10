---
description: 'AI agent guide for contributing to and navigating the sgds-web-component monorepo.'
---

# Copilot Instructions for sgds-web-component

## Architecture Overview
- **Monorepo** for Singapore Design System web components and related tooling.
- **Core library**: `src/` (source for all web components, built with LitElement, TypeScript, and Sass)
- **Skills**: `src/skills/` (AI agent skills for teaching developers how to use SGDS — split into `utilities-*` foundation style skills and `components-*` component usage skills)
- **Distribution**: `lib/` (compiled JS, CSS, and type declarations)
- **Docs**: `docs/` (Markdown documentation for usage, migration, and framework integration)
- **Playground**: `playground/` (HTML demos for each component)
- **Tests**: `test/` (unit tests, mostly using web-test-runner and @open-wc/testing)
- **Cypress**: `cypress/` (E2E tests and app integration examples)
- **Contributing**: `contributing/` (architecture decisions, contribution guides)

## Key Developer Workflows
- **Build**: `pnpm build` (outputs to `lib/`)
- **Test**: `pnpm test` (runs unit tests)
- **E2E**: `pnpm cypress` (runs Cypress tests)
- **Storybook**: `pnpm storybook` (component explorer)
- **Docs**: Edit Markdown in `docs/` and run `pnpm docs:dev` if available

## Project Conventions
- **Component naming**: All custom elements use the `sgds-` prefix (e.g., `<sgds-button>`)
- **React exports**: React wrappers in `lib/react/` and `src/react/`
- **Scoped custom elements**: Uses OpenWC's `ScopedElementsMixin` for library composability
- **Styling**: CSS custom properties and parts are documented per component; see `docs/FoundationalStyles.md`
- **Events**: Prefer custom events (e.g., `sgds-change`) over native DOM events
- **Testing**: Use `@open-wc/testing` for unit tests; see `test/`

## Integration Points
- **Frameworks**: See `docs/Angular.md`, `docs/React.md`, `docs/Vue.md` for usage in Angular, React, and Vue
- **CDN**: Components can be loaded via CDN (see `README.md`)
- **Polyfills**: For legacy support, import `@webcomponents/scoped-custom-element-registry` before the library

## Example: Creating a New Component
1. Scaffold with `plop` (`pnpm plop`)
2. Implement in `src/components/<ComponentName>/`
3. Add stories in `stories/`
4. Add tests in `test/`
5. Document in `docs/`

## Storybook Story Conventions
- **Basic stories**: Written in `stories/templates/<ComponentName>/basic.js`
  - Exports a `Template` function that can be reused
  - Exports `args` and `parameters` for the default story
- **Additional stories**: Written in `stories/templates/<ComponentName>/additional.stories.js` and `additional.mdx`
  - **Important**: Files are concatenated by gulp, so `Template` from `basic.js` is available without importing
  - For simple prop variations, reuse `Template.bind({})` with different args instead of creating new templates
  - Example:
    ```javascript
    // In additional.stories.js - no imports needed
    export const Fluid = {
      render: Template.bind({}),
      name: "Fluid",
      args: { fluid: true },
      parameters: { layout: "fullscreen" },
      tags: []
    };
    ```
  - Write documentation in `additional.mdx` and reference stories with `<Canvas of={ComponentStories.StoryName}>`
- **Build process**: `scripts/generateStories.mjs` concatenates templates into `stories/components/`

## References
- [README.md](../README.md): Installation, usage, and framework integration
- [docs/](../docs/): In-depth guides and API docs
- [contributing/](../contributing/): Architecture decisions and contribution process

## Skills
Specialized knowledge for specific development tasks:

### Internal Skills (Maintainer tools in .github/skills/)
- [storybook-stories](.github/skills/storybook-stories/SKILL.md) - Storybook story writing patterns for templates folder
- [agent-skills-writing](.github/skills/agent-skills-writing/SKILL.md) - Standards and patterns for authoring new agent skills
- [token-workflow](.github/skills/token-workflow/SKILL.md) - Design token architecture and documentation workflows
- [tailwind-mapping](.github/skills/tailwind-mapping/SKILL.md) - Tailwind v4 CSS variable mappings and utility class generation

### User-Facing Skills (Usage guidance in src/skills/)

These skills cover two domains. Each domain uses a folder naming prefix so agents and users can identify them at a glance:

#### Utilities Skills (`utilities-*`) — Foundational styles via the `sgds:` Tailwind prefix
- [utilities-overview](../src/skills/utilities-overview/SKILL.md) - Overview of all SGDS foundational style utilities and the Utilities API
- [utilities-setup](../src/skills/utilities-setup/SKILL.md) - Setup and prerequisites for using SGDS utilities
- [utilities-spacing](../src/skills/utilities-spacing/SKILL.md) - Margin, padding, gap utilities with 4px scale system
- [utilities-color-semantics](../src/skills/utilities-color-semantics/SKILL.md) - Shared definitions for color token suffix modifiers (default, emphasis, muted, fixed-light, fixed-dark, inverse, surface, etc.) reused across all color skills
- [utilities-background-color](../src/skills/utilities-background-color/SKILL.md) - Theme-aware background color utilities with semantic tokens
- [utilities-text-color](../src/skills/utilities-text-color/SKILL.md) - Text color utilities that adapt to themes
- [utilities-border-color](../src/skills/utilities-border-color/SKILL.md) - Border color utilities (semantic, theme-aware)
- [utilities-border-width](../src/skills/utilities-border-width/SKILL.md) - Border thickness and side selection
- [utilities-border-radius](../src/skills/utilities-border-radius/SKILL.md) - Rounded corner utilities
- [utilities-typography](../src/skills/utilities-typography/SKILL.md) - Typography utilities (font size, weight, line height, etc.)
- [utilities-opacity](../src/skills/utilities-opacity/SKILL.md) - Opacity utilities

#### Component Skills (`components-*`) — How to use SGDS web components
- [components-setup](../src/skills/components-setup/SKILL.md) - Installation and framework integration (React 19+ vs React ≤18, Vue config, Angular schema)
- [components-button](../src/skills/components-button/SKILL.md) - `<sgds-button>` usage (variants, tones, form submission, icons, loading, link button, React)

## Instruction Files
Detailed guidelines for specific aspects of development:
- [dp.markdown-v1.instructions.md](.github/instructions/dp.markdown-v1.instructions.md) - Markdown documentation standards
- [dp.self-explanatory-code-commenting-v1.instructions.md](.github/instructions/dp.self-explanatory-code-commenting-v1.instructions.md) - Code commenting guidelines

---
For AI agents: Follow project conventions, prefer custom events, and reference docs for framework-specific integration. Use plop templates for new components. See `lib/` for build outputs.
