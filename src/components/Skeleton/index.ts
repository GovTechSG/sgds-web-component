import { SgdsSkeleton } from "./sgds-skeleton";
import { register } from "../../utils/ce-registry";

register("sgds-skeleton", SgdsSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-skeleton": SgdsSkeleton;
  }
}
