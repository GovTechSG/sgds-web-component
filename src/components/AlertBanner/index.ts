import { SgdsAlertBanner } from "./sgds-alert-banner";
import SgdsAlertBannerItem from "./sgds-alert-banner-item";

customElements.define("sgds-alert-banner", SgdsAlertBanner);
customElements.define("sgds-alert-banner-item", SgdsAlertBannerItem);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-alert-banner": SgdsAlertBanner;
  }
}
