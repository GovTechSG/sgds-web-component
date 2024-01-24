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
        console.log(this.focusedDate);
        break;
      }
    }
  }
  private handleEnterDateKeyboard(event: KeyboardEvent) {
    switch (this.view) {
      case "days":
        this.onClickDay(event);
        break;
      case "months": {
        const { month } = (event.composedPath()[0] as HTMLButtonElement).dataset;
        this.onClickMonth(parseInt(month));
        break;
      }
      case "years": {
        const { year } = (event.composedPath()[0] as HTMLButtonElement).dataset;
        this.onClickYear(parseInt(year));
      }
    }
  }
  private handleKeyPress(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === "Enter") {
      this.handleEnterDateKeyboard(event);
    }
    //  if(event.key === "Tab"){

    //  }

    this._blurCalendarCell();
    const keyShiftObject = keyPressAction[event.key];
    const shiftNumber = keyShiftObject[this.view];
    this.setFocusedDate(shiftNumber);

    this._focusOnCalendarCell();
  }

  /** @internal */
  private generateIncrementDates() {
    const start = setTimeToNoon(this.selectedDate[0]);
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
  private onClickMonth(month: number) {
    const displayDateClone = new Date(this.displayDate);
    this.view = "days";
    displayDateClone.setMonth(month);
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
    this._focusOnCalendarCell();
    // }
  }
  /**Shifts focus from Input to Calendar */
  public focusOnCalendar(toBlurEl: HTMLElement) {
    toBlurEl.blur();
    this._focusOnCalendarCell();
  }

  private _blurCalendarCell() {
    const dataAttribute = {
      days: {
        key: "data-date",
        value: this.focusedDate.toISOString(),
        element: "td"
      },
      months: {
        key: "data-month",
        value: this.focusedDate.getMonth(),
        element: "button"
      },
      years: {
        key: "data-year",
        value: this.focusedDate.getFullYear(),
        element: "button"
      }
    };
    const { key, value, element } = dataAttribute[this.view];
    const targetTd: HTMLElement = this.shadowRoot.querySelector(`${element}[${key}="${value}"]`);
    targetTd.setAttribute("tabindex", "-1");
    targetTd.blur();
  }
  private async _focusOnCalendarCell() {
    switch (this.view) {
      case "days": {
        const targetTd: HTMLElement = this.shadowRoot.querySelector(
          `td[data-date="${this.focusedDate.toISOString()}"]`
        );
        if (targetTd) {
          targetTd.setAttribute("tabindex", "0");
          targetTd.focus();
          this.emit("sgds-update-focus", { detail: this.focusedDate });
        } else {
          /** Change month view */
          this.emit("sgds-change-calendar", { detail: this.focusedDate });
        }
        break;
      }
      case "months": {
        const focusedMonth = this.focusedDate.getMonth();
        const targetButtonEl: HTMLButtonElement = this.shadowRoot.querySelectorAll("button")[focusedMonth];
        targetButtonEl.setAttribute("tabindex", "0");
        targetButtonEl.focus();
        this.emit("sgds-update-focus", { detail: this.focusedDate });
        break;
      }
      case "years": {
        const focusedYear = this.focusedDate.getFullYear();
        const targetButtonEl: HTMLButtonElement = this.shadowRoot.querySelector(`button[data-year="${focusedYear}"]`);
        if (targetButtonEl) {
          targetButtonEl.setAttribute("tabindex", "0");
          targetButtonEl.focus();
          this.emit("sgds-update-focus", { detail: this.focusedDate });
        } else {
          /** Change month view */
          console.log(this.focusedDate, "display date to send up to parent");
          this.emit("sgds-change-calendar", { detail: this.focusedDate });
        }
        break;
      }
      default:
        break;
    }
  }

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
    if (month == 1) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
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
            selectedDates.length > 0 &&
            (rangeSelectedDates.some(d => Date.parse(date) === Date.parse(d.toISOString())) ||
              Date.parse(date) === Date.parse(selectedDates[0].toISOString()));

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
                "text-primary": isCurrentDay && isCurrentMonth && isCurrentYear,
                active: isSelected,
                disabled: beforeMinDate || afterMinDate
              })}
              style=${styleMap(beforeMinDate || afterMinDate ? { ...buttonStyles, ...mutedButtonStyle } : buttonStyles)}
              @click=${clickHandler}
              tabindex=${this.focusedDate === new Date(date) ? "0" : "-1"}
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
  private generateMonths() {
    const selectedMonths = this.generateIncrementDates().map(e => e.getMonth());

    const monthView = html`
      <div class="sgds monthpicker">
        ${DatepickerCalendar.MONTHVIEW_LABELS.map(
          (m, idx) => html`
            <button
              class=${classMap({ active: selectedMonths.includes(idx), month: true })}
              @click=${() => this.onClickMonth(idx)}
              data-month=${idx}
            >
              ${m}
            </button>
          `
        )}
      </div>
    `;
    return monthView;
  }

  private generateYears() {
    const selectedYears = this.generateIncrementDates().map(e => e.getFullYear());
    const CURRENT_YEAR = new Date().getFullYear();
    const displayYear = this.displayDate.getFullYear();

    const remainder = (displayYear - CURRENT_YEAR) % 12;
    let yearsPosition: number;
    remainder < 0 ? (yearsPosition = 12 + remainder) : (yearsPosition = remainder);

    const yearArray = [];
    const startLimit = displayYear - yearsPosition;
    const endLimit = displayYear - yearsPosition + 12 - 1; // -1 to match the index of the years (index starts from 0)
    
    for (let i = startLimit; i < endLimit + 1; i++) {
      yearArray.push(i);
    }

    const yearView = html`
      <div class="sgds yearpicker">
        ${yearArray.map(
          y => html`
            <button
              class=${classMap({ active: selectedYears.includes(y), year: true })}
              @click=${() => this.onClickYear(y)}
              data-year=${y}
            >
              ${y}
            </button>
          `
        )}
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
