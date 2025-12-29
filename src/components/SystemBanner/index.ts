import { SgdsSystemBanner } from "./sgds-system-banner";
import SgdsSystemBannerItem from "./sgds-system-banner-item";

customElements.define("sgds-system-banner", SgdsSystemBanner);
customElements.define("sgds-system-banner-item", SgdsSystemBannerItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-system-banner": SgdsSystemBanner;
  }
}
