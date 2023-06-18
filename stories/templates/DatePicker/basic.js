import { html } from "lit-html";

export const Template = ({
  noFlip,
  initialValue,
  required,
  buttonClasses,
  inputClasses,
  minDate,
  maxDate,
  dateFormat,
  disabled
}) =>
  html`
    <sgds-datepicker
      .noFlip=${noFlip}
      .initialValue=${initialValue}
      .required=${required}
      .buttonClasses=${buttonClasses}
      .inputClasses=${inputClasses}
      .minDate=${minDate}
      .maxDate=${maxDate}
      .dateFormat=${dateFormat}
      .disabled=${disabled}
    >
    </sgds-datepicker>
  `;
export const args = {};
