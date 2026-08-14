import { html } from "lit";
import { consume } from "@lit/context";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { offset } from "@floating-ui/dom";
import SgdsElement from "../../base/sgds-element";
import SgdsDropdown from "../Dropdown/sgds-dropdown";
import SgdsDropdownItem from "../Dropdown/sgds-dropdown-item";
import SgdsIcon from "../Icon/sgds-icon";
import { MainnavBreakpointContext, MainnavExpandedContext } from "./mainnav-context";
import { SgdsMainnav } from "./sgds-mainnav";
import mainnavProfileStyle from "./mainnav-profile.css";
import genId from "../../utils/generateId";

/**
 * @summary A profile dropdown for the mainnav that shows a full dropdown in desktop and a flat action list in mobile.
 * In mobile, the avatar slot replaces the default menu toggler. Clicking it opens the mobile menu
 * with profile items rendered flat (no drill-down submenu).
 *
 * @slot toggler - Full desktop toggler content (avatar + name + agency text)
 * @slot avatar - Avatar-only element displayed as the mobile menu toggler
 * @slot default - Profile menu items (sgds-dropdown-item elements)
 */
export class SgdsMainnavProfile extends SgdsElement {
  static styles = [...SgdsElement.styles, mainnavProfileStyle];
  /** @internal */
  static dependencies = {
    "sgds-dropdown": SgdsDropdown,
    "sgds-dropdown-item": SgdsDropdownItem,
    "sgds-icon": SgdsIcon
  };

  @consume({ context: MainnavBreakpointContext, subscribe: true })
  @state()
  private _breakpointReached = true;

  @consume({ context: MainnavExpandedContext, subscribe: true })
  @state()
  private expanded: boolean;

  /** When true, disables the profile dropdown */
  @property({ type: Boolean })
  disabled = false;

  /** Accessible label for the profile toggle button */
  @property({ type: String })
  ariaLabel: string;

  /** Controls dropdown close behavior. "default" auto-closes on item/outside click, "outside" closes only on outside click, "inside" prevents auto-close. */
  @property({ type: String })
  close: "default" | "outside" | "inside" = "default";

  /** @internal */
  private togglerId: string = genId("profile", "button");

  /** @internal */
  private _prevBreakpointReached: boolean | null = null;

  /** @internal The avatar element's original slot value */
  private _avatarEl: HTMLElement | null = null;

  updated() {
    if (this._prevBreakpointReached !== this._breakpointReached) {
      if (this._breakpointReached) {
        requestAnimationFrame(() => this._moveAvatarToMainnav());
      } else {
        this._moveAvatarBack();
      }
      this._prevBreakpointReached = this._breakpointReached;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._moveAvatarBack();
  }

  private _getMainnav(): SgdsMainnav | null {
    return this.closest("sgds-mainnav") as SgdsMainnav | null;
  }

  /**
   * Move the [slot="avatar"] element to be a direct child of sgds-mainnav
   * with slot="profile-avatar" so it gets projected into navbar-end.
   * This keeps it in light DOM where page-level utility styles apply.
   */
  private _moveAvatarToMainnav() {
    const mainnav = this._getMainnav();
    if (!mainnav) return;

    this._avatarEl = this.querySelector('[slot="avatar"]') as HTMLElement;
    if (!this._avatarEl) return;

    // Re-slot it to the mainnav's profile-avatar slot
    this._avatarEl.setAttribute("slot", "profile-avatar");
    this._avatarEl.addEventListener("click", this._handleAvatarClick);
    this._avatarEl.setAttribute("role", "button");
    this._avatarEl.setAttribute("tabindex", "0");
    this._avatarEl.setAttribute("aria-label", this.ariaLabel || "Toggle navigation");
    this._avatarEl.style.cursor = "pointer";

    // Move to be a direct child of mainnav (light DOM)
    mainnav.appendChild(this._avatarEl);
  }

  /** Move avatar back to this component */
  private _moveAvatarBack() {
    if (!this._avatarEl) return;

    this._avatarEl.removeEventListener("click", this._handleAvatarClick);
    this._avatarEl.setAttribute("slot", "avatar");
    this._avatarEl.removeAttribute("role");
    this._avatarEl.removeAttribute("tabindex");
    this._avatarEl.removeAttribute("aria-label");
    this._avatarEl.style.removeProperty("cursor");

    // Move back to this element
    this.appendChild(this._avatarEl);
    this._avatarEl = null;
  }

  private _handleAvatarClick = () => {
    const mainnav = this._getMainnav();
    if (mainnav) {
      if (this.expanded) {
        mainnav.hide();
      } else {
        mainnav.show();
      }
    }
  };

  render() {
    if (!this._breakpointReached) {
      // Desktop: standard dropdown
      return html`
        <sgds-dropdown
          .floatingOpts=${{ middleware: [offset(0)] }}
          ?disabled=${this.disabled}
          close=${this.close}
        >
          <a
            class="${classMap({
              "nav-link": true,
              disabled: this.disabled
            })}"
            aria-disabled=${this.disabled ? "true" : "false"}
            aria-label=${ifDefined(this.ariaLabel)}
            id=${this.togglerId}
            tabindex=${this.disabled ? "-1" : "0"}
            role="button"
            slot="toggler"
          >
            <slot name="toggler"></slot>
            <sgds-icon name="chevron-down" size="md"></sgds-icon>
          </a>
          <slot></slot>
        </sgds-dropdown>
      `;
    }

    // Mobile: flat items rendered in-place (projected into mobile menu via slot="profile")
    return html`
      <div class="profile-mobile-items">
        <slot name="toggler" style="display:none"></slot>
        <slot name="avatar" style="display:none"></slot>
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsMainnavProfile;
