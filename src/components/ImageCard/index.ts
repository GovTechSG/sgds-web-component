import { SgdsImageCard } from "./sgds-image-card";

customElements.define("sgds-image-card", SgdsImageCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-image-card": SgdsImageCard;
  }
}
