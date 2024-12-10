import { SgdsCard } from "./sgds-card";
import { register } from "../../utils/ce-registry";

register("sgds-card", SgdsCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-card": SgdsCard;
  }
}
