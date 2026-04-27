---
name: component-authoring
description: End-to-end workflow for composing or extending an SGDS web component. Use this skill whenever the user says "create a new component", "build a new sgds-* element", "add a feature to an existing component", "I want to contribute a component", or asks how to structure, scaffold, test, or write a Lit component for the design system. Also apply when the user asks about TDD workflow, code conventions, or ADRs in the context of component development.
metadata:
  author: singapore-design-system
  version: "0.0.0"
  internal: true
---

# Component Authoring

A guided workflow for building or extending SGDS web components correctly.

---

## Step 1 — Clarify scope

Before writing any code, ask the author:

> **Is this a new component, or a feature/fix on an existing component?**

- **New component** → proceed to Step 2 (scaffold first)
- **Existing component** → skip scaffolding, go straight to Step 3 (TDD)

---

## Step 2 — Scaffold (new components only)

Plop generates the boilerplate source, test, and story files. Because plop is an interactive CLI, **the author must run this command themselves** in their terminal:

```bash
pnpm run write:component
```

Tell the author to run the command and follow the prompts (component name, etc.). Once plop finishes, it will have generated:

```
src/components/<ComponentName>/
  sgds-<component-name>.ts     # LitElement source
  <component-name>.css         # Component styles

test/
  <component-name>.test.ts     # Unit test file

stories/component-templates/<ComponentName>/
  basic.js                     # Base Storybook template
  additional.stories.js        # Additional story variants
  additional.mdx               # Story documentation
```

Do not hand-create these files — always use plop to stay consistent with the project structure.

---

## Step 3 — TDD: red → green

Follow a strict test-first workflow. **Never write implementation before a failing test.**

### 3a. Write a failing test (red)

Open the generated test file and write a test for the behaviour you are about to implement. The author runs the test suite and confirms it fails:

```bash
pnpm test
```

The test must be **red** before any implementation code is written.

### 3b. Testing conventions

Read `CODE_CONVENTIONS.md → ## Testing` before writing any test. Key rules:

- **Test DOM outcomes, not class internals.** Assert CSS classes, attributes, and rendered elements — never `@state()` fields prefixed with `_`.
- **Public methods and properties may be tested directly.** No `_` prefix, no `private`/`protected` modifier = public API = valid to assert.

```typescript
// Bad — internal state
expect(item._selected).to.be.true;

// Good — DOM outcome
expect(item.shadowRoot?.querySelector(".sidebar-item")).to.have.class("active");

// Good — public API
expect(group.showMenu).to.be.true;
```

### 3c. Write the implementation (green)

Write the minimum implementation to make the test pass. Re-run:

```bash
pnpm test
```

Confirm the test is now **green** before moving on to the next behaviour.

---

## Step 4 — Follow code conventions and ADRs during development

Read `CODE_CONVENTIONS.md` while writing component code. Key rules to check:

- **Naming**: all internal methods and `@state()` fields must be prefixed with `_`
- **Access modifiers**: use `private`/`protected`/`public` on all methods; `@watch`-decorated methods have no access modifier (TypeScript constraint)
- **`@property` decorators**: must have a jsdoc block above each one
- **Events**: use custom events with the `sgds-` prefix (e.g. `sgds-change`)
- **Queries**: use slot-based querying, not `querySelectorAll("sgds-*")` tag names

Also read the Architecture Decision Records in `contributing/architecture-decision-record/` before making structural decisions. These encode resolved tradeoffs for the project:

| ADR | When to read |
|-----|-------------|
| `slotchange-vs-firstupdated-for-slot-attribute-setting.md` | Whenever you need to react to slotted children |
| `ssr-prop-slot-detection.md` | If the component detects slot content to toggle behaviour |
| `force-slotchange-event-ssr.md` | SSR / hydration slot edge cases |
| `reduce-host-styling.md` | When styling the host element |
| `custom-validation.md` | Form components with validation |
| `automated-icon-conversion.md` | Adding or modifying icons |

---

## Step 5 — Preview in Playground

While developing, create a playground HTML file to get a live visual check outside of Storybook. Playground files are flat HTML files at the root of `playground/` — one per component:

```
playground/<ComponentName>.html
```

Plop does not generate this file — create it manually. Look at an existing file (e.g. `playground/Badge.html`) as a reference for the import and markup pattern. Iterate between implementation, tests, and playground until the component behaves correctly.

---

## Step 6 — Build

When development is complete, build the library to update the compiled output in `lib/`:

```bash
pnpm build
```

Confirm the build passes before proceeding.

---

## Step 7 — Storybook stories (prompt the author)

When the author signals development is complete, ask:

> **Do you want to write Storybook stories for this component?**

If yes, use the `storybook-stories` skill — it covers the `basic.js` / `additional.stories.js` / `additional.mdx` pattern and the file-concatenation behaviour that makes `Template` available without imports.
