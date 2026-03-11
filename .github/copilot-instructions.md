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

#### Getting Started
- [getting-started](../src/skills/sgds-getting-started/SKILL.md) - Entry point for any new SGDS application: Inter font, foundation CSS imports, component registration, and app layout setup. Apply this first before any other SGDS skill.

#### Utilities Skills (`utilities-*`) — Foundational styles via the `sgds:` Tailwind prefix
- [utilities-overview](../src/skills/sgds-utilities-overview/SKILL.md) - Overview of all SGDS foundational style utilities and the Utilities API
- [utilities-setup](../src/skills/sgds-utilities-setup/SKILL.md) - Setup and prerequisites for using SGDS utilities
- [utilities-spacing](../src/skills/sgds-utilities-spacing/SKILL.md) - Margin, padding, gap utilities with 4px scale system
- [utilities-color-semantics](../src/skills/sgds-utilities-color-semantics/SKILL.md) - Shared definitions for color token suffix modifiers (default, emphasis, muted, fixed-light, fixed-dark, inverse, surface, etc.) reused across all color skills
- [utilities-background-color](../src/skills/sgds-utilities-background-color/SKILL.md) - Theme-aware background color utilities with semantic tokens
- [utilities-text-color](../src/skills/sgds-utilities-text-color/SKILL.md) - Text color utilities that adapt to themes
- [utilities-border-color](../src/skills/sgds-utilities-border-color/SKILL.md) - Border color utilities (semantic, theme-aware)
- [utilities-border-width](../src/skills/sgds-utilities-border-width/SKILL.md) - Border thickness and side selection
- [utilities-border-radius](../src/skills/sgds-utilities-border-radius/SKILL.md) - Rounded corner utilities
- [utilities-typography](../src/skills/sgds-utilities-typography/SKILL.md) - Typography utilities (font size, weight, line height, etc.)
- [utilities-opacity](../src/skills/sgds-utilities-opacity/SKILL.md) - Opacity utilities

#### Component Skills (`components-*`) — How to use SGDS web components
- [components-setup](../src/skills/sgds-components-setup/SKILL.md) - Installation and framework integration (React 19+ vs React ≤18, Vue config, Angular schema)
- [components-accordion](../src/skills/sgds-components-accordion/SKILL.md) - `<sgds-accordion>` and `<sgds-accordion-item>` collapsible sections, allowMultiple, border variant
- [components-alert](../src/skills/sgds-components-alert/SKILL.md) - `<sgds-alert>` and `<sgds-alert-link>` contextual feedback banners, variants, dismissible
- [components-badge](../src/skills/sgds-components-badge/SKILL.md) - `<sgds-badge>` labels, status chips, dismissible badges, variants, auto-truncation
- [components-breadcrumb](../src/skills/sgds-components-breadcrumb/SKILL.md) - `<sgds-breadcrumb>` and `<sgds-breadcrumb-item>` navigation trail, active item, overflow
- [components-button](../src/skills/sgds-components-button/SKILL.md) - `<sgds-button>` usage (variants, tones, form submission, icons, loading, link button, React)
- [components-card](../src/skills/sgds-components-card/SKILL.md) - `<sgds-card>` general content cards with image, icon, title, footer; orientation, stretchedLink
- [components-checkbox](../src/skills/sgds-components-checkbox/SKILL.md) - `<sgds-checkbox>` and `<sgds-checkbox-group>` single and grouped checkboxes, indeterminate state, validation
- [components-close-button](../src/skills/sgds-components-close-button/SKILL.md) - `<sgds-close-button>` dismiss button for custom dismissible UI
- [components-combo-box](../src/skills/sgds-components-combo-box/SKILL.md) - `<sgds-combo-box>` searchable filterable dropdown, multi-select, async filtering, sgds-select event
- [components-datepicker](../src/skills/sgds-components-datepicker/SKILL.md) - `<sgds-datepicker>` calendar date picker for single date or date range selection, sgds-change-date event
- [components-description-list](../src/skills/sgds-components-description-list/SKILL.md) - `<sgds-description-list-group>` and `<sgds-description-list-item>` key-value pairs, stacked, bordered
- [components-divider](../src/skills/sgds-components-divider/SKILL.md) - `<sgds-divider>` horizontal and vertical separators, thickness
- [components-drawer](../src/skills/sgds-components-drawer/SKILL.md) - `<sgds-drawer>` slide-in panel, placement, size, sgds-request-close cancelable event
- [components-dropdown](../src/skills/sgds-components-dropdown/SKILL.md) - `<sgds-dropdown>` and `<sgds-dropdown-item>` toggleable menu, drop direction, sgds-select event
- [components-file-upload](../src/skills/sgds-components-file-upload/SKILL.md) - `<sgds-file-upload>` file selection button with file list, accept filter, multiple files, sgds-files-selected event
- [components-footer](../src/skills/sgds-components-footer/SKILL.md) - `<sgds-footer>` and `<sgds-footer-item>` Singapore Government site footer with mandatory legal links and column layout
- [components-icon](../src/skills/sgds-components-icon/SKILL.md) - `<sgds-icon>` rendering icons from the SGDS registry by name and size
- [components-icon-button](../src/skills/sgds-components-icon-button/SKILL.md) - `<sgds-icon-button>` icon-only buttons, variants, tones, sizes, link mode
- [components-icon-card](../src/skills/sgds-components-icon-card/SKILL.md) - `<sgds-icon-card>` icon-led cards, orientation, noPadding, stretchedLink
- [components-icon-list](../src/skills/sgds-components-icon-list/SKILL.md) - `<sgds-icon-list>` icon-text list items, sizes, manual icon sizing
- [components-image-card](../src/skills/sgds-components-image-card/SKILL.md) - `<sgds-image-card>` photo-led cards with image-badge and image-action overlay slots
- [components-input](../src/skills/sgds-components-input/SKILL.md) - `<sgds-input>` text input with label, prefix/suffix, validation, loading state, and action slot
- [components-link](../src/skills/sgds-components-link/SKILL.md) - `<sgds-link>` navigation links, tones, sizes, disabled state, icon placement
- [components-mainnav](../src/skills/sgds-components-mainnav/SKILL.md) - `<sgds-mainnav>`, `<sgds-mainnav-item>`, `<sgds-mainnav-dropdown>` responsive horizontal navigation bar with hamburger collapse
- [components-masthead](../src/skills/sgds-components-masthead/SKILL.md) - `<sgds-masthead>` mandatory Singapore Government banner, fluid layout, placement rules
- [components-modal](../src/skills/sgds-components-modal/SKILL.md) - `<sgds-modal>` dialog overlay, sizes, sgds-close cancelable event, show/hide methods
- [components-overflow-menu](../src/skills/sgds-components-overflow-menu/SKILL.md) - `<sgds-overflow-menu>` three-dot icon menu, sgds-select event
- [components-pagination](../src/skills/sgds-components-pagination/SKILL.md) - `<sgds-pagination>` paged navigation control, variants, sgds-page-change event
- [components-progress-bar](../src/skills/sgds-components-progress-bar/SKILL.md) - `<sgds-progress-bar>` horizontal progress indicator, primary/neutral variants, accessible labels
- [components-quantity-toggle](../src/skills/sgds-components-quantity-toggle/SKILL.md) - `<sgds-quantity-toggle>` number input with increment/decrement buttons, min/max/step
- [components-radio](../src/skills/sgds-components-radio/SKILL.md) - `<sgds-radio-group>` and `<sgds-radio>` mutually exclusive radio buttons with group validation
- [components-select](../src/skills/sgds-components-select/SKILL.md) - `<sgds-select>` and `<sgds-select-option>` searchable single-select dropdown, sgds-select event
- [components-sidenav](../src/skills/sgds-components-sidenav/SKILL.md) - `<sgds-sidenav>`, `<sgds-sidenav-item>`, `<sgds-sidenav-link>` vertical sidebar navigation with multi-level nesting
- [components-skeleton](../src/skills/sgds-components-skeleton/SKILL.md) - `<sgds-skeleton>` loading placeholders, shapes, rows, sheen animation
- [components-spinner](../src/skills/sgds-components-spinner/SKILL.md) - `<sgds-spinner>` loading indicators, tones, sizes, label orientation
- [components-stepper](../src/skills/sgds-components-stepper/SKILL.md) - `<sgds-stepper>` multi-step workflow with IStepMetaData, nextStep/previousStep methods, sgds-arrived event
- [components-subnav](../src/skills/sgds-components-subnav/SKILL.md) - `<sgds-subnav>` and `<sgds-subnav-item>` horizontal secondary navigation bar
- [components-switch](../src/skills/sgds-components-switch/SKILL.md) - `<sgds-switch>` toggle switch for binary on/off state, sgds-change event with checked detail
- [components-system-banner](../src/skills/sgds-components-system-banner/SKILL.md) - `<sgds-system-banner>` and `<sgds-system-banner-item>` rotating site-wide announcement banner
- [components-tab](../src/skills/sgds-components-tab/SKILL.md) - `<sgds-tab-group>`, `<sgds-tab>`, `<sgds-tab-panel>` tabbed content areas, variants, orientation, sgds-tab-show event
- [components-table](../src/skills/sgds-components-table/SKILL.md) - `<sgds-table>` structured data table from arrays, headerPosition, responsive, borders
- [components-table-of-contents](../src/skills/sgds-components-table-of-contents/SKILL.md) - `<sgds-table-of-contents>` in-page anchor link navigation list
- [components-textarea](../src/skills/sgds-components-textarea/SKILL.md) - `<sgds-textarea>` multi-line text input with character count, resize control, and validation
- [components-thumbnail-card](../src/skills/sgds-components-thumbnail-card/SKILL.md) - `<sgds-thumbnail-card>` compact cards with small thumbnail image, orientation, stretchedLink
- [components-toast](../src/skills/sgds-components-toast/SKILL.md) - `<sgds-toast>` and `<sgds-toast-container>` notifications, variants, autohide, position
- [components-tooltip](../src/skills/sgds-components-tooltip/SKILL.md) - `<sgds-tooltip>` hover/focus/click text callouts, placement, trigger modes

#### Pattern Skills (`pattern-*`) — Cross-cutting implementation patterns
- [pattern-form-validation](../src/skills/sgds-pattern-form-validation/SKILL.md) - Form validation using ElementInternals API, hasFeedback, constraint validation per component, FormData, custom validation with noValidate and setInvalid (Input/Textarea only)
- [pattern-layout](../src/skills/sgds-pattern-layout/SKILL.md) - App layout templates: simple app (sgds-container, public-facing) and sidebar app (sgds-container-sidebar, dashboards/internal tools)
- [sgds-data-visualisation](../src/skills/sgds-data-visualisation/SKILL.md) - Data visualisation with ECharts and the SGDS colour palette; charts, graphs, dashboards

#### Theming Skills — Visual customisation
- [sgds-theming](../src/skills/sgds-theming/SKILL.md) - Product brand colour overrides, day/night mode setup, and font customisation via CSS token overrides

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
