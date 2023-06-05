import { html } from "lit-html";

export const Template = ({ steps, activeStep, namedSlot }) => {
  return html` <sgds-stepper .steps=${steps} .activeStep=${activeStep}> </sgds-stepper> `;
};

export const args = {
  steps: ["Marker 1", "Marker 2", "Marker 3"]
};

// ## Example

// Try out the Stepper Component functionality below with Forms and Buttons

// <Canvas>
//   <Story
//     name='Example'
//     args={{
//       steps: [
//         {
//           title: "1",
//           stepHeader: "Personal Details",
//         },
//         {
//           title: "2",
//           stepHeader: "Address & Contact Information",
//         },
//         {
//           title: "3",
//           stepHeader: "Additional Details",
//         },
//       ],
//       activeStep: 1,
//     }}
//   >
//     {TemplateExample.bind({})}
//   </Story>
// </Canvas>
