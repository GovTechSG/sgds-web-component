import { LitElement, html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-closebutton.scss";

@customElement("sgds-closebutton")
export class SgdsCloseButton extends SgdsElement {
  static styles = styles;

  @property({ type: Boolean, reflect: true })
  closed = false;

  @property({ type: String }) closeLabel = "Close alert";

  handleClick() {
    this.closed = true;
    this.dispatchEvent(new CustomEvent("closed", { detail: this.closed }));
  }

  render() {
    return html`
      <button
        type="button"
        class=${classMap({ "btn-close btn-sm": true })}
        aria-label=${this.closeLabel}
        @click="${this.handleClick}"
      ></button>
    `;
  }
}

export default SgdsCloseButton;
