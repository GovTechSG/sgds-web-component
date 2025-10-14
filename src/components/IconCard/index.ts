import { SgdsIconCard } from "./sgds-icon-card";
import { register } from "../../utils/ce-registry";

register("sgds-icon-card", SgdsIconCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon-card": SgdsIconCard;
  }
}
