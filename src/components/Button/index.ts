import { SgdsButton } from "./sgds-button";
import { register } from "../../utils/ce-registry";

register("sgds-button", SgdsButton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-button": SgdsButton;
  }
}
