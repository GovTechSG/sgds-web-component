import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import SgdsIcon from "../Icon/sgds-icon";
import stepStyle from "./step.css";

/**
 * @summary A step within a stepper component
 * @slot default - Additional content to display under the step header
 *
 */
export class SgdsStep extends SgdsElement {
  static styles = [...SgdsElement.styles, stepStyle];
  /** @internal */
  static dependencies = { "sgds-icon": SgdsIcon };

  /** The header text for the step */
  @property({ type: String, reflect: true })
  stepHeader = "";

  /** Optional icon name to display instead of step number */
  @property({ type: String, reflect: true })
  iconName: string | undefined;

  /** Optional component to render for this step */
  @property({ type: Object })
  component: unknown;

  /** @internal The index of this step within the stepper */
  @property({ type: Number })
  stepIndex = 0;

  /** @internal Whether this step is currently active */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** @internal Whether this step is currently disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** @internal Whether this step is completed */
  @property({ type: Boolean, reflect: true })
  completed = false;

  /** @internal Whether this step is clickable */
  @property({ type: Boolean })
  isClickable = false;

  /** @internal Orientation of parent stepper (horizontal or vertical) */
  @property({ type: String })
  orientation: "horizontal" | "vertical" = "horizontal";

  /** @internal Whether this step is the first sgds-step of its type in the slot */
  @property({ type: Boolean })
  isFirstOfType = false;

  /** @internal Whether this step is completed */
  @property({ type: Boolean })
  _isCompleted = false;

  render() {
    const isValidClickable = !this.disabled && this.isClickable;

    return html`
      <div class="stepper-item-container">
        <div
          class="stepper-item ${classMap({
            first: this.isFirstOfType,
            active: this.active,
            completed: this._isCompleted,
            clickable: this.isClickable,
            vertical: this.orientation === "vertical",
            disabled: this.disabled
          })}"
          tabindex=${isValidClickable ? "0" : "-1"}
          aria-current=${this.active ? "step" : "false"}
          aria-disabled=${this.disabled || (!this.active && !this._isCompleted) ? "true" : "false"}
          @click="${isValidClickable ? () => this._handleClick() : null}"
          @keydown=${isValidClickable ? (e: KeyboardEvent) => this._handleKeyDown(e) : null}
        >
          <div class="stepper-marker">
            ${this.iconName ? html`<sgds-icon name=${this.iconName} size="md"></sgds-icon>` : this.stepIndex + 1}
          </div>

          <div class="stepper-detail">
            <div class="stepper-label">${this.stepHeader}</div>

            <slot class="stepper-slot"></slot>
          </div>
        </div>
      </div>
    `;
  }

  /**@internal */
  _handleClick() {
    this.emit("i-sgds-click", { detail: { stepIndex: this.stepIndex } });
  }

  /**@internal */
  _handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this._handleClick();
    }
  }
}

export default SgdsStep;
