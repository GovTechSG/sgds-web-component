import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplate = args =>
  html`
    <form>
      <sgds-input
        name="input1"
        id="input1"
        minlength="5"
        hasFeedback="both"
        hintText="At least 5 characters"
        label="Name"
        required
        invalidFeedback=${ifDefined(args.invalidFeedback)}
      >
      </sgds-input>
      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
  `;

const LeadingIconTemplate = args =>
  html`
    <sgds-input name="leading-icon-input" id="leading-icon-input" hintText="with leading icon" label="Leading Icon">
      <sgds-icon slot="icon" name="telephone"></sgds-icon>
    </sgds-input>
  `;
const TrailingIconTemplate = args =>
  html`
    <sgds-input name="trailing-icon-input" id="trailing-icon-input" hintText="with trailing icon" label="Trailing Icon">
      <sgds-icon slot="trailing-icon" name="telephone"></sgds-icon>
    </sgds-input>
  `;
const ActionTemplate = args =>
  html`
    <sgds-input name="action-input" id="action-input" hintText="with action" label="Action">
      <sgds-icon-button slot="action" name="trash" id="call-to-action">Action</sgds-icon-button>
    </sgds-input>

    <script>
      const button = document.querySelector("sgds-icon-button#call-to-action");
      const input = document.querySelector("sgds-input#action-input");
      button.addEventListener("click", () => {
        input.value = "";
      });
    </script>
  `;
export const PasswordInput = {
  render: Template.bind({}),
  name: "Password",
  args: { ...args, type: "password" },
  parameters: {}
};
export const DisabledInput = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {}
};

export const InvalidInput = {
  render: Template.bind({}),
  name: "Invalid",
  args: { ...args, hasFeedback: true, invalid: true, invalidFeedback: "Invalid input detected" },
  parameters: {}
};

export const ValidInput = {
  render: Template.bind({}),
  name: "Valid",
  args: { ...args, hasFeedback: true, valid: true },
  parameters: {}
};

export const LoadingInput = {
  render: Template.bind({}),
  name: "Loading",
  args: { ...args, hasFeedback: true, loading: true },
  parameters: {}
};

export const ReadonlyInput = {
  render: Template.bind({}),
  name: "Read only",
  args: { ...args, readonly: true, value: "readonly input" },
  parameters: {}
};

export const PrefixInput = {
  render: Template.bind({}),
  name: "With prefix",
  args: { ...args, prefix: "prefix" },
  parameters: {}
};
export const SuffixInput = {
  render: Template.bind({}),
  name: "With suffix",
  args: { ...args, suffix: "suffix" },
  parameters: {}
};

export const LeadingIcon = {
  render: LeadingIconTemplate.bind({}),
  name: "With leading icon",
  args: {
    ...args
  },
  parameters: {}
};
export const TrailingIcon = {
  render: TrailingIconTemplate.bind({}),
  name: "With trailing icon",
  args: {
    ...args
  },
  parameters: {}
};

export const Action = {
  render: ActionTemplate.bind({}),
  name: "With action",
  args: {
    ...args
  },
  parameters: {}
};

export const InputValidation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {}
};

export const OverrideInvalidFeedback = {
  render: ValidationTemplate.bind({}),
  name: "Override default invalid feedback",
  args: { invalidFeedback: "Custom error message" },
  parameters: {}
};

const AutocompleteTemplate = () =>
  html`
    <div style="display:flex;flex-direction:column;gap:2rem;">
      <div>
        <p><strong>autocomplete="on"</strong> (default) — browser may suggest previously entered values</p>
        <sgds-input
          name="name"
          autocomplete="on"
          label="Name"
          placeholder="Enter your name"
          hintText="Browser autocomplete enabled"
        ></sgds-input>
      </div>
      <div>
        <p><strong>autocomplete="off"</strong> — browser autocomplete suppressed</p>
        <sgds-input
          name="name"
          autocomplete="off"
          label="Name"
          placeholder="Enter your name"
          hintText="Browser autocomplete disabled"
        ></sgds-input>
      </div>
    </div>
  `;

export const Autocomplete = {
  render: AutocompleteTemplate.bind({}),
  name: "Autocomplete prop",
  args: {},
  parameters: {}
};
