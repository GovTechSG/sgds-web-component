---
description: 'AI agent guide for contributing to and navigating the sgds-web-component monorepo.'
---

# Copilot Instructions for sgds-web-component

## Architecture Overview
- **Monorepo** for Singapore Design System web components and related tooling.
- **Core library**: `src/` (source for all web components, built with LitElement, TypeScript, and Sass)
- **Skills**: `skills/` (AI agent skills for teaching developers how to use SGDS — split into `utilities-*` foundation style skills and `components-*` component usage skills)
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
- **Skill eval workspaces**: Place all skill evaluation workspaces under `test/skills/<skill-name>-workspace/` (e.g. `test/skills/sgds-pattern-block-templates-workspace/`). Never place them beside the skill folder in `skills/`.

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

### User-Facing Skills (Usage guidance in skills/)

These skills cover two domains. Each domain uses a folder naming prefix so agents and users can identify them at a glance:

#### Workflow
- [sgds-workflow](../skills/sgds-workflow/SKILL.md) - **Start here when unsure.** Maps all SGDS skills and the order to use them — new app path (setup → components/utilities → theming → patterns → data-viz) and existing app navigation. Read before any other skill when the user's intent is unclear.

#### Getting Started
- [getting-started](../skills/sgds-getting-started/SKILL.md) - Technical setup for a new SGDS application: Inter font, foundation CSS imports, component registration, and app layout. Read after sgds-workflow confirms this is a new app.

#### Utilities Skills — Foundational styles via the `sgds:` Tailwind prefix
- [sgds-utilities](../skills/sgds-utilities/SKILL.md) — All SGDS utility classes (grid, spacing, dimension, color-semantics, background-color, text-color, border-color, border-width, border-radius, typography, opacity) plus Tailwind v4 setup, theme switching, and framework integration. Each utility category has a dedicated reference file in `skills/sgds-utilities/reference/`.

#### Component Skills — How to use SGDS web components
- [sgds-components](../skills/sgds-components/SKILL.md) — All 46 `<sgds-*>` components (accordion through tooltip) plus installation and framework integration for React, Vue, Angular, and Next.js. Each component has a dedicated reference file in `skills/sgds-components/reference/`.

#### Pattern Skills (`pattern-*`) — Cross-cutting implementation patterns
- [sgds-forms](../skills/sgds-forms/SKILL.md) - Form validation using ElementInternals API, hasFeedback, constraint validation per component, FormData, custom validation with noValidate and setInvalid (Input/Textarea only)
- [Application Shell](../skills/sgds-pattern-block-templates/reference/application-shell.md) - Mandatory page chrome (masthead, mainnav, footer) and layout templates: simple app (sgds-container, public-facing) and sidebar app (sgds-container-sidebar, dashboards/internal tools)
- [sgds-data-visualisation](../skills/sgds-data-visualisation/SKILL.md) - Data visualisation with ECharts and the SGDS colour palette; charts, graphs, dashboards

#### Theming Skills — Visual customisation
- [sgds-theming](../skills/sgds-theming/SKILL.md) - Product brand colour overrides, day/night mode setup, and font customisation via CSS token overrides

## Instruction Files
Detailed guidelines for specific aspects of development:
- [dp.markdown-v1.instructions.md](.github/instructions/dp.markdown-v1.instructions.md) - Markdown documentation standards
- [dp.self-explanatory-code-commenting-v1.instructions.md](.github/instructions/dp.self-explanatory-code-commenting-v1.instructions.md) - Code commenting guidelines

---
For AI agents: Follow project conventions, prefer custom events, and reference docs for framework-specific integration. Use plop templates for new components. See `lib/` for build outputs.

**Token rule:** Whenever new `--sgds-*` design tokens are added, ALL THREE of the following must be completed — never do a partial implementation:
1. Add the Tailwind mapping to `src/css/utility.css`
2. Create a playground HTML demo in `playground/utility/`
3. Create a Storybook story in `stories/utilities/`
