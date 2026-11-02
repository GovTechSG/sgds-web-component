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

const submitCustomValidation = event => {
  event.preventDefault();
  const form = event.currentTarget;
  const field = form.elements.namedItem("code");
  const message =
    field.value.length !== 6
      ? "Enter a 6-digit code."
      : field.value !== "123456"
      ? "The code is incorrect or has expired."
      : "";

  field.invalidFeedback = message;
  field.setInvalid(Boolean(message));
  if (message) field.focus();
  form.querySelector("output").textContent = message ? "" : "Code verified successfully.";
};

const submitValidation = event => {
  event.preventDefault();
  event.currentTarget.querySelector("output").textContent = "Code submitted successfully.";
};

const renderValidation = (variant, custom = false) => html`
  <form
    class="sgds:flex sgds:flex-col sgds:gap-md sgds:min-w-0"
    @submit=${custom ? submitCustomValidation : submitValidation}
    @reset=${clearValidationStatus}
    @sgds-input=${clearValidationStatus}
    @sgds-invalid=${clearValidationStatus}
  >
    <sgds-otp-input
      name="code"
      variant=${variant}
      prefix=${variant === "with-prefix" ? "KRM-" : ""}
      required
      ?noValidate=${custom}
    >
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
    <div class="sgds:grid sgds:grid-cols-1 sgds:xl:grid-cols-2 sgds:gap-xl sgds:items-start">
      ${renderValidation("numbers-only")} ${renderValidation("with-prefix")}
    </div>
  `,
  name: "Validation",
  parameters: { controls: { disable: true } }
};

export const CustomValidation = {
  render: () => html`
    <div class="sgds:grid sgds:grid-cols-1 sgds:xl:grid-cols-2 sgds:gap-xl sgds:items-start">
      ${renderValidation("numbers-only", true)} ${renderValidation("with-prefix", true)}
    </div>
  `,
  name: "Custom validation",
  parameters: { controls: { disable: true } }
};
