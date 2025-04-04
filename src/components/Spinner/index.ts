import { register } from "../../utils/ce-registry";
import { SgdsSpinner } from "./sgds-spinner";

register("sgds-spinner", SgdsSpinner);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-spinner": SgdsSpinner;
  }
}
