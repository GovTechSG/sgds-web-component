import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { format, isBefore, isValid, parse } from "date-fns";
import IMask, { InputMask } from "imask";
import { html } from "lit";
import { property, queryAsync, state, query } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import { watch } from "../../utils/watch";
import { SgdsInput } from "../Input/sgds-input";
import { DatepickerCalendar } from "./datepicker-calendar";
import { DatepickerHeader } from "./datepicker-header";
import styles from "./sgds-datepicker.scss";
import { ViewEnum } from "./types";
import SgdsElement from "../../base/sgds-element";

export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";

const DATE_PATTERNS = {
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
export class DatepickerInput extends SgdsInput {
  /** Date format reflected on input  */
  @property({ type: String }) dateFormat: DateFormat = "DD/MM/YYYY";

  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) minDate: string;

  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) maxDate: string;

  /** Changes DatePicker to single date selection or range date selection */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  @query("input")
  shadowInput: HTMLInputElement;

  private mask: InputMask;
  constructor() {
    super();
    this.inputClasses = `rounded-0 rounded-start`;
    this.type = "text";
  }

  async firstUpdated(changes) {
    super.firstUpdated(changes);
    this._applyInputMask(this.dateFormat);
  }
  private _applyInputMask(dateFormat: string) {
    const shadowInput = this.shadowInput;
    // const shadowInput = this.inputDropdownRef
    const imPattern =
      this.mode === "single" ? DATE_PATTERNS[dateFormat].imPattern : DATE_PATTERNS[dateFormat].imRangePattern;
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
        return dates.map(date => parse(date, DATE_PATTERNS[dateFormat].fnsPattern, new Date()));
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
    this.mask.on("accept", () => {
      this.value = this.mask.masked.value;

      // this.mask.updateValue()
      validateOnAccept(
        this.mode === "range"
          ? `${this.dateFormat.toLowerCase()} - ${this.dateFormat.toLowerCase()}`
          : this.dateFormat.toLowerCase()
      );
    });
    /**
     * Validation after date is complete
     */
    const validateOnComplete = async () => {
      const sgdsInput = this.shadowInput;
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
        this.emit("sgds-selectdates-input", { detail: dateArray });
      }
    };
    this.mask.on("complete", validateOnComplete);
  }

  public destroyInputMask() {
    this.mask?.destroy();
  }
  public applyInputMask() {
    this._applyInputMask(this.dateFormat);
    // this.mask.updateValue()
  }
}

export default DatepickerInput;
