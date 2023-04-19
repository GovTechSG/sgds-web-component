import { html } from "lit-html";

export const Template = ({
  name,
  defaultValue,
  disabled,
  isInline,
  radioValue,
  radioId,
  radioSlot,
  radioGroupSlot,
  ariaLabel,
  required,
  invalid,
  invalidFeedback,
}) => {
  return html`
    <sgds-radio-group
      .name=${name}
      .value=${defaultValue}
      .required=${required}
      .invalid=${invalid}
      .invalidFeedback=${invalidFeedback}
    >
      <span slot="label">${radioGroupSlot}</span>
      <sgds-radio
        .value=${radioValue}
        .disabled=${disabled}
        .radioId=${radioId}
        .ariaLabel=${ariaLabel}
        .isInline=${isInline}
        >${radioSlot}</sgds-radio
      >
      <sgds-radio value="2" .isInline=${isInline}>Option 2</sgds-radio>
      <sgds-radio value="3" .isInline=${isInline}>Option 3</sgds-radio>
    </sgds-radio-group>
  `;
};


