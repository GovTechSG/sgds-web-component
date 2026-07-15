import { SgdsTile } from "./sgds-tile";
import { register } from "../../utils/ce-registry";

register("sgds-tile", SgdsTile);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tile": SgdsTile;
  }
}
