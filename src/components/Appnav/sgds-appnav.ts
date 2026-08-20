import { provide } from "@lit/context";
import { html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import NavElement from "../../base/nav-element";
import { HasSlotController } from "../../utils/slot";
import { AppnavBreakpointContext, AppnavExpandedContext } from "./appnav-context";
import appnavStyle from "./appnav.css";

export type AppnavTone = "brand" | "gradient-1" | "gradient-2" | "gradient-3" | "gradient-4";

interface DefaultSlotItem {
  label: string;
  element: HTMLElement;
}

/**
 * @summary Application navigation bar for operational apps. Accepts icon-buttons and profile in a fluid layout with collapse/expand behavior.
 *
 * @event sgds-show - Emitted on show. Only for collapsed menu.
 * @event sgds-after-show - Emitted on show after animation has completed. Only for collapsed menu.
 * @event sgds-hide - Emitted on hide. Only for collapsed menu.
 * @event sgds-after-hide - Emitted on hide after animation has completed. Only for collapsed menu.
 *
 * @slot default - Elements in this slot collapse into the mobile menu as text items. Accepts sgds-icon-button and other elements. Uses ariaLabel as menu item text.
 * @slot start - Elements in this slot will be positioned to the left of the brand.
 * @slot brand - Brand slot of SgdsAppnav. Pass in brand logo img here
 * @slot profile - Profile slot. sgds-appnav-profile goes here. Positioned to the right of the toggler.
 *
 */
export class SgdsAppnav extends NavElement {
  static styles = [...NavElement.styles, appnavStyle];

  @provide({ context: AppnavBreakpointContext })
  @state()
  private _breakpointReached = false;

  @provide({ context: AppnavExpandedContext })
  @state()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _expanded = false;

  /** Sets the visual tone of the navigation bar */
  @property({ type: String, reflect: true })
  tone: AppnavTone = "brand";

  /** Used only for SSR to indicate the presence of the `start` slot. */
  @property({ type: Boolean }) hasStartSlot = false;

  private readonly hasSlotController = new HasSlotController(this, "start");

  /** @internal Whether the default slot has assigned elements */
  @state()
  private _hasDefaultSlotItems = false;

  /** @internal Whether the profile slot has assigned elements */
  @state()
  private _hasProfileSlotItems = false;

  /** @internal Stored default slot items for mobile menu rendering */
  @state()
  private _defaultSlotItems: DefaultSlotItem[] = [];

  updated() {
    if (!this.hasStartSlot) this.hasStartSlot = this.hasSlotController.test("start");
    this._expanded = this.expanded;
  }

  protected _onBreakpointReached(reached: boolean): void {
    this._breakpointReached = reached;
  }

  protected _isBreakpointReached(): boolean {
    return this._breakpointReached;
  }

  private _handleTogglerKeydown(e: KeyboardEvent) {
    if (e.key === "Tab" && !e.shiftKey && this.expanded) {
      e.preventDefault();
      const firstItem = this.shadowRoot?.querySelector(".appnav-menu-item") as HTMLElement | null;
      firstItem?.focus();
    }
  }

  private _handleDefaultSlotChange(e: Event) {
    const childElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true }) as HTMLElement[];
    this._hasDefaultSlotItems = childElements.length > 0;
    this._defaultSlotItems = childElements
      .filter(el => typeof el.tagName !== "undefined")
      .map(el => ({
        label: el.getAttribute("ariaLabel") || el.getAttribute("aria-label") || el.textContent?.trim() || "",
        element: el
      }));
    childElements.forEach(el => {
      el.setAttribute("expand", this.expand);
    });
  }

  private _handleMobileItemClick(item: DefaultSlotItem) {
    item.element.click();
    this.hide();
  }

  private _renderAppnavToggler() {
    return html`<sgds-icon-button
      name="three-dots-vertical"
      variant="ghost"
      size="sm"
      tone="fixed-light"
      class="navbar-toggler"
      @click=${this._handleSummaryClick}
      @keydown=${this._handleTogglerKeydown}
      aria-controls="${this.collapseId}"
      aria-expanded="${this.expanded}"
      .ariaLabel=${"Toggle navigation"}
    ></sgds-icon-button>`;
  }

  private _handleProfileSlotChange(e: Event) {
    const childElements = (e.target as HTMLSlotElement).assignedElements({ flatten: true });
    this._hasProfileSlotItems = childElements.length > 0;
    childElements.forEach(el => {
      el.setAttribute("expand", this.expand);
      el.setAttribute("tone", this.tone);
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
          <slot name="start" class=${classMap({ "slot-empty": !this.hasStartSlot })}></slot>
          <a class="navbar-brand" href=${this.brandHref} aria-label="brand-link">
            <slot name="brand"></slot>
          </a>
          <div class="navbar-body navbar-collapse" id=${this.collapseId}>
            <div class="navbar-nav navbar-nav-scroll">
              <slot
                class=${classMap({ "slot-desktop-only": this.breakpointReached })}
                @slotchange=${this._handleDefaultSlotChange}
              ></slot>
              ${this.breakpointReached
                ? this._defaultSlotItems.map(
                    item => html`<a
                      class="appnav-menu-item"
                      role="button"
                      tabindex="0"
                      @click=${() => this._handleMobileItemClick(item)}
                      @keydown=${(e: KeyboardEvent) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          this._handleMobileItemClick(item);
                        }
                      }}
                      >${item.label}</a
                    >`
                  )
                : nothing}
            </div>
          </div>
          <div
            class="navbar-end ${this._hasProfileSlotItems || (this._hasDefaultSlotItems && this.breakpointReached)
              ? ""
              : "slot-empty"}"
          >
            ${this._hasDefaultSlotItems && this.breakpointReached ? this._renderAppnavToggler() : nothing}
            <slot name="profile" @slotchange=${this._handleProfileSlotChange}></slot>
          </div>
        </div>
      </nav>
    `;
  }
}

export default SgdsAppnav;
