import { consume } from "@lit/context";
import { state } from "lit/decorators.js";
import NavProfileElement from "../../base/nav-profile-element";
import { AppnavBreakpointContext } from "./appnav-context";

/**
 * @summary A profile component for the appnav that shows a full dropdown in desktop and handles its own mobile menu.
 * In desktop: renders avatar + label + secondaryText with a dropdown.
 * In mobile: renders the avatar as a toggler that opens a self-contained mobile panel with profile items.
 * When present, it disables the appnav's default hamburger toggler.
 *
 * @slot avatar - Avatar element displayed in both desktop (before label) and mobile (as toggler)
 * @slot default - Profile menu items (sgds-dropdown-item elements)
 */
export class SgdsAppnavProfile extends NavProfileElement {
  @consume({ context: AppnavBreakpointContext, subscribe: true })
  @state()
  protected override _breakpointReached = true;
}

export default SgdsAppnavProfile;
