import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({
  name,
  defaultValue,
  disabled,
  isInline,
  radioValue,
  ariaLabel,
  required,
  invalidFeedback,
  checked,
  invalid,
  hasFeedback
}) => {
  return html`
    <sgds-radio-group
      name=${ifDefined(name)}
      value=${ifDefined(defaultValue)}
      ?required=${required}
      invalidFeedback=${ifDefined(invalidFeedback)}
      ?invalid=${invalid}
      ?hasFeedback=${hasFeedback}
    >
      <span slot="label">Select an option</span>
      <sgds-radio
        value=${ifDefined(radioValue)}
        ?disabled=${disabled}
        ariaLabel=${ifDefined(ariaLabel)}
        ?isInline=${isInline}
        ?checked=${checked}
        invalidFeedback=${ifDefined(invalidFeedback)}
        ?invalid=${invalid}
        ?hasFeedback=${hasFeedback}
        >Option 1</sgds-radio
      >
      <sgds-radio value="2" ?isInline=${isInline}>Option 2</sgds-radio>
      <sgds-radio value="3" ?isInline=${isInline}>Option 3</sgds-radio>
    </sgds-radio-group>
  `;
};

export const args = {};

export const parameters = {};
