import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplate = args =>
  html`
    <form>
      <sgds-quantity-toggle
        class="sgds:mb-layout-sm"
        name="QT1"
        id="QT1"
        min="3"
        hasFeedback="both"
        hintText="Minimum value is 3"
        label="Label"
        invalidFeedback=${ifDefined(args.invalidFeedback)}
      >
      </sgds-quantity-toggle>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
  `;

export const DisabledQT = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {}
};

export const InvalidQT = {
  render: Template.bind({}),
  name: "Invalid",
  args: { ...args, hasFeedback: "both", invalid: true, invalidFeedback: "Invalid QT detected" },
  parameters: {}
};

export const QTValidation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {}
};

export const OverrideInvalidFeedback = {
  render: ValidationTemplate.bind({}),
  name: "Override default invalid feedback",
  args: { invalidFeedback: "Custom error message" },
  parameters: {}
};

const NoValidateTemplate = () =>
  html`
    <form id="novalidate-qt-story-form">
      <sgds-quantity-toggle
        class="sgds:mb-layout-sm"
        noValidate
        hasFeedback="both"
        label="Quantity"
        hintText="Custom validation: value must be a multiple of 5"
        id="novalidate-qt-story"
      ></sgds-quantity-toggle>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
    <script>
      const noValidateQt = document.querySelector("#novalidate-qt-story");
      const noValidateQtForm = document.querySelector("#novalidate-qt-story-form");

      noValidateQt.addEventListener("sgds-change", e => {
        if (e.target.value === 0) {
          e.target.setInvalid(false);
          return;
        }
        if (e.target.value % 5 !== 0) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Custom feedback: value must be a multiple of 5";
        } else {
          e.target.setInvalid(false);
        }
      });

      noValidateQtForm.addEventListener("submit", e => {
        e.preventDefault();
        if (noValidateQt.value === 0) {
          noValidateQt.setInvalid(true);
          noValidateQt.invalidFeedback = "Custom feedback: enter a quantity";
          return;
        }
        if (noValidateQt.invalid) return;
        alert("Submitted: " + noValidateQt.value);
      });
    </script>
  `;

export const NoValidate = {
  render: NoValidateTemplate.bind({}),
  name: "Custom Validation with noValidate",
  args: {},
  parameters: {}
};

const EventEmissionTemplate = () =>
  html`
    <sgds-quantity-toggle
      label="Quantity"
      hintText="Type a number or use +/- buttons, then check the output below"
      id="event-demo-qt"
    ></sgds-quantity-toggle>
    <div class="sgds:mt-layout-xs">
      <strong>Event log:</strong>
      <pre id="event-demo-log" style="background: var(--sgds-color-gray-100); padding: 0.5rem; min-height: 80px; overflow-y: auto; max-height: 200px;"></pre>
    </div>
    <script>
      const eventDemoQt = document.querySelector("#event-demo-qt");
      const eventDemoLog = document.querySelector("#event-demo-log");

      eventDemoQt.addEventListener("sgds-input", e => {
        const line = document.createElement("div");
        line.textContent = "[sgds-input] value = " + e.target.value;
        eventDemoLog.prepend(line);
      });

      eventDemoQt.addEventListener("sgds-change", e => {
        const line = document.createElement("div");
        line.textContent = "[sgds-change] value = " + e.target.value;
        line.style.color = "var(--sgds-color-primary)";
        eventDemoLog.prepend(line);
      });
    </script>
  `;

export const EventEmission = {
  render: EventEmissionTemplate.bind({}),
  name: "Event Emission",
  args: {},
  parameters: {}
};
