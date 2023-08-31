import { SgdsModal } from "./sgds-modal";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsModal]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-modal": SgdsModal;
  }
}
