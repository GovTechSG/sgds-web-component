import { html } from "lit-html";

export const Template = ({ steps, activeStep }) => {
  return html` <sgds-stepper .steps=${steps} .activeStep=${activeStep}> </sgds-stepper> `;
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
