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

export type DropdownButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";
export type DropDirection = "left" | "right" | "up" | "down";
@customElement("sgds-dropdown")
export class SgdsDropdown extends SgdsElement {
  static styles = styles;

  private myDropdown: Ref<HTMLElement> = createRef();
  private bsDropdown: Dropdown = null;

  @property({ type: Boolean, reflect: true })
  noFlip = false;
  @property({ type: Boolean, reflect: true })
  menuAlignRight = false;
  @property({ type: String, reflect: true })
  drop: DropDirection = "down";
  @property({ type: Object })
  popperOpts = {};
  @property({ type: String })
  toggleBtnId = genId("dropdown", "button");

  @property({ type: String })
  buttonText = "";
  @property({ type: String })
  variant: DropdownButtonVariant = "secondary";

  @property({ type: String, reflect: true })
  value = undefined;

  @property({ type: Boolean })
  menuIsOpen = false;

  @property({ type: String })
  close: "outside" | "default" | "inside" = "default";

  @state()
  nextDropdownItemNo: number = 0;
  @state()
  prevDropdownItemNo: number = -1;
  @state()
  dropdownConfig: Partial<Popper.Options>

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
        this.dropdownConfig = {
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

        switch (this.drop) {
          case "up":
            this.dropdownConfig.placement = this.menuAlignRight
              ? "top-end"
              : "top-start";
            break;
          case "right":
            this.dropdownConfig.placement = "right-start";
            break;
          case "left":
            this.dropdownConfig.placement = "left-start";
            break;
          case "down":
            this.dropdownConfig.placement = this.menuAlignRight
              ? "bottom-end"
              : "bottom-start";
            break;
          default:
            this.dropdownConfig.placement = undefined;
            break;
        }
        return mergeDeep(
          defaultConfig,
          mergeDeep(this.dropdownConfig, this.popperOpts)
        );
      },
    });
    this.myDropdown.value.addEventListener("show.bs.dropdown", () => {
      this.menuIsOpen = true;
      this.emit("sgds-show");
    });
    this.myDropdown.value.addEventListener("shown.bs.dropdown", () => {
      this.menuIsOpen = true;
      this.emit("sgds-shown");
    });
    this.myDropdown.value.addEventListener("hide.bs.dropdown", () => {
      this.menuIsOpen = false;
      this._resetMenu();
      this.emit("sgds-hide");
    });
    this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
      this.menuIsOpen = false;
      this.emit("sgds-hidden");
    });

    this.addEventListener("keydown", this._handleKeyboardEvent);
    if (this.close !== "inside") {
      this.addEventListener("blur", (e) => {
        return e.relatedTarget == null
          ? this.bsDropdown.hide()
          : e.stopPropagation();
      });
      addEventListener("click", (e) => this._handleClickOutOfElement(e, this));
    }
    if (this.menuIsOpen) this.bsDropdown.show();
  }

  public showMenu() {
    this.bsDropdown.show();
  }
  public hideMenu() {
    this.bsDropdown.hide();
  }

  private _onClickButton() {
    this.bsDropdown.toggle();
  }

  private _resetMenu() {
    this.nextDropdownItemNo = 0;
    this.prevDropdownItemNo = -1;
    // reset the tabindex
    const items = this._getMenuItems();
    items.forEach((i) => {
      i.setAttribute("tabindex", "-1");
    });
  }

  private _getMenuItems(): SgdsDropdownItem[] {
    return this.shadowRoot
      .querySelector("slot")
      .assignedElements({ flatten: true }) as SgdsDropdownItem[];
  }

  private _getActiveMenuItems(): SgdsDropdownItem[] {
    return this._getMenuItems().filter((item) => !item.disabled);
  }

  private _setMenuItem(currentItemIdx: number, isArrowDown: boolean = true) {
    const items = this._getActiveMenuItems();
    if (items.length === 0) return;
    let item = items[currentItemIdx];
    this.nextDropdownItemNo = currentItemIdx + 1;
    this.prevDropdownItemNo =
      currentItemIdx - 1 < 0 ? items.length - 1 : currentItemIdx - 1;
    let activeItem: SgdsDropdownItem;
    if (item.disabled) {
      return this._setMenuItem(
        isArrowDown ? this.nextDropdownItemNo : this.prevDropdownItemNo
      );
    } else activeItem = item;

    // focus or blur items depending on active or not
    items.forEach((i) => {
      i.setAttribute("tabindex", i === activeItem ? "0" : "-1");
      i === activeItem ? i.focus() : i.blur();
    });
  }

  private _handleSelectSlot(e: KeyboardEvent | MouseEvent) {
    const items = this._getActiveMenuItems();
    const currentItemNo = items.indexOf(e.target as SgdsDropdownItem);
    this.nextDropdownItemNo = currentItemNo + 1;
    this.prevDropdownItemNo =
      currentItemNo <= 0 ? items.length - 1 : currentItemNo - 1;

    // assign selected dropdown-item value to sgds-dropdown value
    const selectedItem = e.target as SgdsDropdownItem;
    if (!selectedItem.disabled) {
      this.value = selectedItem.value;
      this.emit("sgds-select");
      this.close !== "outside" && this.bsDropdown.hide();
    } else return;
  }
  private _handleKeyboardEvent(e: KeyboardEvent) {
    const menuItems = this._getActiveMenuItems();
    switch (e.key) {
      case ARROW_DOWN:
        if (!this.menuIsOpen) return this.bsDropdown.show();
        if (this.nextDropdownItemNo === menuItems.length) {
          return this._setMenuItem(0);
        } else {
          return this._setMenuItem(
            this.nextDropdownItemNo > 0 ? this.nextDropdownItemNo : 0
          );
        }
      case ARROW_UP:
        if (!this.menuIsOpen) return this.bsDropdown.show();
        if (this.prevDropdownItemNo < 0) {
          return this._setMenuItem(menuItems.length - 1, false);
        } else {
          return this._setMenuItem(this.prevDropdownItemNo, false);
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

  private _handleClickOutOfElement(e: MouseEvent, self: SgdsDropdown) {
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
          ${ref(this.myDropdown)}
          part="toggle"
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
