import { SgdsToast } from "./sgds-toast";
import { SgdsToastContainer } from "./sgds-toast-container";
import { register } from "../../utils/ce-registry";

register("sgds-toast", SgdsToast);
register("sgds-toast-container", SgdsToastContainer);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-toast-container": SgdsToastContainer;
    "sgds-toast": SgdsToast;
  }
}
