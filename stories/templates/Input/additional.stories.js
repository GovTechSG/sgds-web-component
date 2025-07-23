import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplate = args =>
  html`
    <form>
      <sgds-input
        name="input1"
        id="input1"
        minlength="5"
        hasFeedback="both"
        hintText="At least 5 characters"
        label="Name"
        required
        invalidFeedback=${ifDefined(args.invalidFeedback)}
      >
      </sgds-input>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
  `;

const LeadingIconTemplate = args =>
  html`
    <sgds-input name="leading-icon-input" id="leading-icon-input" hintText="with leading icon" label="Leading Icon">
      <sgds-icon slot="icon" name="telephone"></sgds-icon>
    </sgds-input>
  `;
export const DisabledInput = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {},
  tags: ["!dev"]
};

export const InvalidInput = {
  render: Template.bind({}),
  name: "Invalid",
  args: { ...args, hasFeedback: true, invalid: true, invalidFeedback: "Invalid input detected" },
  parameters: {},
  tags: ["!dev"]
};

export const ValidInput = {
  render: Template.bind({}),
  name: "Valid",
  args: { ...args, hasFeedback: true, valid: true },
  parameters: {},
  tags: ["!dev"]
};

export const LoadingInput = {
  render: Template.bind({}),
  name: "Loading",
  args: { ...args, hasFeedback: true, loading: true },
  parameters: {},
  tags: ["!dev"]
};

export const ReadonlyInput = {
  render: Template.bind({}),
  name: "Read only",
  args: { ...args, readonly: true, value: "readonly input" },
  parameters: {},
  tags: ["!dev"]
};

export const PrefixInput = {
  render: Template.bind({}),
  name: "With prefix",
  args: { ...args, prefix: "prefix" },
  parameters: {},
  tags: ["!dev"]
};
export const SuffixInput = {
  render: Template.bind({}),
  name: "With suffix",
  args: { ...args, suffix: "suffix" },
  parameters: {},
  tags: ["!dev"]
};

export const LeadingIcon = {
  render: LeadingIconTemplate.bind({}),
  name: "With leading icon",
  args: {
    ...args
  },
  parameters: {},
  tags: ["!dev"]
};

export const InputValidation = {
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
