import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplateGroup = args =>
  html`
    <form class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
      <sgds-checkbox-group required hasFeedback id="sameid">
        <sgds-checkbox value="he">he</sgds-checkbox>
        <sgds-checkbox value="him">him</sgds-checkbox>
      </sgds-checkbox-group>

      <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
        <sgds-button type="submit">Submit</sgds-button>
        <sgds-button type="reset" variant="ghost">Reset</sgds-button>
      </div>
    </form>
  `;

const ValidationTemplateSingle = args =>
  html`
    <form class="sgds:flex sgds:flex-col sgds:gap-layout-xs">
      <sgds-checkbox value="marketing" required hasFeedback="both">I acknowledge to receive marketing...</sgds-checkbox>
      <sgds-checkbox value="subcribe" hasFeedback="both">I agree to subscribe to...</sgds-checkbox>
      <div class="sgds:flex sgds:justify-end sgds:gap-component-xs">
        <sgds-button type="submit">Submit</sgds-button>
        <sgds-button type="reset" variant="ghost">Reset</sgds-button>
      </div>
    </form>
  `;

const InvalidTemplate = () =>
  html`
    <div class="sgds-grid">
      <sgds-checkbox
        class="sgds-col-4 sgds-col-sm-4"
        invalid
        hasFeedback="both"
        invalidFeedback="custom feedback message"
        >Invalid</sgds-checkbox
      >
      <sgds-checkbox
        class="sgds-col-4 sgds-col-sm-4"
        invalid
        checked
        hasFeedback="both"
        invalidFeedback="custom feedback message"
        >Invalid and checked</sgds-checkbox
      >
      <sgds-checkbox
        class="sgds-col-4 sgds-col-sm-4"
        invalid
        indeterminate
        hasFeedback="both"
        invalidFeedback="custom feedback message"
        >Invalid and indeterminate</sgds-checkbox
      >
    </div>
  `;

const InvalidGroupTemplate = () =>
  html`
    <sgds-checkbox-group invalid hasFeedback label="CheckboxGroup label" invalidFeedback="custom feedback message">
      <sgds-checkbox>Option A </sgds-checkbox>
      <sgds-checkbox>Option B </sgds-checkbox>
      <sgds-checkbox>Option C</sgds-checkbox>
    </sgds-checkbox-group>
  `;

export const Indeterminate = {
  render: Template.bind({}),
  name: "Indeterminate",
  args: { ...args, indeterminate: true },
  parameters: {}
};
export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {}
};

export const Invalid = {
  render: InvalidTemplate.bind({}),
  name: "Invalid states",
  args: {},
  parameters: {}
};
export const InvalidGroup = {
  render: InvalidGroupTemplate.bind({}),
  name: "Invalid CheckboxGroup",
  args: {},
  parameters: {}
};
export const Validation = {
  render: ValidationTemplateGroup.bind({}),
  name: "Validation for CheckboxGroup",
  args: {},
  parameters: {}
};

export const ValidationSingle = {
  render: ValidationTemplateSingle.bind({}),
  name: "Validation for standalone Checkbox",
  args: {},
  parameters: {}
};

export const OverrideInvalidFeedback = {
  render: ValidationTemplateGroup.bind({}),
  name: "Override default invalid feedback",
  args: { invalidFeedback: "Custom error message" },
  parameters: {}
};
