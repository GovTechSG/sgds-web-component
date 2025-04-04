import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import closeButtonStyles from "./close-button.css";
import { warnUnregisteredElements } from "../../utils/ce-registry";
/**
 * @summary Close button for closing actions. Used in Modal, Drawer, Alert and Toast.
 *
 * @cssprop --sgds-close-btn-border-radius - The border radius of close button border
 *
 */
export class SgdsCloseButton extends SgdsElement {
  static styles = [...SgdsElement.styles, closeButtonStyles];

  @property({ type: String }) ariaLabel = "Close button";

  /** Specifies a large or small button */
  @property({ type: String, reflect: true }) size: "sm" | "md" = "md";

  @property({ type: String, reflect: true }) variant: "default" | "dark" | "light" = "default";

  private _handleClick() {
    this.removeEventListener("click", this._clickHandler);
    this.addEventListener("click", this._clickHandler);
  }

  private _clickHandler = () => {
    return;
  };

  firstUpdated() {
    /** Cannot register sgds-icon as dependency due to some circular dependencies, so we check and warn instead */
    warnUnregisteredElements("sgds-icon");
  }
  render() {
    return html`
      <button
        class=${classMap({
          "btn-close": true,
          [`btn-close-${this.size}`]: this.size,
          "btn-close-light": this.variant === "light",
          "btn-close-dark": this.variant === "dark"
        })}
        aria-label=${ifDefined(this.ariaLabel)}
        @click=${this._handleClick}
      >
        <sgds-icon name="cross" size=${this.size}></sgds-icon>
      </button>
    `;
  }
}

export default SgdsCloseButton;
