import { SgdsAlert } from "./sgds-alert";
import { SgdsAlertHeading } from "./sgds-alert-heading";
import { SgdsAlertLink } from "./sgds-alert-link";

//sideEffect
customElements.define("sgds-alert", SgdsAlert);
customElements.define("sgds-alert-heading", SgdsAlertHeading);
customElements.define("sgds-alert-link", SgdsAlertLink);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-alert-heading": SgdsAlertHeading;
    "sgds-alert-link": SgdsAlertLink;
    "sgds-alert": SgdsAlert;
  }
}
