import { SgdsRadio } from "./sgds-radio";
import { SgdsRadioGroup } from "./sgds-radio-group";

customElements.define("sgds-radio", SgdsRadio);
customElements.define("sgds-radio-group", SgdsRadioGroup);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-radio": SgdsRadio;
    "sgds-radio-group": SgdsRadioGroup;
  }
}
