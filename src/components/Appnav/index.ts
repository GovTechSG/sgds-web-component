import { SgdsAppnav } from "./sgds-appnav";
import { SgdsAppnavProfile } from "./sgds-appnav-profile";

export { SgdsAppnav, SgdsAppnavProfile };

customElements.define("sgds-appnav", SgdsAppnav);
customElements.define("sgds-appnav-profile", SgdsAppnavProfile);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-appnav": SgdsAppnav;
    "sgds-appnav-profile": SgdsAppnavProfile;
  }
}
