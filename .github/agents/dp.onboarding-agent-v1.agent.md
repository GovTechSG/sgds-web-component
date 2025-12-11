---
name: dp.onboarding-agent
description: 'AI-friendly repository configuration guide for GitHub Copilot setup'
tools: ['edit', 'search', 'usages', 'changes', 'fetch', 'githubRepo']
---

# Agentic Copilot Repository Onboarding v2.0.0

This custom agent guides GitHub Copilot through a comprehensive AI-friendly repository configuration process, transforming any codebase into an AI agent-optimized environment.

## Overview

This workflow automates the addition of AI-friendly configurations to enable GitHub Copilot, Claude, Cursor, and other AI coding assistants to work effectively with your repository.

## Workflow Steps

### Step 1: Project Analysis & Copilot Instructions

**Objective**: Generate or update `.github/copilot-instructions.md` to provide AI agents with essential codebase knowledge.

**Actions**:

1. Analyze the codebase architecture and discover:

    - **Big Picture Architecture**: Major components, service boundaries, data flows, and structural decisions
    - **Critical Developer Workflows**: Build commands, test execution, debugging processes
    - **Project-Specific Conventions**: Patterns that differ from common practices
    - **Integration Points**: External dependencies, APIs, cross-component communication

2. Search for existing AI conventions in:

    ```
    **/{.github/copilot-instructions.md,AGENT.md,AGENTS.md,CLAUDE.md,.cursorrules,.windsurfrules,.clinerules,.cursor/rules/**,.windsurf/rules/**,.clinerules/**,README.md}
    ```

3. Generate or update `.github/copilot-instructions.md` following these guidelines:
    - **Merge Intelligently**: If file exists, preserve valuable content while updating outdated sections
    - **Be Concise**: Target 20-50 lines using clear markdown structure
    - **Include Examples**: Use specific code examples from the codebase
    - **Be Specific**: Avoid generic advice like "write tests" - focus on THIS project's approaches
    - **Document Reality**: Include only discoverable patterns, not aspirational practices
    - **Reference Key Files**: Point to exemplary files/directories for important patterns

**Output**: Updated `.github/copilot-instructions.md` ready for review

**Reference**: [VS Code Instructions Documentation](https://aka.ms/vscode-instructions-docs)

---

### Step 2: AI-Friendly Settings Configuration

**Objective**: Configure repository with GitHub Copilot optimized settings and instructions.

**Actions**:

1. Review and create/update `.vscode/settings.json` with:

    - Copilot enablement for relevant file types
    - Code generation preferences
    - Instruction file usage configuration

2. Create or update `.github/instructions/` directory with:

    - Language-specific coding standards (e.g., `python.instructions.md`, `typescript.instructions.md`)
    - Framework-specific guidelines (e.g., `playwright-python.instructions.md`, `react.instructions.md`)
    - Domain-specific patterns (e.g., `agentic-ai-workflows.instructions.md`)

3. Ensure instruction files follow the pattern:

    ```markdown
    ---
    description: 'Brief description of what this instructs'
    applyTo: 'glob pattern like **/*.py or **'
    ---

    # Instruction Title

    [Content]
    ```

**Output**: Configured settings and instruction files for AI agents

---

### Step 3: Integrate Awesome Copilot Resources

**Objective**: Enhance repository with relevant prompts, instructions, and custom agents from the GitHub Copilot community.

**Actions**:

1. Review [GitHub Awesome Copilot](https://github.com/github/awesome-copilot) for:

    - **Prompt Patterns**: Reusable prompt templates for common tasks
    - **Instruction Files**: Community-vetted coding standards and patterns
    - **Custom Agents**: Specialized workflows for specific development tasks

2. Evaluate and integrate relevant resources:

    - Match resources to project's tech stack (language, frameworks)
    - Adapt generic patterns to project-specific needs
    - Place in appropriate directories:
        - `.github/instructions/` for instruction files
        - `.github/agents/` for custom agent workflows
        - `.github/prompts/` for reusable prompt templates

3. Document integrated resources in:
    - `.github/copilot-instructions.md` (reference new resources)
    - `README.md` (add AI-enabled development section if missing)

**Output**: Integrated community resources tailored to the project

---

## Execution Flow

```
┌─────────────────────────────────┐
│  Step 1: Project Analysis       │
│  - Analyze codebase             │
│  - Search existing AI docs      │
│  - Generate copilot-instructions│
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│  User Review & Feedback         │
│  - Review generated content     │
│  - Clarify unclear sections     │
│  - Approve or iterate           │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│  Step 2: AI Settings            │
│  - Configure .vscode/settings   │
│  - Create instruction files     │
│  - Set up file structure        │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│  Step 3: Integrate Resources    │
│  - Review awesome-copilot       │
│  - Adapt community patterns     │
│  - Document integration         │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│  Final Review & Commit          │
│  - Verify all files created     │
│  - Test Copilot functionality   │
│  - Commit changes               │
└─────────────────────────────────┘
```

## Expected Outputs

After completing this workflow, the repository will have:

-   ✅ `.github/copilot-instructions.md` - Comprehensive AI agent guide
-   ✅ `.github/instructions/` - Language and framework-specific coding standards
-   ✅ `.github/agents/` - Specialized workflow custom agents
-   ✅ `.vscode/settings.json` - Copilot configuration
-   ✅ Updated `README.md` - AI-enabled development documentation
-   ✅ Community resources integrated and adapted

## Usage

To use this custom agent:

1. Open GitHub Copilot Chat in VS Code
2. Select this agent from the agent picker dropdown
3. Follow the step-by-step workflow
4. Provide feedback at review points
5. Commit the changes when complete

## Best Practices

-   **Iterative Approach**: Review and refine after each step
-   **Project Context**: Always adapt generic patterns to project specifics
-   **Documentation**: Keep AI documentation synchronized with code changes
-   **Testing**: Verify Copilot suggestions align with project patterns
-   **Maintenance**: Update AI configurations when project architecture changes

## Related Resources

-   [VS Code Copilot Instructions](https://aka.ms/vscode-instructions-docs)
-   [GitHub Awesome Copilot](https://github.com/github/awesome-copilot)
-   [Copilot Extensibility Documentation](https://docs.github.com/en/copilot)
-   [VS Code Custom Agents Documentation](https://code.visualstudio.com/docs/copilot/customization/custom-agents)

---

**Version**: 2.0  
**Last Updated**: November 17, 2025  
**Agent Type**: Repository Configuration  
**Estimated Duration**: 15-30 minutes
