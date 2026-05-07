import "../../mocks/stepper.ts";
import { html } from "lit";

const ClickableTemplate = args => {
  return html`
    <div class="d-flex-column">
      <div>
        <h5>Steps indicator are not clickable</h5>
        <sgds-stepper activeStep="2">
          <sgds-step stepHeader="Personal Details"></sgds-step>
          <sgds-step stepHeader="Address"></sgds-step>
          <sgds-step stepHeader="Review"></sgds-step>
        </sgds-stepper>
      </div>
      <div>
        <h5>Steps indicator are clickable</h5>
        <sgds-stepper activeStep="2" clickable>
          <sgds-step stepHeader="Personal Details"></sgds-step>
          <sgds-step stepHeader="Address"></sgds-step>
          <sgds-step stepHeader="Review"></sgds-step>
        </sgds-stepper>
      </div>
    </div>
  `;
};

const StepComponentTemplate = () => html`
  <sgds-stepper activeStep="0">
    <sgds-step stepHeader="Personal Details"></sgds-step>
    <sgds-step stepHeader="Address"></sgds-step>
    <sgds-step stepHeader="Review"></sgds-step>
  </sgds-stepper>
`;

const StepComponentClickableTemplate = () => html`
  <sgds-stepper activeStep="1" clickable>
    <sgds-step stepHeader="Personal Details"></sgds-step>
    <sgds-step stepHeader="Address"></sgds-step>
    <sgds-step stepHeader="Review"></sgds-step>
  </sgds-stepper>
`;

export const Orientation = {
  render: Template.bind({}),
  name: "Orientation",
  args: { ...args, orientation: "vertical" },
  parameters: {},
  tags: ["!dev"]
};

export const Clickable = {
  render: ClickableTemplate.bind({}),
  name: "Clickable",
  args,
  parameters: {},
  tags: ["!dev"]
};

export const StepComponent = {
  render: StepComponentTemplate.bind({}),
  name: "With sgds-step Children",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const StepComponentClickable = {
  render: StepComponentClickableTemplate.bind({}),
  name: "With sgds-step Children (Clickable)",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

const MockStepperTemplate = () => html`<mock-stepper></mock-stepper>`;

export const StepperExample = {
  render: MockStepperTemplate.bind({}),
  name: "Stepper Example",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
