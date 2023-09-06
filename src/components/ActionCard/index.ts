import { SgdsActionCard } from "./sgds-action-card";

//sideEffect
customElements.define("sgds-action-card", SgdsActionCard);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-action-card": SgdsActionCard;
  }
}
