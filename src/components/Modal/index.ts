import { SgdsModal } from "./sgds-modal";
import { register } from "../../utils/ce-registry";

register("sgds-modal", SgdsModal);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-modal": SgdsModal;
  }
}
