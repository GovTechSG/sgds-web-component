import { html } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import SgdsElement from "../../base/sgds-element";
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
  @property()
  view: ViewEnum;

  // connectedCallback() {
  //   super.connectedCallback();
  //   this.displayDate = new Date(); // Set the current date as the displayDate
  // }

  /** @internal */
  private changeView() {
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

  /** @internal */
  private renderHeader() {
    const { view, displayDate } = this;

    if (view === "months") {
      return html` ${displayDate.getFullYear()} `;
    }
    if (view === "years") {
      return html` ${displayDate.getFullYear() - 5} - ${displayDate.getFullYear() + 6} `;
    }
    return html` ${MONTH_LABELS[displayDate.getMonth()]} ${displayDate.getFullYear()} `;
  }

  /** @internal */
  private handleClickPrevious() {
    const { view, displayDate, focusedDate } = this;
    const newDisplayDate = new Date(displayDate);
    if (view === "months") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 1);
    } else if (this.view === "years") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 10);
    } else {
      newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
      /** FocusedDate gets precedence over displayDate  */
      if (focusedDate.getDate() !== displayDate.getDate()) {
        newDisplayDate.setDate(focusedDate.getDate());
      }
    }
    this.displayDate = newDisplayDate; // Update the displayDate property
    // emit event to render correct view
    this.emit("sgds-change-calendar", { detail: this.displayDate });
  }

  /** @internal */
  private handleClickNext() {
    const { view, displayDate, focusedDate } = this;
    const newDisplayDate = new Date(displayDate);

    if (view === "months") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 1);
    } else if (this.view === "years") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 10);
    } else {
      newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
      /** FocusedDate gets precedence over displayDate  */
      if (focusedDate.getDate() !== displayDate.getDate()) {
        // const daysInUpcomingMonth = new Date(newDisplayDate.getFullYear(),newDisplayDate.getMonth() + 1,0 ).getDate()
        // if (focusedDate.getDate() >= daysInUpcomingMonth ){
        //   newDisplayDate.setDate(daysInUpcomingMonth)
        // } else {
        newDisplayDate.setDate(focusedDate.getDate());
        // }
      }
    }
    this.displayDate = newDisplayDate; // Update the displayDate property

    //emit event to render correct view
    this.emit("sgds-change-calendar", { detail: this.displayDate });
  }

  render() {
    const buttonYearStyle = {
      cursor: "default"
    };
    return html`
      <div class="datepicker-header dropdown-header" role="heading">
        <div class="text-center d-flex justify-content-between align-items-center">
          <button @click="${this.handleClickPrevious}">
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
          <button @click=${this.changeView} style=${styleMap(this.view === "years" ? buttonYearStyle : {})}>
            ${this.renderHeader()}
          </button>
          <button @click="${this.handleClickNext}">
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
