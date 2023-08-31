import { SgdsFileUpload } from "./sgds-file-upload";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsFileUpload]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-file-upload": SgdsFileUpload;
  }
}
