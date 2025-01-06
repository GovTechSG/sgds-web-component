import { SgdsThemingBox } from "./sgds-theming-box";

customElements.define("sgds-theming-box", SgdsThemingBox);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-theming-box": SgdsThemingBox;
  }
}
