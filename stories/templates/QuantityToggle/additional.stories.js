import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplate = args =>
  html`
    <form>
      <sgds-quantity-toggle
        name="QT1"
        id="QT1"
        min="3"
        hasFeedback="both"
        hintText="Hint text"
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
  parameters: {},
  tags: ["!dev"]
};

export const InvalidQT = {
  render: Template.bind({}),
  name: "Invalid",
  args: { ...args, hasFeedback: "both", invalid: true, invalidFeedback: "Invalid QT detected" },
  parameters: {},
  tags: ["!dev"]
};

export const QTValidation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const OverrideInvalidFeedback = {
  render: ValidationTemplate.bind({}),
  name: "Override default invalid feedback",
  args: { invalidFeedback: "Custom error message" },
  parameters: {},
  tags: ["!dev"]
};
