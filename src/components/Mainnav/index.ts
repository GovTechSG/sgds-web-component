import { SgdsMainnav } from "./sgds-mainnav";
import { SgdsMainnavDropdown } from "./sgds-mainnav-dropdown";
import { SgdsMainnavItem } from "./sgds-mainnav-item";
import { SgdsMainnavProfile } from "./sgds-mainnav-profile";
import { register } from "../../utils/ce-registry";

register("sgds-mainnav", SgdsMainnav);
register("sgds-mainnav-dropdown", SgdsMainnavDropdown);
register("sgds-mainnav-item", SgdsMainnavItem);
register("sgds-mainnav-profile", SgdsMainnavProfile);
declare global {
  interface HTMLElementTagNameMap {
    "sgds-mainnav": SgdsMainnav;
    "sgds-mainnav-dropdown": SgdsMainnavDropdown;
    "sgds-mainnav-item": SgdsMainnavItem;
    "sgds-mainnav-profile": SgdsMainnavProfile;
  }
}
