# SGDS Spinner Component Skill

`<sgds-spinner>` is the standard loading indicator. Use it to communicate that content is loading or an action is in progress.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Component Definition

The Spinner component is an animated loading indicator used to communicate that content is loading or an asynchronous action is in progress. It is a non-interactive, presentational element that can be accompanied by an optional text label.

## Purpose

- Inform users that the system is working and they should wait.
- Prevent user uncertainty during loading or async operations.
- Provide a consistent, accessible loading indicator across all SGDS interfaces.

## Usage Guideline

### When to use

- When content is loading and the wait time is indeterminate.
- When an async action (e.g. form submission, data fetch) is in progress and the UI is temporarily unresponsive.
- Inline within buttons, inputs, or selects during loading states — use the `loading` attribute on those components rather than inserting a standalone spinner.
- When a full-page or section-level loading state is needed.

### When NOT to use

- When the loading duration is known — use a progress bar instead.
- When the wait time is very short (<300ms) — avoid flashing a spinner; let the UI update silently.
- As decoration or animation unrelated to a loading state.
- Inside `<sgds-button>`, `<sgds-input>`, or `<sgds-select>` — those components have a built-in `loading` attribute that renders a spinner automatically.

## Behaviour

- Renders an animated spinning ring with no interactive states.
- `tone` controls the colour: `brand` (default), `neutral`, `inverse` (for dark backgrounds), `fixed-light` (always light), `fixed-dark` (always dark).
- `size` controls the physical size: `xs`, `sm`, `md` (default), `lg`, `xl`.
- `label` adds a visible text label; `orientation` controls whether it appears below (`vertical`, default) or beside (`horizontal`) the spinner.
- The component has no slots, events, or public methods.
- `variant` is deprecated — always use `tone`.

## Content Guideline

- Use a `label` to communicate what is loading when the context is not obvious (e.g. "Loading results…", "Submitting…").
- Labels should be brief and in the present continuous tense (e.g. "Loading…", not "Load" or "Loaded").
- Omit the label when the spinner's context makes the loading state self-evident (e.g. inside a button).
- Use `orientation="horizontal"` when the spinner sits inline with surrounding text or UI elements.

## Interaction Guideline

- The spinner is non-interactive and non-focusable — it carries no user action.
- Screen readers will announce the `label` text if set; without a label, the spinner is invisible to assistive technology. Provide a label or an `aria-label` on the containing element for meaningful loading announcements.
- Remove the spinner as soon as the loading state ends to avoid user confusion.

## Best Practices

**Do**
- Use `tone` to match the spinner to its background context.
- Provide a `label` for standalone spinners where the loading context is not clear from surrounding UI.
- Use `orientation="horizontal"` for inline loading states alongside text.
- Use the built-in `loading` attribute on `<sgds-button>`, `<sgds-input>`, and `<sgds-select>` rather than composing a standalone spinner inside them.
- Remove or hide the spinner promptly when the operation completes.

**Don't**
- Use the deprecated `variant` attribute — always use `tone`.
- Leave a spinner visible indefinitely without a timeout or error state fallback.
- Use `tone="inverse"` or `tone="fixed-light"` on light backgrounds — they are intended for dark background contexts.
- Use the spinner as a decorative or purely aesthetic animation.

## Common Use Cases

- Full-page or overlay loading state while initial data is fetched.
- Section-level loading within a card or panel while async content loads.
- Inline loading indicator next to a status message (e.g. "Checking availability…").
- Custom loading overlays in modals or drawers.

## Advanced Considerations

- **Tone for dark backgrounds**: use `tone="inverse"` to let the spinner respond to the active theme, or `tone="fixed-light"` when the background is always dark regardless of theme. Never use `brand` or `neutral` on dark backgrounds.
- **Size selection**: match `size` to the visual context — `xs`/`sm` for inline or compact UI, `md` for standard section loading, `lg`/`xl` for full-page or prominent loading states.
- **Label orientation**: `orientation="vertical"` (default) centres the label below the spinner — suitable for full-page or modal loading. `orientation="horizontal"` places the label beside the spinner — suitable for inline or banner loading states.
- **No slots or events**: the spinner is a pure presentational element. All behaviour (show/hide, error fallback) must be managed by the host application.
- **Built-in spinner integration**: `<sgds-button loading>`, `<sgds-input loading>`, and `<sgds-select loading>` use `<sgds-spinner>` internally — prefer these over standalone spinners inside form controls.

## Edge Cases

- **No label provided**: the spinner is visually present but invisible to screen readers — add an `aria-label` or `aria-live` region on the parent container to announce the loading state.
- **Long-running operations**: always implement a timeout fallback — if loading exceeds a threshold, replace the spinner with an error state or retry option.
- **Spinner on a transitioning background**: if the background colour changes (e.g. theme switch) while the spinner is visible, ensure `tone` is set appropriately for both states — prefer `fixed-light` or `fixed-dark` for backgrounds that do not respond to theme changes.
- **Multiple spinners on screen**: avoid showing several spinners simultaneously — consolidate into a single section-level or page-level indicator to reduce cognitive load.

## Quick Decision Guide

**Which `tone`?**
- Default brand color (light backgrounds) → `brand` (default)
- Neutral / subdued → `neutral`
- On dark backgrounds → `inverse`
- Always light regardless of theme → `fixed-light`
- Always dark regardless of theme → `fixed-dark`

> `variant` is **deprecated** — use `tone` instead. Never suggest `variant="primary"` or `variant="neutral"`.

**Which `size`?**
- Inline within text or compact UI → `xs` or `sm`
- Default → `md`
- Prominent loading state → `lg` or `xl`

**With a label?**
- Label below spinner (default) → set `label` + omit `orientation`
- Label beside spinner → set `label` + `orientation="horizontal"`

```html
<!-- Default spinner -->
<sgds-spinner></sgds-spinner>

<!-- With label -->
<sgds-spinner label="Loading..."></sgds-spinner>

<!-- Horizontal label layout -->
<sgds-spinner label="Loading..." orientation="horizontal"></sgds-spinner>

<!-- On a dark background -->
<div style="background-color: #222; padding: 12px;">
  <sgds-spinner tone="inverse"></sgds-spinner>
  <sgds-spinner tone="fixed-light"></sgds-spinner>
</div>

<!-- Size variants -->
<sgds-spinner size="xs"></sgds-spinner>
<sgds-spinner size="sm"></sgds-spinner>
<sgds-spinner size="md"></sgds-spinner>
<sgds-spinner size="lg"></sgds-spinner>
<sgds-spinner size="xl"></sgds-spinner>
```

## API Summary

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `tone` | `brand \| neutral \| inverse \| fixed-light \| fixed-dark` | `brand` | Color tone |
| `size` | `xs \| sm \| md \| lg \| xl` | `md` | Spinner size |
| `label` | string | — | Visible text label accompanying the spinner |
| `orientation` | `horizontal \| vertical` | `vertical` | Label position relative to the spinner |
| `variant` | `primary \| neutral` | — | **Deprecated** — use `tone` instead |

## Slots

None.

## Events

None.

---

**For AI agents**:
1. Always use `tone` — never suggest the deprecated `variant` attribute.
2. `tone="inverse"` and `tone="fixed-light"` are for dark background contexts; always note the background color requirement.
3. There are no slots, events, or public methods on this component.
4. When a label is provided, use `orientation="horizontal"` for inline contexts and `orientation="vertical"` (default) for centered loading states.
5. `<sgds-spinner>` is used internally by `<sgds-button loading>`, `<sgds-input loading>`, and `<sgds-select loading>` — advise users to use the `loading` attribute on those components rather than inserting a standalone spinner.
