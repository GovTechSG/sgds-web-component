import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import { defaultValue } from "../../utils/defaultvalue";

/**
 * @summary Steppers are used to inform users which step they are at in a form or a process
 * @slot step-n - The slot for content in each step. "n" refers to numeral value starting from 1. e.g. step-1, step-2, step-3 etc.
 *
 * @event sgds-next-step - Emitted right before the next step is reached. Event is fired when nextStep method is called.
 * @event sgds-previous-step - Emitted right before the previous step is reached. Event is fired when previousStep method is called.
 * @event sgds-last-step - Emitted right before the last step is reached. Event is fired when lastStep method is called.
 * @event sgds-first-step - Emitted on hide after animation has completed. Event is fired when firstStep method is called.
 * @event sgds-arrived - Emitted right after the activeStep has updated its state, when upcoming step has arrived and its slot are rendered.
 * @event sgds-reset - Emitted right before the step is reset to its defaultActiveStep. Event is fired when reset method is called.
 *
 */
@customElement("sgds-stepper")
export class SgdsStepper extends SgdsElement {
  static styles = [SgdsElement.styles];

  /** The header name for steps in chronological order
   */
  @property({ type: Array })
  steps: string[] = [];

  /** The current state of active step. Defaults to 0 */
  @property({ type: Number, reflect: true })
  activeStep = 0;

  /**Gets or sets the default activeStep used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue("activeStep")
  defaultActiveStep = 0;

  /** Moves the active step forward one step */
  public nextStep() {
    this.emit("sgds-next-step");
    if (this.activeStep < this.steps.length - 1) {
      this.activeStep++;
    }
  }

  /** Moves the active step back one step */
  public previousStep() {
    this.emit("sgds-previous-step");

    if (this.activeStep > 0) {
      this.activeStep--;
    }
  }

  /** Changes the active step to the last step */
  public lastStep() {
    this.emit("sgds-last-step");
    if (this.activeStep !== this.steps.length - 1) {
      this.activeStep = this.steps.length - 1;
    }
  }

  /** Changes active step to the first step */
  public firstStep() {
    this.emit("sgds-first-step");
    if (this.activeStep > 0) {
      this.activeStep = 0;
    }
  }

  /** Resets the Stepper to its initial active step state */
  public reset() {
    this.emit("sgds-reset");
    this.activeStep = this.defaultActiveStep;
  }

  /**@internal */
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
