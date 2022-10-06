import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Dropdown } from "bootstrap";
import * as Popper from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import styles from "./sgds-dropdown.scss";
import mergeDeep from "../utils/mergeDeep";
import genId from "../utils/generateId";
import {SgdsDropdownItem} from "./sgds-dropdown-item";
import SgdsElement from "../utils/sgds-element";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape";
const ENTER = "Enter";
@customElement("sgds-dropdown")
export class SgdsDropdown extends SgdsElement {
  @query(".dropdown-menu") menu: HTMLElement;

  private myDropdown: Ref<HTMLElement> = createRef();
  private bsDropdown: Dropdown = null;

  static styles = styles;

  @property({ type: Boolean })
  noFlip = false;
  @property({ type: Boolean })
  right = false;
  @property({ type: Boolean })
  dropup = false;
  @property({ type: Boolean })
  dropright = false;
  @property({ type: Boolean })
  dropleft = false;
  @property({ type: Object })
  popperOpts = {};
  @property({ type: String })
  toggleBtnId = genId("dropdown", "button");
  @property({ type: String })
  buttonText = "";
  @property({ type: String })
  variant = "secondary";
  @property({ type: String })
  value = undefined;

  
  @state()
  menuIsOpen = false;

  private _onClickButton() {
    this.bsDropdown.toggle();
  }

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
        if (this.dropup) {
          dropDownConfig.placement = this.right ? "top-end" : "top-start";
        } else if (this.dropright) {
          dropDownConfig.placement = "right-start";
        } else if (this.dropleft) {
          dropDownConfig.placement = "left-start";
        } else if (this.right) {
          dropDownConfig.placement = "bottom-end";
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
      this._resetMenu()
    });
    this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
      this.menuIsOpen = false;
    });

    this.addEventListener("keydown", this._handleKeyboardEvent);
  }

  @state()
  nextItemNo: number = 0;
  @state()
  prevItemNo: number = -1;

  _resetMenu() {
    this.nextItemNo = 0
    this.prevItemNo = -1
  }

  _getMenuItems(): SgdsDropdownItem[] {
    return this.shadowRoot
      .querySelector("slot")
      .assignedElements({ flatten: true }) as SgdsDropdownItem[];
  }

  _setMenuItem(currentItemIdx: number) {
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

  _handleSelectSlot(e: KeyboardEvent | MouseEvent) {
    const items = this._getMenuItems();
    const currentItemNo = items.indexOf(e.target as SgdsDropdownItem);
    this.nextItemNo = currentItemNo + 1;
    this.prevItemNo = currentItemNo <= 0 ? items.length - 1 : currentItemNo - 1;

    // assign selected dropdown-item value to sgds-dropdown value
    const selectedItem = e.target as SgdsDropdownItem
    this.value = selectedItem.value
    this.emit("sgds-select");
    this.bsDropdown.hide()
  }
  _handleKeyboardEvent(e: KeyboardEvent) {
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
        }
        break;
      default:
        break;
    }
  }

  render() {
    return html`
      <div class="sgds dropdown">
        <button
          class="btn btn-outline-${this.variant} dropdown-toggle"
          type="button"
          aria-expanded="false"
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
