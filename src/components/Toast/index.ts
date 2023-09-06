import { SgdsToast } from "./sgds-toast";
import { SgdsToastContainer } from "./sgds-toast-container";

//sideEffect
customElements.define("sgds-toast", SgdsToast);
customElements.define("sgds-toast-container", SgdsToastContainer);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-toast-container": SgdsToastContainer;
    "sgds-toast": SgdsToast;
  }
}
