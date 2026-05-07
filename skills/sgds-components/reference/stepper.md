# SGDS Stepper Component Skill

`<sgds-stepper>` renders a step indicator and manages a multi-step workflow. Steps can be defined in two ways:

1. **Recommended**: Using `<sgds-step>` child components (preferred approach)
2. **Deprecated**: Using the `steps` property with `IStepMetaData` objects (legacy, maintained for backwards compatibility)

Navigation is controlled programmatically via public methods or the `sgds-arrived` event.

No CSS styling modifications — custom properties and CSS parts are not exposed on this component.

## Usage Guideline

### When to use

- For multi-step sequential workflows where each step must be completed before proceeding to the next (e.g. checkout flows, application forms, onboarding wizards).
- When breaking a complex form into logical stages reduces cognitive load and helps users understand their progress.
- When a visible progress indicator communicates how many steps remain and where the user currently is.

### When NOT to use

- For fewer than 2 steps — a single step does not benefit from a stepper; use a plain form instead.
- When steps are not sequential or can be completed in any order — use tabs or a navigation menu instead.
- When the total number of steps is very large (>7) — the step indicator becomes crowded; consider breaking into sub-flows.
- When step content should all be visible at once — use a single-page form layout instead.

## Behaviour

### Using sgds-step child components (Recommended)

- Steps are declared as `<sgds-step>` child elements of `<sgds-stepper>`.
- Each `<sgds-step>` has a `stepHeader` attribute (required) and optional `iconName`, `disabled`, and `completed` properties.
- The stepper automatically detects slotted steps and only renders these (ignores the deprecated `steps` property if children are present).
- `activeStep` is 0-indexed and controls which step indicator is highlighted as active.
- Navigation is driven by calling `nextStep()`, `previousStep()`, `firstStep()`, `lastStep()`, or `reset()`.

### Using the steps property (Deprecated)

- Steps are defined via the `steps` JS property (an array of `IStepMetaData` objects); it cannot be set as an HTML attribute.
- This approach is maintained for backwards compatibility but is no longer recommended.
- If `<sgds-step>` children are provided, the `steps` property will be ignored.

### Common to both approaches

- `activeStep` is 0-indexed and controls which step indicator is highlighted as active.
- Navigation is driven by calling `nextStep()`, `previousStep()`, `firstStep()`, `lastStep()`, or `reset()` — these are public methods, not attributes.
- `reset()` returns to the first step and clears all step statuses.
- Each method fires a corresponding event: `sgds-next-step`, `sgds-previous-step`, `sgds-last-step`, `sgds-first-step`, `sgds-reset`.
- `sgds-arrived` fires after any navigation method completes — read `activeStep` in the handler to determine the new step.
- `orientation` controls the layout direction: `horizontal` (default) or `vertical`.
- `clickable` allows users to click a step indicator to jump directly to that step.
- Each step's `iconName` is optional — the step indicator defaults to showing the step number if omitted.

## Advanced Considerations

- **Framework integration**: In `sgds-step` components, the `component` property is framework-agnostic — pass a Vue/React/Angular component reference, or a plain string identifier in vanilla JS.
- **`clickable`**: enables jump navigation — ensure step content can handle being accessed non-linearly (e.g. validate prior steps or prefill data before allowing jumps).
- **`firstStep()` / `lastStep()`**: useful for "Back to start" or "Skip to review" actions outside the standard Prev/Next flow.
- **`iconName` per step**: optional; sourced from the SGDS icon set. Omit to show the default step number. Consistent use across all steps is recommended.
- **`activeStep` as a property**: can be read at any time to determine the current step index; also writeable to jump programmatically without calling `nextStep()`/`previousStep()`.
- **`hasDefaultSlot` property**: internal property that tracks whether `<sgds-step>` children are slotted. Used to determine whether to render fallback steps from the `steps` property.

## Edge Cases

- **Empty step list**: the stepper renders with no indicators — always provide at least one step before setting `activeStep`.
- **`activeStep` out of range**: setting `activeStep` beyond the last index or below 0 may cause unexpected rendering — clamp the value within `0` to `steps.length - 1`.
- **Single step**: a stepper with one step is technically valid but provides no navigation value — use a plain form section instead.
- **`reset()` mid-flow**: calling `reset()` clears step statuses and returns to step 0 — ensure the content renderer also resets to the initial state via the `sgds-reset` event.
- **`clickable` with validation**: if steps require prior completion before proceeding, disable `clickable` or implement a guard in the `sgds-arrived` handler to redirect invalid jumps.
- **Mixing sgds-step children with steps property**: if `<sgds-step>` children are provided, the `steps` property is ignored entirely.

## Quick Decision Guide

**Use sgds-step children (recommended)?** → `<sgds-stepper><sgds-step stepHeader="..."></sgds-step></sgds-stepper>`

**Use deprecated steps property?** → `.steps = [{ stepHeader: "...", component: ... }]`

**Horizontal steps (default)?** → `orientation="horizontal"`

**Vertical steps?** → `orientation="vertical"`

**Allow clicking a step to jump to it?** → `clickable`

**Track current step?** → Listen to `sgds-arrived` or check `activeStep`

## Code Examples

### Using sgds-step children (Recommended)

```html
<!-- HTML example with sgds-step children -->
<sgds-stepper id="stepper" activeStep="0">
  <sgds-step stepHeader="Personal Info" iconName="person-fill"></sgds-step>
  <sgds-step stepHeader="Address" iconName="house-fill"></sgds-step>
  <sgds-step stepHeader="Review"></sgds-step>
  <sgds-step stepHeader="Confirm"></sgds-step>
</sgds-stepper>
<div id="step-content"></div>
<sgds-button id="prev-btn" disabled>Previous</sgds-button>
<sgds-button id="next-btn">Next</sgds-button>

<script>
  const stepper = document.getElementById("stepper");
  const content = document.getElementById("step-content");
  const steps = ["Personal Info", "Address", "Review", "Confirm"];

  // Render initial step
  content.textContent = steps[0];

  stepper.addEventListener("sgds-arrived", e => {
    content.textContent = steps[stepper.activeStep];
    document.getElementById("prev-btn").disabled = stepper.activeStep === 0;
    document.getElementById("next-btn").disabled = stepper.activeStep === steps.length - 1;
  });

  document.getElementById("prev-btn").addEventListener("click", () => stepper.previousStep());
  document.getElementById("next-btn").addEventListener("click", () => stepper.nextStep());
</script>
```

### Using the steps property (Deprecated)

```html
<!-- HTML/Vanilla JS example using stepper methods -->
<sgds-stepper id="stepper"></sgds-stepper>
<div id="step-content"></div>
<sgds-button id="prev-btn" disabled>Previous</sgds-button>
<sgds-button id="next-btn">Next</sgds-button>

<script>
  const stepper = document.getElementById("stepper");
  const content = document.getElementById("step-content");

  // Define steps: component can be anything — here it's a plain content identifier
  stepper.steps = [
    { stepHeader: "Personal Info", component: "personal-info" },
    { stepHeader: "Address", component: "address", iconName: "house-fill" },
    { stepHeader: "Review", component: "review" },
    { stepHeader: "Confirm", component: "confirm" }
  ];
  stepper.activeStep = 0;

  // Render initial step
  content.textContent = stepper.steps[0].component;

  stepper.addEventListener("sgds-arrived", e => {
    content.textContent = stepper.steps[stepper.activeStep].component;
    document.getElementById("prev-btn").disabled = stepper.activeStep === 0;
    document.getElementById("next-btn").disabled = stepper.activeStep === stepper.steps.length - 1;
  });

  document.getElementById("prev-btn").addEventListener("click", () => stepper.previousStep());
  document.getElementById("next-btn").addEventListener("click", () => stepper.nextStep());
</script>
```

## API Summary

### `<sgds-stepper>`

| Attribute/Property | Type | Default | Purpose |
|---|---|---|---|
| `steps` | `IStepMetaData[]` | `[]` | **(Deprecated)** Array of step definitions (set via JS property). Ignored if `<sgds-step>` children are provided. |
| `activeStep` | number | `0` | Currently active step index (0-indexed) |
| `orientation` | `horizontal \| vertical` | `horizontal` | Layout direction of the step indicators |
| `clickable` | boolean | `false` | Allows users to click a step indicator to jump to that step |
| `hasDefaultSlot` | boolean | `false` | **(Internal)** Indicates whether `<sgds-step>` children are slotted |

### `<sgds-step>`

| Attribute/Property | Type | Default | Purpose |
|---|---|---|---|
| `stepHeader` | string | `""` | Display label for the step indicator (required) |
| `iconName` | string | undefined | Custom icon name for the step indicator (from SGDS icon set) |
| `component` | unknown | undefined | Content reference for the step (any value, used by parent component) |
| `disabled` | boolean | `false` | Whether this step is disabled and cannot be clicked |
| `completed` | boolean | `false` | Whether this step is marked as completed |

### `IStepMetaData` interface (Deprecated)

| Field | Type | Required | Purpose |
|---|---|---|---|
| `stepHeader` | string | Yes | Display label for the step indicator |
| `component` | unknown | Yes | Content reference for the step (Vue/React/Angular component, or any value) |
| `iconName` | string | No | Custom icon name for the step indicator (from SGDS icon set) |

## Public Methods

| Method | Purpose |
|---|---|
| `nextStep()` | Advance to the next step |
| `previousStep()` | Go back to the previous step |
| `firstStep()` | Jump to the first step |
| `lastStep()` | Jump to the last step |
| `reset()` | Reset to the initial state (first step, clears step statuses) |
| `getComponent(step?)` | Get the component for the specified step, or the active step if no parameter is provided |

## Events

| Event | Cancelable | When |
|---|---|---|
| `sgds-next-step` | No | `nextStep()` was called |
| `sgds-previous-step` | No | `previousStep()` was called |
| `sgds-last-step` | No | `lastStep()` was called |
| `sgds-first-step` | No | `firstStep()` was called |
| `sgds-arrived` | No | The stepper has arrived at a new step; use `activeStep` to get the current index |
| `sgds-reset` | No | `reset()` was called |

---

**For AI agents**:
1. **Prefer `<sgds-step>` children** when possible — this is the recommended approach.
2. If using the deprecated `steps` property: set it as a **JavaScript property** (`.steps = [...]`), not as an HTML attribute — the value is an array.
3. In `sgds-step` components, the `component` property is framework-agnostic: in Vue/React/Angular it can be a component reference; in vanilla JS it can be an identifier string for your step content renderer.
4. Listen to `sgds-arrived` to update the displayed step content — read `activeStep` to know which step is now visible.
5. `activeStep` is 0-indexed: step 0 is the first step.
6. Use `sgds-button` elements outside the stepper for Prev/Next controls; call `.previousStep()` and `.nextStep()` from button click handlers.
7. `iconName` is optional per step — defaults to a step number.
8. If `<sgds-step>` children are provided, the `steps` property is completely ignored — do not mix both approaches.
