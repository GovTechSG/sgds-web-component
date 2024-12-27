import { isBefore, isEqual } from "date-fns";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { sanitizedNextMonth, sanitizedPreviousMonth } from "../../utils/time";
import { watch } from "../../utils/watch";
import SgdsButton from "../Button/sgds-button";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import datepickerHeaderStyle from "./datepicker-header.css";
import { ViewEnum } from "./types";
import SgdsIcon from "../Icon/sgds-icon";

export class DatepickerHeader extends SgdsElement {
  static styles = [datepickerHeaderStyle];

  static dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-icon-button": SgdsIconButton,
    "sgds-button": SgdsButton
  };

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
    let buttonToFocus: SgdsButton | SgdsIconButton;
    switch (this.focusedTabIndex) {
      case 0:
        buttonToFocus = this.shadowRoot.querySelector("sgds-icon-button[name='arrow-left']");
        break;
      case 1:
        buttonToFocus = this.shadowRoot.querySelector("sgds-button");
        break;
      case 2:
        buttonToFocus = this.shadowRoot.querySelector("sgds-icon-button[name='arrow-right']");
        break;
      default:
        return;
    }
    buttonToFocus.focus();
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

  public renderHeader(displayDate = this.displayDate, view = this.view) {
    if (view === "months") {
      return displayDate.getFullYear();
    }
    if (view === "years") {
      const CURRENT_YEAR = new Date().getFullYear();
      const displayYear = displayDate.getFullYear();
      const remainder = (displayYear - CURRENT_YEAR) % 12;
      const yearsPosition = remainder < 0 ? 12 + remainder : remainder;
      const startLimit = displayYear - yearsPosition;
      const endLimit = displayYear - yearsPosition + 12 - 1;
      return `${startLimit} - ${endLimit}`;
    }
    return `${MONTH_LABELS[displayDate.getMonth()]} ${displayDate.getFullYear()}`;
  }

  private _renderHeaderTemplate() {
    return html`${this.renderHeader()}`;
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

  private _ariaLabelForNextBtn() {
    const nextBtnDate = {
      days: "Show next month",
      months: "Show next year",
      years: "Show next 12 years"
    };
    return nextBtnDate[this.view];
  }
  private _ariaLabelForPrevBtn() {
    const prevBtnDate = {
      days: "Show previous month",
      months: "Show previous year",
      years: "Show previous 12 years"
    };
    return prevBtnDate[this.view];
  }

  private _ariaLabelForHeaderBtn() {
    const message = {
      days: `Current view is days, click to show months in ${this.displayDate.getFullYear()}`,
      months: `Current view is months, click to show years between ${this.renderHeader(this.displayDate, "years")}`,
      years: `Current view is years`
    };
    return `${this.renderHeader()}. ${message[this.view]}`;
  }
  render() {
    return html`
      <div class="datepicker-header dropdown-header" role="heading">
        <sgds-icon-button
          name="arrow-left"
          size="sm"
          variant="ghost"
          @click="${this.handleClickPrevious}"
          class=${classMap({ invisible: this._removeCaret() })}
          aria-label=${this._ariaLabelForPrevBtn()}
        >
        </sgds-icon-button>
        <sgds-button
          fullWidth
          variant="ghost"
          size="sm"
          @click=${this._changeView}
          class=${classMap({ disabled: this.view === "years" })}
          aria-disabled=${this.view === "years" ? "true" : "false"}
          aria-live="polite"
        >
          ${this._renderHeaderTemplate()}
        </sgds-button>
        <sgds-icon-button
          name="arrow-right"
          size="sm"
          variant="ghost"
          @click="${this._handleClickNext}"
          aria-label=${this._ariaLabelForNextBtn()}
        >
        </sgds-icon-button>
      </div>
    `;
  }
}

export default DatepickerHeader;

export const MONTH_LABELS = [
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
