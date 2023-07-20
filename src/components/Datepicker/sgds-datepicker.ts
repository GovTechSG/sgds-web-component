import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DatepickerElement } from "../../base/datepicker-dropdown-element";
import "./sgds-datepicker-calendar";
import "./sgds-datepicker-header";
import styles from "./sgds-datepicker.scss";
import { live } from "lit/directives/live.js";

export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";

/**
 * @summary The `DatePicker` Component is built using `Dropdown`, `Input` and `Button` components. By default, the Calendar points to current date and input has no value. The input is a read-only and users can only pick dates using the Calendar.
 *
 * @event sgds-change-date - Emitted when the state of datepicker's input changes
 *
 */

@customElement("sgds-datepicker")
export class SgdsDatepicker extends DatepickerElement {
  static styles = [DatepickerElement.styles, styles];

  /** When true, adds required attribute to input element */
  @property({ type: Boolean, reflect: true }) required = false;

  /** When true, adds disabled attribute to input and button element */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** When true, adds no flip even when placement does not fit */
  @property({ type: Boolean, reflect: true, state: false }) noFlip = false;

  /** @internal */
  @property({ type: String })
  view: string;

  /** @internal */
  @property({ type: Array }) selectedDateRange: Date[] = [];

  /** @internal */
  @property({ attribute: false }) displayDate: Date = new Date();

  /** @internal */
  @property({ attribute: false }) displayDateInput: Date;

  /** The initial value range of DatePicker on first load for single & range mode. eg.'["2023-06-22", "2023-06-11"]' */
  @property({ type: Array }) initialValue: Date[];

  /** Date format reflected on input  */
  @property({ type: String }) dateFormat: DateFormat = "DD/MM/YYYY";

  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) minDate: string;

  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) maxDate: string;

  /** Changes DatePicker to single date selection or range date selection */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  /** The DatePicker input's value attribute. */
  @property({ type: String, reflect: true }) value = "";

  constructor() {
    super();
    this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 10]
        }
      }
    ];
  }

  connectedCallback() {
    super.connectedCallback();

    // Add click event listener to the document
    document.addEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this));

    this.addEventListener("sgds-view", this.handleViewChanged); // this is for mid button to change the calendar view
    this.addEventListener("sgds-view-date", this.handleDateChanged); // this is for the left & right chevron button
    this.addEventListener("sgds-selectmonth", this.handleSelectMonth);
    this.addEventListener("sgds-selectyear", this.handleSelectYear);
    this.addEventListener("sgds-selectdates", this.handleSelectDates);

    if (this.mode === "single" && this.initialValue) {
      const startDate = new Date(this.initialValue[0]);
      this.selectedDateRange = [startDate, undefined];
    } else if (this.mode === "range" && this.initialValue && this.initialValue.length === 2) {
      const startDate = new Date(this.initialValue[0]);
      const endDate = new Date(this.initialValue[1]);
      this.selectedDateRange = [startDate, endDate];
      this.selectedDateRange.sort((a, b) => a.getTime() - b.getTime());
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Remove the click event listener from the document
    document.removeEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this));
  }

  /** @internal */
  private makeInputValueString = (startDate: Date, endDate: Date, dateFormat: string) => {
    if (!startDate && !endDate) return "";

    const formatDate = (date: Date) => {
      if (!(date instanceof Date) || isNaN(date.getTime())) {
        return ""; // Return an empty string if the date is not a valid Date object
      }

      const month = date.getMonth() + 1;
      const day = date.getDate();
      const separator = "/";
      const formattedMonth = month > 9 ? month.toString() : `0${month}`;
      const formattedDay = day > 9 ? day.toString() : `0${day}`;

      return dateFormat === "YYYY/MM/DD"
        ? `${date.getFullYear()}${separator}${formattedMonth}${separator}${formattedDay}`
        : dateFormat === "DD/MM/YYYY"
        ? `${formattedDay}${separator}${formattedMonth}${separator}${date.getFullYear()}`
        : `${formattedMonth}${separator}${formattedDay}${separator}${date.getFullYear()}`;
    };

    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (startDate) {
      return formatDate(startDate);
    }

    return "";
  };

  /** @internal */
  private handleSelectDates(event: CustomEvent<Date[]>) {
    const newSelectedDates = event.detail;
    if (this.mode === "range") {
      // Sort the newSelectedDates array in ascending order
      newSelectedDates.sort((a: Date, b: Date) => a.getTime() - b.getTime());

      this.selectedDateRange = newSelectedDates;
      if (this.selectedDateRange.length === 2) {
        this.hideMenu();
      }
      this.displayDateInput = newSelectedDates.length > 0 ? newSelectedDates[0] : undefined;
    } else if (this.mode === "single") {
      this.selectedDateRange = [newSelectedDates[0]];

      if (this.selectedDateRange.length === 1) {
        this.hideMenu();
      }
    }

    // Get the formattedDate value for the selected dates
    const formattedDate = this.makeInputValueString(
      this.selectedDateRange[0],
      this.selectedDateRange[1],
      this.dateFormat
    );

    // Set formattedDate value as the new value for sgds-input
    this.value = formattedDate;

    this.emit("sgds-change-date", { detail: formattedDate });
  }

  /** @internal */
  private handleViewChanged(event: CustomEvent<string>) {
    this.view = event.detail;
  }

  /** @internal */
  private handleDateChanged(event: CustomEvent<Date>) {
    this.displayDate = event.detail;
  }

  /** @internal */
  private handleSelectMonth(event: CustomEvent<Date>) {
    this.displayDate = event.detail;
  }

  /** @internal */
  private handleSelectYear(event: CustomEvent<Date>) {
    this.displayDate = event.detail;
  }

  /** @internal */
  private handleButtonResetClick() {
    this.displayDate = new Date();
    this.selectedDateRange = [];
    this.hideMenu();
  }

  render() {
    let formattedDate = "";
    if (this.mode === "single") {
      formattedDate = this.makeInputValueString(this.selectedDateRange[0], undefined, this.dateFormat);
    } else if (this.mode === "range") {
      formattedDate = this.makeInputValueString(this.selectedDateRange[0], this.selectedDateRange[1], this.dateFormat);
    }

    const getPlaceholder = (): string => {
      const validDateFormats: DateFormat[] = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY/MM/DD"];

      if (this.mode === "range" && validDateFormats.includes(this.dateFormat)) {
        return `${this.dateFormat.toLowerCase()} - ${this.dateFormat.toLowerCase()}`;
      } else if (this.mode === "single" && validDateFormats.includes(this.dateFormat)) {
        return this.dateFormat.toLowerCase();
      }

      return "";
    };

    const svgEl = html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-x"
        viewBox="0 0 16 16"
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    `;

    const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
  </svg>
    `;
    return html`
      <div>
        <sgds-input
          id="myInput"
          icon=${svgIcon}
          .value=${live(formattedDate)}
          inputClasses="rounded-0 rounded-start"
          placeholder="${getPlaceholder()}"
          aria-expanded="${this.menuIsOpen}"
          ${ref(this.myDropdown)}
          @click=${() => this._onClickInput()}
          readonly
          ?required=${this.required}
          ?disabled=${this.disabled}
        ></sgds-input>
        <sgds-button
          ?disabled=${this.disabled}
          buttonClasses="rounded-0 h-100"
          type="reset"
          @click=${() => this.handleButtonResetClick()}
          >${svgEl}</sgds-button
        >
        <ul
          class="sgds datepicker dropdown-menu"
          role="menu"
          part="menu"
          @click=${(event: MouseEvent) => event.stopPropagation()}
        >
          <sgds-datepicker-header .view=${this.view} .displayDate=${this.displayDate}></sgds-datepicker-header>
          <sgds-datepicker-calendar
            .view=${this.view}
            .displayDate=${this.displayDate}
            .displayDateInput=${this.displayDateInput}
            .mode=${this.mode}
            minDate=${this.minDate}
            maxDate=${this.maxDate}
            .selectedDate=${this.selectedDateRange}
          ></sgds-datepicker-calendar>
        </ul>
      </div>
    `;
  }
}
export default SgdsDatepicker;
