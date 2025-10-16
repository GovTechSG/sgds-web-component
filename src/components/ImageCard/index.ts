import { SgdsImageCard } from "./sgds-image-card";
import { register } from "../../utils/ce-registry";

register("sgds-image-card", SgdsImageCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-image-card": SgdsImageCard;
  }
}
