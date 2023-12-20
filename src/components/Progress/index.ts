import { SgdsProgress } from "./sgds-progress";
import { SgdsProgressBar } from "./sgds-progress-bar";

customElements.define("sgds-progress", SgdsProgress);
customElements.define("sgds-progress-bar", SgdsProgressBar);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-progress": SgdsProgress;
    "sgds-progress-bar": SgdsProgressBar;
  }
}
