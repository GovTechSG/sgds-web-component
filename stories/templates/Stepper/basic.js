import { html } from "lit-html";


export const Template = ({ steps, activeStep, namedSlot }) => {
  return html`
    <sgds-stepper .steps=${steps} .activeStep=${activeStep}> </sgds-stepper>
  `;
};

export const TemplateExample = ({ steps, activeStep, namedSlot }) => {
  return html`
    <sgds-stepper id="myStepper" .steps=${steps} .activeStep=${activeStep}>
      <div slot="step-1" class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <sgds-input
                label="First Name"
                hintText="Enter first name"
                required
              ></sgds-input>
              <sgds-input
                label="Last Name"
                hintText="Enter last name"
                required
              ></sgds-input>
              <sgds-radio-group required>
                <sgds-radio value="1" isInline>Option 1</sgds-radio>
                <sgds-radio value="2" isInline>Option 2</sgds-radio>
              </sgds-radio-group>
            </form>
          </div>
        </div>
      </div>
      <div slot="step-2" class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <sgds-input
                label="Email"
                hintText="Enter email"
                required
              ></sgds-input>
              <sgds-input
                label="Address"
                hintText="eg. Blk 243 Sengkang Avenue #02-11"
                required
              ></sgds-input>
            </form>
          </div>
        </div>
      </div>
      <div slot="step-3" class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <sgds-input label="Contact Number" required></sgds-input>
              <sgds-input label="Employment history" required></sgds-input>
            </form>
          </div>
        </div>
      </div>
    </sgds-stepper>
    <div class="d-flex justify-content-between">
      <div>
        <sgds-button
          class="me-3"
          refId="myStepper"
          methodType="increment"
          variant="primary"
          @click="${incrementStep}"
          >Next</sgds-button
        >
        <sgds-button
          refId="myStepper"
          methodType="decrement"
          @click="${decrementStep}"
          variant="secondary"
          >Back</sgds-button
        >
      </div>
      <div>
        <sgds-button
          class="m-2"
          refId="myStepper"
          methodType="first"
          variant="danger"
          @click="${firstStep}"
          >Go to first page</sgds-button
        >
        <sgds-button
          class="m-2"
          refId="myStepper"
          methodType="last"
          variant="warning"
          @click="${lastStep}"
          >Go to last page</sgds-button
        >
      </div>
    </div>
  `;
};

export const incrementStep = () => {
  const stepper = document.querySelector('#myStepper')
  stepper.incrementStep()
} 
export const decrementStep = () => {
  const stepper = document.querySelector('#myStepper')
  stepper.decrementStep()
}
export const lastStep = () => {
  const stepper = document.querySelector('#myStepper')
  stepper.lastStep()
}
export const firstStep = () => {
  const stepper = document.querySelector('#myStepper')
  stepper.firstStep()
}

export const args = {
    steps: [
      {
        title: "1",
        stepHeader: "Marker 1",
      },
      {
        title: "2",
        stepHeader: "Marker 2",
      },
      {
        title: "3",
        stepHeader: "Marker 3",
      },
    ],
  }

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
