import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ stepHeaders, activeStep, clickable, orientation }) => {
  return html`
    <sgds-stepper activeStep=${ifDefined(activeStep)} ?clickable=${clickable} orientation=${ifDefined(orientation)}>
      ${steps.map(step => html`<sgds-step stepHeader="${step.stepHeader}">${step.description}</sgds-step> `)}
    </sgds-stepper>
  `;
};

export const args = {
  steps: [
    {
      stepHeader: "Personal Details",
      description: "Provide your personal information."
    },
    {
      stepHeader: "Address",
      description: "Enter your address and contact details."
    },
    {
      stepHeader: "Review",
      description: "Review all details before submitting."
    }
  ]
};

export const parameters = {};

export const play = undefined;
