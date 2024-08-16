import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import closeButtonStyles from "./close-button.css";
import { classMap } from "lit/directives/class-map.js";
/**
 * @summary Close button for closing actions. Used in Modal, Drawer, Alert and Toast.
 *
 * @cssprop --sgds-close-btn-border-radius - The border radius of close button border
 *
 */
export class SgdsCloseButton extends SgdsElement {
  static styles = [closeButtonStyles];

  @property({ type: String, reflect: true }) ariaLabel = "Close button";

  /** Specifies a large or small button */
  @property({ reflect: true }) size: "sm" | "md" = "md";

  private _handleClick() {
    this.removeEventListener("click", this._clickHandler);
    this.addEventListener("click", this._clickHandler);
  }

  private _clickHandler = () => {
    return;
  };

  render() {
    return html`
      <button
        class=${classMap({
          "btn-close": true,
          [`btn-close-${this.size}`]: this.size
        })}
        aria-label=${ifDefined(this.ariaLabel)}
        @click=${this._handleClick}
      ></button>
    `;
  }
}

export default SgdsCloseButton;
