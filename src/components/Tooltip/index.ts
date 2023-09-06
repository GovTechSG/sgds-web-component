import { SgdsTooltip } from "./sgds-tooltip";

//sideEffect
customElements.define("sgds-tooltip", SgdsTooltip);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tooltip": SgdsTooltip;
  }
}
