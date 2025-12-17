import { html, PropertyValueMap } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import closeButtonStyles from "./close-button.css";
import { warnUnregisteredElements } from "../../utils/ce-registry";
/**
 * @summary Close button for closing actions. Used in Modal, Drawer, Alert and Toast.
 *
 */
export class SgdsCloseButton extends SgdsElement {
  static styles = [...SgdsElement.styles, closeButtonStyles];

  /** Specifies a large or small button */
  @property({ type: String, reflect: true }) size: "sm" | "md" = "md";
  /** The tone of the close button */
  @property({ type: String, reflect: true }) tone: "default" | "fixed-dark" | "fixed-light" = "default";

  private _handleClick() {
    this.removeEventListener("click", this._clickHandler);
    this.addEventListener("click", this._clickHandler);
  }

  private _clickHandler = () => {
    return;
  };

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);

    /** Cannot register sgds-icon as dependency due to some circular dependencies, so we check and warn instead */
    warnUnregisteredElements("sgds-icon");
  }
  render() {
    return html`
      <button class="btn-close" aria-label="Close button" @click=${this._handleClick}>
        <sgds-icon name="cross" size=${this.size}></sgds-icon>
      </button>
    `;
  }
}

export default SgdsCloseButton;
