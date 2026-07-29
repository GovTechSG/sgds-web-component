import { SgdsTile } from "./sgds-tile";
import { SgdsTileGroup } from "./sgds-tile-group";
import { register } from "../../utils/ce-registry";

register("sgds-tile", SgdsTile);
register("sgds-tile-group", SgdsTileGroup);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tile": SgdsTile;
    "sgds-tile-group": SgdsTileGroup;
  }
}
