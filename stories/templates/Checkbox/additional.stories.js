import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

const ValidationTemplate = args =>
  html`
    <form>
      <sgds-checkbox-group required hasFeedback id="sameid">
        <sgds-checkbox value="he">he</sgds-checkbox>
        <sgds-checkbox value="him">him</sgds-checkbox>
      </sgds-checkbox-group>

      <sgds-button type="submit">Submit</sgds-button>
      <sgds-button type="reset" variant="ghost">Reset</sgds-button>
    </form>
  `;

const InvalidTemplate = () =>
  html`
    <sgds-checkbox invalid hasFeedback>Invalid</sgds-checkbox>
    <sgds-checkbox invalid checked hasFeedback>Invalid and checked</sgds-checkbox>
    <sgds-checkbox invalid indeterminate hasFeedback>Invalid and indeterminate</sgds-checkbox>
  `;

const InvalidGroupTemplate = () =>
  html`
    <sgds-checkbox-group hasFeedback label="CheckboxGroup label" invalidFeedback="custom feedback message">
      <sgds-checkbox invalid>Invalid</sgds-checkbox>
      <sgds-checkbox invalid checked>Invalid and checked</sgds-checkbox>
      <sgds-checkbox invalid indeterminate>Invalid and indeterminate</sgds-checkbox>
    </sgds-checkbox-group>
  `;

export const Indeterminate = {
  render: Template.bind({}),
  name: "Indeterminate",
  args: { ...args, indeterminate: true },
  parameters: {},
  tags: ["!dev"]
};
export const Disabled = {
  render: Template.bind({}),
  name: "Disabled",
  args: { ...args, disabled: true },
  parameters: {},
  tags: ["!dev"]
};

export const Invalid = {
  render: InvalidTemplate.bind({}),
  name: "Invalid states",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const InvalidGroup = {
  render: InvalidGroupTemplate.bind({}),
  name: "Invalid CheckboxGroup",
  args: {},
  parameters: {},
  tags: ["!dev"]
};
export const Validation = {
  render: ValidationTemplate.bind({}),
  name: "Validation",
  args: {},
  parameters: {},
  tags: ["!dev"]
};

export const OverrideInvalidFeedback = {
  render: ValidationTemplate.bind({}),
  name: "Override default invalid feedback",
  args: { invalidFeedback: "Custom error message" },
  parameters: {},
  tags: ["!dev"]
};
