
    import { Template, args, parameters, play } from "../templates/Textarea/basic.js";

    export default {
      title: 'Components/Textarea',
      component: 'sgds-textarea',
      argTypes: {"name":{"control":"text"},"value":{"defaultValue":"","control":"text"},"minlength":{"control":"number"},"maxlength":{"control":"number"},"spellcheck":{"defaultValue":false,"control":"boolean"},"rows":{"defaultValue":"4","control":"number"},"placeholder":{"defaultValue":"Placeholder","control":"text"},"invalidFeedback":{"defaultValue":"","control":"text"},"autofocus":{"defaultValue":false,"control":"boolean"},"readonly":{"defaultValue":false,"control":"boolean"},"resize":{"defaultValue":"vertical","control":"select","options":["none","vertical","auto"]},"inputmode":{"control":"select","options":["","none","text","decimal","numeric","tel","search","email","url"]},"autocorrect":{"defaultValue":false,"control":"boolean"},"hasFeedback":{"defaultValue":false,"control":"boolean"},"required":{"defaultValue":false,"control":"boolean"},"noValidate":{"defaultValue":false,"control":"boolean"},"hintText":{"defaultValue":"","control":"text"},"validity":{"control":"object"},"validationMessage":{"control":"object"},"label":{"defaultValue":"","control":"text"},"disabled":{"defaultValue":false,"control":"boolean"},"invalid":{"defaultValue":false,"control":"boolean"},"_controlId":{"control":"object"},"_labelId":{"control":"object"}}
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
      <sgds-textarea
        name="textareaValidationExample"
        required
        minLength="5"
        hintText="Minimum 5 characters"
        hasFeedback
        label="Textarea label"
        invalidFeedback=${ifDefined(args.invalidFeedback)}
      ></sgds-textarea>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
  `;

const changeValue = e => {
  e.preventDefault();
  const textarea = document.querySelector("sgds-textarea#default-value-eg");
  textarea.defaultValue = "Default value has changed!";
};

const DefaultValueTemplate = () => html`
  <form>
    <sgds-textarea id="default-value-eg" value="The initial value" label="Textarea label"></sgds-textarea>
    <sgds-button type="reset" class="mt-5">Reset</sgds-button>
    <sgds-button variant="warning" @click=${e => changeValue(e)}>Click to change the default value</sgds-button>
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
  name: "Validation",
  args: { invalidFeedback: "Custom error message" },
  parameters: {},
  tags: ["!dev"]
};

export const DefaultValue = {
  render: DefaultValueTemplate.bind({}),
  name: "Default Value",
  args: {},
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
