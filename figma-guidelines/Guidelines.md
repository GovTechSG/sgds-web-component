# SGDS (Singapore Design System) Web Component Library

This project uses the **SGDS Web Component Library** (`@govtechsg/sgds-web-component`) — a collection of custom elements (`<sgds-*>`) used to build Singapore Government digital services.

Always prefer SGDS components when they exist. Do not use plain HTML equivalents when an `<sgds-*>` component is available.

## How to Use These Guidelines

Always read:
- `overview-setup.md` — installation, CSS imports, and framework integration (React, Vue, Angular, Next.js)
- `overview-components.md` — full list of available components and when to use each
- `overview-utilities.md` — utility class system (`sgds:` prefix, Tailwind v4)

Read files in `design-tokens/` when styling with spacing, colors, typography, borders, or opacity.

Read files in `components/` when using a specific component — for example, if you need a Button, read `components/button.md` **before writing any code**.

Read files in `patterns/` for cross-cutting concerns:
- `patterns/layout.md` — app layout templates (simple app vs sidebar app)
- `patterns/form-validation.md` — constraint validation, `hasFeedback`, `setInvalid`
- `patterns/theming.md` — brand color overrides, day/night mode
- `patterns/data-visualisation.md` — ECharts with the SGDS color palette

---

## IMPORTANT: Steps to Follow Before Writing Any Code

**Step 1: Read `overview-setup.md` (REQUIRED)**
Understand how to install and import SGDS correctly for your framework.

**Step 2: Read `overview-utilities.md` (REQUIRED)**
Understand the `sgds:` utility class system before applying any styles.

**Step 3: Read `design-tokens/` files relevant to what you are building (REQUIRED)**
- Spacing? → `design-tokens/spacing.md`
- Colors? → `design-tokens/colors.md`
- Typography? → `design-tokens/typography.md`
- Borders? → `design-tokens/border.md`
- Opacity? → `design-tokens/opacity.md`

**Step 4: Identify which components you need (REQUIRED)**
Read `overview-components.md` to identify the right component for each UI element.

**Step 5: Read the guidelines file for each component before using it (REQUIRED)**
Example: Using `<sgds-button>`? → Read `components/button.md` FIRST.

**Step 6: Apply the layout pattern (REQUIRED for full-page apps)**
Read `patterns/layout.md` to structure the app with `<sgds-masthead>`, `<sgds-mainnav>`, and the correct container class.

---

## Package Name

```
@govtechsg/sgds-web-component
```

Components are registered as global custom elements after a single import:

```js
import "@govtechsg/sgds-web-component";
```

DO NOT use regular HTML buttons, inputs, selects or other elements when an `<sgds-*>` equivalent exists.
