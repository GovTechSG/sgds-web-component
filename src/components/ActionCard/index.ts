import { SgdsActionCard } from "./sgds-action-card";
import { register } from "../../utils/ce-registry";

register("sgds-action-card", SgdsActionCard);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-action-card": SgdsActionCard;
  }
}
