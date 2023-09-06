import { SgdsBadge } from "./sgds-badge";

customElements.define("sgds-badge", SgdsBadge);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-badge": SgdsBadge;
  }
}
