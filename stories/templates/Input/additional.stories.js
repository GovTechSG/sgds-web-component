import { html } from "lit-html";

export const ValidationTemplate = () =>
  html` <sgds-input
    name="input1"
    id="input1"
    minlength="5"
    hasFeedback="true"
    invalidFeedback="Minimum length 5"
    hintText="At least 5 characters"
    label="Name"
  >
  </sgds-input>`;

export const InputValidation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
