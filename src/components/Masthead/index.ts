import { SgdsMasthead } from "./sgds-masthead";
import { register } from "../../utils/ce-registry";

register("sgds-masthead", SgdsMasthead);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-masthead": SgdsMasthead;
  }
}
