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
      required=${ifDefined(required)}
      invalidFeedback=${ifDefined(invalidFeedback)}
      invalid=${ifDefined(invalid)}
      hasFeedback=${ifDefined(hasFeedback)}
    >
      <span slot="label">Select an option</span>
      <sgds-radio
        value=${ifDefined(radioValue)}
        disabled=${ifDefined(disabled)}
        ariaLabel=${ifDefined(ariaLabel)}
        isInline=${ifDefined(isInline)}
        checked=${ifDefined(checked)}
        invalidFeedback=${ifDefined(invalidFeedback)}
        invalid=${ifDefined(invalid)}
        hasFeedback=${ifDefined(hasFeedback)}
        >Option 1</sgds-radio
      >
      <sgds-radio value="2" isInline=${ifDefined(isInline)}>Option 2</sgds-radio>
      <sgds-radio value="3" isInline=${ifDefined(isInline)}>Option 3</sgds-radio>
    </sgds-radio-group>
  `;
};

export const args = {};

export const parameters = {};
