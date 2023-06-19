import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-datepicker-calendar.scss";

@customElement("sgds-datepicker-calendar")
export class Calendar extends SgdsElement {
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
  @property({ attribute: false }) displayDate: Date = new Date();
  /** @internal */
  @property({ attribute: false }) displayDateInput: Date;
  /** @internal */
  @property({ type: String }) minDate?: string;
  /** @internal */
  @property({ type: String }) maxDate?: string;
  /** @internal */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";
  /** @internal */
  @property({ attribute: false }) initialValue?: Date;

  /** @internal */
  @state() year: number = this.displayDate.getFullYear();
  /** @internal */
  @state() month: number = this.displayDate.getMonth();
  /** @internal */
  @state() view = "days";
  /** @internal */
  @state() displayDateInternal: Date = new Date();

  connectedCallback() {
    super.connectedCallback();

    if (this.initialValue && this.mode === "single") {
      // Assign the initialValue to selectedDate array
      this.selectedDate = [this.initialValue];
    }
  }

  setTimeToNoon(date: Date) {
    const newDate = new Date(date);
    newDate.setHours(12);
    newDate.setMinutes(0);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  }

  generateIncrementDays(start: Date, end: Date) {
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

  handleDayClick(event: MouseEvent) {
    const day = (event.currentTarget as HTMLTableCellElement).dataset.day!;
    const displayDateClone = new Date(this.displayDate);
    displayDateClone.setDate(parseInt(day));

    if (this.mode === "single") {
      // Single mode: Select a single date
      this.displayDateInput = displayDateClone;
      this.displayDate = displayDateClone;
      this.emit("sgds-displayvalue", { detail: this.displayDateInput });
      this.emit("sgds-selectvalue", { detail: this.displayDate });
      // Add the selected date to the selectedDate array, for highlighting/maintaining the correct date
      this.selectedDate = [displayDateClone];
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

      // if (this.selectedDate.length === 2) {
      //   // Format the start and end dates
      //   const startDate = this.selectedDate[0];
      //   const endDate = this.selectedDate[1];
      //   const formattedStartDate = startDate.toLocaleDateString();
      //   const formattedEndDate = endDate.toLocaleDateString();

      //   // Update the displayDateInput with the formatted date range
      //   this.displayDateInput = new Date(`${formattedStartDate} - ${formattedEndDate}`);
      // } else {
      //   // Only start date is selected, update displayDateInput with the start date
      //   this.displayDateInput = new Date(`${displayDateClone} - `);
      // }

      // Emit an event with the range of selected dates
      this.emit("sgds-selectdates", { detail: selectedDates });
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
  onClickMonth(month: number) {
    this.month = month;
    const displayDateClone = new Date(this.displayDate);
    this.view = "days";
    displayDateClone.setMonth(this.month);
    this.displayDate = displayDateClone;
    this.emit("sgds-view", { detail: this.view });
    //once clicked, should change view to days, and hold value and change view
    this.emit("sgds-selectmonth", { detail: this.displayDate });
  }

  // clickhandler for year view buttons
  onClickYear(year: number) {
    this.year = year;
    const displayDateClone = new Date(this.displayDate);
    displayDateClone.setFullYear(this.year);
    this.displayDate = displayDateClone;
    this.view = "months";
    this.emit("sgds-view", { detail: this.view });

    this.emit("sgds-selectyear", { detail: this.displayDate });
  }

  render() {
    const selectedDates = this.selectedDate.map(d => this.setTimeToNoon(d));
    const rangeSelectedDates = this.generateIncrementDays(new Date(selectedDates[0]), new Date(selectedDates[1]));

    const minimumDate = this.minDate ? this.setTimeToNoon(new Date(this.minDate)) : null;
    const maximumDate = this.maxDate ? this.setTimeToNoon(new Date(this.maxDate)) : null;
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();
    let monthLength = Calendar.daysInMonth[month];
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
          // Remove the existing className assignment
          let className: string | undefined;
          const date = new Date(year, month, day, 12, 0, 0, 0).toISOString();
          // Check if the date matches the current date
          const isCurrentDate = new Date();

          const isSelected = selectedDates.some(
            selectedDate => Date.parse(date) === Date.parse(selectedDate.toISOString())
          );

          const beforeMinDate = minimumDate && Date.parse(date) < Date.parse(minimumDate.toISOString());
          const afterMinDate = maximumDate && Date.parse(date) > Date.parse(maximumDate.toISOString());
          const clickHandler = beforeMinDate || afterMinDate ? undefined : this.handleDayClick;

          const isCurrentMonth = isCurrentDate.getMonth() === this.displayDate.getMonth();
          const isCurrentYear = isCurrentDate.getFullYear() === this.displayDate.getFullYear();
          const isCurrentDay = isCurrentDate.getDate() === day;

          const mutedButtonStyle = {
            cursor: "default"
          };
          const buttonStyles = {
            cursor: "pointer",
            borderRadius: "0"
          };
          week.push(
            html`<td
              key=${j}
              data-day=${day}
              class=${classMap({
                "text-primary": isCurrentDay && isCurrentMonth && isCurrentYear,
                "bg-primary-100":
                  isSelected ||
                  (selectedDates.length > 0 &&
                    (rangeSelectedDates.some(d => Date.parse(date) === Date.parse(d.toISOString())) ||
                      Date.parse(date) === Date.parse(selectedDates[0].toISOString()))),
                "text-muted": beforeMinDate || afterMinDate
              })}
              style=${styleMap(beforeMinDate || afterMinDate ? { ...buttonStyles, ...mutedButtonStyle } : buttonStyles)}
              @click=${clickHandler}
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

    const displayMonth = Calendar.MONTHVIEW_LABELS[this.displayDate.getMonth()];

    const monthView = html`
      <div class="sgds monthpicker">
        ${Calendar.MONTHVIEW_LABELS.map(
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
            ${Calendar.DAY_LABELS.map(
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

    let viewContent;
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

export default Calendar;
