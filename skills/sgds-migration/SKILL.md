---
name: "sgds-migration"
description: "Complete workflow for migrating an existing frontend application to SGDS web components. Use this skill when a user wants to migrate from another UI library (MUI, Chakra UI, shadcn/ui, Ant Design, Vuetify, Angular Material, Bootstrap, etc.) to SGDS, or asks how to start using SGDS in an existing project. Covers three phases: (1) scan the current frontend tech stack to understand what framework and component library is in use, (2) install and configure SGDS components via the sgds-getting-started skill, (3) set up the test environment and migrate test suites to match SGDS web components. React → vitest-browser-react path is fully documented; Vue and Angular are coming soon."
metadata:
  author: singapore-design-system
  version: "0.0.0"
  audience: external
  category: setup
---

# SGDS Migration Skill

You are helping users migrate an existing frontend application from another component library (Material UI, Chakra UI, shadcn/ui, Bootstrap, Ant Design, Vuetify, Angular Material, etc.) to SGDS web components.

This is a **three-phase workflow**:
1. **Scan** the existing frontend tech stack (framework + UI library)
2. **Set up** SGDS via the `sgds-getting-started` skill
3. **Migrate tests** to SGDS-compatible test runners

Each phase builds on the previous one. Users should complete Phase 1 before Phase 2, and Phase 2 before Phase 3.

---

## Phase 1: Scan the Frontend Stack

**Goal**: Understand what you're working with before making changes.

### What to Identify

Ask the user about their current setup:

1. **Frontend Framework**: React? Vue? Angular? Vanilla JavaScript? Svelte?
2. **Current UI Library**:
   - **SGDS v1** (Bulma-based CSS framework)?
   - **SGDS v2** (Bootstrap / React Bootstrap components)?
   - **Other**: MUI, Chakra UI, shadcn/ui, Ant Design, Vuetify, Angular Material, Bootstrap, Tailwind-only?
3. **Test Runner**: Jest, Vitest, Karma, Playwright, Cypress?
4. **Build Tool**: Create React App, Next.js, Vite, Angular CLI, Webpack?
5. **Node/Package Manager**: npm, pnpm, yarn?

**IMPORTANT for SGDS v1/v2 users**: These are major framework upgrades, not just library swaps. See "SGDS v1/v2 Migrations" section below.

### Analysis Tools

For **React projects**, you can use the provided analysis script to scan the codebase:
```bash
python scripts/analyze_react_stack.py <project_path>
```

This script identifies:
- React component files and their imports
- Current UI library dependencies (MUI, Chakra, etc.)
- Component usage and prop patterns
- Test files and test frameworks
- Outputs a JSON migration plan

For **Vue, Angular, Vanilla JS**, manual discussion is recommended (tooling WIP).

### Output of Phase 1

Present findings as a structured summary:
```
Frontend Stack Summary
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Framework:      React 18 (TypeScript)
UI Library:     Material UI (MUI)
Test Runner:    Jest + React Testing Library
Build Tool:     Vite
Package Mgr:    pnpm

Components to Migrate:
  - Button (25 instances)
  - Input (18 instances)
  - Modal (5 instances)
  - Card (12 instances)
  - […]

Components Already Compatible:
  - Custom Layout components
  - Business logic hooks

Estimated Scope: 2-3 weeks for full migration
```

### What If No Tests Are Found?

If the codebase has no tests (or tests cannot be detected/analyzed):

✅ **Still proceed with the migration** — testing infrastructure is still valuable

The approach shifts to:
1. Set up the test environment (vitest-browser-react for React)
2. Create a **basic test template** for one simple component (e.g., Button)
3. Do NOT write business logic / product logic tests (that's the user's responsibility)
4. Proceed with component swapping migration in the source code
5. User can then extend the template tests for their specific use cases

**User action**: After component migration, the user should write tests specific to their business logic and product requirements.


## Phase 2: Install and Configure SGDS

**Goal**: Set up SGDS web components in your project.

**Defer entirely to the `sgds-getting-started` skill** at this point. The user should:

1. Read `../sgds-getting-started/SKILL.md` fully
2. Complete Steps 1–3:
   - **Step 1**: Set the Font (Inter from Google Fonts)
   - **Step 2**: Import Foundation and Utility CSS (order matters)
   - **Step 3**: Register SGDS Web Components (single import)
3. *Optional* **Step 4**: Understand SGDS App Layouts (Simple vs Sidebar)

### Why Defer to sgds-getting-started

The getting-started skill is authoritative for setup. Do not repeat its instructions here. Just reference it and note what to complete before proceeding.

### What Happens After Phase 2

Once SGDS is installed:
- SGDS component library is available in your project
- CSS tokens and utilities are loaded
- You can import `<sgds-button>`, `<sgds-input>`, etc. and they will render
- **But your existing components still use the old UI library** (MUI, Chakra, Bootstrap, v1 Bulma, etc.)

---

## Component & Layout Migration Strategy

**The strategy is the same regardless of which UI library you're migrating from** (MUI, Chakra, v1 Bulma, v2 Bootstrap, etc.).

### Two-Phase Migration: Components First, Layout Second

**Phase 1: Migrate Components** (web components with Shadow DOM)
- Replace component classes/elements with `<sgds-*>` web components
- Examples:
  - MUI: `<Button>` → `<sgds-button>`
  - Chakra: `<Button>` → `<sgds-button>`
  - v1 Bulma: `.sgds-button` class → `<sgds-button>` web component
  - v2 Bootstrap: `<Button>` React Bootstrap → `<sgds-button>` web component
- Write/update tests for new components
- **Safe**: Web components use Shadow DOM, won't conflict with old CSS

**Phase 2: Migrate Layout CSS** (after Phase 1 is complete)
- Replace layout system with CSS Grid or Flexbox using SGDS utilities
- Examples:
  - MUI: `<Box display="grid">` → CSS Grid with `sgds:grid`
  - Chakra: `<Grid>` → CSS Grid with `sgds:grid`
  - v1 Bulma: `.container`, `.columns` → CSS Grid with `sgds:grid`
  - v2 Bootstrap: `<Container>`, `<Row>`, `<Col>` → CSS Grid with `sgds:grid`
- Update layout-related tests
- **Minimal CSS conflicts**: Components already migrated, old layout CSS can be safely replaced

### Why This Order?

✅ **Components first** — Web components' Shadow DOM is isolated from light DOM CSS, safe to migrate anytime
✅ **Layout second** — Avoid dual systems (old layout + v3 layout). Remove old CSS once components are done
✅ **Reduces conflicts** — v1/v2 have `.sgds-container` in light DOM; v3 also has it. Migrating components first means old CSS is already gone when layout migration happens

---

## Phase 3: Set Up Testing Environment and Migrate Tests

**Goal**: Migrate your test suite to run in a real browser environment (required for Shadow DOM testing).

**Recommended Approach**: **Vitest + Playwright (headless Chromium)**

SGDS web components use Shadow DOM, which jsdom cannot pierce. The recommended and tested approach is Vitest running in browser mode with Playwright as the Chromium provider.

### React (Fully Supported)

**Read**: `reference/react-test-migration.md` for the complete React migration workflow including Vitest setup, testing patterns, and examples.

**Time Estimate**: 1–2 weeks depending on test coverage

**No Existing Tests?** Still proceed — the reference file includes guidance for setting up the Vitest browser environment and creating a simple template test even if your codebase has no tests today.

### Vue (Coming Soon)

Same approach: migrate from jsdom-based runners to **Vitest + Playwright**. Setup will be framework-specific, but Shadow DOM access patterns remain the same (Playwright locators).

### Angular (Coming Soon)

Same approach: **Vitest + Playwright** for Shadow DOM testing. Setup will be framework-specific.

### Vanilla JS (Coming Soon)

Same approach: **Vitest + Playwright** works for any framework.

---

**For all frameworks**: Use **Vitest running in browser mode with Playwright headless Chromium**. The React path demonstrates this pattern; the setup is framework-specific but follows the same vitest + playwright foundation.

---

## Overall Workflow

```
Phase 1: Scan
  ↓
  Understand framework, UI library, test runner
  Output: Stack summary + scope estimate

Phase 2: Set Up SGDS
  ↓
  Follow sgds-getting-started skill
  Output: SGDS components available in project

Phase 3: Migrate Tests & Components
  ↓
  For React: Follow reference/react-test-migration.md
  For Vue/Angular: WIP (see timeline above)
  Output: Tests passing, components using SGDS
```

---

## Tips & Common Questions

### "Can I migrate components without migrating tests?"
**Not recommended.** Tests that were written for the old UI library (MUI, Chakra) may fail when components are swapped to SGDS (different APIs, Shadow DOM). Migrate tests first, then components, so you know things work before and after each change.

However, **if you have no tests**, you can still proceed: set up the test environment, provide a simple template test, and swap components. You (the user) add business logic tests afterward.

**Key principle**: This skill handles UI component migration and testing infrastructure. You are responsible for writing tests specific to your product logic and business requirements.

### "Can I migrate incrementally?"
**Yes.** Migrate one component (test + source) at a time. Old components can coexist with new SGDS components in your application during the transition.

### "What if my test runner doesn't support real browsers?"
**You need to upgrade.** Shadow DOM testing requires a real browser, not jsdom. Vitest with Playwright is the recommended path for React; equivalent solutions exist for Vue and Angular.

### "How long does this take?"
Depends on:
- Number of components (button, input, etc. you're migrating)
- Current test coverage (higher coverage = more work to migrate)
- Team familiarity with SGDS and new test tools
- Whether you need to migrate layout CSS as well
- **Estimate**: 1–4 weeks for a typical mid-size React app

### "Why migrate components before layout CSS?"
**Components first because**:
- Web components use Shadow DOM, won't conflict with old CSS
- Safe to migrate anytime
- Clear boundary: components are swapped, old CSS can be removed cleanly

**Layout second because**:
- Avoid running both old layout system + v3 layout simultaneously
- Once components done, old CSS is largely obsolete
- Cleaner final state with fewer CSS conflicts

### "What if I'm using SGDS v1 (Bulma) or v2 (Bootstrap)?"
**Same strategy**:
- Phase 1: Replace v1/v2 **components** with `<sgds-*>` web components
- Phase 2: Replace v1/v2 **layout** with CSS Grid / Flexbox + `sgds:` utilities
- References:
  - v1 layouts: https://v1.designsystem.tech.gov.sg/docs/container/
  - v2 layouts: https://designsystem.tech.gov.sg/layouts/bootstrap-grid-system
  - v3 utilities: Use `sgds:grid`, `sgds:flex`, `sgds:gap-*` etc. from Tailwind

### "Do I need to rewrite all my components?"
Only the ones you're migrating to SGDS. If you have custom components (layout, logic, etc.) that don't have SGDS equivalents, they can stay unchanged.

---

## For AI Agents

When using this skill:

1. **Start with Phase 1**: Always ask the user about their current stack before making recommendations.
2. **Defer to referenced skills**: Use exact skill names when delegating:
   - `../sgds-getting-started/SKILL.md` for setup
   - `../sgds-components/SKILL.md` for component-specific APIs
   - `reference/react-test-migration.md` for React test migration
3. **Don't duplicate**: Do not rewrite getting-started or component instructions here. Link to them instead.
4. **Be honest about scope**: Clearly state which frameworks are supported (React: yes, Vue/Angular: WIP) and set expectations.
5. **Ask clarifying questions** before diving into migration work:
   - How many components need migrating? (prioritizes effort)
   - Any custom components we should keep? (speeds up decision-making)
   - Test coverage? (impacts test migration timeline)
