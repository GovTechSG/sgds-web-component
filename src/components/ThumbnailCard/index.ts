import { SgdsThumbnailCard } from "./sgds-thumbnail-card";
import { register } from "../../utils/ce-registry";

register("sgds-thumbnail-card", SgdsThumbnailCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-thumbnail-card": SgdsThumbnailCard;
  }
}
