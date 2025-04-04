import { SgdsIconList } from "./sgds-icon-list";
import { register } from "../../utils/ce-registry";

register("sgds-icon-list", SgdsIconList);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon-list": SgdsIconList;
  }
}
