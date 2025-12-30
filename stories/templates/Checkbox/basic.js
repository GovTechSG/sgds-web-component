import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-checkbox-group
      label=${ifDefined(args.label)}
      invalidFeedback=${ifDefined(args.invalidFeedback)}
      ?hasFeedback=${args.hasFeedback}
      hintText=${ifDefined(args.hintText)}
      ?required=${args.required}
    >
      <sgds-checkbox value="watermelon">Watermelon</sgds-checkbox>
      <sgds-checkbox value="apple">Apple</sgds-checkbox>
      <sgds-checkbox value="lychee">Lychee</sgds-checkbox>
    </sgds-checkbox-group>
    <br />
    <sgds-checkbox
      name=${ifDefined(args.name)}
      ?disabled=${args.disabled}
      value=${ifDefined(args.value)}
      ?required=${args.required}
      ?checked=${args.checked}
      ?invalid=${args.invalid}
      ?indeterminate=${args.indeterminate}
      >Individual Checkbox. I agree to ...Lorem ipsum dolor sit amet. Et itaque natus sit laborum voluptatem aut rerum
      ducimus eum tenetur molestias quo reiciendis ratione aut eaque voluptates est
    </sgds-checkbox>
  `;
};
export const args = {
  name: "checkboxExample1",
  value: "check-me",
  hintText: "Check at least one option",
  label: "CheckboxGroup Label"
};

export const parameters = {};
