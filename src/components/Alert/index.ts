import { SgdsAlert } from "./sgds-alert";
import { SgdsAlertLink } from "./sgds-alert-link";

customElements.define("sgds-alert", SgdsAlert);
customElements.define("sgds-alert-link", SgdsAlertLink);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-alert-link": SgdsAlertLink;
    "sgds-alert": SgdsAlert;
  }
}
