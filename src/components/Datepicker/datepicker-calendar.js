import { __decorate } from "tslib";
import { format, isAfter, isEqual } from "date-fns";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { createYearViewArray, setTimeToNoon } from "../../utils/time";
import { watch } from "../../utils/watch";
import datepickerCalendarStyle from "./datepicker-calendar.css";
import { ifDefined } from "lit/directives/if-defined.js";
const TODAY_DATE = new Date();
const keyPressAction = {
    ArrowUp: {
        days: -7,
        months: -3,
        years: -3
    },
    ArrowDown: {
        days: 7,
        months: 3,
        years: 3
    },
    ArrowRight: {
        days: 1,
        months: 1,
        years: 1
    },
    ArrowLeft: {
        days: -1,
        months: -1,
        years: -1
    }
};
export class DatepickerCalendar extends SgdsElement {
    constructor() {
        super(...arguments);
        /** @internal */
        this.selectedDate = [];
        /** @internal */
        this.mode = "single";
    }
    /**Shifts focus from Input to Calendar */
    focusOnCalendar(toBlurEl) {
        toBlurEl.blur();
        this._focusOnCalendarCell();
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("keydown", this._handleKeyPress);
    }
    updated() {
        /** For KeyboardNavigation (switching months) and ClickNavigation:
         * Runs after render has completed and td of next month has appeared.
         * For the case when calendar view changes to the next month
         * */
        if (this.focusedTabIndex === 3) {
            this._focusOnCalendarCell();
        }
    }
    _updateFocusedDate() {
        this.focusedDate = setTimeToNoon(this.displayDate);
        if (this.focusedDate.getFullYear() < 1900) {
            this.focusedDate.setFullYear(1900);
        }
    }
    _setFocusedDate(shift) {
        const currentFocusedDate = this.focusedDate.getDate();
        const currentFocusedMonth = this.focusedDate.getMonth();
        const currentFocusedYear = this.focusedDate.getFullYear();
        switch (this.view) {
            case "days": {
                const newFocusedDate = setTimeToNoon(new Date(currentFocusedYear, currentFocusedMonth, currentFocusedDate + shift));
                if (isAfter(newFocusedDate, new Date(0, 0, 1, 12)) || isEqual(newFocusedDate, new Date(0, 0, 1, 12)))
                    this.focusedDate = newFocusedDate;
                break;
            }
            case "months": {
                const newFocusedDate = setTimeToNoon(new Date(currentFocusedYear, currentFocusedMonth + shift, currentFocusedDate));
                if (isAfter(newFocusedDate, new Date(0, 0, 1, 12)) || isEqual(newFocusedDate, new Date(0, 0, 1, 12))) {
                    this.focusedDate = newFocusedDate;
                }
                break;
            }
            case "years": {
                const newFocusedDate = setTimeToNoon(new Date(currentFocusedYear + shift, currentFocusedMonth, currentFocusedDate));
                if (newFocusedDate.getFullYear() >= 1900) {
                    this.focusedDate = newFocusedDate;
                }
                break;
            }
        }
    }
    _handleEnterDateKeyboard(event) {
        const targetElement = event.composedPath()[0];
        if (targetElement.classList.contains("disabled"))
            return;
        switch (this.view) {
            case "days":
                this._onClickDay(event);
                break;
            case "months": {
                const { month } = targetElement.dataset;
                this._onClickMonth(parseInt(month));
                break;
            }
            case "years": {
                const { year } = targetElement.dataset;
                this._onClickYear(parseInt(year));
            }
        }
    }
    _handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this._handleEnterDateKeyboard(event);
            return;
        }
        if (event.key === "Tab") {
            const targetEl = this._getFocusedTarget();
            if (this.focusedTabIndex !== 3)
                targetEl.blur();
            return;
        }
        if (event.key.includes("Arrow")) {
            event.preventDefault();
            this._blurCalendarCell();
            const keyShiftObject = keyPressAction[event.key];
            const shiftNumber = keyShiftObject[this.view];
            this._setFocusedDate(shiftNumber);
            this._focusOnCalendarCell();
        }
    }
    _generateIncrementDates() {
        const start = setTimeToNoon(this.selectedDate[0]);
        if (this.selectedDate.length < 2) {
            return [start];
        }
        const end = setTimeToNoon(this.selectedDate[1]);
        const arr = [];
        if (start.getTime() < end.getTime()) {
            for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
                arr.push(new Date(dt));
            }
        }
        else {
            for (let dt = end; dt <= start; dt.setDate(dt.getDate() + 1)) {
                arr.push(new Date(dt));
            }
        }
        return arr;
    }
    _onClickDay(event) {
        const { day, date } = event.composedPath()[0].dataset;
        const displayDateClone = new Date(this.displayDate);
        displayDateClone.setDate(parseInt(day));
        /** update new focused date for mouse click */
        if (event.type === "click") {
            this.focusedDate = setTimeToNoon(new Date(date));
        }
        if (this.mode === "single") {
            // Single mode: Select a single date
            this.selectedDate = [displayDateClone];
            // Emit event with selected date
            this.emit("sgds-selectdates", { detail: this.selectedDate });
        }
        else if (this.mode === "range") {
            // Range mode: Select a range of dates
            const selectedDates = [...this.selectedDate];
            if (selectedDates.length === 0 || selectedDates.length === 2) {
                // No dates selected yet or both dates already selected,
                // start a new range by clearing the selected dates array
                selectedDates.length = 0;
            }
            // Add the selected date to the range
            selectedDates.push(displayDateClone);
            // Update the selectedDate property
            this.selectedDate = selectedDates;
            // Emit event with the range of selected dates
            this.emit("sgds-selectdates", { detail: this.selectedDate });
        }
        // Check if the selected date is before minDate or after maxDate
        const minimumDate = this.minDate ? setTimeToNoon(new Date(this.minDate)) : null;
        const maximumDate = this.maxDate ? setTimeToNoon(new Date(this.maxDate)) : null;
        const selectedDate = setTimeToNoon(displayDateClone);
        if ((minimumDate && selectedDate < minimumDate) || (maximumDate && selectedDate > maximumDate)) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    _onClickMonth(month, year = this.focusedDate.getFullYear()) {
        const displayDateClone = new Date(this.displayDate);
        this.view = "days";
        displayDateClone.setMonth(month);
        displayDateClone.setFullYear(year);
        this.displayDate = displayDateClone;
        this.emit("sgds-view", { detail: this.view });
        //once clicked, should change view to days, and hold value and change view
        this.emit("sgds-selectmonth", { detail: this.displayDate });
    }
    _onClickYear(year) {
        const displayDateClone = new Date(this.displayDate);
        displayDateClone.setFullYear(year);
        this.displayDate = displayDateClone;
        this.view = "months";
        this.emit("sgds-view", { detail: this.view });
        this.emit("sgds-selectyear", { detail: this.displayDate });
    }
    _getFocusedTarget() {
        const queryObj = {
            days: `td[data-date="${this.focusedDate.toISOString()}"]`,
            months: `button[data-month="${this.focusedDate.getMonth()}"][data-year="${this.focusedDate.getFullYear()}"]`,
            years: `button[data-year="${this.focusedDate.getFullYear()}"]`
        };
        const queryString = queryObj[this.view];
        const targetEl = this.shadowRoot.querySelector(`${queryString}`);
        return targetEl;
    }
    _blurCalendarCell() {
        const targetEl = this._getFocusedTarget();
        targetEl.setAttribute("tabindex", "-1");
        targetEl.blur();
    }
    _focusOnCalendarCell() {
        const targetEl = this._getFocusedTarget();
        if (targetEl) {
            targetEl.setAttribute("tabindex", "3");
            targetEl.focus();
            this.emit("sgds-update-focus", { detail: this.focusedDate });
        }
        else {
            /** Change month view */
            this.emit("sgds-change-calendar", { detail: this.focusedDate });
        }
    }
    _generateDays() {
        const selectedDates = this.selectedDate.map(d => setTimeToNoon(d));
        const rangeSelectedDates = this._generateIncrementDates();
        const minimumDate = this.minDate ? setTimeToNoon(new Date(this.minDate)) : null;
        const maximumDate = this.maxDate ? setTimeToNoon(new Date(this.maxDate)) : null;
        const year = this.displayDate.getFullYear();
        const month = this.displayDate.getMonth();
        const firstDateOfMonth = new Date(year, month, 1);
        const startingDayOfMonth = firstDateOfMonth.getDay();
        let monthLength = DatepickerCalendar.daysInMonth[month];
        if (month === 1) {
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
                monthLength = 29;
            }
        }
        const weeks = [];
        let day = 1;
        for (let i = 0; i < 9; i++) {
            const week = [];
            for (let j = 0; j <= 6; j++) {
                if (day <= monthLength && (i > 0 || j >= startingDayOfMonth)) {
                    const dateObj = new Date(year, month, day, 12, 0, 0, 0);
                    const dateStr = dateObj.toISOString();
                    const beforeMinDate = minimumDate && Date.parse(dateStr) < Date.parse(minimumDate.toISOString());
                    const afterMinDate = maximumDate && Date.parse(dateStr) > Date.parse(maximumDate.toISOString());
                    const clickHandler = beforeMinDate || afterMinDate ? undefined : this._onClickDay;
                    const isCurrentMonth = TODAY_DATE.getMonth() === this.displayDate.getMonth();
                    const isCurrentYear = TODAY_DATE.getFullYear() === this.displayDate.getFullYear();
                    const isCurrentDay = TODAY_DATE.getDate() === day;
                    const isSelected = selectedDates.length > 0 &&
                        rangeSelectedDates.some(d => Date.parse(dateStr) === Date.parse(d.toISOString()));
                    const isFirstSelectedDate = selectedDates.length > 0 && rangeSelectedDates[0].toISOString() === dateStr;
                    const isLastSelectedDate = selectedDates.length > 1 && rangeSelectedDates[rangeSelectedDates.length - 1].toISOString() === dateStr;
                    const ariaLabel = `${isCurrentDay && isCurrentMonth && isCurrentYear ? "Today's date, " : ""}` + format(dateObj, "PPPP");
                    week.push(html `<td
              key=${j}
              data-date=${dateStr}
              data-day=${day}
              aria-label=${ariaLabel}
              aria-current=${ifDefined(isCurrentDay && isCurrentMonth && isCurrentYear ? "date" : undefined)}
              class=${classMap({
                        today: isCurrentDay && isCurrentMonth && isCurrentYear,
                        "selected-ends": isFirstSelectedDate || isLastSelectedDate,
                        active: isSelected,
                        disabled: beforeMinDate || afterMinDate
                    })}
              @click=${clickHandler}
              aria-selected=${ifDefined(isSelected ? "true" : undefined)}
              tabindex=${this.focusedDate === new Date(dateStr) ? "3" : "-1"}
              ?disabled=${beforeMinDate || afterMinDate}
              aria-disabled=${ifDefined(beforeMinDate || afterMinDate ? "true" : undefined)}
              role="button"
            >
              ${day}
            </td>`);
                    day++;
                }
                else {
                    week.push(html `<td key=${j}></td>`);
                }
            }
            weeks.push(html `<tr key=${i}>
          ${week}
        </tr>`);
            if (day > monthLength) {
                break;
            }
        }
        const dayView = html `
      <table role="grid">
        <thead>
          <tr>
            ${DatepickerCalendar.DAY_LABELS.map((label, index) => html `
                  <th key=${index} abbr=${label} scope="col">
                    <small>${label.slice(0, 3)}</small>
                  </th>
                `)}
          </tr>
        </thead>
        <tbody>
          ${weeks}
        </tbody>
      </table>
    `;
        return dayView;
    }
    _generateMonths() {
        const rangeDates = this._generateIncrementDates();
        const selectedTime = rangeDates.map(e => setTimeToNoon(new Date(e.getFullYear(), e.getMonth())).getTime());
        const year = this.displayDate.getFullYear();
        const monthView = html `
      <div class="sgds monthpicker">
        ${DatepickerCalendar.MONTHVIEW_LABELS.map((m, idx) => {
            const isCurrentMonth = idx === TODAY_DATE.getMonth() && year === TODAY_DATE.getFullYear();
            const time = setTimeToNoon(new Date(year, idx)).getTime();
            const isFirstSelectedMonth = rangeDates[0].getMonth() === idx;
            const isFirstSelectedYear = rangeDates[0].getFullYear() === year;
            const isLastSelectedMonth = rangeDates[rangeDates.length - 1].getMonth() === idx;
            const isLastSelectedYear = rangeDates[rangeDates.length - 1].getFullYear() === year;
            const ariaLabel = isCurrentMonth ? `Current month ${m} ${year}` : `${m} ${year}`;
            return html ` <button
            class=${classMap({
                active: selectedTime.includes(time),
                today: isCurrentMonth,
                month: true,
                "selected-ends": (isFirstSelectedMonth && isFirstSelectedYear) || (isLastSelectedMonth && isLastSelectedYear)
            })}
            @click=${() => this._onClickMonth(idx)}
            data-month=${idx}
            data-year=${year}
            tabindex="3"
            aria-selected=${selectedTime.includes(time)}
            aria-label=${ariaLabel}
          >
            ${m.slice(0, 3)}
          </button>`;
        })}
      </div>
    `;
        return monthView;
    }
    _generateYears() {
        const selectedYears = this._generateIncrementDates().map(e => e.getFullYear());
        const CURRENT_YEAR = TODAY_DATE.getFullYear();
        const yearArray = createYearViewArray(this.displayDate, CURRENT_YEAR);
        const yearView = html `
      <div class="sgds yearpicker">
        ${yearArray.map(y => {
            const isFirstSelectedYear = selectedYears[0] === y;
            const isLastSectedYear = selectedYears[selectedYears.length - 1] === y;
            return html `
            <button
              class=${classMap({
                active: selectedYears.includes(y),
                year: true,
                today: CURRENT_YEAR === y,
                "selected-ends": isFirstSelectedYear || isLastSectedYear
            })}
              @click=${() => this._onClickYear(y)}
              data-year=${y}
              tabindex="3"
              ?disabled=${y < 1900}
              aria-selected=${selectedYears.includes(y)}
              aria-label=${ifDefined(CURRENT_YEAR === y ? `Current year, ${y}` : undefined)}
            >
              ${y}
            </button>
          `;
        })}
      </div>
    `;
        return yearView;
    }
    render() {
        let viewContent;
        switch (this.view) {
            case "days":
                viewContent = html ` ${this._generateDays()} `;
                break;
            case "months":
                viewContent = html ` ${this._generateMonths()} `;
                break;
            case "years":
                viewContent = html ` ${this._generateYears()} `;
                break;
            default:
                viewContent = html ` ${this._generateDays()} `; // Set a default view
                break;
        }
        return html ` <div class="datepicker-body">${viewContent}</div> `;
    }
}
DatepickerCalendar.styles = [datepickerCalendarStyle];
/** @internal */
DatepickerCalendar.DAY_LABELS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/** @internal */
DatepickerCalendar.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
/** @internal */
DatepickerCalendar.MONTHVIEW_LABELS = [
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
__decorate([
    property({ type: Array })
], DatepickerCalendar.prototype, "selectedDate", void 0);
__decorate([
    property({ attribute: false })
], DatepickerCalendar.prototype, "displayDate", void 0);
__decorate([
    property({ type: String })
], DatepickerCalendar.prototype, "minDate", void 0);
__decorate([
    property({ type: String })
], DatepickerCalendar.prototype, "maxDate", void 0);
__decorate([
    property({ type: String, reflect: true })
], DatepickerCalendar.prototype, "mode", void 0);
__decorate([
    property()
], DatepickerCalendar.prototype, "view", void 0);
__decorate([
    property({ type: Boolean })
], DatepickerCalendar.prototype, "show", void 0);
__decorate([
    property()
], DatepickerCalendar.prototype, "focusedTabIndex", void 0);
__decorate([
    watch("displayDate")
], DatepickerCalendar.prototype, "_updateFocusedDate", null);
export default DatepickerCalendar;
//# sourceMappingURL=datepicker-calendar.js.map