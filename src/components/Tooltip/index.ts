import { SgdsTooltip } from "./sgds-tooltip";
import { register } from "../../utils/ce-registry";

register("sgds-tooltip", SgdsTooltip);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tooltip": SgdsTooltip;
  }
}
