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
    if (menuItems.length === 0) return;

    switch (e.key) {
      case ARROW_DOWN:
        e.preventDefault();
        this._setMenuItem(this.nextDropdownItemNo);
        break;
      case ARROW_UP:
        e.preventDefault();
        this._setMenuItem(this.prevDropdownItemNo);
        break;
      case TAB:
        if (!this.menuIsOpen) return;
        e.preventDefault();
        if (e.shiftKey) {
          this._setMenuItem(this.prevDropdownItemNo);
        } else {
          this._setMenuItem(this.nextDropdownItemNo);
        }
        break;
      case ENTER:
        if (menuItems.includes(e.target as SgdsDropdownItem)) {
          this.handleSelectSlot(e);
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
    return this._getMenuItems().filter(item => !item.disabled && !item.hidden);
  }
  private _setMenuItem(currentItemIdx: number) {
    const items = this._getActiveMenuItems();
    if (items.length === 0) return;

    // Use modulo for looping
    const idx = ((currentItemIdx % items.length) + items.length) % items.length;
    const activeItem = items[idx];
    console.log(activeItem, "activeItem");
    this.emit("i-sgds-option-focus", { detail: { option: activeItem } });
    this.nextDropdownItemNo = (idx + 1) % items.length;
    this.prevDropdownItemNo = (idx - 1 + items.length) % items.length;

    items.forEach(item => {
      const dropdownItem = item.shadowRoot.querySelector(".dropdown-item") as HTMLAnchorElement;
      dropdownItem.setAttribute("tabindex", item === activeItem ? "0" : "-1");
      if (item === activeItem) dropdownItem.focus();
    });
  }
}
