import { SgdsLink } from "./sgds-link";
import { register } from "../../utils/ce-registry";

register("sgds-link", SgdsLink);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-link": SgdsLink;
  }
}
