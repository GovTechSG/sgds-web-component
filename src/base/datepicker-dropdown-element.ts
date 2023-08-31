import type { StrictModifiers } from "@popperjs/core";
import * as Popper from "@popperjs/core";
import Dropdown from "bootstrap/js/src/dropdown";
import type{ Dropdown as BsDropdown } from "bootstrap"

import { property, state } from "lit/decorators.js";
import { Ref, createRef } from "lit/directives/ref.js";
import mergeDeep from "../utils/mergeDeep";
import SgdsElement from "./sgds-element";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape";

/**
 * @event sgds-show - Emitted event when show instance is called
 * @event sgds-after-show - Emitted event when datepicker calendar has been made visible to the user and CSS transitions have completed
 * @event sgds-hide - Emitted event when hide instance is called
 * @event sgds-after-hide - Emitted event when datepicker calendar has hidden to the user and CSS transitions have completed
 */
export class DatepickerDropdownElement extends SgdsElement {
  /** @internal */
  myDropdown: Ref<HTMLElement> = createRef();
  /** @internal */
  bsDropdown: BsDropdown = null;

  /** When true, adds no flip even when placement does not fit */
  @property({ type: Boolean })
  protected noFlip = false;

  /** When true, aligns right edge of menu with right edge of button */
  @property({ type: Boolean, reflect: true })
  protected menuAlignRight = false;

  /**@internal */
  @state()
  menuIsOpen = false;

  /** Disables the dropdown toggle */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** @internal */
  @state()
  dropdownConfig: Partial<Popper.Options>;

  /** @internal */
  @state()
  modifierOpt: StrictModifiers[] = [];

  firstUpdated() {
    this.bsDropdown = new Dropdown(this.myDropdown.value, {
      // autoClose not working as bootstrap is using attribute data-bs-toggle="dropdown" to configure autoclose. But it doesnt look into this attribute in the shadow dom
      reference: "toggle", // working
      popperConfig: (defaultConfig?: Partial<Popper.Options>) => {
        //working
        this.dropdownConfig = {
          placement: this.menuAlignRight ? "bottom-end" : "bottom-start",
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
        return mergeDeep(defaultConfig, this.dropdownConfig);
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

    this.addEventListener("keydown", this._handleKeyboardEvent);
  }
  /** When invoked, opens the Datepicker menu */
  public showMenu() {
    this.bsDropdown.show();
  }

  /** When invoked, hides the Datepicker menu */
  public hideMenu() {
    this.bsDropdown.hide();
  }

  _onClickInput() {
    this.bsDropdown.toggle();
  }

  _handleKeyboardEvent(e: KeyboardEvent) {
    switch (e.key) {
      case ARROW_DOWN:
        if (!this.menuIsOpen) return this.bsDropdown.show();
        break;
      case ARROW_UP:
        if (!this.menuIsOpen) return this.bsDropdown.show();
        break;
      case ESC:
        return this.bsDropdown.hide();
      default:
        break;
    }
  }

  _handleClickOutOfElement(e: MouseEvent, self: DatepickerDropdownElement) {
    if (!e.composedPath().includes(self)) {
      this.bsDropdown.hide();
    }
  }
}

export type DropDirection = "left" | "right" | "up" | "down";
