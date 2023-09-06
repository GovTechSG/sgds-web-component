import { SgdsFileUpload } from "./sgds-file-upload";

customElements.define("sgds-file-upload", SgdsFileUpload);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-file-upload": SgdsFileUpload;
  }
}
