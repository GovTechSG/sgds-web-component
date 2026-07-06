import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplate = args =>
  html`
    <form class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
      <sgds-radio-group
        label="Select an option"
        required
        name="testRadioGroup1"
        hasFeedback
        invalidFeedback=${ifDefined(args.invalidFeedback)}
      >
        <sgds-radio value="1">Option 1</sgds-radio>
        <sgds-radio value="2">Option 2</sgds-radio>
        <sgds-radio value="3">Option 3</sgds-radio>
      </sgds-radio-group>
      <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
        <sgds-button type="reset" variant="ghost">Reset</sgds-button>
        <sgds-button type="submit">Submit</sgds-button>
      </div>
    </form>
  `;

export const Invalid = {
  render: Template.bind({}),
  name: "Invalid styles",
  args: { ...args, hasFeedback: true, invalidFeedback: "Feedback", invalid: true },
  parameters: {}
};

export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {}
};

export const Autofocus = {
  render: Template.bind({}),
  name: "Autofocus",
  args: { ...args, autofocus: true },
  parameters: {}
};

export const Validation = {
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

const NoValidateTemplate = () => {
  return html`
    <form id="novalidate-radio-story-form" class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
      <sgds-radio-group
        noValidate
        required
        label="Gender"
        hintText="Custom validation: must select a gender"
        hasFeedback
        id="novalidate-radio-story"
      >
        <sgds-radio value="male">Male</sgds-radio>
        <sgds-radio value="female">Female</sgds-radio>
        <sgds-radio value="other">Other</sgds-radio>
      </sgds-radio-group>
      <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
        <sgds-button type="reset" variant="ghost">Reset</sgds-button>
        <sgds-button type="submit">Submit</sgds-button>
      </div>
    </form>
    <script>
      const noValidateRadio = document.querySelector("#novalidate-radio-story");
      const noValidateRadioForm = document.querySelector("#novalidate-radio-story-form");

      noValidateRadio.addEventListener("sgds-change", e => {
        if (!e.target.value) {
          e.target.setInvalid(true);
          e.target.invalidFeedback = "Please select a gender";
        } else {
          e.target.setInvalid(false);
        }
      });

      noValidateRadioForm.addEventListener("submit", e => {
        e.preventDefault();
        if (!noValidateRadio.value) {
          noValidateRadio.setInvalid(true);
          noValidateRadio.invalidFeedback = "Please select a gender";
          return;
        }
        if (noValidateRadio.invalid) return;
        alert(
          "Form submitted successfully despite required field — constraint validation was disabled by the noValidate property."
        );
      });
    </script>
  `;
};

export const NoValidate = {
  render: NoValidateTemplate.bind({}),
  name: "Custom Validation with noValidate",
  args: {},
  parameters: {}
};
