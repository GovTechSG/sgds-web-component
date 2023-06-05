import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-stepper.scss";

// TODO: any events emitted?

@customElement("sgds-stepper")
export class SgdsStepper extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** The header name for steps in chronological title
   */
  @property({ type: Array })
  steps: string[] = ["Marker title 1", "Marker title 2", "Marker title 3"];

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
                "is-clickable": this.activeStep > index
              })}"
              @click="${() => this._onStepperItemClick(index)}"
            >
              <div class="stepper-marker">${index + 1}</div>
              <div class="stepper-detail">
                <p><b>${step}</b></p>
              </div>
            </div>
          `;
        })}
      </div>
      <slot name="step-${this.activeStep + 1}" ?hidden="${this.activeStep === -1}"></slot>
    `;
  }
}

export default SgdsStepper;
