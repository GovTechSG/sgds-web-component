import { html } from "lit-html";

export const Template = ({
  noFlip,
  initialValue,
  required,
  minDate,
  maxDate,
  dateFormat,
  disabled,
  menuAlighRight,
  mode
}) =>
  html`
    <sgds-datepicker
      ?noFlip=${noFlip}
      .initialValue=${initialValue}
      ?required=${required}
      minDate=${minDate}
      maxDate=${maxDate}
      dateFormat=${dateFormat}
      ?disabled=${disabled}
      ?menuAlignRight=${menuAlighRight}
      mode=${mode}
    >
    </sgds-datepicker>
  `;

export const args = {};
