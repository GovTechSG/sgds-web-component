import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ stepHeaders, activeStep, clickable, orientation }) => {
  return html`
    <sgds-stepper activeStep=${ifDefined(activeStep)} ?clickable=${clickable} orientation=${ifDefined(orientation)}>
      ${stepHeaders.map(header => html`<sgds-step stepHeader="${header}"></sgds-step> `)}
    </sgds-stepper>
  `;
};

export const args = {
  stepHeaders: ["Personal Details", "Address and Contact Information", "Review"]
};

export const parameters = {};

export const play = undefined;
