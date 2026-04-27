
    import { Template, args, parameters, play } from "../templates/Radio/basic.js";

    export default {
      title: 'Components/Radio',
      component: 'sgds-radio',
      argTypes: {"value":{"control":"text"},"invalidFeedback":{"defaultValue":"","control":"text"},"hasFeedback":{"defaultValue":false,"control":"boolean"},"required":{"defaultValue":false,"control":"boolean"},"validity":{"control":"object"},"validationMessage":{"control":"object"},"label":{"defaultValue":"","control":"text"},"hintText":{"defaultValue":"","control":"text"},"name":{"control":"text"},"disabled":{"defaultValue":false,"control":"boolean"},"invalid":{"defaultValue":false,"control":"boolean"},"_controlId":{"control":"object"},"_labelId":{"control":"object"},"checked":{"defaultValue":false,"control":"boolean"}}
    }

    export const Basic = {
      render: Template.bind({}),
      name: "Basic",
      args,
      parameters,
      ...(play ? { play } : {}),
    }
  
import { html } from "lit";
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
