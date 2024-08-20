import { __decorate } from "tslib";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/lit-element.js";
import { format, parse } from "date-fns";
import { html } from "lit";
import { property, query, queryAsync, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import { DATE_PATTERNS, setTimeToNoon } from "../../utils/time";
import { watch } from "../../utils/watch";
import { DatepickerCalendar } from "./datepicker-calendar";
import { DatepickerHeader } from "./datepicker-header";
import DatepickerInput from "./datepicker-input";
import { SgdsButton } from "../Button/sgds-button";
import dropdownStyle from "../Dropdown/dropdown.css";
import datepickerStyle from "./datepicker.css";
/**
 * @summary The `DatePicker` Component is built using `Dropdown`, `Input` and `Button` components. By default, the Calendar points to today's date and input has no value. Users can either pick dates from the calendar or type dates through the input
 *
 * @event sgds-change-date - Emitted when the state of datepicker's input changes during first load, close button reset click & date click. Date values can be accessed via event.target.value
 *
 * @cssproperty --sgds-datepicker-theme-color - Datepicker's overall theme color
 * @cssproperty --sgds-datepicker-hover-bg - Datepicker's calendar menu hover color
 * @cssproperty --sgds-datepicker-bg - Datepicker's menu background color
 * @cssproperty --sgds-datepicker-close-button-bg - Datepicker's close button background color
 * @cssproperty --sgds-datepicker-close-button-hover-bg - Datepicker's close button hover background color
 * @cssproperty --sgds-datepicker-close-button-color - Datepicker's close button color
 * @cssproperty --sgds-datepicker-selected-date-bg - Selected date's background color
 * @cssproperty --sgds-datepicker-selected-date-color - Selected date's text color
 *
 * @description displayDate sets the month, year views of the calendar while focusedDate follows the focus which also directly changes
 * displayDate on certain occasions. Example, when keyboard moves up to the next month, it updates displayDate which then affect the current
 * date view of the calendar
 */
export class SgdsDatepicker extends ScopedElementsMixin(DropdownElement) {
    /**@internal */
    static get scopedElements() {
        return {
            "sgds-datepicker-input": DatepickerInput,
            "sgds-datepicker-calendar": DatepickerCalendar,
            "sgds-datepicker-header": DatepickerHeader,
            "sgds-button": SgdsButton
        };
    }
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity() {
        return this._internals.reportValidity();
    }
    constructor() {
        super();
        /** When true, adds required attribute to input element */
        this.required = false;
        /** When true, adds disabled attribute to input and button element */
        this.disabled = false;
        /** The initial value of DatePicker on first load for single & range mode as array of string. eg.'["22/12/2023"]' for single & '["22/12/2023","25/12/2023"]' for range respectively  */
        this.initialValue = [];
        /** Date format reflected on input  */
        this.dateFormat = "DD/MM/YYYY";
        /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
        this.minDate = "";
        /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
        this.maxDate = "";
        /** Changes DatePicker to single date selection or range date selection */
        this.mode = "single";
        /**Feedback text for error state when date input is invalid */
        this.invalidFeedback = "Please enter a valid date";
        /** The datepicker input's label  */
        this.label = "";
        /** The datepicker input's hint text below the label */
        this.hintText = "";
        /** Controls auto-flipping of menu */
        this.noFlip = false;
        /** The drop position of menu relative to the toggle button */
        this.drop = "down";
        /**@internal */
        this.value = "";
        this.view = "days";
        this.selectedDateRange = [];
        this.focusedTabIndex = 3;
        this._makeInputValueString = (startDate, endDate, dateFormat) => {
            if (!startDate && !endDate)
                return this.value;
            const formatDate = (date) => format(date, DATE_PATTERNS[dateFormat].fnsPattern);
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
                        this.value = `${formatDate(startDate)} - ${this.dateFormat.toLowerCase()}`;
                    }
                    break;
                }
            }
            return this.value;
        };
        this._dialogAriaLabels = {
            days: "Choose date",
            months: "Choose month",
            years: "Choose year"
        };
        this._internals = this.attachInternals();
        /**@internal */
        this.modifierOpt = [
            {
                name: "offset",
                options: {
                    offset: [0, 10]
                }
            }
        ];
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
        this.initialDisplayDate = this.displayDate || new Date();
        if (this.initialValue && this.initialValue.length > 0) {
            // Validate initialValue against the dateFormat regex
            const dateFormatRegex = new RegExp(this._getDateFormatRegex());
            // const startDateString = this.initialValue[0];
            const invalidDates = this.initialValue.filter(v => !dateFormatRegex.test(v));
            if (invalidDates.length > 0) {
                return console.error("Invalid date format in initialValue:", invalidDates);
            }
            else {
                const initialSelectedDates = this.initialValue.map(v => setTimeToNoon(parse(v, DATE_PATTERNS[this.dateFormat].fnsPattern, new Date())));
                this._handleSelectDates(initialSelectedDates);
            }
        }
        else {
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
        const shadowInput = await this.datepickerInput.shadowInput;
        this._manageInternalsDefault(shadowInput);
        this._internals.setValidity(shadowInput.validity, shadowInput.validationMessage, shadowInput);
    }
    /** @internal */
    _getDateFormatRegex() {
        // validate date strings and adhere to the specified date format
        return (this.dateFormat
            // Replace any special characters with their escaped version using "\\$&"
            .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
            // Replace 'MM' with '\\d{2}', which matches two digits representing the month (e.g., 01, 12)
            .replace("MM", "\\d{2}")
            // Replace 'DD' with '\\d{2}', which matches two digits representing the day (e.g., 01, 31)
            .replace("DD", "\\d{2}")
            // Replace 'YYYY' with '\\d{4}', which matches four digits representing the year (e.g., 2021)
            .replace("YYYY", "\\d{4}")
            // Replace '/' with '\\/', which matches the forward slash character
            .replace("/", "\\/"));
    }
    _handleTab(event) {
        if (!this.menuIsOpen) {
            return;
        }
        const tabIndexArray = Array(4);
        if (event.shiftKey && event.key === "Tab") {
            event.preventDefault();
            this.focusedTabIndex = (this.focusedTabIndex - 1 + tabIndexArray.length) % tabIndexArray.length;
        }
        else if (event.key === "Tab") {
            event.preventDefault();
            this.focusedTabIndex = (this.focusedTabIndex + 1 + tabIndexArray.length) % tabIndexArray.length;
        }
    }
    _handleValueChange() {
        this.emit("sgds-change-date");
        this._setInternalFormValue(this.value);
    }
    async _handleCloseMenu() {
        //return focus to input when menu closes
        const input = await this.datepickerInputAsync;
        input.focus();
        if (this.selectedDateRange.length === 0) {
            this.displayDate = this.initialDisplayDate;
        }
        else {
            const selectedDatesLength = this.selectedDateRange.length;
            this.displayDate = this.selectedDateRange[selectedDatesLength - 1];
            const calendar = await this.calendar;
            calendar._updateFocusedDate();
        }
    }
    async _handleOpenMenu() {
        const cal = await this.calendar;
        const input = await this.datepickerInputAsync;
        cal.focusOnCalendar(input);
    }
    _handleSelectDatesInput(event) {
        this._handleSelectDates(event.detail);
        this._manageInternalsDefault(this._shadowInput);
    }
    async _handleSelectDates(newSelectedDates) {
        newSelectedDates.sort((a, b) => a.getTime() - b.getTime());
        this.displayDate = newSelectedDates[0];
        this.focusedDate = newSelectedDates[0];
        this.selectedDateRange = newSelectedDates;
        // Get the formattedDate value for the selected dates
        const formattedDate = this._makeInputValueString(this.selectedDateRange[0], this.selectedDateRange[1], this.dateFormat);
        // Set formattedDate value as the new value for sgds-input
        this.value = formattedDate;
        const input = await this.datepickerInputAsync;
        input.updateMaskValue();
    }
    get _shadowInput() {
        return this.datepickerInput.shadowRoot.querySelector("input");
    }
    _handleSelectDatesAndClose(event) {
        this._handleSelectDates(event.detail);
        if (this.mode === "range" && this.selectedDateRange.length === 2) {
            this.hideMenu();
        }
        else if (this.mode === "single" && this.selectedDateRange.length === 1) {
            this.hideMenu();
        }
        this._manageInternalsValid();
    }
    /** update latest view state from datepicker-header */
    _handleViewChanged(event) {
        this.view = event.detail;
    }
    _handleDateChanged(event) {
        this.displayDate = event.detail;
    }
    _handleFocusDateChanged(event) {
        this.focusedDate = event.detail;
    }
    _handleSelectMonth(event) {
        this.displayDate = event.detail;
    }
    _handleSelectYear(event) {
        this.displayDate = event.detail;
    }
    async _handleInvalidInput() {
        this.selectedDateRange = [];
        this.displayDate = this.initialDisplayDate;
        this._manageInternalsBadInput();
    }
    async _handleButtonResetClick() {
        this.displayDate = this.initialDisplayDate;
        this.selectedDateRange = [];
        this.value = "";
        this.view = "days";
        this.hideMenu();
        const input = await this.datepickerInputAsync;
        input.setInvalid(false);
        input.destroyInputMask();
        await input.applyInputMask();
        this._manageInternalsRequired();
    }
    async _handleEmptyInput() {
        this._manageInternalsRequired();
    }
    _manageInternalsRequired() {
        this.required
            ? this._internals.setValidity({
                valueMissing: true
            }, "Please fill in this field", this._shadowInput)
            : this._internals.setValidity({});
    }
    _manageInternalsBadInput() {
        this._internals.setValidity({
            badInput: true
        }, "The chosen date(s) are invalid", this._shadowInput);
    }
    _manageInternalsValid() {
        this._internals.setValidity({});
    }
    _manageInternalsDefault(inputEl) {
        this._internals.setValidity(inputEl.validity, inputEl.validationMessage, inputEl);
    }
    _setInternalFormValue(value) {
        this._internals.setFormValue(value);
    }
    async _handleInputMaskChange(e) {
        this.value = e.detail;
    }
    render() {
        const svgEl = html `
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
        return html `
      <div>
        <sgds-datepicker-input
          .value=${live(this.value)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          placeholder=""
          ${ref(this.myDropdown)}
          mode=${this.mode}
          dateFormat=${this.dateFormat}
          invalidFeedback=${this.invalidFeedback}
          @sgds-mask-input-change=${this._handleInputMaskChange}
          @sgds-invalid-input=${this._handleInvalidInput}
          minDate=${this.minDate}
          maxDate=${this.maxDate}
          label=${this.label}
          hintText=${this.hintText}
          name=${this.name}
        >
          <sgds-button
            role="button"
            slot="calendar-btn"
            class="calendar-btn"
            aria-expanded="${this.menuIsOpen}"
            aria-haspopup="dialog"
            aria-controls=${this.dropdownMenuId}
            @click=${() => this.toggleMenu()}
            ariaLabel=${this.menuIsOpen ? "Close Calendar" : "Open Calendar"}
            ?disabled=${this.disabled}
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
          </sgds-button>
          <sgds-button
            role="button"
            slot="reset-btn"
            variant="primary"
            ?disabled=${this.disabled}
            class="reset-btn"
            @click=${() => this._handleButtonResetClick()}
            ariaLabel="Reset Datepicker"
          >
            ${svgEl}
          </sgds-button>
        </sgds-datepicker-input>

        <ul
          id=${this.dropdownMenuId}
          class="sgds datepicker dropdown-menu"
          role="dialog"
          part="menu"
          aria-label=${this._dialogAriaLabels[this.view]}
          @click=${(event) => event.stopPropagation()}
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
SgdsDatepicker.styles = [...DropdownElement.styles, dropdownStyle, datepickerStyle];
/**@internal */
SgdsDatepicker.formAssociated = true;
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsDatepicker.prototype, "required", void 0);
__decorate([
    property({ reflect: true })
], SgdsDatepicker.prototype, "name", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SgdsDatepicker.prototype, "disabled", void 0);
__decorate([
    property({ type: Array, reflect: true })
], SgdsDatepicker.prototype, "initialValue", void 0);
__decorate([
    property({ type: String })
], SgdsDatepicker.prototype, "dateFormat", void 0);
__decorate([
    property({ type: String })
], SgdsDatepicker.prototype, "minDate", void 0);
__decorate([
    property({ type: String })
], SgdsDatepicker.prototype, "maxDate", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsDatepicker.prototype, "mode", void 0);
__decorate([
    property({ type: String, reflect: true })
], SgdsDatepicker.prototype, "invalidFeedback", void 0);
__decorate([
    property({ reflect: true })
], SgdsDatepicker.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], SgdsDatepicker.prototype, "hintText", void 0);
__decorate([
    property({ type: Boolean, reflect: true, state: false })
], SgdsDatepicker.prototype, "noFlip", void 0);
__decorate([
    property({ type: String, reflect: true, state: false })
], SgdsDatepicker.prototype, "drop", void 0);
__decorate([
    property({ attribute: false })
], SgdsDatepicker.prototype, "displayDate", void 0);
__decorate([
    state()
], SgdsDatepicker.prototype, "value", void 0);
__decorate([
    state()
], SgdsDatepicker.prototype, "view", void 0);
__decorate([
    state()
], SgdsDatepicker.prototype, "selectedDateRange", void 0);
__decorate([
    state()
], SgdsDatepicker.prototype, "focusedDate", void 0);
__decorate([
    state()
], SgdsDatepicker.prototype, "focusedTabIndex", void 0);
__decorate([
    queryAsync("sgds-datepicker-calendar")
], SgdsDatepicker.prototype, "calendar", void 0);
__decorate([
    queryAsync("sgds-datepicker-input")
], SgdsDatepicker.prototype, "datepickerInputAsync", void 0);
__decorate([
    queryAsync("sgds-datepicker-header")
], SgdsDatepicker.prototype, "datepickerHeaderAsync", void 0);
__decorate([
    query("sgds-datepicker-input")
], SgdsDatepicker.prototype, "datepickerInput", void 0);
__decorate([
    watch("value")
], SgdsDatepicker.prototype, "_handleValueChange", null);
export default SgdsDatepicker;
//# sourceMappingURL=sgds-datepicker.js.map