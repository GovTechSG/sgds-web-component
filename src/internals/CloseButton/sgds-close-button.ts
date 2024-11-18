import { html } from "lit";
import { property } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import SgdsElement from "../../base/sgds-element";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsIcon from "../../components/Icon/sgds-icon";
import closeButtonStyles from "./close-button.css";
/**
 * @summary Close button for closing actions. Used in Modal, Drawer, Alert and Toast.
 *
 * @cssprop --sgds-close-btn-border-radius - The border radius of close button border
 *
 */
export class SgdsCloseButton extends ScopedElementsMixin(SgdsElement) {
  static styles = [closeButtonStyles];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-icon": SgdsIcon
    };
  }

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
        <sgds-icon name="cross"></sgds-icon>
      </button>
    `;
  }
}

export default SgdsCloseButton;
