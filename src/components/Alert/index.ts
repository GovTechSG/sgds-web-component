import { SgdsAlert } from "./sgds-alert";
import { SgdsAlertLink } from "./sgds-alert-link";
import { register } from "../../utils/ce-registry";

register("sgds-alert", SgdsAlert);
register("sgds-alert-link", SgdsAlertLink);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-alert-link": SgdsAlertLink;
    "sgds-alert": SgdsAlert;
  }
}
