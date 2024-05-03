import { query, state } from "lit/decorators.js";
import { DropdownElement } from "./dropdown-element";
import { SgdsDropdownItem } from "../components";

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

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("sgds-hide", this._resetMenu);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("sgds-hide", this._resetMenu);
  }

  firstUpdated() {
    super.firstUpdated();
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
      this.close !== "outside" && this.bsDropdown.hide();
    } else return;
  }

  private _resetMenu() {
    this.nextDropdownItemNo = 0;
    this.prevDropdownItemNo = -1;
    // reset the tabindex
    const items = this._getMenuItems();
    items.forEach(i => {
      i.removeAttribute("tabindex");
    });
  }

  private _handleKeyboardMenuItemsEvent(e: KeyboardEvent) {
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
    // for case when default slot is used e.g. dropdown, mainnavdropdown
    if (this.shadowRoot.querySelector("slot#default")) {
      return (this.shadowRoot.querySelector("slot#default") as HTMLSlotElement)?.assignedElements({
        flatten: true
      }) as SgdsDropdownItem[];
    }

    // for case when there is no slot e.g. combobox
    if (this.menu.hasChildNodes()) {
      const menuItems = this.menu.children;

      return [...menuItems] as SgdsDropdownItem[];
    }
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
    items.forEach(i => {
      i.setAttribute("tabindex", i === activeItem ? "0" : "-1");
      i === activeItem && i.focus();
    });
  }
}
