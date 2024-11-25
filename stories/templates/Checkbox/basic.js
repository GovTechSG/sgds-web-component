import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-checkbox-group
      label=${ifDefined(args.label)}
      invalidFeedback=${ifDefined(args.invalidFeedback)}
      ?hasFeedback=${args.hasFeedback}
      hintText=${ifDefined(args.hintText)}
    >
      <sgds-checkbox
        name=${ifDefined(args.name)}
        ?disabled=${args.disabled}
        value=${ifDefined(args.value)}
        ?required=${args.required}
        ?checked=${args.checked}
        ?invalid=${args.invalid}
        ?indeterminate=${args.indeterminate}
        >Check me</sgds-checkbox
      >
      <sgds-checkbox
        >Lorem ipsum dolor sit amet. Et itaque natus sit laborum voluptatem aut rerum ducimus eum tenetur molestias quo
        reiciendis ratione aut eaque voluptates est</sgds-checkbox
      >
    </sgds-checkbox-group>
  `;
};
export const args = {
  name: "checkboxExample1",
  value: "check-me",
  hasFeedback: true,
  hintText: "Check at least one option",
  label: "CheckboxGroup label"
};

export const parameters = {};
