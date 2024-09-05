import { MockStepper } from "../../mocks/stepper.ts";

const MockStepperTemplate = () => Object.assign(new MockStepper());

export const StepperExample = {
  render: MockStepperTemplate.bind({}),
  name: "Stepper Example",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
