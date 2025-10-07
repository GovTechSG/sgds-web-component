import { SgdsThumbnailCard } from "./sgds-thumbnail-card";

customElements.define("sgds-thumbnail-card", SgdsThumbnailCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-thumbnail-card": SgdsThumbnailCard;
  }
}
