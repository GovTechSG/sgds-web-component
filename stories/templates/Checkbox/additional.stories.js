import { html } from "lit-html";

const ValidationTemplate = () =>
  html`
    <form>
      <sgds-checkbox required hasFeedback invalidFeedback="This is required">Check me</sgds-checkbox>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
  `;

export const CheckboxValidations = {
  render: CardAsRadioTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
