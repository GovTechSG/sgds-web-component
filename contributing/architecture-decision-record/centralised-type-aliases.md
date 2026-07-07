# Centralised Type Aliases for Component Properties

## Status

Accepted

## Context

26 components defined property types as inline union literals directly on `@property` decorators (e.g. `type: "email" | "number" | "password" | ...`). This caused several problems:

1. **Duplication** — identical unions like `"sm" | "md" | "lg"` were repeated across multiple components (Switch, Drawer, IconList, etc.) with no shared source of truth.
2. **No type exports for consumers** — library users could not import these types to annotate their own code (e.g. for wrapper props or config objects).
3. **Historical constraint removed** — inline unions were originally used because Storybook's Custom Elements Manifest (CEM) analyzer could not resolve named type aliases for the ArgsTable. A `resolveTypeAliasPlugin` was later written to expand type aliases in the manifest, making the constraint obsolete.

## Decision

1. **Create `src/types.ts`** as the single source of truth for all property union types, grouped by semantic category (shared types like `SgdsSize`, then component-specific types like `InputType`).

2. **Components import from `src/types.ts`** instead of declaring inline unions.

3. **Backwards-compatible re-exports** — types previously exported from component files (e.g. `ButtonVariant` from `button-element.ts`) are re-exported from their original locations so existing deep-path imports are not broken.

4. **Barrel export from `src/index.ts`** — `export type * from "./types"` makes all types importable from the package root.

5. **CEM config updated** — `src/types.ts` added to the `globs` array so the `resolveTypeAliasPlugin` can resolve named types to their union string values in `custom-elements.json`.

6. **Plugin updated** — `resolveTypeAliasPlugin` now resolves types in both `members` and `attributes` arrays of the manifest, ensuring Storybook's ArgsTable displays expanded values.

### Naming convention

- Shared types: `Sgds{Concept}` — e.g. `SgdsSize`, `SgdsOrientation`, `SgdsHasFeedback`
- Component-specific types: `{Component}{Property}` — e.g. `InputType`, `DrawerPlacement`, `ToastVariant`
- Existing names preserved: `ButtonVariant`, `AlertVariant`, `SpinnerTone` etc. kept as-is for backwards compatibility.

## Consequences

### Easier

- **Library consumers** can now `import type { InputType, SgdsSize } from "@govtechsg/sgds-web-component"` for strong typing in their own code.
- **Adding a new component** — reuse existing shared types instead of redeclaring unions.
- **Refactoring a size scale** — change in one place propagates everywhere.
- **Storybook** continues to work unchanged; expanded values still appear in ArgsTable and controls.

### More difficult

- **Adding a new value to a shared type** requires checking all components that use it, since broadening a shared type could introduce invalid states in some components.
- **Contributors** must know to define new types in `src/types.ts` rather than inline.

## Date of proposal

07/07/2026
