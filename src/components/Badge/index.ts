import { SgdsBadge } from "./sgds-badge";

//sideEffect
customElements.define("sgds-badge", SgdsBadge);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-badge": SgdsBadge;
  }
}
