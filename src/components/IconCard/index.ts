import { SgdsIconCard } from "./sgds-icon-card";

customElements.define("sgds-icon-card", SgdsIconCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon-card": SgdsIconCard;
  }
}
