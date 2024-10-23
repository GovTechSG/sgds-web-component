import { MockStepper } from "../../mocks/stepper.ts";

export const Orientation = {
  render: Template.bind({}),
  name: "Orientation",
  args: { ...args, orientation: "vertical" },
  parameters: {},
  tags: ["!dev"]
};

const MockStepperTemplate = () => Object.assign(new MockStepper());

export const StepperExample = {
  render: MockStepperTemplate.bind({}),
  name: "Stepper Example",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
