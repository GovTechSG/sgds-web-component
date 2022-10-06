import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { Dropdown } from "bootstrap";
import * as Popper from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import styles from "./dropdown.scss";
import mergeDeep from "../utils/mergeDeep";
import genId from "../utils/generateId";
import "./dropdown-item";
import { DropdownItem } from "./dropdown-item";
import SgdsElement from "../utils/sgds-element";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape"
const ENTER = "Enter"
@customElement("dropdown-element")
export class DropdownElement extends SgdsElement {
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

  @state()
  menuIsOpen = false;

  private _onClickButton() {
    this.bsDropdown.toggle();
  }

  //   connectedCallback(): void {
  //       super.connectedCallback()
  //       console.log(this.menuIsOpen, 'menuisOpen')
  //       const firstMenuItem = this.shadowRoot.querySelectorAll('.dropdown-item')[0] as HTMLAnchorElement
  //       this.addEventListener('keydown', (e) => {
  //         if (e.key === ARROW_DOWN && !this.menuIsOpen) {
  //             console.log('here')
  //             this.bsDropdown.show()
  //             firstMenuItem.focus()

  //         }
  //         console.log(e)
  //       })

  //   }

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
      console.log("show");
      this.menuIsOpen = true;
    });
    this.myDropdown.value.addEventListener("shown.bs.dropdown", () => {
      console.log("shown");
      this.menuIsOpen = true;
    });
    this.myDropdown.value.addEventListener("hide.bs.dropdown", () => {
      console.log("hide");
      this.menuIsOpen = false;
    });
    this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
      console.log("hidden");
      this.menuIsOpen = false;
    });
    // this.bsDropdown.show()
    // console.log(this.getMenuItems(), 'getMenu')
    // console.log(this.shadowRoot.querySelector('slot'))
    // const menuItems = this.shadowRoot.querySelector('slot').assignedElements({flatten: true}) as DropdownItem[]
    const menuItems = this.getMenuItems();

    const firstMenuItem = menuItems[0];
    // console.log(firstMenuItem)
    const lastMenuItem = menuItems[menuItems.length - 1];
    // const menu = this.getMenuItems()

    // const firstMenuItem = this.shadowRoot.querySelectorAll('.dropdown-item')[0] as HTMLAnchorElement
    this.addEventListener("keydown", (e) => {
      // if (e.key === ARROW_DOWN || (e.key === ARROW_UP && !this.menuIsOpen)) {
      //   return this.bsDropdown.show();
      // }
      switch (e.key) {
        case ARROW_DOWN:
          if (!this.menuIsOpen) return this.bsDropdown.show()
          if (this.nextItemNo === menuItems.length) {
            return this.setCurrentItem(0);
          } else {
            return this.setCurrentItem(this.nextItemNo > 0 ? this.nextItemNo : 0);
          }
          case ARROW_UP : 
          if (!this.menuIsOpen) return this.bsDropdown.show()
          if (this.prevItemNo < 0) {
            return this.setCurrentItem(menuItems.length - 1);
          } else {
            return this.setCurrentItem(this.prevItemNo);
          }
          case ESC:
            return this.bsDropdown.hide()
          case ENTER: 
          console.log(e)
          if ((e.target as Element).localName === "dropdown-item") {
            this.handleClickSlot(e)
            return this.bsDropdown.hide()
          } 
          break;
          default:  
            break;
      }
    });
  }
  getMenuItems(): DropdownItem[] {
    return this.shadowRoot
      .querySelector("slot")
      .assignedElements({ flatten: true }) as DropdownItem[];
  }

  @state()
  nextItemNo: number = 0;
  @state()
  prevItemNo: number = -1;

  setCurrentItem(itemNo: number) {
    // console.log(item, "item")
    console.log(itemNo);
    const items = this.getMenuItems(); //this.getAllItems({ includeDisabled: false });
    const item = items[itemNo];
    const activeItem = item.disabled ? items[0] : item;
    this.nextItemNo = itemNo + 1;
    this.prevItemNo = itemNo - 1;
    // console.log(activeItem)
    // return activeItem.shadowRoot.querySelector('a').focus()
    // Update tab indexes
    items.forEach((i) => {
      i.setAttribute("tabindex", i === activeItem ? "0" : "-1");
      if (i === activeItem) i.focus();
      else i.blur(); // activeElement.blur()
    });
  }
  handleClickSlot(e) {
    const items = this.getMenuItems();
    const currentItemNo = items.indexOf(e.target as DropdownItem);
    this.nextItemNo = currentItemNo + 1;
    this.prevItemNo = currentItemNo <= 0 ? items.length - 1 : currentItemNo - 1;
    console.log(this.prevItemNo);
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
          <slot @click=${this.handleClickSlot}></slot>
          <!-- <li>
        <a href="#" class="dropdown-item"
          >hello</a>
      </li>        
        <li>
        <a href="#" class="dropdown-item"
          >test</a>
      </li>        
        <li>
        <a href="#" class="dropdown-item"
          >test</a>
      </li>         -->
        </ul>
      </div>
    `;
  }
}
