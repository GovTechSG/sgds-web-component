import { HTMLTemplateResult, html } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./datepicker-calendar.scss";
import { ViewEnum } from "./types";

const TODAY_DATE = new Date();
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

  @state() focusedDate: Date = this.setTimeToNoon(this.displayDate);

  /** @internal */
  @property() view: ViewEnum;

  /** @internal */
  @property({ type: Boolean }) show: boolean;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", this.handleKeyPress);
  }
  private handleKeyPress(event: KeyboardEvent) {
    switch (event.key) {
      case "ArrowUp":
        this.focusedDate = this.setTimeToNoon(new Date(this.focusedDate.setDate(this.focusedDate.getDate() - 7)));
        break;
      case "ArrowDown":
        this.focusedDate = this.setTimeToNoon(new Date(this.focusedDate.setDate(this.focusedDate.getDate() + 7)));
        break;
      case "ArrowLeft":
        this.focusedDate = this.setTimeToNoon(new Date(this.focusedDate.setDate(this.focusedDate.getDate() - 1)));
        break;
      case "ArrowRight":
        this.focusedDate = this.setTimeToNoon(new Date(this.focusedDate.setDate(this.focusedDate.getDate() + 1)));
        break;
      case "Enter":
        this.onClickDay(event);
        break;
      default:
        return;
    }
    this._focusOnCalendarCell();
  }

  /** @internal */
  private setTimeToNoon(date: Date) {
    const newDate = new Date(date);
    newDate.setHours(12);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  }

  /** @internal */
  private generateIncrementDays(start: Date, end: Date) {
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
      this.focusedDate = this.setTimeToNoon(new Date(date));
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
    const minimumDate = this.minDate ? this.setTimeToNoon(new Date(this.minDate)) : null;
    const maximumDate = this.maxDate ? this.setTimeToNoon(new Date(this.maxDate)) : null;

    const selectedDate = this.setTimeToNoon(displayDateClone);
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
      this.focusedDate = this.setTimeToNoon(this.selectedDate[0]);
    }
  }
  updated() {
    /** For KeyboardNavigation:
     * Runs after render has completed and td of next month has appeared.
     * For the case when calendar view changes to the next month
     * */
    this._focusOnCalendarCell();
  }
  /**Shifts focus from Input to Calendar */
  public focusOnCalendar(toBlurEl: HTMLElement) {
    toBlurEl.blur();
    this._focusOnCalendarCell();
  }

  private _focusOnCalendarCell() {
    const focusTd: HTMLElement = this.shadowRoot.querySelector(`td[data-date="${this.focusedDate.toISOString()}"]`);
    if (focusTd) {
      focusTd.focus();
    } else {
      /** Change month view */
      console.log("change view date in caldner");
      this.emit("sgds-view-date", { detail: this.focusedDate });
    }
  }
  render() {
    console.log("render");
    const selectedDates = this.selectedDate.map(d => this.setTimeToNoon(d));

    const rangeSelectedDates = this.generateIncrementDays(new Date(selectedDates[0]), new Date(selectedDates[1]));

    const minimumDate = this.minDate ? this.setTimeToNoon(new Date(this.minDate)) : null;
    const maximumDate = this.maxDate ? this.setTimeToNoon(new Date(this.maxDate)) : null;
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();
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
        if (day <= monthLength && (i > 0 || j >= startingDay)) {
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
                // focus: this.focusedDate.toISOString() === date
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

    // monthView

    const displayMonth = DatepickerCalendar.MONTHVIEW_LABELS[this.displayDate.getMonth()];

    const monthView = html`
      <div class="sgds monthpicker">
        ${DatepickerCalendar.MONTHVIEW_LABELS.map(
          (m, idx) => html`
            <button
              class=${classMap({ active: displayMonth === m, month: true })}
              @click=${() => this.onClickMonth(idx)}
            >
              ${m}
            </button>
          `
        )}
      </div>
    `;

    // yearView

    const displayYear = this.displayDate.getFullYear();
    const startLimit = displayYear - 5;
    const endLimit = displayYear + 6;
    const yearArray = [];

    for (let i = startLimit; i < endLimit + 1; i++) {
      yearArray.push(i);
    }

    const yearView = html`
      <div class="sgds yearpicker">
        ${yearArray.map(
          y => html`
            <button class=${classMap({ active: displayYear === y, year: true })} @click=${() => this.onClickYear(y)}>
              ${y}
            </button>
          `
        )}
      </div>
    `;

    // default - dayView

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

    let viewContent: HTMLTemplateResult;

    switch (this.view) {
      case "days":
        viewContent = html` ${dayView} `;
        break;
      case "months":
        viewContent = html` ${monthView} `;
        break;
      case "years":
        viewContent = html` ${yearView} `;
        break;
      default:
        viewContent = html` ${dayView} `; // Set a default view
        break;
    }

    return html` <div class="datepicker-body">${viewContent}</div> `;
  }
}

export default DatepickerCalendar;
