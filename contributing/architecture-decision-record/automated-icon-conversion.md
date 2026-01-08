# Automated SVG to Lit Icon Conversion and Registration

## Status

Accepted

## Context

The SGDS icon set consists of hundreds of SVG files.
Manually converting each SVG into a Lit-compatible TypeScript template and registering it in `icon-registry.ts` is:

- Time-consuming
- Error-prone (inconsistent formatting, missing icons)
- Difficult to maintain as icons are added or updated

To ensure consistency, scalability, and ease of onboarding for new developers, an automated and repeatable process is required.

## Decision

We standardise the icon workflow using **two Node.js scripts**:

1. **SVG → TypeScript conversion script**

- Converts raw `.svg` files into Lit-compatible `.ts` icon modules
- Normalises SVG output (e.g. `fill="currentColor"`)
- Outputs files into `src/components/Icon/icons`

2. **Icon registry generation script**

- Automatically imports all icon modules
- Registers them in `icon-registry.ts`
- Ensures all available icons are centrally discoverable

### Required workflow for developers

When adding or updating icons:

1. Place new or updated SVG files into the `sgds-icons` (source SVG) folder in `src/components/Icon/` folder
2. Run the **SVG → TS conversion script**
3. Run the **icon registry generation script**
4. Check if there is any name changes in existing icon name to prevent breaking changes unless it's intended
5. Commit the generated `.ts` icons and updated `icon-registry.ts`

No manual editing of generated icon files or the registry is required.

## Consequences

- Consistent icon structure and formatting across the codebase
- Easy bulk updates when icons change
- Reduced human error and merge conflicts

## Date of proposal

08/01/2026
