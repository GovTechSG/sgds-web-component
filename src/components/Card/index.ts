import { SgdsCard } from "./sgds-card";

//sideEffect
customElements.define("sgds-card", SgdsCard);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-card": SgdsCard;
  }
}
