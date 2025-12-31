import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({
  name,
  defaultValue,
  disabled,
  radioValue,
  required,
  invalidFeedback,
  checked,
  invalid,
  hasFeedback,
  hintText,
  label
}) => {
  return html`
    <sgds-radio-group
      name=${ifDefined(name)}
      value=${ifDefined(defaultValue)}
      ?required=${required}
      invalidFeedback=${ifDefined(invalidFeedback)}
      ?invalid=${invalid}
      ?hasFeedback=${hasFeedback}
      hintText=${ifDefined(hintText)}
      label=${ifDefined(label)}
    >
      <sgds-radio value=${ifDefined(radioValue)} ?disabled=${disabled} ?checked=${checked} ?invalid=${invalid}
        >Option 1</sgds-radio
      >
      <sgds-radio value="2">Option 2</sgds-radio>
      <sgds-radio value="3">Option 3</sgds-radio>
    </sgds-radio-group>
  `;
};

export const args = {
  hintText: "hint",
  label: "Label"
};

export const parameters = {};
