import { SgdsFileUpload } from "./sgds-file-upload";
import { register } from "../../utils/ce-registry";

register("sgds-file-upload", SgdsFileUpload);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-file-upload": SgdsFileUpload;
  }
}
