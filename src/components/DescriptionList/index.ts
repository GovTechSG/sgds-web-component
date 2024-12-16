import SgdsDescriptionListGroup from "./sgds-description-list-group";
import { SgdsDescriptionList } from "./sgds-description-list";
import { register } from "../../utils/ce-registry";

register("sgds-description-list", SgdsDescriptionList);
register("sgds-description-list-group", SgdsDescriptionListGroup);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-description-list": SgdsDescriptionList;
    "sgds-description-list-group": SgdsDescriptionListGroup;
  }
}
