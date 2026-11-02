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

const clearValidationStatus = event => {
  event.currentTarget.querySelector("output").textContent = "";
};

const renderValidation = variant => html`
  <form
    class="sgds:flex sgds:flex-col sgds:gap-md sgds:min-w-0"
    @submit=${event => {
      event.preventDefault();
      event.currentTarget.querySelector("output").textContent = "Code submitted successfully.";
    }}
    @reset=${clearValidationStatus}
    @sgds-input=${clearValidationStatus}
    @sgds-invalid=${clearValidationStatus}
  >
    <sgds-otp-input name="code" variant=${variant} prefix=${variant === "with-prefix" ? "KRM-" : ""} required>
      <span slot="label">Verification code</span>
    </sgds-otp-input>
    <div class="sgds:flex sgds:gap-sm">
      <sgds-button type="submit">Verify</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </div>
    <output role="status" aria-live="polite"></output>
  </form>
`;

export const Validation = {
  render: () => html`
    <div class="sgds:flex sgds:flex-col sgds:gap-lg">
      <div>
        Submit an empty or incomplete code to see validation feedback. Enter any six digits to submit successfully.
      </div>
      <div class="sgds:grid sgds:grid-cols-1 sgds:xl:grid-cols-2 sgds:gap-xl sgds:items-start">
        ${renderValidation("numbers-only")} ${renderValidation("with-prefix")}
      </div>
    </div>
  `,
  name: "Validation",
  parameters: { controls: { disable: true } }
};
