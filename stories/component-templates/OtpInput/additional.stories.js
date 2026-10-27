import { html } from "lit";

// Override the generated controls for the OTP-specific choices.
Basic.argTypes = {
  variant: {
    control: { type: "select", labels: { "numbers-only": "Numbers only", "with-prefix": "With prefix" } },
    options: ["numbers-only", "with-prefix"]
  },
  length: {
    name: "Number of digits",
    control: { type: "select" },
    options: [4, 5, 6, 7, 8]
  },
  prefix: { control: "text", if: { arg: "variant", eq: "with-prefix" } }
};

const renderBothVariants = storyArgs => html`
  <div class="sgds:flex sgds:flex-col sgds:gap-xl">
    <div>
      <h3>Numbers only</h3>
      ${Template({ ...storyArgs, variant: "numbers-only", prefix: "" })}
    </div>
    <div>
      <h3>With prefix</h3>
      ${Template({ ...storyArgs, variant: "with-prefix", prefix: "KRM-" })}
    </div>
  </div>
`;

const groupedArgTypes = {
  ...Basic.argTypes,
  variant: { table: { disable: true } },
  prefix: { table: { disable: true } }
};

export const Variants = {
  render: renderBothVariants,
  name: "Variants",
  parameters: { controls: { disable: false, include: ["Number of digits"] } },
  args: { ...args },
  argTypes: groupedArgTypes
};
export const LabelSlot = {
  render: storyArgs => html`<div class="sgds:flex sgds:flex-col sgds:gap-xl">
    <div>
      <h3>With label</h3>
      ${Template(storyArgs)}
    </div>
    <div>
      <h3>No label</h3>
      ${Template({ ...storyArgs, hideLabel: true })}
    </div>
  </div>`,
  name: "Label slot",
  args: { ...args },
  argTypes: Basic.argTypes
};
export const Invalid = {
  render: renderBothVariants,
  name: "Invalid",
  args: { ...args, invalid: true, invalidFeedback: "The code is incorrect or has expired." },
  argTypes: groupedArgTypes
};
