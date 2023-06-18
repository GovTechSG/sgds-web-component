import { property } from "lit/decorators.js";
import { DropdownElement } from "./dropdown-element";
import { Calendar, SgdsCalendarHeader, SgdsDatepicker } from "../components/Datepicker";

const ARROW_DOWN = "ArrowDown";
const ARROW_UP = "ArrowUp";
const ESC = "Escape";


export class DatepickerElement extends DropdownElement {
  @property({ reflect: true }) datepickerClasses?: string;
  @property({ type: Boolean, reflect: true }) required = false;

   /** Controls the close behaviour of dropdown menu. By default menu auto-closes when SgdsDropdownItem or area outside dropdown is clicked */
   @property({ type: String })
   close: "outside" | "default" | "inside" = "inside";

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

  
}
