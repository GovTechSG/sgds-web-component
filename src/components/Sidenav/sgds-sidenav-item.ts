import { html, nothing } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsSidenavLink from "./sgds-sidenav-link";
import sidenavItemStyle from "./sidenav-item.css";

/**
 * @description SgdsSidenavItem can function as either a menu type or a link type. Its type is determined by the children slotted into the default slot.
 * A single anchor tag element passed into the default slot converts SgdsSidenavItem to a link type while passing in SgdsSidenavLink components into the default slots makes it a menu type.
 *
 * @event sgds-toggle - Emitted when the sidenav item's button is clicked. Only applicable to menu type.
 * @event sgds-show - Emitted on show. Only applicable to menu type.
 * @event sgds-after-show - Emitted on show after animation has completed. Only applicable to menu type.
 * @event sgds-hide - Emitted on hide. Only applicable to menu type.
 * @event sgds-after-hide - Emitted on hide after animation has completed. Only applicable to menu type.
 *
 * @slot default - default slot for SgdsSidenavLink and second level SgdsSidenavItem. For link type SgdsSidenavItem, pass in a single anchor tag to the default slot. For menu type, pass in SgdsSidenavLink to the default slot
 * @slot title - title slot for the content of SgdsSidenavItem's menu button element. Only applicable to menu type
 * @slot icon - icon slot for the content of SgdsSidenavItem's menu button element. Only applicable to menu type
 * @slot caret-icon - The slot for the caret arrow icon of SgdsSidenavItem. Only applicable to menu type.
 */

export class SgdsSidenavItem extends SgdsElement {
  static styles = [...SgdsElement.styles, sidenavItemStyle];
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  @query(".sidenav-body") body: HTMLElement;
  /** @internal */
  @query(".sidenav-btn") header: HTMLElement;
  /**
   *  when true, toggles the sidenav-item to open on first load and set the active stylings.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Disables the SgdsSidenavItem
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state() private isLink = false;

  /**
   * @internal Forwards to id attribute of div.collapse and aria-controls attribute of button in SgdsSidenavItem. By default, SgdsSidenavItem auto-generates a unique id. Override the default id by specifiying your own
   */

  private _collapseId: string = genId("sidenav", "collapse");

  /**
   * @internal Forwards to id attribute of button and aria-labelledby attribute of ul.sidenav-list in SgdsSidenavItem. By default, SgdsSidenavItem auto-generates a unique id. Override the default id by specifiying your own
   */
  private _buttonId: string = genId("sidenav", "button");

  private _levelId = genId("sidenav", "this");
  private _firstLevelId = "first-level-" + this._levelId;
  private _secondLevelId = "second-level-" + this._levelId;
  private _thirdLevelId = "third-level-" + this._levelId;

  /** @internal */
  private index = "-1";

  private _onToggle() {
    this.emit("sgds-toggle", { detail: { index: this.index } });
  }

  /** Shows the sidenav item. Only applicable to sgds-sidenav-item that are of menu types */
  public async show() {
    if (this.isLink) return;
    if (this.active) {
      return;
    }

    this.active = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the sidenav item.  Only applicable to sgds-sidenav-item that are of menu types */
  public async hide() {
    if (this.isLink) return;
    if (!this.active) {
      return;
    }
    this.active = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.classList.add(this._firstLevelId);
  }
  firstUpdated() {
    if (!this.isLink) {
      this.body.hidden = !this.active;
      this.body.style.height = this.active ? "auto" : "0";
    }

    this._handleOpenMenu();
  }

  /**
   * Sets active to true to open menu ,
   * evaluating based on whether any of the child in any level is active
   * If at least 1 child is active, parent item should be active
   */
  private _handleOpenMenu() {
    if (!this.active) {
      this.active = this._items.some((i: SgdsSidenavItem | SgdsSidenavLink) => i.active);
    }
  }
  private _handleSummaryClick() {
    if (this.active) {
      this.hide();
    } else {
      this.show();
    }

    this._onToggle();
    this.header.focus();
  }
  private _handleSummaryKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (this.active) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  }

  @watch("active", { waitUntilFirstUpdate: true })
  async _handleOpenChange() {
    if (this.isLink) return;
    if (this.active) {
      // Show
      const sgdsShow = this.emit("sgds-show", { cancelable: true });
      if (sgdsShow.defaultPrevented) {
        this.active = false;
        return;
      }

      await stopAnimations(this.body);
      this.body.hidden = false;

      const { keyframes, options } = getAnimation(this, "sidenav.show");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = "auto";

      this.emit("sgds-after-show");
    } else {
      // Hide
      const sgdsHide = this.emit("sgds-hide", { cancelable: true });
      if (sgdsHide.defaultPrevented) {
        this.active = true;
        return;
      }

      await stopAnimations(this.body);

      const { keyframes, options } = getAnimation(this, "sidenav.hide");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = "auto";

      this.emit("sgds-after-hide");
    }
  }
  @queryAssignedElements() private _items: SgdsSidenavLink[];
  private _handleSlotChange(e: Event) {
    const anchorItems = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(item => item.tagName.toLowerCase() === "a");

    if (anchorItems.length > 1) {
      return console.error("More than one anchor tag is added to sgds-sidenav-item");
    } else if (anchorItems.length === 1) {
      const anchor = anchorItems[0] as HTMLAnchorElement;
      this.disabled && anchor.setAttribute("tabindex", "-1");
      this.active && anchor.setAttribute("aria-current", "true");
      return (this.isLink = true);
    }

    const sideNavItems = (e.target as HTMLSlotElement)
      .assignedElements({ flatten: true })
      .filter(item => item.tagName.toLowerCase() === "sgds-sidenav-item");

    /** All sgds-sidenav-item in this slot is a 2nd level item */
    sideNavItems.forEach(i => {
      const firstLevelId = Array.from(i.classList).filter(c => c.startsWith("first-level"))[0];
      i.classList.replace(firstLevelId, this._secondLevelId);
    });
    /** All second level sgds-sidenav-item should only have third level sgds-sidenav-links */
    if (Array.from(this.classList).some(c => c.startsWith("second-level"))) {
      this._items.forEach((i: SgdsSidenavLink) => i.classList.add(this._thirdLevelId));
    }

    this._handleOpenMenu();
  }

  render() {
    const withMenuTemplate = html`
      <button
        @click=${this._handleSummaryClick}
        @keydown=${this._handleSummaryKeyDown}
        class="sidenav-btn ${classMap({
          disabled: this.disabled,
          active: this.active
        })}"
        aria-expanded=${this.active}
        aria-controls=${this._collapseId}
        aria-current=${this.active}
        id=${this._buttonId}
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
      >
        <slot name="icon"></slot>
        <slot name="title"></slot>
        <slot name="caret-icon">
          <sgds-icon name="chevron-down" size="lg" class="caret-icon"></sgds-icon>
        </slot>
      </button>
      <div class="sidenav-body" id="${this._collapseId}">
        <div class="sidenav-list" aria-labelledby="${this._buttonId}">
          <slot class="default" @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;

    const noMenuTemplate = html` <slot @slotchange=${this._handleSlotChange} class="no-menu-default"></slot> `;
    return html`
      <div class="sidenav-item" aria-haspopup="${!this.isLink}">${this.isLink ? noMenuTemplate : withMenuTemplate}</div>
    `;
  }
}
setDefaultAnimation("sidenav.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

setDefaultAnimation("sidenav.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});
export default SgdsSidenavItem;
