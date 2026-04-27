import "../../mocks/stepper.ts";
import { html } from "lit";

const ClickableTemplate = args => {
  return html`
    <div class="d-flex-column">
      <div>
        <h5>Steps indicator are not clickable</h5>
        <sgds-stepper .steps=${args.steps} activeStep="2"></sgds-stepper>
      </div>
      <div>
        <h5>Steps indicator are clickable</h5>
        <sgds-stepper .steps=${args.steps} clickable activeStep="2"></sgds-stepper>
      </div>
    </div>
  `;
};

export const Orientation = {
  render: Template.bind({}),
  name: "Orientation",
  args: { ...args, orientation: "vertical" },
  parameters: {},
  tags: ["!dev"]
};

export const Clickable = {
  render: ClickableTemplate.bind({}),
  name: "Orientation",
  args,
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
