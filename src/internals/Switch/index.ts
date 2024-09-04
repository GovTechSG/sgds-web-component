import { SgdsSwitch } from "./sgds-switch";

customElements.define("sgds-switch", SgdsSwitch);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-switch": SgdsSwitch;
  }
}
