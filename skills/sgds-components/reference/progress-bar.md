# SGDS Progress Bar Component Skill

`<sgds-progress-bar>` renders a horizontal progress bar. Always provide `ariamin`, `ariamax`, and `arialabel` for accessibility.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Component Definition

The Progress Bar component renders a horizontal bar that visually communicates the completion percentage or progress of a task or process. It is a non-interactive, presentational element with built-in accessibility attributes.

## Purpose

- Communicate the progress of a known-duration task (e.g. file upload, form completion, step progress).
- Give users a sense of how much work remains and reduce uncertainty.
- Provide an accessible loading or progress indicator for screen reader users via ARIA attributes.

## Usage Guideline

### When to use

- When the total duration or steps of a task are known and measurable.
- For file uploads, data processing, form completion, or multi-step flows where progress can be quantified.
- When users benefit from seeing how far along a process is before it completes.

### When NOT to use

- When the duration is completely unknown and indeterminate — use `<sgds-spinner>` instead.
- For step navigation in a multi-step wizard — use `<sgds-stepper>` instead.
- When the progress value is purely decorative with no semantic meaning — avoid misleading affordance.

## Behaviour

- Renders a filled horizontal bar whose width reflects `value` relative to the `ariamin`–`ariamax` range.
- `value` is required; it should always fall within the `ariamin` to `ariamax` range.
- `ariamin` and `ariamax` set the `aria-valuemin` and `aria-valuemax` ARIA attributes respectively — always provide both for screen reader accessibility.
- `arialabel` sets the accessible label for screen readers — always provide a meaningful description.
- `label` renders visible text inside the bar (e.g. `"60%"`, `"Step 3 of 5"`).
- `variant` controls the bar colour: `primary` (default, brand colour) or `neutral` (grey).
- The component has no events or public methods — progress updates must be driven by the host application by updating `value`.

## Content Guideline

- `arialabel` should describe what is being measured (e.g. "File upload progress", "Profile completion") — not the value itself.
- `label` should display the current progress in a human-readable format (e.g. `"60%"`, `"3 of 10 steps"`); keep it brief.
- Do not rely on `label` alone for accessibility — always set `arialabel` for screen readers.
- If `label` is omitted, ensure the surrounding context communicates the progress value to sighted users.

## Interaction Guideline

- The progress bar is non-interactive and non-focusable — it carries no user action.
- Update `value` programmatically as the task progresses; the bar width updates reactively.
- Pair with a status message or percentage display adjacent to the bar when precise feedback is important.
- On completion (`value === ariamax`), update surrounding UI (e.g. show a success message) — the component does not handle completion states automatically.

## Best Practices

**Do**
- Always set `ariamin`, `ariamax`, and `arialabel` on every instance for accessibility.
- Keep `value` within the `ariamin`–`ariamax` range at all times.
- Use `label` to display human-readable progress text inside the bar.
- Update `value` incrementally and smoothly for a better perceived experience.
- Use `variant="neutral"` for subdued or secondary progress indicators.

**Don't**
- Omit `ariamin`, `ariamax`, or `arialabel` — these are required for screen reader accessibility.
- Set `value` outside the `ariamin`–`ariamax` range — the bar may overflow or not render correctly.
- Use for indeterminate loading — use `<sgds-spinner>` when progress cannot be quantified.
- Use `<sgds-progress-bar>` as a step navigator — use `<sgds-stepper>` for that purpose.

## Common Use Cases

- File upload progress (0–100%).
- Form or profile completion indicator.
- Data processing or import job status.
- Reading progress within a long article.
- Onboarding checklist completion percentage.

## Advanced Considerations

- **Custom range**: `ariamin` and `ariamax` do not have to be `0` and `100` — use any range that reflects the task's natural units (e.g. `ariamin="0"`, `ariamax="50"` for a 50-step process). The bar width is calculated proportionally.
- **Variants**: `primary` uses the brand colour and is suitable for most contexts. `neutral` is a grey bar suited for subdued or secondary progress indicators where brand colour would draw too much attention.
- **No animation**: the component does not animate bar transitions — if smooth animation is desired, update `value` incrementally rather than jumping to the final value.
- **No public methods or events**: all progress updates and completion handling are managed entirely by the host application.

## Edge Cases

- **`value` below `ariamin`**: the bar may render as empty or with zero width — always clamp `value` to the `ariamin`–`ariamax` range before setting it.
- **`value` above `ariamax`**: the bar may overflow its container — clamp `value` at `ariamax` to prevent rendering issues.
- **Missing `ariamin` / `ariamax`**: screen readers cannot accurately announce progress without these attributes — always set both.
- **100% complete state**: when `value === ariamax`, the bar is full but no completion UI is triggered automatically — handle completion feedback in the host application.
- **Rapidly updating values**: updating `value` on every byte of a file upload can be expensive — throttle updates to a reasonable interval (e.g. every 1% or every 500ms).

## Quick Decision Guide

**Primary/brand coloured bar?** → `variant="primary"` (default)

**Neutral grey bar?** → `variant="neutral"`

**Show a visible label inside the bar?** → Set `label`

**Accessible label for screen readers?** → Always set `arialabel`

```html
<!-- Basic progress bar at 60% -->
<sgds-progress-bar
  value="60"
  ariamin="0"
  ariamax="100"
  arialabel="Profile completion"
></sgds-progress-bar>

<!-- Primary variant with visible label -->
<sgds-progress-bar
  value="60"
  ariamin="0"
  ariamax="100"
  arialabel="File upload progress"
  label="60%"
></sgds-progress-bar>

<!-- Neutral variant -->
<sgds-progress-bar
  value="30"
  ariamin="0"
  ariamax="100"
  arialabel="Step 3 of 10"
  variant="neutral"
  label="30%"
></sgds-progress-bar>
```

## API Summary

### `<sgds-progress-bar>`

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `value` | number | — | **Required** — current progress value |
| `ariamin` | number | — | Minimum value for `aria-valuemin` accessibility attribute |
| `ariamax` | number | — | Maximum value for `aria-valuemax` accessibility attribute |
| `arialabel` | string | `""` | Accessible label for the progress bar (for screen readers) |
| `label` | string | `""` | Visible text displayed inside the progress bar |
| `variant` | `primary \| neutral` | `primary` | Colour variant of the bar |

## Events

None.

---

**For AI agents**:
1. Always set `ariamin`, `ariamax`, and `arialabel` for screen reader accessibility.
2. `value` is required and should be between `ariamin` and `ariamax`.
3. Use `label` to show progress text (e.g. `"60%"` or `"Step 3 of 5"`) inside the bar.
4. There are no custom events or public methods on this component.
