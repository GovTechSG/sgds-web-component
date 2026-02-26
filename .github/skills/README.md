# SGDS Agent Skills

Agent skills are specialized knowledge modules that teach AI assistants how to work with the Singapore Design System.

## Available Skills

### Internal Development Skills

Skills that help with building and maintaining the SGDS library:

- **[tailwind-mapping](tailwind-mapping/)** - Converting SGDS CSS variables to Tailwind v4 utilities
- **[token-workflow](token-workflow/)** - Maintaining design token architecture across theme layers
- **[storybook-stories](storybook-stories/)** - Writing Storybook stories following project patterns
- **[agent-skills-writing](agent-skills-writing/)** - Standards and patterns for authoring new agent skills

## Using Skills

### As a Library Maintainer

When contributing to SGDS, AI assistants use these skills to help you:

- Generate Tailwind utility mappings from CSS variables
- Add new design tokens following the three-layer architecture
- Create Storybook stories using the templates folder pattern
- Maintain consistency across the design system

## Shipping Your Own Skills

If you're building a design system inspired by SGDS, consider creating your own agent skills:

### 1. Create User-Facing Skills

Document how developers should use your design system:

```markdown
---
name: your-utilities
description: Helps developers use your design system utilities
metadata:
  audience: external
---

# Your Design System Utilities

## Setup
[Import instructions]

## Common Patterns
[Code examples]

## Troubleshooting
[Solutions to common issues]
```

### 2. Create Maintainer Skills

Document internal patterns for consistency:

```markdown
---
name: your-workflow
description: Internal workflow for maintaining design tokens
metadata:
  audience: internal
---

# Token Maintenance Workflow

## File Structure
[Where tokens live]

## Update Process
[Step-by-step guide]
```

### 3. Register Skills

Add skills to your `.github/copilot-instructions.md`:

```markdown
## Skills
- [your-utilities](.github/skills/your-utilities/SKILL.md) - **User-facing**: How to use utilities
- [your-workflow](.github/skills/your-workflow/SKILL.md) - Internal token workflow
```

## Benefits of Agent Skills

### For Maintainers
- **Consistency**: AI follows established patterns when generating code
- **Automation**: Repetitive tasks (token mapping, wrapper generation) become conversations
- **Knowledge transfer**: New maintainers learn from AI-encoded patterns
- **Reduced cognitive load**: AI remembers conventions so you don't have to
- **Best practices**: AI suggests correct internal patterns automatically

## Philosophy

Agent skills transform design system maintenance from **manual processes** to **active collaboration**:

- Instead of consulting docs, maintainers **ask questions**
- Instead of manual token updates, maintainers **describe intent**
- Instead of remembering conventions, AI **enforces consistency**

## Related

- [Copilot Instructions](../copilot-instructions.md) - Main project context for AI agents
- [Contributing Guide](../../CONTRIBUTING.md) - How to contribute to SGDS
- [Documentation](../../docs/) - Traditional documentation files

---

**Note**: These skills are internal tools for SGDS maintainers to work more efficiently with AI assistance during development.
