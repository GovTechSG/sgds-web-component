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
  mode,
  invalidFeedback,
  label,
  hintText,
  drop,
  displayDate
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
        invalidFeedback=${invalidFeedback}
        label=${label}
        hintText=${hintText}
        drop=${drop}
        displayDate=${displayDate}
      >
      </sgds-datepicker>
    </div>
  `;

export const args = {
  minDate: "1920-01-01T16:00:00.000Z",
  maxDate: "2030-12-02T12:00:00.000Z",
  label: "Birthdate",
  hintText: "Born after 1920"
};
export const parameters = {};
