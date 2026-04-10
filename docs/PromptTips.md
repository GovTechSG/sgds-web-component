# Prompt Tips for Agent Skills

This guide helps you craft effective prompts for AI coding agents using the SGDS agent skills. Use these tips to get the best results, whether you are starting a new project or migrating an existing app to SGDS V3.

---

## For New Applications

When starting a new frontend application, prompt your coding agent with instructions like:

> "Set up a new frontend app using <your choice of tech stack>. Run `npm install @govtechsg/sgds-web-component` and install the skills with `npx skills add govtechsg/sgds-web-component`. Use SGDS as the sole design system for the application."

- Specify your preferred framework (React, Vue, Angular, etc.) if you have one.
- The agent will scaffold the app, install SGDS, and ensure all UI uses SGDS components and utilities.

---

## For Existing Applications (Migrating to SGDS V3)

When migrating an existing app, prompt your agent with:

> "I want to migrate my app to SGDS V3 incrementally."

Key tips for migration prompts:

- **Always use plan mode first**: Ask the agent to analyze your codebase and generate a migration plan before making changes.
- **1-to-1 component swap**: Instruct the agent to replace old UI components with their SGDS equivalents, one at a time.
- **Foundation swap**: Ask the agent to replace your old design system's foundational styles (typography, spacing, colors) with SGDS V3 foundations.
- **Suggest utility replacements**: Request the agent to recommend the appropriate SGDS semantic CSS utility tokens to replace existing styles (inline styles, CSS classes, or old utility classes).

Example prompt:

> "Plan an incremental migration to SGDS V3. For each page, suggest 1-to-1 swaps for components, replace old foundation styles with SGDS V3, and recommend SGDS utility tokens for any custom or legacy styles."

---

## Final Review

Before wrapping up, start a **fresh agent session** and ask it to review the implementation against the SGDS skills:

> "Review the code in `<path>` against the SGDS skills. Plan out any incorrect implementations you find and provide the correct fixes."

Use a fresh agent — not the one that wrote the code. An agent that made a mistake (e.g. wrong icon name, missing slot wrapper, incorrect attribute) will likely review its own work and confirm it was correct, because it made that decision confidently the first time. A fresh agent has no anchoring bias and will catch issues the original agent missed.

Things a review agent commonly catches:
- Wrong icon names that silently render nothing
- `href` placed on a custom element instead of the slotted `<a>` tag
- Missing required attributes (e.g. `ariaLabel` on icon buttons)
- `active` manually set on breadcrumb items (auto-managed by the parent)
- Icons inside badges without `size="sm"`
- Tables placed in partial-width grid columns instead of full-width

---

For more details, see the [Agent Skills documentation](?path=/docs/agent-skills-introduction--docs).
