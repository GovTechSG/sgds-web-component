import { SgdsSkeleton } from "./sgds-skeleton";

customElements.define("sgds-skeleton", SgdsSkeleton);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-skeleton": SgdsSkeleton;
  }
}
