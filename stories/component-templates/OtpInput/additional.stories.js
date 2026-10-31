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

const renderVariants = storyArgs => html`
  <div class="sgds:grid sgds:grid-cols-1 sgds:xl:grid-cols-2 sgds:gap-xl sgds:items-start">
    <div class="sgds:min-w-0">${Template({ ...storyArgs, variant: "numbers-only", prefix: "" })}</div>
    <div class="sgds:min-w-0">${Template({ ...storyArgs, variant: "with-prefix" })}</div>
  </div>
`;

const groupedArgTypes = {
  ...Basic.argTypes,
  variant: { table: { disable: true } },
  prefix: { control: "text" }
};

export const Variants = {
  render: renderVariants,
  name: "Variants",
  args: { ...args },
  argTypes: groupedArgTypes
};

export const LabelSlot = {
  render: storyArgs => html`
    <div class="sgds:flex sgds:flex-col sgds:gap-xl">
      ${renderVariants({ ...storyArgs, hideLabel: true })}
      ${renderVariants({
        ...storyArgs,
        labelContent: html`<span slot="label" class="sgds:font-regular"
          >Enter verification code sent to <span class="sgds:font-semibold">xxx@gov.sg</span></span
        >`
      })}
    </div>
  `,
  name: "Label slot",
  args: { ...args },
  argTypes: groupedArgTypes
};
