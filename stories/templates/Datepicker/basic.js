import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

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
        minDate=${ifDefined(minDate)}
        maxDate=${ifDefined(maxDate)}
        dateFormat=${ifDefined(dateFormat)}
        ?disabled=${disabled}
        menuAlignRight=${ifDefined(menuAlighRight)}
        mode=${ifDefined(mode)}
        invalidFeedback=${ifDefined(invalidFeedback)}
        label=${ifDefined(label)}
        hintText=${ifDefined(hintText)}
        drop=${ifDefined(drop)}
        displayDate=${ifDefined(displayDate)}
      >
      </sgds-datepicker>
    </div>
  `;

export const args = {
  initialValue: ["19/02/1990"],
  minDate: "1920-01-01T16:00:00.000Z",
  maxDate: "2030-12-02T12:00:00.000Z",
  label: "Birthdate",
  hintText: "Born after 1920"
};
export const parameters = {};
