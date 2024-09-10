import { SgdsProgressBar } from "./sgds-progress-bar";

customElements.define("sgds-progress-bar", SgdsProgressBar);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-progress-bar": SgdsProgressBar;
  }
}
