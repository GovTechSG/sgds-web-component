import { LitElement, PropertyValueMap, html } from "lit";
import { customElement } from "lit/decorators.js";
import { SgdsInput } from "../src/components/Input/sgds-input";
import { SgdsStepper } from "../src/components/Stepper/sgds-stepper";

interface IDetails {
  firstName: string;
  lastName: string;
  address: string;
  gender: string;
}
@customElement("mock-stepper")
export class MockStepper extends LitElement {
  details: IDetails = {
    firstName: "",
    lastName: "",
    address: "",
    gender: ""
  };
  currentStep: number = 0;
  component: Function = () => {};
  stepMetaData = [
    {
      stepHeader: "Personal Details",
      component: (details: IDetails) => html`<div class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <h2>Content for Step 1</h2>
              <sgds-input
                label="First Name"
                hinttext="Enter first name"
                name="firstName"
                required
                inputClasses="mb-3"
                .value=${details.firstName}
                @sgds-input=${this._handleInputChange}
              ></sgds-input>
              <sgds-input
                label="Last Name"
                hinttext="Enter last name"
                name="lastName"
                required
                .value=${details.lastName}
                @sgds-input=${this._handleInputChange}
              ></sgds-input>
              <sgds-radio-group @sgds-change=${this._handleRadioChange} .value=${this.details.gender}>
                <span slot="label">Gender</span>
                <sgds-radio value="female" isInline>Female</sgds-radio>
                <sgds-radio value="male" isInline>Male</sgds-radio>
              </sgds-radio-group>
            </form>
          </div>
        </div>
      </div>`
    },
    {
      stepHeader: "Address and Contact Information",
      component: (details: IDetails) => html`<div class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <h2>Content for Step 2</h2>
              <sgds-input
                name="address"
                label="Address"
                id="input1"
                required
                .value=${details.address}
                @sgds-input=${this._handleInputChange}
              ></sgds-input>
            </form>
          </div>
        </div>
      </div>`
    },
    {
      stepHeader: "Review",
      component: (details: IDetails) => html`<div class="mb-4">
        <div class="row">
          <div class="col mb-2">
            <form>
              <h2>Content for Step 3</h2>
              <sgds-input name="firstName" label="First Name" required readonly value=${details.firstName}></sgds-input>
              <sgds-input name="lastName" label="Last Name" required readonly value=${details.lastName}></sgds-input>
              <sgds-radio-group value=${this.details.gender}>
                <span slot="label">Gender</span>
                <sgds-radio value="female" isInline disabled>Female</sgds-radio>
                <sgds-radio value="male" isInline disabled>Male</sgds-radio>
              </sgds-radio-group>
              <sgds-input name="address" label="Address" required readonly value=${details.address}></sgds-input>
            </form>
          </div>
        </div>
      </div>`
    }
  ];
  connectedCallback(): void {
    super.connectedCallback();
  }
  _handleArrived() {
    this.component = this._getComponent();
    this.requestUpdate();
  }

  _handleRadioChange(e: CustomEvent) {
    this.details.gender = e.detail.value;
  }

  _handleInputChange(e: KeyboardEvent) {
    e.preventDefault();
    const target = e.target as SgdsInput;
    this.details[target.name] = target.value;
  }

  _getStepper() {
    const stepper = this.shadowRoot?.querySelector("sgds-stepper") as SgdsStepper;
    return stepper;
  }

  _reset() {
    this.details = {
      firstName: "",
      lastName: "",
      address: "",
      gender: ""
    };
    this._getStepper().reset();
  }

  _nextStep() {
    this._getStepper().nextStep();
  }

  _previousStep() {
    this._getStepper().previousStep();
  }

  _lastStep() {
    this._getStepper().lastStep();
  }

  _firstStep() {
    this._getStepper().firstStep();
  }

  _getComponent() {
    return (this._getStepper().getComponent() as Function)(this.details);
  }

  protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    this.component = this._getComponent();
    this.requestUpdate();
  }

  render() {
    return html`
      <div style="background:#FAFAFA;padding:30px;">
        <h2>Stepper</h2>
        <sgds-stepper
          id="myStepper"
          activeStep=${this.currentStep}
          .steps=${this.stepMetaData}
          @sgds-arrived=${this._handleArrived}
        >
        </sgds-stepper>
        <section
          class="container p-3"
          style="background: #FFFFFF;padding: 30px 32px 30px 32px;border-radius: 5px;box-shadow: 0px 0px 25px 0px #161A1D12;box-shadow: 0px 8px 16px 0px #161A1D08;"
        >
          ${this.component ? this.component : ""}
          <div style="display:flex;justify-content:space-between;margin-top:1rem;">
            <div>
              <sgds-button class="me-3" variant="light" @click="${this._reset}">Reset</sgds-button>
              <sgds-button class="me-3" variant="primary" @click="${this._nextStep}">Next</sgds-button>
              <sgds-button @click="${this._previousStep}" variant="secondary">Back</sgds-button>
            </div>
            <div>
              <sgds-button class="m-2" variant="danger" @click="${this._firstStep}">Go to first page</sgds-button>
              <sgds-button class="m-2" variant="warning" @click="${this._lastStep}">Go to last page</sgds-button>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
