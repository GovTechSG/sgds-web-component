import "../../mocks/stepper.ts";
import { html } from "lit";

const ClickableTemplate = args => {
  return html`
    <div class="d-flex-column">
      <div>
        <h5>Steps indicator are not clickable</h5>
        <sgds-stepper activeStep="2">
          <sgds-step stepHeader="Personal Details">
            <div>Description</div>
          </sgds-step>
          <sgds-step stepHeader="Address">
            <div>Description</div>
          </sgds-step>
          <sgds-step stepHeader="Review">
            <div>Description</div>
          </sgds-step>
        </sgds-stepper>
      </div>
      <br />
      <div>
        <h5>Steps indicator are clickable</h5>
        <sgds-stepper activeStep="2" clickable>
          <sgds-step stepHeader="Personal Details">
            <div>Description</div>
          </sgds-step>
          <sgds-step stepHeader="Address">
            <div>Description</div>
          </sgds-step>
          <sgds-step stepHeader="Review">
            <div>Description</div>
          </sgds-step>
        </sgds-stepper>
      </div>
    </div>
  `;
};

const StepComponentTemplate = () => html`
  <sgds-stepper activeStep="0">
    <sgds-step stepHeader="Personal Details">
      <div>Description</div>
    </sgds-step>
    <sgds-step stepHeader="Address">
      <div>Description</div>
    </sgds-step>
    <sgds-step stepHeader="Review">
      <div>Description</div>
    </sgds-step>
  </sgds-stepper>
`;

const StepComponentClickableTemplate = () => html`
  <sgds-stepper activeStep="1" clickable>
    <sgds-step stepHeader="Personal Details">
      <div>Description</div>
    </sgds-step>
    <sgds-step stepHeader="Address">
      <div>Description</div>
    </sgds-step>
    <sgds-step stepHeader="Review">
      <div>Description</div>
    </sgds-step>
  </sgds-stepper>
`;

export const Orientation = {
  render: Template.bind({}),
  name: "Orientation",
  args: { ...args, orientation: "vertical" },
  parameters: {}
};

export const Clickable = {
  render: ClickableTemplate.bind({}),
  name: "Clickable",
  args,
  parameters: {}
};

export const StepComponent = {
  render: StepComponentTemplate.bind({}),
  name: "With sgds-step Children",
  args: {},
  parameters: {}
};

export const StepComponentClickable = {
  render: StepComponentClickableTemplate.bind({}),
  name: "With sgds-step Children (Clickable)",
  args: {},
  parameters: {}
};

const StepStatesTemplate = () => html`
  <sgds-stepper activeStep="1" clickable>
    <sgds-step stepHeader="Personal Details" completed>
      <div>Completed step</div>
    </sgds-step>
    <sgds-step stepHeader="Address" active>
      <div>Active step</div>
    </sgds-step>
    <sgds-step stepHeader="Review" disabled>
      <div>Disabled step</div>
    </sgds-step>
  </sgds-stepper>
`;

export const StepStates = {
  render: StepStatesTemplate.bind({}),
  name: "Step States",
  args: {},
  parameters: {}
};

const SlottedClickableTemplate = () => html`
  <sgds-stepper activeStep="1" clickable>
    <sgds-step stepHeader="Personal Details">
      <div>
        Description
        <sgds-link size="sm">
          <a href="#" data-clickable>Learn more</a>
        </sgds-link>
      </div>
    </sgds-step>
    <sgds-step stepHeader="Address">
      <div>Please fill the form with your current address.</div>
      <sgds-button size="sm" data-clickable @click=${() => alert("Button clicked")}>Action</sgds-button>
    </sgds-step>
    <sgds-step stepHeader="Review">
      <div>Description</div>
    </sgds-step>
  </sgds-stepper>
`;

export const SlottedClickable = {
  render: SlottedClickableTemplate.bind({}),
  name: "Slotted Clickable Items",
  args: {},
  parameters: {}
};

const CustomIconTemplate = () => html`
  <sgds-stepper activeStep="1">
    <sgds-step stepHeader="Personal Details" iconName="user-circle">
      <div>Provide your personal information.</div>
    </sgds-step>
    <sgds-step stepHeader="Address" iconName="geo-alt">
      <div>Enter your address and contact details.</div>
    </sgds-step>
    <sgds-step stepHeader="Review" iconName="check-circle-fill">
      <div>Review all details before submitting.</div>
    </sgds-step>
  </sgds-stepper>
`;

export const CustomIcon = {
  render: CustomIconTemplate.bind({}),
  name: "Custom Icon",
  args: {},
  parameters: {}
};

const MockStepperTemplate = () => html`<mock-stepper></mock-stepper>`;

export const StepperExample = {
  render: MockStepperTemplate.bind({}),
  name: "Stepper example",
  args: {},
  parameters: {}
};
