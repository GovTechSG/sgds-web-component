import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ steps, activeStep, clickable, orientation }) => {
  return html`
    <sgds-stepper
      .steps=${steps}
      activeStep=${ifDefined(activeStep)}
      ?clickable=${clickable}
      orientation=${ifDefined(orientation)}
    >
    </sgds-stepper>
  `;
};

export const args = {
  steps: [
    {
      stepHeader: "Personal Details",
      component: "1 test"
    },
    {
      stepHeader: "Address and Contact Information",
      component: "2 test"
    },
    {
      stepHeader: "Review",
      component: "3 test"
    }
  ]
};

export const parameters = {};
