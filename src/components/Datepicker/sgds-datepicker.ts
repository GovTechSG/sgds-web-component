import { format, parse } from "date-fns";
import { html } from "lit";
import { property, query, queryAsync, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import { type SgdsFormControl } from "../../utils/formSubmitController";
import { DATE_PATTERNS, setTimeToNoon } from "../../utils/time";
import { watch } from "../../utils/watch";
import { SgdsButton } from "../Button/sgds-button";
import dropdownMenuStyle from "../Dropdown/dropdown-menu.css";
import { DatepickerCalendar } from "./datepicker-calendar";
import { DatepickerHeader } from "./datepicker-header";
import DatepickerInput from "./datepicker-input";
import datepickerStyle from "./datepicker.css";
import { ViewEnum } from "./types";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import { defaultValue } from "../../utils/defaultvalue";

export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";

/**
 * @summary The `DatePicker` Component is built using `Dropdown`, `Input` and `Button` components. By default, the Calendar points to today's date and input has no value. Users can either pick dates from the calendar or type dates through the input
 *
 * @event sgds-change-date - Emitted when the state of datepicker's input changes during first load, close button reset click & date click. Date values can be accessed via event.target.value
 *
 * @description displayDate sets the month, year views of the calendar while focusedDate follows the focus which also directly changes
 * displayDate on certain occasions. Example, when keyboard moves up to the next month, it updates displayDate which then affect the current
 * date view of the calendar
 */
export class SgdsDatepicker extends SgdsFormValidatorMixin(DropdownElement) implements SgdsFormControl {
  static styles = [...DropdownElement.styles, dropdownMenuStyle, datepickerStyle];
  /**@internal */
  static dependencies = {
    "sgds-datepicker-input": DatepickerInput,
    "sgds-datepicker-calendar": DatepickerCalendar,
    "sgds-datepicker-header": DatepickerHeader,
    "sgds-button": SgdsButton,
    "sgds-icon-button": SgdsIconButton
  };

  constructor() {
    super();
    this.floatingOpts = {
      placement: "bottom-end"
    };
  }

  /** When true, adds required attribute to input element */
  @property({ type: Boolean, reflect: true }) required = false;
  /**The datepicker input's name attribute */
  @property({ reflect: true }) name: string;
  /** When true, adds disabled attribute to input and button element */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Sets the initial value of the datepicker. Replaces deprecated `initialValue`.
   * Pass in dates in this format `dd/mm/yyyy` for single mode and  `dd/mm/yyyy - dd/mm/yyyy` for range mode
   * For example, `value="22/12/2023"` for single mode or `value="22/12/2023 - 25/12/2023"` for range mode
   */
  @property({ type: String, reflect: true }) value = "";

  /**
   * Deprecated since v3.3.0 in favour of `value`.
   * The initial value of DatePicker on first load for single &
   * range mode as array of string. eg.'["22/12/2023"]' for single &
   * '["22/12/2023","25/12/2023"]' for range respectively @deprecated
   * */
  @property({ type: Array, reflect: true }) initialValue: string[] = [];

  private dateFormat = "DD/MM/YYYY";

  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) minDate = "";

  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) maxDate = "";

  /** Changes DatePicker to single date selection or range date selection */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  /**Feedback text for error state when date input is invalid */
  @property({ type: String, reflect: true }) invalidFeedback: string;

  /** Allows invalidFeedback and invalid styles to be visible with the input */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** The datepicker input's label  */
  @property({ reflect: true }) label = "";

  /** The datepicker input's hint text below the label */
  @property({ reflect: true }) hintText = "";

  /** Controls auto-flipping of menu */
  @property({ type: Boolean, reflect: true, state: false })
  noFlip = false;

  /** The drop position of menu relative to the toggle button */
  @property({ type: String, reflect: true, state: false })
  drop: "up" | "down" = "down";

  /** Provides the date context for Calendar to present the appropriate view. Defaults to today's date */
  @property({ attribute: false }) displayDate: Date;

  /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";

  /**@internal */
  @state() invalid = false;

  @state()
  private view: ViewEnum = "days";

  @state() private selectedDateRange: Date[] = [];

  @state() private focusedDate: Date;

  @state() private focusedTabIndex = 3;

  private isValueEmpty() {
    return this.value === "" || this.value === "DD/MM/YYYY" || this.value === "DD/MM/YYYY - DD/MM/YYYY";
  }

  private initialDisplayDate: Date = new Date();

  @queryAsync("sgds-datepicker-calendar")
  private calendar: Promise<DatepickerCalendar>;

  @queryAsync("sgds-datepicker-input")
  private datepickerInputAsync: Promise<DatepickerInput>;

  @query("sgds-datepicker-input")
  private datepickerInput: DatepickerInput;
  /**
   * Checks for validity. Under the hood, HTMLFormElement's reportValidity method calls this method to check for component's validity state
   * Note that the native error popup is prevented for SGDS form components by default. Instead the validation message shows up in the feedback container of SgdsInput
   */
  public reportValidity(): boolean {
    return this._mixinReportValidity();
  }
  /**
   * Checks for validity without any native error popup message
   */
  public checkValidity(): boolean {
    return this._mixinCheckValidity();
  }

  /**
   * Returns the ValidityState object
   */
  public get validity(): ValidityState {
    return this._mixinGetValidity();
  }
  /**
   * Returns the validation message based on the ValidityState
   */
  public get validationMessage() {
    return this._mixinGetValidationMessage();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.addEventListener("sgds-view", this._handleViewChanged);
    this.addEventListener("sgds-change-calendar", this._handleDateChanged);
    this.addEventListener("sgds-update-focus", this._handleFocusDateChanged);
    this.addEventListener("sgds-selectmonth", this._handleSelectMonth);
    this.addEventListener("sgds-selectyear", this._handleSelectYear);
    this.addEventListener("sgds-selectdates", this._handleSelectDatesAndClose);
    this.addEventListener("sgds-selectdates-input", this._handleSelectDatesInput);
    this.addEventListener("sgds-empty-input", this._handleEmptyInput);
    this.addEventListener("keydown", this._handleTab);
    this.addEventListener("sgds-hide", this._handleCloseMenu);
    this.addEventListener("sgds-show", this._handleOpenMenu);
    this.addEventListener("blur", this._mixinCheckValidity);

    this.initialValue = this.value ? this.value.split(" - ").map(v => v.trim()) : this.initialValue;
    this.initialDisplayDate = this.displayDate || new Date();
    if (this.initialValue && this.initialValue.length > 0) {
      // Validate initialValue against the dateFormat regex
      const dateFormatRegex = new RegExp(this._getDateFormatRegex());
      // const startDateString = this.initialValue[0];
      const invalidDates = this.initialValue.filter(v => !dateFormatRegex.test(v));
      if (invalidDates.length > 0) {
        return console.error("Invalid date format in initialValue:", invalidDates);
      } else {
        const initialSelectedDates = this.initialValue.map(v =>
          setTimeToNoon(parse(v, DATE_PATTERNS[this.dateFormat].fnsPattern, new Date()))
        );
        this._handleSelectDates(initialSelectedDates);
      }
    } else {
      this.displayDate = this.initialDisplayDate;
    }
  }

  async firstUpdated() {
    super.firstUpdated();
    if (this.menuIsOpen) {
      const input = await this.datepickerInputAsync;
      this.showMenu();
      const cal = await this.calendar;
      cal.focusOnCalendar(input);
    }
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

  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    this.emit("sgds-change-date");
  }

  private async _handleCloseMenu() {
    //return focus to input when menu closes
    const input = await this.datepickerInputAsync;
    input.focus();

    if (this.selectedDateRange.length === 0) {
      this.displayDate = this.initialDisplayDate;
    } else {
      const selectedDatesLength = this.selectedDateRange.length;
      this.displayDate = this.selectedDateRange[selectedDatesLength - 1];
      const calendar = await this.calendar;
      calendar._updateFocusedDate();
    }
  }
  private async _handleOpenMenu() {
    const cal = await this.calendar;
    const input = await this.datepickerInputAsync;
    cal.focusOnCalendar(input);
  }

  private _makeInputValueString = (startDate: Date, endDate: Date, dateFormat: string) => {
    if (!startDate && !endDate) return this.value;
    const formatDate = (date: Date) => format(date, DATE_PATTERNS[dateFormat].fnsPattern);
    switch (this.mode) {
      case "single": {
        if (startDate) {
          this.value = formatDate(startDate);
        }
        break;
      }
      case "range": {
        if (startDate && endDate) {
          this.value = `${formatDate(startDate)} - ${formatDate(endDate)}`;
        }
        if (startDate && !endDate) {
          this.value = `${formatDate(startDate)} - ${this.dateFormat}`;
        }
        break;
      }
    }
    return this.value;
  };
  private _handleSelectDatesInput(event: CustomEvent<Date[]>) {
    this._handleSelectDates(event.detail);
  }
  private async _handleSelectDates(newSelectedDates: Date[]) {
    newSelectedDates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
    this.displayDate = newSelectedDates[0];
    this.focusedDate = newSelectedDates[0];
    this.selectedDateRange = newSelectedDates;
    // Get the formattedDate value for the selected dates
    const formattedDate = this._makeInputValueString(
      this.selectedDateRange[0],
      this.selectedDateRange[1],
      this.dateFormat
    );

    // Set formattedDate value as the new value for sgds-input
    this.value = formattedDate;
    const input = await this.datepickerInputAsync;
    input.updateMaskValue();
    this._manageInternalsValid();
  }

  private async _handleSelectDatesAndClose(event: CustomEvent<Date[]>) {
    await this._handleSelectDates(event.detail);

    if (this.mode === "range" && this.selectedDateRange.length === 2) {
      this.hideMenu();
    } else if (this.mode === "single" && this.selectedDateRange.length === 1) {
      this.hideMenu();
    }
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
  private async _handleInvalidInput() {
    this.selectedDateRange = [];
    this.displayDate = this.initialDisplayDate;
    this.invalid = true;
    this._manageInternalsBadInput();
  }
  private async _handleEmptyInput() {
    if (this.required) {
      this._manageEmptyInput();
    }
    return;
  }
  private async _resetDatepicker(resetValue = "") {
    this.displayDate = this.initialDisplayDate;
    this.selectedDateRange = [];
    this.value = resetValue;
    this.view = "days";
    const input = await this.datepickerInputAsync;
    input.setInvalid(false);
    input.destroyInputMask();
    await input.applyInputMask();

    this._mixinResetValidity(input);
    if (this.isValueEmpty()) {
      this._handleEmptyInput();
    }
  }

  private _manageInternalsBadInput() {
    this._mixinSetValidity(
      {
        badInput: true
      },
      "Invalid date input",
      this.datepickerInput
    );
  }
  /**
   * Even though element internals handles the required constraint validation. This custom one is still needed as
   * datepicker input has a special case where the default input mask "DD/MM/YYYY" means an empty input.
   * However, the required constraint validation sees "DD/MM/YYYY" as a non-empty input.
   */
  private _manageEmptyInput() {
    this._mixinSetValidity(
      {
        valueMissing: true
      },
      "Please fill in this field",
      this.datepickerInput
    );
  }

  /**
   * Called when a valid date is entered via input or selected by calendar
   * 1. sets validity state to valid
   * 2. updates invalid prop
   * 3. sets the form value of datepicker
   */
  private _manageInternalsValid() {
    this._mixinSetValidity({});
    this.invalid = this.datepickerInput.invalid = false;
    this._mixinSetFormValue();
  }

  /**
   * Handles the form "reset" event
   */
  private async _mixinResetFormControl() {
    this._resetDatepicker(this.defaultValue);
  }
  private async _handleInputMaskChange(e: CustomEvent) {
    this.value = e.detail;

    if (this.isValueEmpty()) {
      this._resetDatepicker();
    }
  }

  private _dialogAriaLabels = {
    days: "Choose date",
    months: "Choose month",
    years: "Choose year"
  };

  render() {
    return html`
      <div class="datepicker-container">
        <sgds-datepicker-input
          .value=${live(this.value)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          placeholder=${this.mode === "single" ? "DD/MM/YYYY" : "DD/MM/YYYY - DD/MM/YYYY"}
          mode=${this.mode}
          invalidFeedback=${ifDefined(this.invalidFeedback ? this.invalidFeedback : this._mixinGetValidationMessage())}
          @sgds-mask-input-change=${this._handleInputMaskChange}
          @sgds-invalid-input=${this._handleInvalidInput}
          minDate=${this.minDate}
          maxDate=${this.maxDate}
          label=${this.label}
          hintText=${this.hintText}
          name=${this.name}
          ?invalid=${this.invalid}
          hasFeedback=${ifDefined(this.hasFeedback ? "both" : undefined)}
          ?readonly=${this.readonly}
        >
        </sgds-datepicker-input>
        <sgds-icon-button
          ${ref(this.myDropdown)}
          role="button"
          class=${classMap({
            "calendar-btn": true,
            "with-hint-text": this.hintText || this.invalid,
            "with-label": this.label
          })}
          aria-expanded="${this.menuIsOpen}"
          aria-haspopup="dialog"
          aria-controls=${this.dropdownMenuId}
          @click=${() => this.toggleMenu()}
          ariaLabel=${this.menuIsOpen ? "Close Calendar" : "Open Calendar"}
          ?disabled=${this.disabled || this.readonly}
          variant="outline"
          name="calendar"
        >
        </sgds-icon-button>
        <ul
          id=${this.dropdownMenuId}
          class="sgds datepicker dropdown-menu"
          role="dialog"
          aria-label=${this._dialogAriaLabels[this.view]}
          @click=${(event: MouseEvent) => event.stopPropagation()}
          ${ref(this.menuRef)}
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
