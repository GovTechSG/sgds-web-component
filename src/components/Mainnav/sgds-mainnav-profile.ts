import { consume } from "@lit/context";
import { state } from "lit/decorators.js";
import NavProfileElement from "../../base/nav-profile-element";
import { MainnavBreakpointContext } from "./mainnav-context";

/**
 * @summary A profile component for the mainnav that shows a full dropdown in desktop and handles its own mobile menu.
 * In desktop: renders avatar + label + secondaryText with a dropdown.
 * In mobile: renders the avatar as a toggler that opens a self-contained mobile panel with profile items.
 * When no dropdown items are slotted, renders as a non-interactive read-only element (no caret, no pointer cursor, not focusable).
 * When present, it disables the mainnav's default hamburger toggler.
 *
 * @slot avatar - Avatar element displayed in both desktop (before label) and mobile (as toggler)
 * @slot default - Profile menu items (sgds-dropdown-item elements). When empty, the component becomes read-only.
 */
export class SgdsMainnavProfile extends NavProfileElement {
  @consume({ context: MainnavBreakpointContext, subscribe: true })
  @state()
  protected override _breakpointReached = true;
}

export default SgdsMainnavProfile;
