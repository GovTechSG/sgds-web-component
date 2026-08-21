import { provide } from "@lit/context";
import { html } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import NavElement from "../../base/nav-element";
import { HasSlotController } from "../../utils/slot";
import { MainnavBreakpointContext, MainnavExpandedContext } from "./mainnav-context";
import mainnavStyle from "./mainnav.css";
import SgdsMainnavDropdown from "./sgds-mainnav-dropdown";
import SgdsMainnavItem from "./sgds-mainnav-item";

export type MainnavExpandSize = "sm" | "md" | "lg" | "xl" | "xxl" | "always" | "never";

/**
 * @summary This component is the primary means that your users will use to navigate through your portal. It includes horizontal navigation and branding to identify your site.
 *
 * @event sgds-show - Emitted on show. Only for collapsed menu.
 * @event sgds-after-show - Emitted on show after animation has completed. Only for collapsed menu.
 * @event sgds-hide - Emitted on hide. Only for collapsed menu.
 * @event sgds-after-hide - Emitted on hide after animation has completed. Only for collapsed menu.
 *
 * @slot default - Default slot of SgdsMainnav. Pass in SgdsMainnavItem elements here.
 * @slot start - Elements in this slot will be positioned to the left of the brand.
 * @slot end - Elements in this slot will be positioned to the right end of .navbar-nav. Elements in this slot will also be included in collapsed menu.
 * @slot brand - Brand slot of SgdsMainnav. Pass in brand logo img here
 * @slot profile - Profile slot positioned at the far right in desktop. In mobile, moves into the collapsed menu as the first item.
 * @slot non-collapsible - Elements in this slot will not be collapsed
 *
 */
export class SgdsMainnav extends NavElement {
  static styles = [...NavElement.styles, mainnavStyle];

  @provide({ context: MainnavBreakpointContext })
  @state()
  private _breakpointReached = false;

  @provide({ context: MainnavExpandedContext })
  @state()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _expanded = false;

  /** Used only for SSR to indicate the presence of the `non-collapsible` slot. */
  @property({ type: Boolean }) hasNonCollapsibleSlot = false;

  /** When true, removes max-width constraint to allow content to stretch full screen width */
  @property({ type: Boolean, reflect: true })
  fluid = false;

  @queryAssignedElements() private defaultNodes!: SgdsMainnavItem[] | SgdsMainnavDropdown[];

  @queryAssignedElements({ slot: "end" }) private endNodes!: SgdsMainnavItem[] | SgdsMainnavDropdown[];

  /** @internal */
  get defaultSlotItems(): SgdsMainnavItem[] | SgdsMainnavDropdown[] {
    return [...(this.defaultNodes || [])].filter((node: HTMLElement) => typeof node.tagName !== "undefined") as
      | SgdsMainnavItem[]
      | SgdsMainnavDropdown[];
  }

  /** @internal */
  get endSlotItems(): SgdsMainnavItem[] | SgdsMainnavDropdown[] {
    return [...(this.endNodes || [])].filter((node: HTMLElement) => typeof node.tagName !== "undefined") as
      | SgdsMainnavItem[]
      | SgdsMainnavDropdown[];
  }

  private readonly hasSlotController = new HasSlotController(this, "non-collapsible");

  updated() {
    if (!this.hasNonCollapsibleSlot) this.hasNonCollapsibleSlot = this.hasSlotController.test("non-collapsible");
    // Sync expanded state to context
    this._expanded = this.expanded;
  }

  protected _onBreakpointReached(reached: boolean): void {
    this._breakpointReached = reached;
  }

  protected _isBreakpointReached(): boolean {
    return this._breakpointReached;
  }

  private _handleDefaultSlotChange(e: Event) {
    const childElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true });
    childElements.forEach(el => {
      el.setAttribute("expand", this.expand);
      el.setAttribute("tone", this.tone);
    });

    if (this._hasProfileComponent && childElements.length > 0) {
      console.warn(
        "[sgds-mainnav] Using <sgds-mainnav-item> alongside <sgds-mainnav-profile> is not recommended. " +
          "The profile component disables the mainnav hamburger menu, so nav items will have no mobile menu. " +
          "Use a sidebar for navigation in operational apps."
      );
    }
  }

  private _handleSlotChange(e: Event) {
    const childElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true });
    childElements.forEach(e => {
      e.setAttribute("name", e.tagName.toLowerCase());
      e.setAttribute("expand", this.expand);
      e.setAttribute("tone", this.tone);
    });
  }

  private _handleProfileSlotChange(e: Event) {
    const childElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true });
    childElements.forEach(el => {
      el.setAttribute("expand", this.expand);
    });
  }

  render() {
    this.breakpointReached =
      window.innerWidth <
      (this.expand === "always"
        ? -1
        : this.expand === "never"
        ? Infinity
        : { sm: 512, md: 768, lg: 1024, xl: 1280, xxl: 1440 }[this.expand]);

    return html`
      <nav>
        <div class="navbar ${this._expandClass()}">
          <slot name="start"></slot>
          <a class="navbar-brand" href=${this.brandHref} aria-label="brand-link">
            <slot name="brand"></slot>
          </a>
          <div class="navbar-body navbar-collapse" id=${this.collapseId}>
            <div class="navbar-nav navbar-nav-scroll">
              <slot @slotchange=${this._handleDefaultSlotChange}></slot>
              <slot
                name="end"
                class=${classMap({ "slot-end": !this.breakpointReached })}
                @slotchange=${this._handleSlotChange}
              ></slot>
            </div>
          </div>
          <div class="navbar-end">
            <slot name="non-collapsible" class=${classMap({ "slot-empty": !this.hasNonCollapsibleSlot })}></slot>
            <slot name="profile" @slotchange=${this._handleProfileSlotChange}></slot>
            ${this._renderToggler()}
          </div>
        </div>
      </nav>
    `;
  }
}

export default SgdsMainnav;
