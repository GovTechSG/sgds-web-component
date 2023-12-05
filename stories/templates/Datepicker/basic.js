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
    <div style="height:400px;">
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
    </div>
  `;

export const args = {
  minDate: "2020-01-01T12:00:00.000Z",
  maxDate: "2030-12-30T12:00:00.000Z"
};
export const parameters = {};
