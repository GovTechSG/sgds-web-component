import { html } from "lit";
import { customElement, eventOptions, property, query } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DatepickerElement } from "../../base/datepicker-dropdown-element";
import { DropdownElement } from "../../base/dropdown-element";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
// import { SgdsCalendarHeader } from "./sgds-datepicker";
import styles from "./sgds-datepicker.scss";
import { classMap } from "lit/directives/class-map";

export type DropDirection = "left" | "right" | "up" | "down";

export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";
@customElement("sgds-datepicker")
export class SgdsDatepicker extends DatepickerElement {
  static styles = [DatepickerElement.styles, styles];

  // @query("sgds-datepicker-header")
  // private datepickerHeader!: SgdsCalendarHeader;
  @property({ reflect: true }) datepickerClasses?: string;
  @property({ type: Boolean, reflect: true }) required = false;

  /** @internal */
  @property({ type: String })
  view: string;

  /** @internal */
  @property({ type: Date }) selectedStartDate?: Date;

  /** @internal */
  @property({ type: Array }) selectedDateRange: Date[] = [];

  /** @internal */
  @property({ type: Date }) selectedEndDate?: Date;

  @property({ type: Date }) initialValue?: Date;

  /** @internal */
  @property({ type: Date }) displayDate: Date = new Date();

  @property({ type: Date }) initialUserInput?: Date;

  /** to display the date input */
  @property({ type: Date }) displayDateInput?: Date;
  /** Date format reflected on input  */
  @property({ type: String }) dateFormat: DateFormat = "DD/MM/YYYY";

  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) minDate?: string;

  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) maxDate?: string;

  /** Changes DatePicker to single date selection or range date selection */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  @property({ type: Date }) setInitialDate: Date = new Date();

  /** Controls the close behaviour of dropdown menu. By default menu auto-closes when SgdsDropdownItem or area outside dropdown is clicked */
  @property({ type: String })
  close: "outside" | "default" | "inside" = "inside";

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

    // Add event listener for "view-changed" event
    this.addEventListener("sgds-view", this.handleViewChanged); // this is for the mid button to change the calendar view
    this.addEventListener("sgds-view-date", this.handleDateChanged); // this is for the left-right chevron button
    this.addEventListener("sgds-selectvalue", this.handleSelectValue);
    this.addEventListener("sgds-displayvalue", this.handleDisplayValue);
    this.addEventListener("sgds-selectmonth", this.handleSelectMonth);
    this.addEventListener("sgds-selectyear", this.handleSelectYear);
    // console.log(this.initialValue)
    // Set the initial value of displayDateInput if not already set
    if (this.initialValue) {
      const setInitialDate = new Date(this.initialValue);

      // on initial load, to highlight the correct day,month,year date in view
      this.displayDate = setInitialDate;
      this.displayDateInput = setInitialDate;
    }
  }

  // updated(changedProperties) {
  //   super.updated(changedProperties);
  //   if (changedProperties.has("displayDate")) {
  //     this.requestUpdate("value", null); // Update the placeholder value
  //   }
  // }

  // disconnectedCallback() {
  //   super.disconnectedCallback();
  //   // Remove event listener when the component is disconnected
  //   this.removeEventListener("sgds-view", this.handleViewChanged);
  // }

  // formatDisplayDate() {
  //   const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  //   const formattedDate = this.displayDate.toLocaleDateString(undefined, options);
  //   return formattedDate;
  // }

  @eventOptions({ capture: true })
  handleViewChanged(event) {
    console.log("received view event", event.detail);
    this.view = event.detail;
  }

  @eventOptions({ capture: true })
  handleDateChanged(event) {
    console.log("received view date event", event.detail);
    this.displayDate = event.detail;
   
  }

  @eventOptions({ capture: true })
  handleSelectValue(event) {
    console.log("received select value", event.detail);

    const newSelectedDate = event.detail;
    if (this.mode === "single") {
      this.displayDate = newSelectedDate;
      console.log("single:", this.displayDateInput);
    } else if (this.mode === "range") {
      if (newSelectedDate.length > 1) {
        const startDate = newSelectedDate[0];
        const endDate = newSelectedDate[1];

        this.selectedDateRange = [startDate, endDate];
        this.displayDateInput = startDate;
      } else {
        this.selectedDateRange = [];
        this.displayDateInput = newSelectedDate[0];
      }
    }
  }

  @eventOptions({ capture: true })
  handleDisplayValue(event) {
    console.log("received display values", event.detail);

    const newSelectedDate = event.detail;
    if (this.mode === "single") {
      this.displayDateInput = newSelectedDate;
    }
  }

  @eventOptions({ capture: true })
  handleSelectMonth(event) {
    console.log("received selected month", event.detail);
    this.displayDate = event.detail;
  }

  @eventOptions({ capture: true })
  handleSelectYear(event) {
    console.log("received selected year", event.detail);
    this.displayDate = event.detail;
  }

  render() {
    // const onClear = () => {
    //   this.displayDateInput = undefined;
    // };

    // , endDate: Date | undefined,

    const makeInputValueString = (startDate: Date | undefined, dateFormat: DateFormat) => {
      // if (!startDate && !endDate) return "";

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

      // if (startDate && endDate) {
      //   return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      // }

      if (startDate) {
        return formatDate(startDate);
      }

      return "";
    };

    // // Get the formatted date string or an empty string if displayDateInput is not set
    let formattedDate = "";
    // Include the initialValue in the formattedDate if it exists
    if (this.mode === "single") {
      formattedDate = makeInputValueString(this.displayDateInput, this.dateFormat);
    }
    //  else if (this.mode === "range") {
    //   formattedDate =
    //     this.selectedDateRange.length > 0
    //       ? makeInputValueString(this.selectedDateRange[0], this.selectedDateRange[1], this.dateFormat)
    //       : "";
    // }

    const getPlaceholder = (): string => {
      const validDateFormats: DateFormat[] = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY/MM/DD"];

      if (this.mode === "range" && validDateFormats.includes(this.dateFormat)) {
        return `${this.dateFormat.toLowerCase()} - ${this.dateFormat.toLowerCase()}`;
      } else if (validDateFormats.includes(this.dateFormat)) {
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
      <form>
        <div class="">
          <sgds-input
            icon=${svgIcon}
            .value=${formattedDate}
            inputClasses="rounded-0 rounded-start"
            placeholder="${getPlaceholder()}"
            id=${this.togglerId}
            aria-expanded="${this.menuIsOpen}"
            ${ref(this.myDropdown)}
            @click=${() => this._onClickButton()}
            readonly
            ?required=${this.required}
            ?disabled=${this.disabled}
          ></sgds-input>
          <sgds-button ?disabled=${this.disabled} buttonClasses="rounded-0 h-100" type="reset">${svgEl}</sgds-button>
          <ul class="sgds datepicker dropdown-menu" role="menu" part="menu">
            <sgds-datepicker-header .view=${this.view} .switchDate=${this.displayDate}></sgds-datepicker-header>
            <sgds-datepicker-calendar
              .view=${this.view}
              .displayDate=${this.displayDate}
              .initialValue=${this.initialValue}
              .mode=${this.mode}
              minDate=${this.minDate}
              maxDate=${this.maxDate}
            ></sgds-datepicker-calendar>
          </ul>
        </div>
      </form>
    `;
  }
}
export default SgdsDatepicker;
