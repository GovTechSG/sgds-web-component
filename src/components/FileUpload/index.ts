import { SgdsFileUpload } from "./sgds-file-upload";

//sideEffect
customElements.define("sgds-file-upload", SgdsFileUpload);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-file-upload": SgdsFileUpload;
  }
}
