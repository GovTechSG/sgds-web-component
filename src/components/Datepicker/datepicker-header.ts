import { isBefore, isEqual } from "date-fns";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { sanitizedNextMonth, sanitizedPreviousMonth } from "../../utils/time";
import { watch } from "../../utils/watch";
import styles from "./datepicker-header.scss";
import { ViewEnum } from "./types";

const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export class DatepickerHeader extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** @internal */
  @property({ attribute: false })
  displayDate: Date;
  /** @internal */
  @property({ attribute: false })
  focusedDate: Date;
  /** @internal */
  @property({ attribute: false })
  selectedDate: Date[] = [];

  /** @internal */
  @property()
  view: ViewEnum;
  /** @internal */
  @property()
  focusedTabIndex: number;

  @watch("focusedTabIndex", { waitUntilFirstUpdate: true })
  _handleFocusedTabIndexChange() {
    if (this.focusedTabIndex < 3) {
      const buttonToFocus: HTMLButtonElement = this.shadowRoot.querySelector(
        `button[tabindex="${this.focusedTabIndex}"]`
      );
      buttonToFocus.focus();
    }
    return;
  }

  private _changeView() {
    switch (this.view) {
      case "days":
        this.view = "months";
        break;
      case "months":
        this.view = "years";
        break;
      case "years":
        break;
    }
    this.emit("sgds-view", { detail: this.view }); // emit event to render the correct view
  }

  private _renderHeader() {
    const { view, displayDate } = this;
    if (view === "months") {
      return html` ${displayDate.getFullYear()} `;
    }
    if (view === "years") {
      const CURRENT_YEAR = new Date().getFullYear();
      const displayYear = this.displayDate.getFullYear();
      const remainder = (displayYear - CURRENT_YEAR) % 12;
      const yearsPosition = remainder < 0 ? 12 + remainder : remainder;
      const startLimit = displayYear - yearsPosition;
      const endLimit = displayYear - yearsPosition + 12 - 1;
      return html` ${startLimit} - ${endLimit} `;
    }
    return html`${MONTH_LABELS[displayDate.getMonth()]} ${displayDate.getFullYear()}`;
  }

  /** @internal */
  private handleClickPrevious() {
    const { view, displayDate, focusedDate } = this;
    let newDisplayDate = new Date(displayDate);

    if (view === "months") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 1);
    } else if (this.view === "years") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 12);
    } else {
      /**
       * FocusedDate gets precedence over displayDate.
       *  This happens when the arrow keys are pressed to
       *  change focus date and user clicks the arrow buttons to
       * shift months
       */
      if (focusedDate.getDate() !== displayDate.getDate()) {
        newDisplayDate = sanitizedPreviousMonth(focusedDate);
      } else {
        newDisplayDate = sanitizedPreviousMonth(newDisplayDate);
      }
    }
    this.displayDate = newDisplayDate; // Update the displayDate property
    // emit event to render correct view
    this.emit("sgds-change-calendar", { detail: this.displayDate });
  }

  /** @internal */
  private _handleClickNext() {
    const { view, displayDate, focusedDate } = this;
    let newDisplayDate = new Date(displayDate);

    if (view === "months") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 1);
    } else if (this.view === "years") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 12);
    } else {
      /** FocusedDate gets precedence over displayDate  */
      if (focusedDate.getDate() !== displayDate.getDate()) {
        newDisplayDate = sanitizedNextMonth(focusedDate);
      } else {
        newDisplayDate = sanitizedNextMonth(newDisplayDate);
      }
    }
    this.displayDate = newDisplayDate; // Update the displayDate property

    //emit event to render correct view
    this.emit("sgds-change-calendar", { detail: this.displayDate });
  }
  private _removeCaret(): boolean {
    const displayYear = this.displayDate.getFullYear();
    const displayMonth = this.displayDate.getMonth();
    const displayMonthYear = new Date(displayYear, displayMonth);

    if (this.view === "months") {
      return displayYear <= 1900;
    }
    if (this.view === "years") {
      return displayYear < 1904;
    }
    return isEqual(displayMonthYear, new Date(0, 0, 1)) || isBefore(displayMonthYear, new Date(0, 0, 1));
  }

  render() {
    return html`
      <div class="datepicker-header dropdown-header" role="heading">
        <div class="text-center d-flex justify-content-between align-items-center">
          <button
            @click="${this.handleClickPrevious}"
            tabindex="0"
            class="${classMap({ invisible: this._removeCaret() })}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <button @click=${this._changeView} tabindex="1">${this._renderHeader()}</button>
          <button @click="${this._handleClickNext}" tabindex="2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      </div>
    `;
  }
}

export default DatepickerHeader;
