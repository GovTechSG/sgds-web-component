import { HTMLTemplateResult, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import SgdsElement from "../../base/sgds-element";
import { setTimeToNoon } from "../../utils/time";
import { watch } from "../../utils/watch";
import styles from "./datepicker-calendar.scss";
import { ViewEnum } from "./types";
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
  static styles = [SgdsElement.styles, styles];

  /** @internal */
  static DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  /** @internal */
  static daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /** @internal */
  static MONTHVIEW_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  /** @internal */
  @property({ type: Array }) selectedDate: Date[] = [];

  /** @internal */
  @property({ attribute: false }) displayDate: Date = TODAY_DATE;

  /** @internal */
  @property({ type: String }) minDate?: string;

  /** @internal */
  @property({ type: String }) maxDate?: string;

  /** @internal */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  private focusedDate: Date = setTimeToNoon(this.displayDate);

  /** @internal */
  @property() view: ViewEnum;

  /** @internal */
  @property({ type: Boolean }) show: boolean;

  @property()
  focusedTabIndex: number;

  @watch("displayDate", { waitUntilFirstUpdate: true })
  updateFocusedDate() {
    this.focusedDate = setTimeToNoon(this.displayDate);
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this.handleKeyPress);
  }
  private setFocusedDate(shift: number) {
    switch (this.view) {
      case "days": {
        this.focusedDate = setTimeToNoon(new Date(this.focusedDate.setDate(this.focusedDate.getDate() + shift)));
        break;
      }
      case "months": {
        this.focusedDate = setTimeToNoon(new Date(this.focusedDate.setMonth(this.focusedDate.getMonth() + shift)));
        break;
      }
      case "years": {
        this.focusedDate = setTimeToNoon(
          new Date(this.focusedDate.setFullYear(this.focusedDate.getFullYear() + shift))
        );
        break;
      }
    }
  }
  private handleEnterDateKeyboard(event: KeyboardEvent) {
    const targetElement = event.composedPath()[0] as HTMLElement;
    if (targetElement.classList.contains("disabled")) return;

    switch (this.view) {
      case "days":
        this.onClickDay(event);
        break;
      case "months": {
        const { month } = targetElement.dataset;
        this.onClickMonth(parseInt(month));
        break;
      }
      case "years": {
        const { year } = targetElement.dataset;
        this.onClickYear(parseInt(year));
      }
    }
  }
  private handleKeyPress(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleEnterDateKeyboard(event);
      return;
    }
    if (event.key === "Tab") {
      const targetEl: HTMLElement = this.getFocusedTarget();
      if (this.focusedTabIndex !== 3) targetEl.blur();
      return;
    }
    if (event.key.includes("Arrow")) {
      event.preventDefault();
      this._blurCalendarCell();
      const keyShiftObject = keyPressAction[event.key];
      const shiftNumber = keyShiftObject[this.view];
      this.setFocusedDate(shiftNumber);

      this._focusOnCalendarCell();
    }
  }

  /** @internal */
  private generateIncrementDates(): Date[] {
    const start = setTimeToNoon(this.selectedDate[0]);

    if (this.selectedDate.length < 2) {
      return [start];
    }

    const end = setTimeToNoon(this.selectedDate[1]);
    const arr: Date[] = [];
    if (start.getTime() < end.getTime()) {
      for (let dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
      }
    } else {
      for (let dt = end; dt <= start; dt.setDate(dt.getDate() + 1)) {
        arr.push(new Date(dt));
      }
    }
    return arr;
  }

  /** @internal */
  private onClickDay(event: MouseEvent | KeyboardEvent) {
    const { day, date } = (event.composedPath()[0] as HTMLTableCellElement).dataset;

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
    } else if (this.mode === "range") {
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

  // clickhandler for month view buttons
  /** @internal */
  private onClickMonth(month: number, year: number = this.focusedDate.getFullYear()) {
    const displayDateClone = new Date(this.displayDate);
    this.view = "days";
    displayDateClone.setMonth(month);
    displayDateClone.setFullYear(year);
    this.displayDate = displayDateClone;
    this.emit("sgds-view", { detail: this.view });
    //once clicked, should change view to days, and hold value and change view
    this.emit("sgds-selectmonth", { detail: this.displayDate });
  }

  // clickhandler for year view buttons
  /** @internal */
  private onClickYear(year: number) {
    const displayDateClone = new Date(this.displayDate);
    displayDateClone.setFullYear(year);
    this.displayDate = displayDateClone;
    this.view = "months";
    this.emit("sgds-view", { detail: this.view });

    this.emit("sgds-selectyear", { detail: this.displayDate });
  }
  firstUpdated() {
    if (this.selectedDate.length > 0) {
      this.focusedDate = setTimeToNoon(this.selectedDate[0]);
    }
  }
  updated() {
    /** For KeyboardNavigation (switching months) and ClickNavigation:
     * Runs after render has completed and td of next month has appeared.
     * For the case when calendar view changes to the next month
     * */
    // if(this.view !== "years"){
    if (this.focusedTabIndex === 3) {
      this._focusOnCalendarCell();
    }
    // }
  }
  /**Shifts focus from Input to Calendar */
  public focusOnCalendar(toBlurEl: HTMLElement) {
    toBlurEl.blur();
    this._focusOnCalendarCell();
  }
  /** @internal */
  private getFocusedTarget(): HTMLElement {
    const queryObj = {
      days: `td[data-date="${this.focusedDate.toISOString()}"]`,
      months: `button[data-month="${this.focusedDate.getMonth()}"][data-year="${this.focusedDate.getFullYear()}"]`,
      years: `button[data-year="${this.focusedDate.getFullYear()}"]`
    };
    const queryString = queryObj[this.view];
    const targetEl: HTMLElement = this.shadowRoot.querySelector(`${queryString}`);
    return targetEl;
  }
  /** @internal */
  private _blurCalendarCell() {
    const targetEl = this.getFocusedTarget();
    targetEl.setAttribute("tabindex", "-1");
    targetEl.blur();
  }
  /** @internal */
  private _focusOnCalendarCell() {
    const targetEl = this.getFocusedTarget();
    if (targetEl) {
      targetEl.setAttribute("tabindex", "3");
      targetEl.focus();
      this.emit("sgds-update-focus", { detail: this.focusedDate });
    } else {
      /** Change month view */
      this.emit("sgds-change-calendar", { detail: this.focusedDate });
    }
  }
  /** @internal */
  private generateDays() {
    const selectedDates = this.selectedDate.map(d => setTimeToNoon(d));

    const rangeSelectedDates = this.generateIncrementDates();

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
          const date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
          const todaysDate = new Date();

          const beforeMinDate = minimumDate && Date.parse(date) < Date.parse(minimumDate.toISOString());
          const afterMinDate = maximumDate && Date.parse(date) > Date.parse(maximumDate.toISOString());
          const clickHandler = beforeMinDate || afterMinDate ? undefined : this.onClickDay;

          const isCurrentMonth = todaysDate.getMonth() === this.displayDate.getMonth();
          const isCurrentYear = todaysDate.getFullYear() === this.displayDate.getFullYear();
          const isCurrentDay = todaysDate.getDate() === day;

          const isSelected =
            selectedDates.length > 0 && rangeSelectedDates.some(d => Date.parse(date) === Date.parse(d.toISOString()));
          const isFirstSelectedDate = selectedDates.length > 0 && rangeSelectedDates[0].toISOString() === date;
          const isLastSelectedDate =
            selectedDates.length > 1 && rangeSelectedDates[rangeSelectedDates.length - 1].toISOString() === date;

          const mutedButtonStyle = {
            cursor: "not-allowed"
          };
          const buttonStyles = {
            cursor: "pointer"
            // borderRadius: "0"
          };
          week.push(
            html`<td
              key=${j}
              data-date=${date}
              data-day=${day}
              class=${classMap({
                "text-primary":
                  !(isFirstSelectedDate || isLastSelectedDate) && isCurrentDay && isCurrentMonth && isCurrentYear,
                "bg-primary-600": isFirstSelectedDate || isLastSelectedDate,
                "text-white": isFirstSelectedDate || isLastSelectedDate,
                active: isSelected,
                disabled: beforeMinDate || afterMinDate
              })}
              style=${styleMap(beforeMinDate || afterMinDate ? { ...buttonStyles, ...mutedButtonStyle } : buttonStyles)}
              @click=${clickHandler}
              tabindex=${this.focusedDate === new Date(date) ? "3" : "-1"}
              disabled=${beforeMinDate || afterMinDate}
            >
              ${day}
            </td>`
          );
          day++;
        } else {
          week.push(html`<td key=${j}></td>`);
        }
      }

      weeks.push(
        html`<tr key=${i}>
          ${week}
        </tr>`
      );
      if (day > monthLength) {
        break;
      }
    }

    const dayView = html`
      <table class="text-center">
        <thead>
          <tr>
            ${DatepickerCalendar.DAY_LABELS.map(
              (label: string, index: number) =>
                html`
                  <td key=${index}>
                    <small>${label}</small>
                  </td>
                `
            )}
          </tr>
        </thead>
        <tbody>
          ${weeks}
        </tbody>
      </table>
    `;
    return dayView;
  }
  /** @internal */
  private generateMonths() {
    const rangeDates = this.generateIncrementDates();
    const selectedTime = rangeDates.map(e => setTimeToNoon(new Date(e.getFullYear(), e.getMonth())).getTime());

    const year = this.displayDate.getFullYear();

    const monthView = html`
      <div class="sgds monthpicker">
        ${DatepickerCalendar.MONTHVIEW_LABELS.map((m, idx) => {
          const time = setTimeToNoon(new Date(year, idx)).getTime();
          const isFirstSelectedMonth = rangeDates[0].getMonth() === idx;
          const isFirstSelectedYear = rangeDates[0].getFullYear() === year;
          const isLastSelectedMonth = rangeDates[rangeDates.length - 1].getMonth() === idx;
          const isLastSelectedYear = rangeDates[rangeDates.length - 1].getFullYear() === year;
          return html` <button
            class=${classMap({
              active: selectedTime.includes(time),
              month: true,
              "bg-primary-600":
                (isFirstSelectedMonth && isFirstSelectedYear) || (isLastSelectedMonth && isLastSelectedYear),
              "text-white":
                (isFirstSelectedMonth && isFirstSelectedYear) || (isLastSelectedMonth && isLastSelectedYear)
            })}
            @click=${() => this.onClickMonth(idx)}
            data-month=${idx}
            data-year=${year}
            tabindex="3"
          >
            ${m}
          </button>`;
        })}
      </div>
    `;
    return monthView;
  }
  /** @internal */
  private generateYears() {
    const selectedYears = this.generateIncrementDates().map(e => e.getFullYear());

    const CURRENT_YEAR = new Date().getFullYear();
    const displayYear = this.displayDate.getFullYear();

    const remainder = (displayYear - CURRENT_YEAR) % 12;
    const yearsPosition = remainder < 0 ? 12 + remainder : remainder;

    const yearArray = [];
    const startLimit = displayYear - yearsPosition;
    const endLimit = displayYear - yearsPosition + 12 - 1; // -1 to match the index of the years (index starts from 0)

    for (let i = startLimit; i < endLimit + 1; i++) {
      yearArray.push(i);
    }

    const yearView = html`
      <div class="sgds yearpicker">
        ${yearArray.map(y => {
          const isFirstSelectedYear = selectedYears[0] === y;
          const isLastSectedYear = selectedYears[selectedYears.length - 1] === y;
          return html`
            <button
              class=${classMap({
                active: selectedYears.includes(y),
                year: true,
                "bg-primary-600": isFirstSelectedYear || isLastSectedYear,
                "text-white": isFirstSelectedYear || isLastSectedYear
              })}
              @click=${() => this.onClickYear(y)}
              data-year=${y}
              tabindex="3"
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
    let viewContent: HTMLTemplateResult;

    switch (this.view) {
      case "days":
        viewContent = html` ${this.generateDays()} `;
        break;
      case "months":
        viewContent = html` ${this.generateMonths()} `;
        break;
      case "years":
        viewContent = html` ${this.generateYears()} `;
        break;
      default:
        viewContent = html` ${this.generateDays()} `; // Set a default view
        break;
    }

    return html` <div class="datepicker-body">${viewContent}</div> `;
  }
}

export default DatepickerCalendar;
