import { SgdsIconButton } from "./sgds-icon-button";
import { register } from "../../utils/ce-registry";

register("sgds-icon-button", SgdsIconButton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-icon-button": SgdsIconButton;
  }
}
