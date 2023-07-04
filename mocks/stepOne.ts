import { PropertyValueMap, html } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import SgdsElement from "../src/base/sgds-element";
import { SgdsStepper } from "../src/components/Stepper";
import { SgdsInput } from "../src/components/Input";
import { watch } from "../src/utils/watch";
import { FormSubmitController } from "../src/utils/form";
import { live } from "lit/directives/live.js";

interface IPersonalDetails {
  firstName: string;
  lastName: string;
}
@customElement("step-one")
export class StepOne extends SgdsElement {
  @property()
  personalDetails: IPersonalDetails = {
    firstName: "",
    lastName: ""
  };
  protected render(): unknown {
    return html`<div class="mb-4">
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
              .value=${live(this.personalDetails.firstName)}
              @sgds-input=${this.handleInputChange}
            ></sgds-input>
            <sgds-input
              label="Last Name"
              hinttext="Enter last name"
              name="lastName"
              required
              value=${this.personalDetails.lastName}
              @sgds-change=${this.handleInputChange}
            ></sgds-input>
            <sgds-radio-group>
              <span slot="label">Gender</span>
              <sgds-radio value="female" isInline>Female</sgds-radio>
              <sgds-radio value="male" isInline>Male</sgds-radio>
            </sgds-radio-group>
          </form>
        </div>
      </div>
    </div>`;
  }
}
