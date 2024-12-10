import { SgdsDivider } from "./sgds-divider";
import { register } from "../../utils/ce-registry";

register("sgds-divider", SgdsDivider);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-divider": SgdsDivider;
  }
}
