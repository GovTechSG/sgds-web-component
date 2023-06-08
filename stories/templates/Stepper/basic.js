import { html } from "lit-html";

export const Template = ({ steps, activeStep }) => {
  return html` <sgds-stepper .steps=${steps} .activeStep=${activeStep}> </sgds-stepper> `;
};

export const args = {
  steps: ["Marker 1", "Marker 2", "Marker 3"]
};
