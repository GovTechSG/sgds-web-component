import { property, query, state } from "lit/decorators.js";
import { DropdownElement } from "./dropdown-element";
import { SgdsDropdownItem } from "../components";
import { PropertyValueMap } from "lit";

const TAB = "Tab";
const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ENTER = "Enter";

/**
 * @event sgds-select - Emitted event when a slot item is selected
 */
export class DropdownListElement extends DropdownElement {
  static styles = DropdownElement.styles;

  /**@internal */
  @query("ul.dropdown-menu")
  private menu: HTMLUListElement;

  /** @internal */
  @state()
  nextDropdownItemNo = 0;

  /** @internal */
  @state()
  prevDropdownItemNo = -1;

  @property({ type: Boolean, reflect: true })
  hidden = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("sgds-hide", this._resetMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("sgds-hide", this._resetMenu);
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    this.addEventListener("keydown", this._handleKeyboardMenuItemsEvent);
  }

  protected handleSelectSlot(e: KeyboardEvent | MouseEvent) {
    const items = this._getActiveMenuItems();
    const currentItemNo = items.indexOf(e.target as SgdsDropdownItem);
    this.nextDropdownItemNo = currentItemNo + 1;
    this.prevDropdownItemNo = currentItemNo <= 0 ? items.length - 1 : currentItemNo - 1;

    /** Emitted event from SgdsDropdown element when a slot item is selected */
    const selectedItem = e.target as SgdsDropdownItem;
    if (!selectedItem.disabled) {
      this.emit("sgds-select");
      if (this.close !== "outside") {
        this.hideMenu(); // <-- Use new API
      }
    }
  }

  private _resetMenu() {
    this.nextDropdownItemNo = 0;
    this.prevDropdownItemNo = -1;
    // reset the tabindex
    const items = this._getMenuItems();
    items.forEach(item => {
      const dropdownItem = item?.shadowRoot?.querySelector(".dropdown-item") as HTMLAnchorElement;
      dropdownItem && dropdownItem.removeAttribute("tabindex");
    });
  }

  protected _handleKeyboardMenuItemsEvent(e: KeyboardEvent) {
    if (this.readonly) return;
    const menuItems = this._getActiveMenuItems();
    switch (e.key) {
      case ARROW_DOWN:
        e.preventDefault();
        if (this.nextDropdownItemNo === menuItems.length) {
          return this._setMenuItem(0);
        } else {
          return this._setMenuItem(this.nextDropdownItemNo > 0 ? this.nextDropdownItemNo : 0);
        }
      case ARROW_UP:
        e.preventDefault();
        if (this.prevDropdownItemNo < 0) {
          return this._setMenuItem(menuItems.length - 1, false);
        } else {
          return this._setMenuItem(this.prevDropdownItemNo, false);
        }
      case TAB:
        if (!this.menuIsOpen) {
          return;
        }
        e.preventDefault();
        if (e.shiftKey) {
          if (this.prevDropdownItemNo < 0) {
            return this._setMenuItem(menuItems.length - 1, false);
          } else {
            return this._setMenuItem(this.prevDropdownItemNo, false);
          }
        }
        if (this.nextDropdownItemNo === menuItems.length) {
          return this._setMenuItem(0);
        } else {
          return this._setMenuItem(this.nextDropdownItemNo > 0 ? this.nextDropdownItemNo : 0);
        }
      case ENTER:
        if (menuItems.includes(e.target as SgdsDropdownItem)) {
          return this.handleSelectSlot(e);
        }
        break;
      default:
        break;
    }
  }

  private _getMenuItems(): SgdsDropdownItem[] {
    const defaultSlot = this.shadowRoot.querySelector("slot#default");
    // for case when default slot is used e.g. dropdown, mainnavdropdown
    if (defaultSlot) {
      const defaultSlotItems = (this.shadowRoot.querySelector("slot#default") as HTMLSlotElement)
        ?.assignedElements({
          flatten: true
        })
        .filter(el => !el.classList.contains("empty-menu") && !el.hasAttribute("hidden")) as SgdsDropdownItem[];
      return defaultSlotItems;
    }
    // for case when there is no slot e.g. combobox
    if (this.menu?.hasChildNodes()) {
      const menuItems = Array.from(this.menu.children);
      return [...menuItems] as SgdsDropdownItem[];
    }

    return [];
  }

  private _getActiveMenuItems(): SgdsDropdownItem[] {
    return this._getMenuItems().filter(item => !item.disabled);
  }

  private _setMenuItem(currentItemIdx: number, isArrowDown = true) {
    const items = this._getActiveMenuItems();
    if (items.length === 0) return;
    const item = items[currentItemIdx];
    this.nextDropdownItemNo = currentItemIdx + 1;
    this.prevDropdownItemNo = currentItemIdx - 1 < 0 ? items.length - 1 : currentItemIdx - 1;
    let activeItem: SgdsDropdownItem;
    if (item.disabled) {
      return this._setMenuItem(isArrowDown ? this.nextDropdownItemNo : this.prevDropdownItemNo);
    } else activeItem = item;

    // focus or blur items depending on active or not
    items.forEach(item => {
      const dropdownItem = item.shadowRoot.querySelector(".dropdown-item") as HTMLAnchorElement;
      dropdownItem.setAttribute("tabindex", item === activeItem ? "0" : "-1");
      item === activeItem && dropdownItem.focus();
    });
  }
}
