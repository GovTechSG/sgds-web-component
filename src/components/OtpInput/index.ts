import { SgdsOtpInput } from "./sgds-otp-input";
import { register } from "../../utils/ce-registry";

register("sgds-otp-input", SgdsOtpInput);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-otp-input": SgdsOtpInput;
  }
}
