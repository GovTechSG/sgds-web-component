import { SgdsMasthead } from "./sgds-masthead";

customElements.define("sgds-masthead", SgdsMasthead);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-masthead": SgdsMasthead;
  }
}
