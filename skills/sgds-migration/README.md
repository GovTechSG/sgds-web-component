# SGDS Migration Skill (Draft)

This skill helps migrate an existing frontend application from another component library (MUI, Chakra, etc.) to SGDS web components. It covers three phases: (1) scan the current stack, (2) set up SGDS, (3) migrate tests.

## What's Included

### SKILL.md
The main skill file containing:
- Three-phase migration workflow overview
- Phase 1: Scan existing tech stack (framework + UI library)
- Phase 2: Delegate to sgds-getting-started for setup
- Phase 3: Test environment setup & test migration
- Current support: React (fully). Vue/Angular/Vanilla (WIP)
- Tips for common questions and orchestration for AI agents

### reference/react-test-migration.md
Complete React migration guide (moved from SKILL.md) containing:
- RTL + Jest → Vitest + vitest-browser-react workflow
- Test conversion patterns
- Component mapping (React → SGDS)
- Tips for handling shadow DOM
- Success criteria

### scripts/analyze_react_stack.py
A Python helper script that:
- Scans a React codebase for components
- Identifies which UI library is in use (MUI, Chakra, etc.)
- Identifies which UI components are used
- Maps them to SGDS equivalents
- Finds which tests cover each component
- Outputs a JSON migration plan

### evals/evals.json
Three test cases for evaluating the skill:
1. **simple-button-component-migration** — Basic Button component with simple tests
2. **form-with-multiple-components** — Form with Input, Checkbox, Button, and validation
3. **shadow-dom-interactions** — Testing interactions with shadow DOM elements

## Skill Features

✅ **Complete migration workflow** — Analyze → Map → Test → Swap → Report

✅ **Shadow DOM handling** — Proper patterns for Playwright locators vs DOM queries

✅ **Test-first approach** — Write new tests before swapping components

✅ **Component mapping** — Reference table for common React → SGDS mappings

✅ **Error handling patterns** — Async/await, waiting strategies, event handling

✅ **Success criteria** — Clear checklist for complete migration

## Skill Structure

```
sgds-migration/
├── SKILL.md                              ← 3-step orchestrator
├── README.md                             ← This file
├── reference/
│   └── react-test-migration.md           ← React-specific detailed guide
├── scripts/
│   └── analyze_react_stack.py            ← React codebase analyzer
└── evals/
    └── evals.json                        ← Test cases (for React path)
```

## Next Steps

This skill is now a meta-skill orchestrating a 3-phase migration workflow:

1. **Phase 1 (Stack Scan)**: Uses `analyze_react_stack.py` for React projects; manual discussion for Vue/Angular
2. **Phase 2 (Setup)**: Fully delegates to `../sgds-getting-started/SKILL.md`
3. **Phase 3 (Test Migration)**:
   - **React**: Full workflow in `reference/react-test-migration.md` (previously in SKILL.md)
   - **Vue/Angular/Vanilla**: WIP stubs with pointers to GitHub issues

To iterate further:

1. **Expand Phase 1** — Add framework detection for Vue, Angular, Vanilla JS
2. **Write Vue test migration** — Create `reference/vue-test-migration.md`
3. **Write Angular test migration** — Create `reference/angular-test-migration.md`
4. **Evaluate** — Run test cases on the 3 eval prompts
5. **Optimize description** — Run trigger optimization to improve when the skill gets invoked
6. **Package** — Finalize the skill for distribution

Current evaluation status: React path proven in [Phase 1 evaluation](/test/skills/sgds-test-migration-workspace/iteration-1/)
