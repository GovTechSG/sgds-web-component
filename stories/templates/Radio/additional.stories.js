import { html } from "lit-html";

const ValidationTemplate = () =>
  html`
    <form>
      <sgds-radio-group required hasFeedback invalidFeedback="This is required">
        <span slot="label">Select an option</span>
        <sgds-radio value="1">Option 1</sgds-radio>
        <sgds-radio value="2">Option 2</sgds-radio>
        <sgds-radio value="3">Option 3</sgds-radio>
      </sgds-radio-group>
      <sgds-button type="submit">Submit</sgds-button>
    </form>
  `;

export const Validation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
