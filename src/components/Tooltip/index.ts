import { SgdsTooltip } from "./sgds-tooltip";

customElements.define("sgds-tooltip", SgdsTooltip);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tooltip": SgdsTooltip;
  }
}
