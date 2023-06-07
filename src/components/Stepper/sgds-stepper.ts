import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-stepper.scss";
import { watch } from "../../utils/watch";
import { defaultValue } from "../../utils/defaultvalue";

// TODO: any events emitted?

@customElement("sgds-stepper")
export class SgdsStepper extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** The header name for steps in chronological title
   */
  @property({ type: Array })
  steps: string[] = ["Marker title 1", "Marker title 2", "Marker title 3"];

  @property({ type: Number, reflect: true })
  activeStep = 0

  @defaultValue("activeStep")
  defaultActiveStep = 0

  public incrementStep() {
    //emit an event before moving to next step
    this.emit("sgds-next-step");
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }
  }

  public decrementStep() {
    //emit an event before moving to next step
    this.emit("sgds-previous-step");

    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  public lastStep() {
    //emit an event before moving to next step
    this.emit("sgds-last-step");
    if (this.activeStep !== this.steps.length - 1) {
      this.activeStep = this.steps.length - 1;
    }
  }

  public firstStep() {
    //emit an event before moving to next step
    this.emit("sgds-first-step");
    if (this.activeStep > 0) {
      this.activeStep = 0;
    }
  }

  public reset() {
    this.emit("sgds-reset")
    this.activeStep = this.defaultActiveStep
  }

  _onStepperItemClick(index: number) {
    //emit an event before moving to next step
    if (this.activeStep > index) {
      this.activeStep = index;
    }
  }

  /**@internal */
  @watch("activeStep", { waitUntilFirstUpdate: true })
  _handleActiveStepChange() {
    this.emit("sgds-arrived");
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
              tabindex=${this.activeStep > index ? "0" : "-1"}
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
