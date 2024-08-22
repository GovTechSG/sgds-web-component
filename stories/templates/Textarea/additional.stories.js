import { html } from "lit-html";

const ValidationTemplate = () =>
  html` <sgds-textarea required hasFeedback invalidFeedback="This is required"></sgds-textarea> `;

export const Validation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};


const changeValue = e => {
  e.preventDefault();
  const textarea = document.querySelector("sgds-textarea#default-value-eg");
  textarea.defaultValue = "Default value has changed!";
};

const DefaultValueTemplate = () => html`
  <form>
    <sgds-textarea id="default-value-eg" value="The initial value"></sgds-textarea>
    <sgds-button type="reset" class="mt-5">Reset</sgds-button>
    <sgds-button variant="warning" @click=${e => changeValue(e)}>Click to change the default value</sgds-button>
  </form>
`;
export const DefaultValue = {
  render: DefaultValueTemplate.bind({}),
  name: "Default Value",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
