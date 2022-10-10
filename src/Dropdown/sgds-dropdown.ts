import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Dropdown } from "bootstrap";
import * as Popper from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import styles from "./sgds-dropdown.scss";
import mergeDeep from "../utils/mergeDeep";
import genId from "../utils/generateId";
import { SgdsDropdownItem } from "./sgds-dropdown-item";
import SgdsElement from "../utils/sgds-element";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape";
const ENTER = "Enter";
const TAB = "Tab";

export type DropdownButtonVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" 
export type DropDirection = "left" | "right" | "up" | "down"
@customElement("sgds-dropdown")
export class SgdsDropdown extends SgdsElement {
  static styles = styles;

  constructor() {
    super();
    // during blur event, when clicking outside (document/window), hides the dropdown. 
    this.addEventListener("blur", (e) => {
      return e.relatedTarget == null
        ? this.bsDropdown.hide()
        : e.stopPropagation();
    });
  }
  // Close dropdown when clicking outside of current dropdown  (i.e. other dropdowns, or elsewhere in the window)
  connectedCallback() {
    super.connectedCallback();
    addEventListener("click", (e) => this._handleClickOutOfElement(e, this));

  }
  // removing this listener from windows when dropdown is destroyed 
  disconnectedCallback() {
   removeEventListener("click",(e) => this._handleClickOutOfElement(e, this) );
    super.disconnectedCallback();
  }

  private myDropdown: Ref<HTMLElement> = createRef();
  private bsDropdown: Dropdown = null;


  @property({ type: Boolean, reflect: true })
  noFlip = false;
  @property({ type: Boolean, reflect: true })
  menuAlignRight = false;
  @property({ type: String, reflect: true})
  drop : DropDirection = "down"
  @property({ type: Object })
  popperOpts = {};
  @property({ type: String })
  toggleBtnId = genId("dropdown", "button");

  @property({ type: String })
  buttonText = "";
  @property({ type: String })
  variant: DropdownButtonVariant = "secondary";

  @property({ type: String , reflect: true})
  value = undefined;

  @state()
  menuIsOpen = false;
  @state()
  nextItemNo: number = 0;
  @state()
  prevItemNo: number = -1;

  firstUpdated() {
    this.bsDropdown = new Dropdown(this.myDropdown.value, {
      autoClose: true, // not working as bootstrap is using attribute data-bs-toggle="dropdown" to configure autoclose. But it doesnt look into this attribute in the shadow dom
      reference: "toggle", // working
      popperConfig: (defaultConfig?: Partial<Popper.Options>) => {
        //working
        const modifierOpt: StrictModifiers[] = [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ];
        const dropDownConfig = {
          placement: "bottom-start",
          modifiers: !this.noFlip
            ? modifierOpt
            : [
                ...modifierOpt,
                {
                  name: "flip",
                  options: { fallbackPlacements: [] },
                },
              ],
        };
        switch(this.drop) {
          case "up" : 
          dropDownConfig.placement = this.menuAlignRight ? "top-start" : "top-end";
          break;
          case "right": 
          dropDownConfig.placement = "right-start";
          break;
          case "left" : 
          dropDownConfig.placement = "left-start";
          break;
          case "down": 
          dropDownConfig.placement = this.menuAlignRight ? "bottom-start" :  "bottom-end";
          break;
        }
        return mergeDeep(
          defaultConfig,
          mergeDeep(dropDownConfig, this.popperOpts)
        );
      },
    });
    this.myDropdown.value.addEventListener("show.bs.dropdown", () => {
      this.menuIsOpen = true;
    });
    this.myDropdown.value.addEventListener("shown.bs.dropdown", () => {
      this.menuIsOpen = true;
    });
    this.myDropdown.value.addEventListener("hide.bs.dropdown", () => {
      this.menuIsOpen = false;
      this._resetMenu();
    });
    this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
      this.menuIsOpen = false;
    });

    this.addEventListener("keydown", this._handleKeyboardEvent);
  }

  private _onClickButton() {
    this.bsDropdown.toggle();
  }

  private _resetMenu() {
    this.nextItemNo = 0;
    this.prevItemNo = -1;
    // reset the tabindex
    const items = this._getMenuItems();
    items.forEach((i) => {
      i.removeAttribute("tabindex");
    });
  }

  private _getMenuItems(): SgdsDropdownItem[] {
    return this.shadowRoot
      .querySelector("slot")
      .assignedElements({ flatten: true }) as SgdsDropdownItem[];
  }

 private _setMenuItem(currentItemIdx: number) {
    const items = this._getMenuItems();
    const item = items[currentItemIdx];
    const activeItem = item; // item.disabled ? items[0] : item;
    this.nextItemNo = currentItemIdx + 1;
    this.prevItemNo = currentItemIdx - 1;
    // focus or blur items depending on active or not
    items.forEach((i) => {
      i.setAttribute("tabindex", i === activeItem ? "0" : "-1");
      i === activeItem ? i.focus() : i.blur();
    });
  }

  private _handleSelectSlot(e: KeyboardEvent | MouseEvent) {
    const items = this._getMenuItems();
    const currentItemNo = items.indexOf(e.target as SgdsDropdownItem);
    this.nextItemNo = currentItemNo + 1;
    this.prevItemNo = currentItemNo <= 0 ? items.length - 1 : currentItemNo - 1;

    // assign selected dropdown-item value to sgds-dropdown value
    const selectedItem = e.target as SgdsDropdownItem;
    this.value = selectedItem.value;
    this.emit("sgds-select");
    this.bsDropdown.hide();
  }
  private _handleKeyboardEvent(e: KeyboardEvent) {
    const menuItems = this._getMenuItems();
    switch (e.key) {
      case ARROW_DOWN:
        if (!this.menuIsOpen) return this.bsDropdown.show();
        if (this.nextItemNo === menuItems.length) {
          return this._setMenuItem(0);
        } else {
          return this._setMenuItem(this.nextItemNo > 0 ? this.nextItemNo : 0);
        }
      case ARROW_UP:
        if (!this.menuIsOpen) return this.bsDropdown.show();
        if (this.prevItemNo < 0) {
          return this._setMenuItem(menuItems.length - 1);
        } else {
          return this._setMenuItem(this.prevItemNo);
        }
      case ESC:
        return this.bsDropdown.hide();
      case ENTER:
        if (menuItems.includes(e.target as SgdsDropdownItem)) {
          return this._handleSelectSlot(e);
        } else return this.bsDropdown.toggle()
      case TAB: 
        return this.bsDropdown.toggle()
      default:
        break;
    }
  }

  private _handleClickOutOfElement(e: MouseEvent, self: SgdsDropdown){
    if (!e.composedPath().includes(self)) {
    this.bsDropdown.hide();
  }
}
  render() {
    return html`
      <div class="sgds dropdown">
        <button
          class="btn btn-outline-${this.variant} dropdown-toggle"
          type="button"
          aria-expanded="${this.menuIsOpen}"
          @click=${() => this._onClickButton()}
          id=${this.toggleBtnId}
          data-bs-toggle="dropdown"
          ${ref(this.myDropdown)}
        >
          ${this.buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </button>
        <ul class="dropdown-menu" role="menu" part="menu">
          <slot @click=${this._handleSelectSlot}></slot>
        </ul>
      </div>
    `;
  }
}
