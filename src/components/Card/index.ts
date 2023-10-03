import { SgdsCard } from "./sgds-card";

customElements.define("sgds-card", SgdsCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-card": SgdsCard;
  }
}
