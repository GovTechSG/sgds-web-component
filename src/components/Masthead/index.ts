import { SgdsMasthead } from "./sgds-masthead";

//sideEffect
customElements.define("sgds-masthead", SgdsMasthead);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-masthead": SgdsMasthead;
  }
}
