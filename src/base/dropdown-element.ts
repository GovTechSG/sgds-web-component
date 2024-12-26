import type { StrictModifiers } from "@popperjs/core";
import * as Popper from "@popperjs/core";
import Dropdown from "bootstrap/js/src/dropdown";
import type { Dropdown as BsDropdown } from "bootstrap";
import { property, state } from "lit/decorators.js";
import { Ref, createRef } from "lit/directives/ref.js";
import mergeDeep from "../utils/mergeDeep";
import SgdsElement from "./sgds-element";
import generateId from "../utils/generateId";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape";

export type DropDirection = "left" | "right" | "up" | "down";

/**
 * @event sgds-show - Emitted event when show instance is called
 * @event sgds-after-show - Emitted event when dropdown has been made visible to the user and CSS transitions have completed
 * @event sgds-hide - Emitted event when hide instance is called
 * @event sgds-after-hide - Emitted event when dropdown has hidden to the user and CSS transitions have completed
 */

export class DropdownElement extends SgdsElement {
  // static styles = SgdsElement.styles;

  /** @internal */
  protected myDropdown: Ref<HTMLElement> = createRef();
  /** @internal */
  protected bsDropdown: BsDropdown = null;

  /** @internal Unique id generated for the dropdown menu */
  protected dropdownMenuId: string = generateId("dropdown-menu", "div");

  /** @internal Controls auto-flipping of menu */
  @property({ type: Boolean, state: true })
  protected noFlip = false;

  /** @internal When true, aligns right edge of menu with right edge of button */
  @property({ type: Boolean, reflect: true, state: true })
  protected menuAlignRight = false;

  /** @internal The drop position of menu relative to the toggle button */
  @property({ type: String, reflect: true, state: true })
  protected drop: DropDirection = "down";

  /**  Additional configuration to pass to Popper.js. See https://popper.js.org/ for config opts */
  @property({ type: Object })
  popperOpts = {};

  /** @internal */
  @state()
  dropdownConfig: Partial<Popper.Options>;
  /** @internal */
  @property()
  protected modifierOpt: StrictModifiers[] = [];

  /** When true, dropdown menu shows on first load */
  @property({ type: Boolean, reflect: true })
  menuIsOpen = false;

  /** Controls the close behaviour of dropdown menu. By default menu auto-closes when SgdsDropdownItem or area outside dropdown is clicked */
  @property({ type: String })
  close: "outside" | "default" | "inside" = "default";

  /** Disables the dropdown toggle */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  connectedCallback() {
    super.connectedCallback();

    if (this.close !== "inside") {
      document.addEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this));
  }

  firstUpdated() {
    this.bsDropdown = new Dropdown(this.myDropdown.value, {
      // autoClose not working as bootstrap is using attribute data-bs-toggle="dropdown" to configure autoclose. But it doesnt look into this attribute in the shadow dom
      reference: "toggle", // working
      popperConfig: (defaultConfig?: Partial<Popper.Options>) => {
        //working
        this.dropdownConfig = {
          placement: "bottom-start",
          strategy: "fixed",
          modifiers: !this.noFlip
            ? this.modifierOpt
            : [
                ...this.modifierOpt,
                {
                  name: "flip",
                  options: { fallbackPlacements: [] }
                }
              ]
        };

        switch (this.drop) {
          case "up":
            this.dropdownConfig.placement = this.menuAlignRight ? "top-end" : "top-start";
            break;
          case "right":
            this.dropdownConfig.placement = "right-start";
            break;
          case "left":
            this.dropdownConfig.placement = "left-start";
            break;
          case "down":
            this.dropdownConfig.placement = this.menuAlignRight ? "bottom-end" : "bottom-start";
            break;
          default:
            this.dropdownConfig.placement = undefined;
            break;
        }
        return mergeDeep(defaultConfig, mergeDeep(this.dropdownConfig, this.popperOpts));
      }
    });

    this.myDropdown.value.addEventListener("show.bs.dropdown", () => {
      this.menuIsOpen = true;
      this.emit("sgds-show");
    });

    this.myDropdown.value.addEventListener("shown.bs.dropdown", () => {
      this.menuIsOpen = true;
      this.emit("sgds-after-show");
    });

    this.myDropdown.value.addEventListener("hide.bs.dropdown", () => {
      this.menuIsOpen = false;
      this.emit("sgds-hide");
    });

    this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
      this.menuIsOpen = false;
      this.emit("sgds-after-hide");
    });

    this.addEventListener("keydown", this._handleKeyboardMenuEvent);
  }

  /** When invoked, opens the dropdown menu */
  public showMenu() {
    this.bsDropdown.show();
  }

  /** When invoked, hides the dropdown menu */
  public hideMenu() {
    this.bsDropdown.hide();
  }

  toggleMenu() {
    this.bsDropdown.toggle();
  }

  private _handleKeyboardMenuEvent(e: KeyboardEvent) {
    switch (e.key) {
      case ARROW_DOWN:
        e.preventDefault();
        if (!this.menuIsOpen) return this.showMenu();
        break;
      case ARROW_UP:
        e.preventDefault();
        if (!this.menuIsOpen) return this.showMenu();
        break;
      case ESC:
        return this.hideMenu();
      default:
        break;
    }
  }

  private _handleClickOutOfElement(e: MouseEvent, self: DropdownElement) {
    if (!e.composedPath().includes(self)) {
      this.hideMenu();
    }
  }
}
