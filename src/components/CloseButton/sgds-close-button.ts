import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import closeButtonStyles from "./close-button.css";
/**
 * @summary Close button for closing actions. Used in Modal, Drawer, Alert and Toast.
 *
 * @cssprop --sgds-close-btn-color - The color of close button
 * @cssprop --sgds-close-btn-image - The image of close button
 * @cssprop --sgds-close-btn-focus-box-shadow - The box shadow of a focused close button
 * @cssprop --sgds-close-btn-size - Sets the height and width of close button
 *
 */
export class SgdsCloseButton extends SgdsElement {
  static styles = [closeButtonStyles];

  @property({ type: String, reflect: true, attribute: "aria-label" }) ariaLabel: string;
  /** The disabled state of the button */
  @property({ type: Boolean, reflect: true }) disabled = false;

  private _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.removeEventListener("click", this._clickHandler);
    this.addEventListener("click", this._clickHandler);
  }

  private _clickHandler = () => {
    return;
  };

  render() {
    return html`
      <button
        class="btn-close"
        aria-label=${ifDefined(this.ariaLabel)}
        @click=${this._handleClick}
        ?disabled=${this.disabled}
      ></button>
    `;
  }
}

export default SgdsCloseButton;
