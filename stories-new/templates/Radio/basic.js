import { html } from "lit-html";

export const Template = ({
  name,
  defaultValue,
  disabled,
  isInline,
  radioValue,
  ariaLabel,
  required,
  invalidFeedback,
  checked
}) => {
  return html`
    <sgds-radio-group .name=${name} .value=${defaultValue} .required=${required} .invalidFeedback=${invalidFeedback}>
      <span slot="label">Select an option</span>
      <sgds-radio
        .value=${radioValue}
        .disabled=${disabled}
        .ariaLabel=${ariaLabel}
        .isInline=${isInline}
        ?checked=${checked}
        >Option 1</sgds-radio
      >
      <sgds-radio value="2" .isInline=${isInline}>Option 2</sgds-radio>
      <sgds-radio value="3" .isInline=${isInline}>Option 3</sgds-radio>
    </sgds-radio-group>
  `;
};

export const args = {};

export const parameters = {};
