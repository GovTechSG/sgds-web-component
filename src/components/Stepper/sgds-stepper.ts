import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import { watch } from "../../utils/watch";
import stepperStyle from "./stepper.css";
export interface IStepMetaData {
  component: unknown;
  stepHeader: string;
}
/**
 * @summary Steppers are used to inform users which step they are at in a form or a process
 *
 * @event sgds-next-step - Emitted right before the next step is reached. Event is fired when nextStep method is called.
 * @event sgds-previous-step - Emitted right before the previous step is reached. Event is fired when previousStep method is called.
 * @event sgds-last-step - Emitted right before the last step is reached. Event is fired when lastStep method is called.
 * @event sgds-first-step - Emitted on hide after animation has completed. Event is fired when firstStep method is called.
 * @event sgds-arrived - Emitted right after the activeStep has updated its state, when upcoming step has arrived. Call `getMethod()` on this event to get the current step's component.
 * @event sgds-reset - Emitted right before the step is reset to its defaultActiveStep. Event is fired when reset method is called.
 *
 * @cssproperty --sgds-stepper-font-size - Sets the font size on all elements of the stepper. This includes stepper details and stepper markers.
 * @cssproperty --sgds-stepper-detail-font-weight - The font weight of stepper detail
 * @cssproperty --sgds-stepper-inactive-theme-color - Sets the theme color for default stepper marker. <br>Default value `--sgds-gray-400`
 * @cssproperty --sgds-stepper-theme-color - Sets the theme color for active, completed and clickable stepper marker. <br>Default value `--sgds-primary`
 * @cssproperty --sgds-stepper-theme-hover-color - Sets the theme hover color for clickable stepper marker. <br>Default value `--sgds-primary-600`
 *
 */
export class SgdsStepper extends SgdsElement {
  static styles = [...SgdsElement.styles, stepperStyle];

  /** The metadata of stepper, type `IStepMetaData`, that consist of `stepHeader: string` and `component:unknown`. `stepHeader` is the name of the step and `component` is the content that should appear at the each step. `component` is set to `unknown` to allow users to pass in their desired component based on the framework of choice. e.g. pass in your own react/angular/vue component or it can also be a text content.
   */
  @property({ type: Array })
  steps: IStepMetaData[] = [];

  /** The current state of active step. Defaults to 0 */
  @property({ type: Number, reflect: true })
  activeStep = 0;

  /**Gets or sets the default activeStep used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue("activeStep")
  defaultActiveStep = 0;

  /** By default, it returns the corresponding component of the current activeStep as defined in the steps metadata. To get other components, pass in your desired step number as the parameter*/
  public getComponent(step: number = this.activeStep) {
    return this.steps[step].component;
  }
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

  /**@internal */
  _handleKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === "Enter") {
      this._onStepperItemClick(index);
    }
  }

  render() {
    return html`
      <div class="sgds stepper">
        ${this.steps.map(({ stepHeader: step }, index) => {
          return html`
            <div
              class="stepper-item ${classMap({
                "is-active": this.activeStep === index,
                "is-completed": this.activeStep > index,
                "is-clickable": this.activeStep > index
              })}"
              tabindex="0"
              aria-current=${this.activeStep === index ? "step" : "false"}
              aria-disabled=${this.activeStep <= index ? "true" : "false"}
              @click="${() => this._onStepperItemClick(index)}"
              @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, index)}
            >
              <div class="stepper-marker">${index + 1}</div>
              <div class="stepper-detail">
                ${step}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

export default SgdsStepper;
