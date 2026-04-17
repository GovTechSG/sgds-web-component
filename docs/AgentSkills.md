# Agent Skills <sgds-badge outlined variant="warning">beta</sgds-badge>

SGDS ships a set of **agent skills** — structured knowledge files that teach AI coding assistants (GitHub Copilot, Claude Code, Cursor, Windsurf, and others) how to build with SGDS correctly.

Once installed, your AI assistant can answer questions like:

- *"Build a sidebar dashboard layout using SGDS"*
- *"What spacing utility class should I use between these cards?"*
- *"How to prevent modal from closing when clicking on the background panel?"

…and produce idiomatic, design-system-correct code without hallucinating component names or guessing token values.

---

## Installation

Run the following command in your project root:

For Govtechies, use <a href="https://software-engineering.gto.tech.gov.sg/handbook/how-to/local-development/developer-cli/" target="_blank">GovTech Developer CLI</a> to install

```bash
gt apd install sgds
```

<!-- For others, 

```bash
npx skills add govtechsg/sgds-web-component
``` -->

<!-- Select all existing skills from the list. This pulls the latest skills from the `skills/` folder of this repository into your local `.agents/` directory, where compatible AI tools automatically pick them up. -->

---

## Add SGDS to Your Agent Instructions File

The most reliable way to ensure your agent always uses SGDS skills is to add it to your project's agent instructions file — so the rule is persistent across every session without needing to repeat it.

Depending on your agent or IDE, add the following to the relevant file:

| Agent / Tool | File |
|---|---|
| Claude Code | `CLAUDE.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Cursor | `.cursor/rules` |
| Other agents | `agents.md` or equivalent |

Add a line like:

```
When building any UI, always use the SGDS web component library and SGDS Tailwind utilities for styling. Consult the SGDS skills for correct component usage, slot structure, design patterns, and utility classes.
```

This means every new session automatically inherits the SGDS constraint — you never have to remind the agent to use SGDS, and it will consult the skills before reaching for non-SGDS patterns.

---

## Available Skills

| Skill | What it covers |
|---|---|
| **sgds-workflow** | Start here when unsure. Maps all SGDS skills and the order to use them — new app path and existing app navigation. |
| **sgds-getting-started** | Technical setup: Inter font, CSS import order, component registration, and app layout templates. |
| **sgds-components** | All 46 `<sgds-*>` web components — accordion through tooltip — with attributes, slots, events, and usage examples. |
| **sgds-utilities** | All `sgds:` Tailwind utility classes: grid, spacing, typography, color semantics, backgrounds, borders, opacity, and more. |
| **sgds-theming** | Brand colour overrides, day/night mode setup, and font customisation via CSS token overrides. |
| **sgds-forms** | Form validation using `ElementInternals`, `hasFeedback`, constraint validation, `FormData`, and `setInvalid`. |
| **sgds-pattern-block-templates** | Application shell (masthead, mainnav, footer) and self-contained UI blocks: filter sidebar, session detail, and more. |
| **sgds-pattern-page-templates** | Full-page layouts: dashboard, login, list page, form page, settings. |
| **sgds-data-visualisation** | Charts and data dashboards with ECharts and the SGDS colour palette. |

---

## Recommended Workflow

For a **new application**, work through skills in this order:

1. **sgds-getting-started** — complete project setup before writing any component code
2. **sgds-components** + **sgds-utilities** — your day-to-day references while building
3. **sgds-pattern-page-templates** + **sgds-pattern-block-templates** — when assembling full pages
4. **sgds-forms** — when any `<form>` element is involved
5. **sgds-data-visualisation** — only when charts or dashboards are needed

For an **existing application** with sgds v3 setup done, skip setup skills and go directly to the relevant skill using the table above.

If unsure where to start, ask your AI assistant to read the **sgds-workflow** skill first.

---

## How It Works

Skills are plain Markdown files structured for AI consumption. Each skill contains:

- A **Quick Decision Guide** — decision trees for choosing the right token or component variant
- An **API Summary** — compact attribute/property tables
- **Usage examples** — idiomatic HTML the AI can produce and adapt
- **For AI Agents** section — explicit rules and common mistakes to avoid

Skills are read by the agent at query time — they do not add runtime dependencies to your project.

---

## Keeping Skills Up to Date

Run the following command to pull the latest skill updates:

For Govtechies, 

```bash
gt apd install sgds
```
<!-- 
```bash

npx skills add govtechsg/sgds-web-component

``` -->

Skills follow the latest library version. After upgrading `@govtechsg/sgds-web-component`, update skills to ensure the AI agent's knowledge matches the installed version.
