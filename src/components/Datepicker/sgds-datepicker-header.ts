import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sgds-datepicker-header.scss";
import SgdsElement from "../../base/sgds-element";

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

@customElement("sgds-datepicker-header")
export class SgdsCalendarHeader extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** @internal */
  @property({ type: Date })
  switchDate: Date;

  /** @internal */
  @state()
  view: string;

  connectedCallback() {
    super.connectedCallback();
    this.switchDate = new Date(); // Set the current date as the displayDate
    this.view = "days";
  }

  changeView() {
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
    this.emit("sgds-view", { detail: this.view }); //check the correct view is shown when clicked on button
  }

  renderHeader() {
    const { view, switchDate } = this;

    if (view === "months") {
      return html` ${switchDate.getFullYear()} `;
    }
    if (view === "years") {
      return html` ${switchDate.getFullYear() - 5} - ${switchDate.getFullYear() + 6} `;
    }
    return html` ${MONTH_LABELS[switchDate.getMonth()]} ${switchDate.getFullYear()} `;
  }

  handleClickPrevious() {
    const { view, switchDate } = this;
    const newDisplayDate = new Date(switchDate);
    newDisplayDate.setDate(1);
    if (view === "months") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 1);
    } else if (this.view === "years") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() - 10);
    } else {
      newDisplayDate.setMonth(newDisplayDate.getMonth() - 1);
    }
    this.switchDate = newDisplayDate; // Update the displayDate property
    console.log(this.switchDate);
    //this needs to be emitted to change the viewbut shouldnt update the feed to the input
    this.emit("sgds-view-date", { detail: this.switchDate });
  }

  handleClickNext() {
    const { view, switchDate } = this;
    const newDisplayDate = new Date(switchDate);
    newDisplayDate.setDate(1);

    newDisplayDate.setDate(1);
    if (view === "months") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 1);
    } else if (this.view === "years") {
      newDisplayDate.setFullYear(newDisplayDate.getFullYear() + 10);
    } else {
      newDisplayDate.setMonth(newDisplayDate.getMonth() + 1);
    }
    this.switchDate = newDisplayDate; // Update the displayDate property
    console.log(this.switchDate);
    //this needs to be emitted to change the viewbut shouldnt update the feed to the input
    this.emit("sgds-view-date", { detail: this.switchDate });
  }

  render() {
    const { view, switchDate } = this;
    const currentDate = new Date(); // Get the current date
    // Check if the displayed date matches the currently selected date
    const isCurrentDate = currentDate.toDateString() === switchDate.toDateString();
    return html`
      <div class="datepicker-header dropdown-header" role="heading">
        <div class="text-center d-flex justify-content-between align-items-center">
          <svg
            @click="${this.handleClickPrevious}"
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
          <button @click=${this.changeView}>${this.renderHeader()}</button>
          <svg
            @click="${this.handleClickNext}"
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
        </div>
      </div>
    `;
  }
}

export default SgdsCalendarHeader;
