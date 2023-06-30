import { PropertyValueMap, html } from "lit";
import { customElement } from "lit/decorators.js";
import SgdsElement from "../src/base/sgds-element";
import { SgdsStepper } from "../src/components/Stepper";

@customElement("mock-stepper")
export class MockStepper extends SgdsElement {
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-arrived", () => {
      this.currentStep = this.getStepper().activeStep;
      this.component = this.getCurrentComponent();
      this.requestUpdate();
    });
  }
  currentStep: number = 2;
  getStepper() {
    return this.shadowRoot?.querySelector("sgds-stepper") as SgdsStepper;
  }
  reset() {
    this.getStepper().reset();
  }
  nextStep() {
    this.getStepper().nextStep();
  }
  previousStep() {
    this.getStepper().previousStep();
  }
  lastStep() {
    this.getStepper().lastStep();
  }
  firstStep() {
    this.getStepper().firstStep();
  }
  component: unknown = null;
  getCurrentComponent() {
    return this.getStepper().getComponent();
  }
  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.component = this.getCurrentComponent();
    this.requestUpdate();
  }
  stepMetaData = [
    {
      stepHeader: "Personal Details",
      component: html`<div class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <h2>Content for Step 1</h2>
              <sgds-input name="input1" id="input1" pattern="test" required></sgds-input>
              <sgds-checkbox name="cb1" id="cb1" value="lolol"
                >no required<span slot="feedback">You are required to check this.</span></sgds-checkbox
              >
            </form>
          </div>
        </div>
      </div>`
    },
    {
      stepHeader: "Address and Contact Information",
      component: html`<div class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <h2>Content for Step 2</h2>
              <sgds-input name="input1" id="input1" pattern="test" required></sgds-input>
              <sgds-checkbox name="cb1" id="cb1" value="lolol"
                >no required<span slot="feedback">You are required to check this.</span></sgds-checkbox
              >
              <sgds-checkbox name="cb2" id="cb2" value="lolol1" required
                >with required<span slot="feedback">You are required to check this.</span></sgds-checkbox
              >
              <sgds-checkbox name="cb2" id="cb2" value="lolol1" required disabled
                >disabled<span slot="feedback">You are required to check this.</span></sgds-checkbox
              >
              <sgds-input
                label="Name"
                iconName="stack"
                hintText="this is a hint"
                required
                pattern="test"
                value="a"
              ></sgds-input>
            </form>
          </div>
        </div>
      </div>`
    },
    {
      stepHeader: "Review",
      component: html`<div class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <h2>Content for Step 3</h2>
              <sgds-input name="input1" id="input1" pattern="test" required></sgds-input>
              <sgds-checkbox name="cb1" id="cb1" value="lolol"
                >no required<span slot="feedback">You are required to check this.</span></sgds-checkbox
              >
              <sgds-checkbox name="cb2" id="cb2" value="lolol1" required
                >with required<span slot="feedback">You are required to check this.</span></sgds-checkbox
              >
              <sgds-checkbox name="cb2" id="cb2" value="lolol1" required disabled
                >disabled<span slot="feedback">You are required to check this.</span></sgds-checkbox
              >
              <sgds-input
                label="Name"
                iconName="stack"
                hintText="this is a hint"
                required
                pattern="test"
                value="a"
              ></sgds-input>
            </form>
          </div>
        </div>
      </div>`
    }
  ];

  render() {
    return html`
      <div style="background:#FAFAFA;padding:30px;">
        <h2>Stepper</h2>
        <sgds-stepper id="myStepper" activeStep=${this.currentStep} .steps=${this.stepMetaData}> </sgds-stepper>
        <section
          class="container p-3"
          style="background: #FFFFFF;padding: 30px 32px 30px 32px;border-radius: 5px;box-shadow: 0px 0px 25px 0px #161A1D12;box-shadow: 0px 8px 16px 0px #161A1D08;"
        >
          ${this.component ? this.component : ""}
          <div style="display:flex;justify-content:space-between;margin-top:1rem;">
            <div>
              <sgds-button class="me-3" variant="light" @click="${this.reset}">Reset</sgds-button>
              <sgds-button class="me-3" variant="primary" @click="${this.nextStep}">Next</sgds-button>
              <sgds-button @click="${this.previousStep}" variant="secondary">Back</sgds-button>
            </div>
            <div>
              <sgds-button class="m-2" variant="danger" @click="${this.firstStep}">Go to first page</sgds-button>
              <sgds-button class="m-2" variant="warning" @click="${this.lastStep}">Go to last page</sgds-button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
