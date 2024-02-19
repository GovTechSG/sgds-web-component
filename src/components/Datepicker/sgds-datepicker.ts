import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { format, isBefore, isValid, parse } from "date-fns";
import IMask, { InputMask } from "imask";
import { html } from "lit";
import { property, queryAsync, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import { sortAscDates } from "../../utils/time";
import { watch } from "../../utils/watch";
import { SgdsInput } from "../Input/sgds-input";
import { DatepickerCalendar } from "./datepicker-calendar";
import { DatepickerHeader } from "./datepicker-header";
import styles from "./sgds-datepicker.scss";
import { ViewEnum } from "./types";

export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";

/**
 * @summary The `DatePicker` Component is built using `Dropdown`, `Input` and `Button` components. By default, the Calendar points to current date and input has no value. The input is a read-only and users can only pick dates using the Calendar.
 *
 * @event sgds-change-date - Emitted when the state of datepicker's input changes during first load, close button reset click & date click. Date values can be accessed via event.target.value
 *
 * @cssproperty --datepicker-theme-color - Datepicker's overall theme color
 * @cssproperty --datepicker-hover-bg-color - Datepicker's calendar menu hover color
 * @cssproperty --datepicker-bg-color - Datepicker's menu background color
 * @cssproperty --datepicker-closebutton-bg-color - Datepicker's close button background color
 * @cssproperty --datepicker-closebutton-hover-bg-color - Datepicker's close button hover background color
 * @cssproperty --datepicker-closebutton-color - Datepicker's close button color
 * @cssproperty --datepicker-selected-date-bg-color - Selected date's background color
 * @cssproperty --datepicker-selected-date-text-color - Selected date's text color
 *
 * @description displayDate sets the month, year views of the calendar while focusedDate follows the focus which also directly changes
 * displayDate on certain occasions. Example, when keyboard moves up to the next month, it updates displayDate which then affect the current
 * date view of the calendar
 */
const DATE_PATTERNS = {
  "DD/MM/YYYY": { imPattern: "d{/}`m{/}`Y", fnsPattern: "dd/MM/yyyy" },
  "MM/DD/YYYY": { imPattern: "m{/}`d{/}`Y", fnsPattern: "MM/dd/yyyy" },
  "YYYY/MM/DD": { imPattern: "Y`m{/}`d{/}}", fnsPattern: "yyyy/MM/dd" }
};
export class SgdsDatepicker extends ScopedElementsMixin(DropdownElement) {
  static styles = [DropdownElement.styles, styles];

  /**@internal */
  static get scopedElements() {
    return {
      "sgds-input": SgdsInput,
      "sgds-datepicker-calendar": DatepickerCalendar,
      "sgds-datepicker-header": DatepickerHeader
    };
  }

  /** When true, adds required attribute to input element */
  @property({ type: Boolean, reflect: true }) required = false;

  /** When true, adds disabled attribute to input and button element */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The initial value of DatePicker on first load for single & range mode as array of string. eg.'["22/12/2023"]' for single & '["22/12/2023","25/12/2023"]' for range respectively  */
  @property({ type: Array, reflect: true }) initialValue: string[];

  /** Date format reflected on input  */
  @property({ type: String }) dateFormat: DateFormat = "DD/MM/YYYY";

  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) minDate: string;

  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) maxDate: string;

  /** Changes DatePicker to single date selection or range date selection */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  /** @internal */
  @state() value: string;

  /** @internal */
  @state()
  private view: ViewEnum = "days";

  /** @internal */
  @state() private selectedDateRange: Date[] = [];

  /** @internal */
  @state() private displayDate: Date = new Date();

  /** @internal */
  @state() private focusedDate: Date = new Date();

  @state() private focusedTabIndex = 3;

  @queryAsync("sgds-input")
  private inputDropdownRef: Promise<SgdsInput>;

  @queryAsync("sgds-datepicker-calendar")
  private calendar: Promise<DatepickerCalendar>;

  private mask: InputMask;

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
    this.addEventListener("sgds-view", this._handleViewChanged);
    this.addEventListener("sgds-change-calendar", this._handleDateChanged);
    this.addEventListener("sgds-update-focus", this._handleFocusDateChanged);
    this.addEventListener("sgds-selectmonth", this._handleSelectMonth);
    this.addEventListener("sgds-selectyear", this._handleSelectYear);
    this.addEventListener("sgds-selectdates", this._handleSelectDates);
    this.addEventListener("keydown", this._handleTab);
    this.addEventListener("sgds-hide", this._handleCloseMenu);
  }

  async firstUpdated() {
    super.firstUpdated();

    await this._applyInputMask(this.dateFormat);

    if (this.menuIsOpen) {
      const input = await this.inputDropdownRef;
      this.showMenu();
      const cal = await this.calendar;
      cal.focusOnCalendar(input);
    }

    if (this.initialValue && this.initialValue.length > 0) {
      // Validate initialValue against the dateFormat regex
      const dateFormatRegex = new RegExp(this._getDateFormatRegex());
      // const startDateString = this.initialValue[0];
      const invalidDates = this.initialValue.filter(v => !dateFormatRegex.test(v));
      if (invalidDates.length > 0) {
        return console.error("Invalid date format in initialValue:", invalidDates);
      } else {
        const initialSelectedDates = this.initialValue.map(v =>
          parse(v, DATE_PATTERNS[this.dateFormat].fnsPattern, new Date())
        );
        return this.emit("sgds-selectdates", { detail: initialSelectedDates });
      }
    }
  }
  private async _applyInputMask(dateFormat: string) {
    const datePatterns = {
      "DD/MM/YYYY": {
        imPattern: "`dd{/}`mm{/}`yyyy",
        imRangePattern: "`dd{/}`mm{/}`yyyy - `DD{/}`MM{/}`YYYY",
        fnsPattern: "dd/MM/yyyy"
      },
      "MM/DD/YYYY": {
        imPattern: "`mm{/}`dd{/}`yyyy",
        imRangePattern: "`mm{/}`dd{/}`yyyy - `MM{/}`DD{/}`YYYY",
        fnsPattern: "MM/dd/yyyy"
      },
      "YYYY/MM/DD": {
        imPattern: "`yyyy{/}`mm{/}`dd",
        imRangePattern: "`yyyy{/}`mm{/}`dd - `YYYY{/}`MM{/}`DD",
        fnsPattern: "yyyy/MM/dd"
      }
    };
    const shadowInput = (await this.inputDropdownRef).shadowRoot.querySelector("input");
    const imPattern =
      this.mode === "single" ? datePatterns[dateFormat].imPattern : datePatterns[dateFormat].imRangePattern;
    const blocks = {
      d: { mask: IMask.MaskedRange, placeholderChar: "d", from: 0, to: 9, maxLength: 1 },
      m: { mask: IMask.MaskedRange, placeholderChar: "m", from: 0, to: 9, maxLength: 1 },
      y: { mask: IMask.MaskedRange, placeholderChar: "y", from: 0, to: 9, maxLength: 1 },
      D: { mask: IMask.MaskedRange, placeholderChar: "d", from: 0, to: 9, maxLength: 1 },
      M: { mask: IMask.MaskedRange, placeholderChar: "m", from: 0, to: 9, maxLength: 1 },
      Y: { mask: IMask.MaskedRange, placeholderChar: "y", from: 0, to: 9, maxLength: 1 }
    };
    const maskOptions = {
      mask: imPattern,
      pattern: imPattern,
      eager: true,
      overwrite: true,
      // define str -> date convertion
      parse: function (str: string) {
        const dates = str.split(" - ");
        return dates.map(date => parse(date, datePatterns[dateFormat].fnsPattern, new Date()));
      },
      format: function (dateArr: Date[]) {
        const dateStrings = dateArr.map(date => {
          let dayStr: string,
            monthStr = "";
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();

          if (day < 10) dayStr = "0" + day;
          if (month < 10) monthStr = "0" + month;

          return [dayStr, monthStr, year].join("/");
        });
        return dateStrings.join(" - ");
      },
      lazy: false,
      blocks
    };

    this.mask = IMask(shadowInput, maskOptions);

    let timeout: NodeJS.Timeout;

    const validateOnAccept = (inputMaskPlaceholder: string) => {
      clearTimeout(timeout);
      const currentInputValue = this.mask.masked.value;
      const dates = currentInputValue.split(" - ");
      if (currentInputValue === inputMaskPlaceholder) {
        return shadowInput.classList.remove("is-invalid");
      } else {
        timeout = setTimeout(() => {
          dates.forEach(d => {
            const parsedValue = parse(d, DATE_PATTERNS[this.dateFormat].fnsPattern, new Date());
            if (!isValid(parsedValue) || isBefore(parsedValue, new Date(0, 0, 1))) {
              shadowInput.classList.add("is-invalid");
            } else {
              shadowInput.classList.remove("is-invalid");
            }
          });
        }, 500);
      }
    };
    /**
     * validation while typing date(s) in input`
     */
    this.mask.on("accept", () =>
      validateOnAccept(
        this.mode === "range"
          ? `${this.dateFormat.toLowerCase()} - ${this.dateFormat.toLowerCase()}`
          : this.dateFormat.toLowerCase()
      )
    );
    /**
     * Validation after date is complete
     */
    const validateOnComplete = async () => {
      const sgdsInput = await this.inputDropdownRef;
      const dates = this.mask.value.split(" - ");
      const dateArray: Date[] | string[] = dates.map(date =>
        parse(date, DATE_PATTERNS[this.dateFormat].fnsPattern, new Date())
      );
      const invalidDates = dateArray.filter(date => !isValid(date) || isBefore(date, new Date(0, 0, 1)));
      if (invalidDates.length > 0) {
        sgdsInput.setCustomValidity("Invalid Date");
        return shadowInput.classList.add("is-invalid");
      } else {
        sgdsInput.setCustomValidity("");
        shadowInput.classList.remove("is-invalid");
        this.emit("sgds-selectdates", { detail: dateArray });
      }
    };
    this.mask.on("complete", validateOnComplete);
  }

  private _destroyInputMask() {
    this.mask.destroy();
  }

  /** @internal */
  private _getDateFormatRegex(): string {
    // validate date strings and adhere to the specified date format
    return (
      this.dateFormat
        // Replace any special characters with their escaped version using "\\$&"
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        // Replace 'MM' with '\\d{2}', which matches two digits representing the month (e.g., 01, 12)
        .replace("MM", "\\d{2}")
        // Replace 'DD' with '\\d{2}', which matches two digits representing the day (e.g., 01, 31)
        .replace("DD", "\\d{2}")
        // Replace 'YYYY' with '\\d{4}', which matches four digits representing the year (e.g., 2021)
        .replace("YYYY", "\\d{4}")
        // Replace '/' with '\\/', which matches the forward slash character
        .replace("/", "\\/")
    );
  }
  private _handleTab(event: KeyboardEvent) {
    if (!this.menuIsOpen) {
      return;
    }
    const tabIndexArray = Array(4);
    if (event.shiftKey && event.key === "Tab") {
      event.preventDefault();
      this.focusedTabIndex = (this.focusedTabIndex - 1 + tabIndexArray.length) % tabIndexArray.length;
    } else if (event.key === "Tab") {
      event.preventDefault();
      this.focusedTabIndex = (this.focusedTabIndex + 1 + tabIndexArray.length) % tabIndexArray.length;
    }
  }

  @watch("value")
  _handleValueChange() {
    if (this.mask) {
      this.mask.masked.value = this.value;
    }
    this.emit("sgds-change-date");
  }

  private async _handleCloseMenu() {
    if (this.selectedDateRange.length === 0) {
      this.displayDate = new Date();
    } else {
      const selectedDatesLength = this.selectedDateRange.length;
      this.displayDate = this.selectedDateRange[selectedDatesLength - 1];
      const calendar = await this.calendar;
      calendar._updateFocusedDate();
    }
  }

  private _makeInputValueString = (startDate: Date, endDate: Date, dateFormat: string) => {
    if (!startDate && !endDate) return "";
    const formatDate = (date: Date) =>  format(date, DATE_PATTERNS[dateFormat].fnsPattern)
    if (startDate && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (startDate) {
      
      return formatDate(startDate);
    }

    return "";
  };

  private _handleSelectDates(event: CustomEvent<Date[]>) {
    const newSelectedDates = event.detail;
    newSelectedDates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
    this.displayDate = newSelectedDates[0];
    this.focusedDate = newSelectedDates[0];
    this.selectedDateRange = newSelectedDates;
    if (this.mode === "range" && this.selectedDateRange.length === 2 && this.menuIsOpen) {
      this.hideMenu();
    } else if (this.mode === "single" && this.menuIsOpen && this.selectedDateRange.length === 1) {
      this.hideMenu();
    }

    // Get the formattedDate value for the selected dates
    const formattedDate = this._makeInputValueString(
      this.selectedDateRange[0],
      this.selectedDateRange[1],
      this.dateFormat
    );

    // Set formattedDate value as the new value for sgds-input
    this.value = formattedDate;
  }

  /** update latest view state from datepicker-header */
  private _handleViewChanged(event: CustomEvent<string>) {
    this.view = event.detail as ViewEnum;
  }

  private _handleDateChanged(event: CustomEvent<Date>) {
    this.displayDate = event.detail;
  }
  private _handleFocusDateChanged(event: CustomEvent<Date>) {
    this.focusedDate = event.detail;
  }

  private _handleSelectMonth(event: CustomEvent<Date>) {
    this.displayDate = event.detail;
  }

  private _handleSelectYear(event: CustomEvent<Date>) {
    this.displayDate = event.detail;
  }

  private async _handleButtonResetClick() {
    this.displayDate = new Date();
    this.selectedDateRange = [];
    this.value = "";
    this.view = "days";
    this._destroyInputMask();
    await this._applyInputMask(this.dateFormat);
    this.hideMenu();
  }
  render() {
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
    const inputClasses = `rounded-0 rounded-start`;
    return html`
      <div>
        <sgds-input
          type="text"
          .value=${live(this.value)}
          inputClasses=${inputClasses}
          ${ref(this.myDropdown)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          placeholder=""
        ></sgds-input>
        <button
          class="sgds btn rounded-0 border btn-outline-dark"
          aria-expanded="${this.menuIsOpen}"
          aria-haspopup="dialog"
          aria-controls=${this.dropdownMenuId}
          @click=${() => this.toggleMenu()}
          aria-label=${this.menuIsOpen ? "Close Calendar" : "Open Calendar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-calendar"
            viewBox="0 0 16 16"
          >
            <path
              d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
            />
          </svg>
        </button>
        <button
          ?disabled=${this.disabled}
          class="btn sgds rounded-0 d-flex align-items-center reset-btn"
          @click=${() => this._handleButtonResetClick()}
          aria-label="Reset Datepicker"
        >
          ${svgEl}
        </button>
        <ul
          id=${this.dropdownMenuId}
          class="sgds datepicker dropdown-menu"
          role="dialog"
          part="menu"
          @click=${(event: MouseEvent) => event.stopPropagation()}
        >
          <sgds-datepicker-header
            .view=${this.view}
            .displayDate=${this.displayDate}
            .focusedDate=${this.focusedDate}
            .selectedDate=${this.selectedDateRange}
            .focusedTabIndex=${this.focusedTabIndex}
          ></sgds-datepicker-header>
          <sgds-datepicker-calendar
            .show=${this.menuIsOpen}
            .view=${this.view}
            .displayDate=${this.displayDate}
            .mode=${this.mode}
            minDate=${this.minDate}
            maxDate=${this.maxDate}
            .selectedDate=${this.selectedDateRange}
            .focusedTabIndex=${this.focusedTabIndex}
          ></sgds-datepicker-calendar>
        </ul>
      </div>
    `;
  }
}

export default SgdsDatepicker;
