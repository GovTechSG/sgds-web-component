import { SgdsBadge } from "./sgds-badge";
import { register } from "../../utils/ce-registry";

register("sgds-badge", SgdsBadge);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-badge": SgdsBadge;
  }
}
