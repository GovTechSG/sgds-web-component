import { SgdsIconButton } from "./sgds-icon-button";

customElements.define("sgds-icon-button", SgdsIconButton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon-button": SgdsIconButton;
  }
}
