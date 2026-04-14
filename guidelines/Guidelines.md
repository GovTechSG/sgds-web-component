    # SGDS Design System Guidelines

    This is the entry point for Figma Make. Read this file first to understand the design system and where to look for specific rules.

    ---

    ## What is SGDS?

    The **Singapore Design System (SGDS)** is the official design system for Singapore Government digital products. It provides:

    - `<sgds-*>` web components — pre-built, accessible UI components
    - `sgds:` utility classes — Tailwind v4 utility classes scoped to SGDS design tokens
    - Foundation CSS — typography, grid, spacing, and color token layers

    All components and utilities are from the `@govtechsg/sgds-web-component` package.

    ---

    ## Framework Context

    **This codebase uses React 19 with native web component support.**

    - Use `<sgds-button>` tag syntax directly in JSX — not `<SgdsButton>` wrappers
    - Import once at entry point: `import "@govtechsg/sgds-web-component";`
    - Custom events in React 19 JSX: prefix with `on` lowercase — `sgds-blur` → `onsgds-blur`

    ---

    ## Component-First Rule

    **Before reaching for a plain `<div>` or `<button>`, check if an SGDS component covers the need.**

    If an `<sgds-*>` component exists for a UI element, use it. Only fall back to custom markup with `sgds:` utilities when no SGDS component fits.

    ---

    ## Never Use Inline Styles

    Never write `style="..."` attributes. All layout, spacing, color, and typography must use `sgds:` utility classes.

    ---

    ## Reading Order

    | What you need | Read |
    |---|---|
    | Project setup (fonts, CSS imports) | [setup.md](setup.md) |
    | Theming (brand colors, dark mode) | [theming.md](theming.md) |
    | Layout grid, containers, columns | [foundations/grid.md](foundations/grid.md) |
    | Spacing tokens (padding, gap, margin) | [foundations/spacing.md](foundations/spacing.md) |
    | Typography (headings, body, labels) | [foundations/typography.md](foundations/typography.md) |
    | Color token semantics | [foundations/color-semantics.md](foundations/color-semantics.md) |
    | Shadows and elevation | [foundations/elevation.md](foundations/elevation.md) |
    | Buttons, links, dropdowns | [components/actions.md](components/actions.md) |
    | Mainnav, masthead, breadcrumb, tabs | [components/navigation.md](components/navigation.md) |
    | Accordion, drawer, modal | [components/layout.md](components/layout.md) |
    | Input, select, checkbox, radio, datepicker | [components/forms.md](components/forms.md) |
    | Alert, toast, spinner, badge | [components/feedback.md](components/feedback.md) |
    | Card, table, icon, description list | [components/content.md](components/content.md) |
    | Mandatory page chrome (masthead + nav + footer) | [patterns/app-shell.md](patterns/app-shell.md) |
    | Full-page layouts (dashboard, login, form, list) | [patterns/page-templates.md](patterns/page-templates.md) |
    | Reusable UI blocks (filter, table, page header) | [patterns/blocks.md](patterns/blocks.md) |
    | Form validation (hasFeedback, setInvalid) | [patterns/form-validation.md](patterns/form-validation.md) |
    | Charts and data visualisation | [data-visualisation.md](data-visualisation.md) |

    ---

    ## Quick Rules Summary

    1. Every page must include `<sgds-masthead>`, `<sgds-mainnav>`, and `<sgds-footer>` — see [patterns/app-shell.md](patterns/app-shell.md)
    2. All spacing, color, and typography must use `sgds:` utility classes — never raw pixel values
    3. Prefer semantic spacing (`sgds:gap-layout-md`) over raw numbers (`sgds:gap-4`)
    4. Prefer semantic typography (`sgds:text-heading-md`) over raw sizes (`sgds:text-lg`)
    5. Color tokens use suffixes: `default`, `emphasis`, `muted`, `surface` — see [foundations/color-semantics.md](foundations/color-semantics.md)
    6. Never set explicit widths on `<sgds-*>` components — control width via the parent layout
    7. Always use `.sgds-container` or `.sgds-container-sidebar` for page content width — never `sgds:max-w-*`
