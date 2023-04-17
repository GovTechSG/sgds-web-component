import { css, html } from "lit";
import SgdsElement from "../base/sgds-element";
import { customElement, property, query } from "lit/decorators.js";
import styles from "./sgds-stepper.scss";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../utils/watch";

// TODO: any events emitted? 
@customElement("sgds-stepper")
export class SgdsStepper extends SgdsElement {
  static styles = styles;

  @property({ type: Array })
  steps = [
    {
      title: 1,
      stepHeader: "Marker title 1",
    },
    { title: 2, stepHeader: "Marker title 2" },
    { title: 3, stepHeader: "Marker title 3" },
  ];

  @property({ type: Number })
  activeStep: number;

  connectedCallback() {
    super.connectedCallback();
  }

  public incrementStep() {
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }   
  }

  public decrementStep() {
    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  public lastStep() {
    if (this.activeStep !== this.steps.length - 1) {
      this.activeStep = this.steps.length - 1;
    }
  }

  public firstStep() {
    if (this.activeStep > 0) {
      this.activeStep = 0;
    }
  }

  _onStepperItemClick(index: number) {
    if (this.activeStep > index) {
      this.activeStep = index;
    }
  }
  render() {
    return html`
      <div class="sgds stepper">
        ${this.steps.map((step, index) => {
          return html`
            <div
              class="stepper-item ${classMap({
                "is-active": this.activeStep === index,
                "is-completed": this.activeStep > index,
                "is-clickable": this.activeStep > index,
              })}"
              @click="${() => this._onStepperItemClick(index)}"
            >
              <div class="stepper-marker">${step.title}</div>
              <div class="stepper-detail">
                <p><b>${step.stepHeader}</b></p>
              </div>
            </div>
          `;
        })}
      </div>
      <slot
        name="step-${this.activeStep + 1}"
        ?hidden="${this.activeStep === -1}"
      ></slot>
    `;
  }
}

export default SgdsStepper;

