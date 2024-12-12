import { SgdsQuantityToggle } from "./sgds-quantity-toggle";
import { register } from "../../utils/ce-registry";

register("sgds-quantity-toggle", SgdsQuantityToggle);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-quantity-toggle": SgdsQuantityToggle;
  }
}
