import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplate = args =>
  html`
    <form>
      <sgds-radio-group
        label="Select an option"
        required
        name="testRadioGroup1"
        hasFeedback
        invalidFeedback=${ifDefined(args.invalidFeedback)}
      >
        <sgds-radio value="1">Option 1</sgds-radio>
        <sgds-radio value="2">Option 2</sgds-radio>
        <sgds-radio value="3">Option 3</sgds-radio>
      </sgds-radio-group>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
  `;

export const Validation = {
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

export const Invalid = {
  render: Template.bind({}),
  name: "Invalid styles",
  args: { ...args, hasFeedback: true, invalidFeedback: "Feedback", invalid: true },
  parameters: {},
  tags: ["!dev"]
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {},
  tags: ["!dev"]
};
