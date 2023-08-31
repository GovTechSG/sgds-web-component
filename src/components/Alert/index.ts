import { SgdsAlert } from "./sgds-alert";
import { SgdsAlertHeading } from "./sgds-alert-heading";
import { SgdsAlertLink } from "./sgds-alert-link";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsAlert, SgdsAlertHeading, SgdsAlertLink]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-alert-heading": SgdsAlertHeading;
    "sgds-alert-link": SgdsAlertLink;
    "sgds-alert": SgdsAlert;
  }
}
