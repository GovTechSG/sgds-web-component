import { SgdsCloseButton } from "./sgds-close-button";
import { register } from "../../utils/ce-registry";

register("sgds-close-button", SgdsCloseButton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-close-button": SgdsCloseButton;
  }
}
