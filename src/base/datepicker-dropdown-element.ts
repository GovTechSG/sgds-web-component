import { property, state } from "lit/decorators.js";
import { Dropdown } from "bootstrap";
import * as Popper from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";
import { createRef, Ref } from "lit/directives/ref.js";
import mergeDeep from "../utils/mergeDeep";
import genId from "../utils/generateId";
import { DropdownElement } from "./dropdown-element";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape";

export class DatepickerElement extends DropdownElement {
  @property({ reflect: true }) datepickerClasses?: string;
  @property({ type: Boolean, reflect: true }) required = false;

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
        break;
      default:
        break;
    }
  }
}
