# Stepper

**Purpose**: Multi-step workflow component for guiding users through a linear process (wizards, onboarding, checkout). Manages step state, labels, and navigation.

**Component**: `<sgds-stepper>`

---

## Usage

```html
<!-- Stepper required setup -->
<sgds-stepper id="my-stepper"></sgds-stepper>

<div id="step-0">
  <h2>Step 1: Personal Details</h2>
  <sgds-input label="Full Name" name="name" required></sgds-input>
  <sgds-button id="next-1" variant="primary">Next</sgds-button>
</div>

<div id="step-1" hidden>
  <h2>Step 2: Contact Information</h2>
  <sgds-input label="Email" name="email" type="email" required></sgds-input>
  <sgds-button id="prev-1" variant="ghost">Back</sgds-button>
  <sgds-button id="next-2" variant="primary">Next</sgds-button>
</div>

<div id="step-2" hidden>
  <h2>Step 3: Review & Submit</h2>
  <p>Please review your information before submitting.</p>
  <sgds-button id="prev-2" variant="ghost">Back</sgds-button>
  <sgds-button id="submit-btn" variant="primary">Submit</sgds-button>
</div>

<script>
  const stepper = document.getElementById("my-stepper");

  // Configure steps
  stepper.steps = [
    { title: "Personal Details", label: "Step 1" },
    { title: "Contact Info", label: "Step 2" },
    { title: "Review", label: "Step 3" }
  ];

  // Navigate forward
  document.getElementById("next-1").addEventListener("click", () => stepper.nextStep());
  document.getElementById("next-2").addEventListener("click", () => stepper.nextStep());

  // Navigate back
  document.getElementById("prev-1").addEventListener("click", () => stepper.previousStep());
  document.getElementById("prev-2").addEventListener("click", () => stepper.previousStep());

  // Respond to step arrival
  stepper.addEventListener("sgds-arrived", (e) => {
    const { currentStep, previousStep } = e.detail;
    // Show/hide step panels
    document.querySelectorAll("[id^='step-']").forEach((el, i) => {
      el.hidden = i !== currentStep;
    });
    console.log(`Arrived at step ${currentStep + 1}`);
  });

  // Set up initial step
  stepper.dispatchEvent(new CustomEvent("sgds-arrived", { detail: { currentStep: 0, previousStep: null } }));
</script>
```

---

## Props

| Attribute (JS property) | Type | Default | Description |
|---|---|---|---|
| `steps` | `IStepMetaData[]` | `[]` | Array of step metadata objects |
| `activeStep` | number | `0` | 0-based index of the current step |

### `IStepMetaData` interface

```typescript
interface IStepMetaData {
  title: string;      // Step heading text
  label?: string;     // Optional sublabel
}
```

## Methods

| Method | Description |
|---|---|
| `nextStep()` | Advance to the next step |
| `previousStep()` | Go back to the previous step |
| `goToStep(index)` | Jump to a specific step (0-based) |

## Events

| Event | Description |
|---|---|
| `sgds-arrived` | Fires when the active step changes. `event.detail.currentStep` = new index (0-based). `event.detail.previousStep` = previous index. |

---

## Notes

- `steps` is set as a **JavaScript property**, not an HTML attribute.
- Step content panels are managed by your own code — listen to `sgds-arrived` and show/hide panels accordingly.
- `activeStep` is 0-based.
