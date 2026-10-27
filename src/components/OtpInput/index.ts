import { SgdsOtpInput } from "./sgds-otp-input";

customElements.define("sgds-otp-input", SgdsOtpInput);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-otp-input": SgdsOtpInput;
  }
}
