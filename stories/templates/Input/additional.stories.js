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
  render: Template.bind({}),
  name: "With leading icon",
  args: {
    ...args,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
    </svg>`
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
