# Building with the Singapore Design System (SGDS)

These are `@govtechsg/sgds-web-component` — Singapore Government Design System
components. Build all UI from them; match the SGDS look with the utility classes
and tokens below rather than inventing your own styles.

## Components: use the React wrappers on `window.SGDS`

Every component is a React wrapper exposed at `window.SGDS.<Name>` (e.g.
`window.SGDS.SgdsButton`), loaded from the root `_ds_bundle.js`. Write them as
normal JSX — `<SgdsButton variant="primary">Save</SgdsButton>`. Importing a
component also registers the underlying `<sgds-*>` custom element, so both the
React wrapper and the raw tag work; prefer the wrapper. Names are `Sgds` +
PascalCase: `SgdsButton`, `SgdsInput`, `SgdsAlert`, `SgdsModal`, `SgdsTable`,
`SgdsMainnav`, `SgdsMasthead`, `SgdsFooter`, … (47 components; sub-parts like
`SgdsAccordionItem`, `SgdsTableRow`, `SgdsSelectOption`, `SgdsTabPanel` are also
on `window.SGDS`). Style each component through its **props** (`variant`, `tone`,
`size`, `disabled`, …) — read the per-component `<Name>.prompt.md` and
`<Name>.d.ts` for the exact API before using one. Do not add CSS classes to a
component to restyle its internals (they live in shadow DOM); use its props.

## No provider needed; theming

Tokens are already applied to `:root` (light/day mode) via `styles.css`, so
components are styled out of the box — no theme provider or wrapper required.
- **Night mode:** add class `sgds-night-theme` to `<html>` (or a container).
- **Brand palette:** add one of `gt-blue-theme`, `gt-cyan-theme`,
  `gt-magenta-theme`, `gt-pink-theme`, `gt-purple-theme`, `gt-red-theme`.
- The **Inter** font is loaded by `styles.css` — use it for all text.

## Styling idiom: `sgds:`-prefixed utility classes + `--sgds-*` tokens

For your own layout/spacing/color glue, use SGDS Tailwind utilities (every class
is prefixed `sgds:`) so it stays on-brand and theme-aware. Families:

| Concern | Classes (examples) |
|---|---|
| Layout | `sgds:flex` `sgds:flex-col` `sgds:flex-row` `sgds:grid` `sgds:grid-cols-3` `sgds:items-center` `sgds:justify-between` `sgds:absolute` |
| Gap / spacing | `sgds:gap-4` `sgds:p-4` `sgds:px-6` `sgds:py-2` `sgds:m-2` `sgds:mx-auto` (scale `0,1,2,3,4,6,8,12,16…` + `-xs/-sm/-md/-lg/-xl` steps) |
| Dimension | `sgds:w-full` `sgds:w-12` `sgds:h-16` `sgds:max-w-…` |
| Typography | `sgds:text-display-lg` `sgds:text-heading-md` `sgds:text-body-md` `sgds:text-label-md` `sgds:text-caption-md` (role-based); raw sizes `sgds:text-16` |
| Background color | `sgds:bg-default` `sgds:bg-alternate` `sgds:bg-primary-default` `sgds:bg-surface-default` `sgds:bg-danger-surface-muted` (families: primary/accent/success/danger/neutral/purple/cyan… × `-default/-muted/-surface-*/-emphasis`) |
| Text color | `sgds:text-default` `sgds:text-muted` `sgds:text-primary-default` `sgds:text-danger-default` (semantic families mirror background); role classes set size+color, e.g. `sgds:text-body-subtle` |
| Border | `sgds:border-1` `sgds:border-primary-default` `sgds:rounded-md` `sgds:rounded-full` |
| Opacity | `sgds:opacity-0 … sgds:opacity-100` |

When you need a raw value in inline styles, reference tokens as CSS custom
properties: `var(--sgds-gap-md)`, `var(--sgds-spacing-4)`,
`var(--sgds-background-color-primary-default)`, `var(--sgds-text-color-default)`,
`var(--sgds-font-size-16)`. Token families: `--sgds-spacing-*`, `--sgds-gap-*`,
`--sgds-font-*`, `--sgds-line-*`/`--sgds-leading-*`, `--sgds-background-color-*`,
`--sgds-text-color-*`, `--sgds-border-*`, `--sgds-dimension-*`, `--sgds-opacity-*`,
plus form-specific `--sgds-form-*`.

## Where the truth lives

Read these before styling: `styles.css` and its `@import`ed `_ds_bundle.css`
(every token and `sgds:` utility class); and each component's `<Name>.prompt.md`
(usage + variants) and `<Name>.d.ts` (typed props). Prefer reading the real
files over guessing class or prop names.

## Idiomatic snippet

```jsx
// components come from window.SGDS; layout/spacing via sgds: utilities
const { SgdsCard, SgdsButton, SgdsBadge } = window.SGDS;

function FeatureCard() {
  return (
    <div className="sgds:grid sgds:grid-cols-3 sgds:gap-4">
      <SgdsCard>
        <div className="sgds:flex sgds:flex-col sgds:gap-2 sgds:p-4">
          <SgdsBadge variant="filled">New</SgdsBadge>
          <h3 className="sgds:text-heading-md">Innovative solutions</h3>
          <p className="sgds:text-body-subtle">
            Discover how our platform streamlines your workflow.
          </p>
          <SgdsButton variant="primary" size="md">Register now</SgdsButton>
        </div>
      </SgdsCard>
    </div>
  );
}
```
