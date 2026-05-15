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

  /** Whether this step is clickable */
  @property({ type: Boolean })
  clickable = false;

  /** Whether this step is currently active */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** Whether this step is currently disabled */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Whether this step is completed */
  @property({ type: Boolean, reflect: true })
  completed = false;

  /** @internal The index of this step within the stepper */
  @property({ type: Number })
  stepIndex = 0;

  /** @internal Orientation of parent stepper (horizontal or vertical) */
  @property({ type: String })
  orientation: "horizontal" | "vertical" = "horizontal";

  /** @internal Whether this step is the first sgds-step of its type in the slot */
  @property({ type: Boolean })
  isFirstOfType = false;

  render() {
    const isValidClickable = !this.disabled && this.clickable;

    return html`
      <div class="stepper-item-container">
        <div
          class="stepper-item ${classMap({
            first: this.isFirstOfType,
            active: this.active,
            completed: this.completed,
            clickable: this.clickable,
            vertical: this.orientation === "vertical",
            disabled: this.disabled
          })}"
          tabindex=${isValidClickable ? "0" : "-1"}
          aria-current=${this.active ? "step" : "false"}
          aria-disabled=${this.disabled || (!this.active && !this.completed) ? "true" : "false"}
          @click="${isValidClickable ? e => this._handleClick(e) : null}"
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
  _handleClick(e?: PointerEvent) {
    if (e) {
      const ele = e.target as HTMLElement;

      // Allow user to have custom slotted item with attribute 'data-clickable' to skip i-sgds-click
      // To handle if there are clickable objects within the slot
      if (ele.hasAttribute("data-clickable")) return;
    }

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
