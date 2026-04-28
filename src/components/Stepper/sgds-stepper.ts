import { html } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import { watch } from "../../utils/watch";
import stepperStyle from "./stepper.css";
import SgdsIcon from "../Icon/sgds-icon";
import { IStepMetaData } from "./types";
import type SgdsStep from "./sgds-step";
export type { IStepMetaData };

/**
 * @summary Steppers are used to inform users which step they are at in a form or a process
 *
 * @event sgds-next-step - Emitted right before the next step is reached. Event is fired when nextStep method is called.
 * @event sgds-previous-step - Emitted right before the previous step is reached. Event is fired when previousStep method is called.
 * @event sgds-last-step - Emitted right before the last step is reached. Event is fired when lastStep method is called.
 * @event sgds-first-step - Emitted on hide after animation has completed. Event is fired when firstStep method is called.
 * @event sgds-arrived - Emitted right after the activeStep has updated its state, when upcoming step has arrived. Call `getMethod()` on this event to get the current step's component.
 * @event sgds-reset - Emitted right before the step is reset to its defaultActiveStep. Event is fired when reset method is called.
 * @slot default - slot for sgds-step children
 *
 */
export class SgdsStepper extends SgdsElement {
  static styles = [...SgdsElement.styles, stepperStyle];
  /** @internal */
  static dependencies = { "sgds-icon": SgdsIcon };
  /** The metadata of stepper, type `IStepMetaData`. Deprecated: use sgds-step child components instead.
   * @deprecated Use sgds-step child components instead of the steps property
   */
  @property({ type: Array })
  steps: IStepMetaData[] = [];

  /** The current state of active step. Defaults to 0 */
  @property({ type: Number, reflect: true })
  activeStep = 0;

  /** The orientation of stepper. By default, the stepper is of horizontal orientation */
  @property({ type: String, reflect: true }) orientation: StepperOrientation = "horizontal";

  /** When true, the stepper's steps will be clickable */
  @property({ type: Boolean, reflect: true }) clickable = false;

  /** When true, the stepper's steps can only be clicked in a linear manner */
  @property({ type: Boolean, reflect: true }) linear = false;

  /** @internal Gets or sets the default activeStep used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue("activeStep")
  defaultActiveStep = 0;

  /** @internal */
  @queryAssignedElements() private _slotNodes!: SgdsStep[];

  /** @internal */
  private _items!: SgdsStep[];
  private _totalSteps = 0;

  /** @internal Bound i-sgds-click handler for proper event listener removal */
  private _boundHandleItemClick = this._handleStepClick.bind(this);

  connectedCallback() {
    super.connectedCallback();

    this._totalSteps = this.steps.length;
    this.addEventListener("i-sgds-click", this._boundHandleItemClick);
  }

  /** @internal */
  private _handleSlotChange() {
    this._items = this._slotNodes;
    this._totalSteps = this._items.length;

    this._updateStepItems();
  }

  /** @internal Updates step item properties based on active step and clickable state */
  private _updateStepItems() {
    if (this._items && this._items.length > 0) {
      this._items.forEach((item, index) => {
        item.stepIndex = index;
        item.active = this.activeStep === index;
        item._isCompleted = item.completed || this.activeStep > index;
        item.isClickable = this.linear
          ? !item.disabled && this.clickable && (this.activeStep - 1 == index || this.activeStep + 1 == index)
          : !item.disabled && this.clickable;
        item.orientation = this.orientation;

        if (this._items.length > 1) {
          item.isFirstOfType = index === 0;
          item.classList.toggle("last", index === this._items.length - 1);
        }
      });
    }
  }

  /** By default, it returns the corresponding component of the current activeStep as defined in the steps metadata. To get other components, pass in your desired step number as the parameter*/
  public getComponent(step: number = this.activeStep) {
    const items = this._slotNodes.length > 1 ? this._items : this.steps;
    if (items && items.length > 0) {
      return items[step]?.component;
    }
    return this.steps[step]?.component;
  }

  /** Moves the active step forward one step */
  public nextStep() {
    this.emit("sgds-next-step");
    if (this.activeStep < this._totalSteps - 1) {
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
    if (this.activeStep !== this._totalSteps - 1) {
      this.activeStep = this._totalSteps - 1;
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
    this.activeStep = index;
  }

  /**@internal */
  @watch("activeStep", { waitUntilFirstUpdate: true })
  _handleActiveStepChange() {
    this._updateStepItems();
    this.emit("sgds-arrived");
  }

  /**@internal */
  @watch("clickable", { waitUntilFirstUpdate: true })
  _handleClickableChange() {
    this._updateStepItems();
  }

  /**@internal */
  @watch("orientation", { waitUntilFirstUpdate: true })
  _handleOrientationChange() {
    this._updateStepItems();
  }

  /**@internal */
  _handleKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === "Enter") {
      this._onStepperItemClick(index);
    }
  }

  /**@internal */
  _handleStepClick(e: Event) {
    const event = e as CustomEvent;
    e.stopPropagation();

    const stepIndex = event.detail?.stepIndex;
    this._onStepperItemClick(stepIndex);
  }

  render() {
    return html`
      <div
        class="stepper ${classMap({
          [`${this.orientation}`]: this.orientation,
          clickable: this.clickable
        })}"
      >
        <slot @slotchange=${this._handleSlotChange}></slot>

        ${this.steps.map(({ stepHeader: step, iconName }, index) => {
          return html`
            <div class="stepper-item-container">
              <div
                class="stepper-item ${classMap({
                  "is-active": this.activeStep === index,
                  "is-completed": this.activeStep > index,
                  "is-clickable": this.clickable && this.activeStep > index
                })}"
                tabindex=${this.clickable && this.activeStep > index ? "0" : "-1"}
                aria-current=${this.activeStep === index ? "step" : "false"}
                aria-disabled=${this.activeStep <= index ? "true" : "false"}
                @click="${this.clickable ? () => this._onStepperItemClick(index) : null}"
                @keydown=${this.clickable ? (e: KeyboardEvent) => this._handleKeyDown(e, index) : null}
              >
                <div class="stepper-marker">
                  ${iconName ? html`<sgds-icon name=${iconName} size="md"></sgds-icon>` : index + 1}
                </div>
                <div class="stepper-detail">${step}</div>
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

export type StepperOrientation = "horizontal" | "vertical";

export default SgdsStepper;
