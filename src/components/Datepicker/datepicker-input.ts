import { isAfterDate, isBeforeDate, isValidDate, parseDate } from "../../utils/date-helpers";
import { DateMask } from "../../utils/date-mask";
import { html, PropertyValueMap } from "lit";
import { property, queryAsync } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { DATE_PATTERNS, setTimeToNoon } from "../../utils/time";
import { SgdsInput } from "../Input/sgds-input";
import datepickerInputStyles from "./datepicker-input.css";
export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";

export class DatepickerInput extends SgdsInput {
  static styles = [...SgdsInput.styles, datepickerInputStyles];
  /** Date format reflected on input  */
  private dateFormat = "DD/MM/YYYY";

  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) minDate: string;

  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) maxDate: string;

  /** Changes DatePicker to single date selection or range date selection */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  @queryAsync("input")
  shadowInput: Promise<HTMLInputElement>;

  private mask: DateMask;
  constructor() {
    super();
    this.type = "text";
  }

  protected override _handleBlur() {
    const dates = this.mask.value.split(" - ");
    const noEmptyDates = dates.filter(d => d !== this.dateFormat);
    const dateArray: Date[] | string[] = noEmptyDates.map(date =>
      setTimeToNoon(parseDate(date, DATE_PATTERNS[this.dateFormat].fnsPattern))
    );
    const invalidDates = dateArray.filter(
      date =>
        !isValidDate(date as Date) ||
        isBeforeDate(date as Date, new Date(0, 0, 1)) ||
        isBeforeDate(date as Date, setTimeToNoon(new Date(this.minDate))) ||
        isAfterDate(date as Date, setTimeToNoon(new Date(this.maxDate)))
    );

    // Only clear if the mask is complete AND there are invalid dates
    // This clears complete but invalid dates like "20/20/2026"
    // Incomplete dates remain in the input as-is (validation only runs on complete dates)
    if (this.mask.masked.isComplete && invalidDates.length > 0 && dateArray.length > 0) {
      this.value = "";
      this.mask.value = "";
      this.setInvalid(false);
    }

    this.emit("sgds-blur");
  }

  protected override async _handleChange(e: Event) {
    this.value = this.input.value;
    this.emit("sgds-change");
    super._mixinHandleChange(e);
    await this._validateInput();
  }

  async firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    this._applyInputMask(this.dateFormat);
  }
  private async _applyInputMask(dateFormat: string) {
    const shadowInput = await this.shadowInput;
    const imPattern =
      this.mode === "single" ? DATE_PATTERNS[dateFormat].imPattern : DATE_PATTERNS[dateFormat].imRangePattern;

    this.mask = new DateMask(shadowInput, { pattern: imPattern });
    this.mask.on("accept", () => {
      this.value = this.mask.masked.value;
      this.emit("i-sgds-mask-input-change", { detail: this.value });
    });
    /**
     * Validation after date is complete
     */
    this.mask.on("complete", this._validateInput);
  }
  public updateMaskValue() {
    this.mask?.updateValue();
  }
  private _validateInput = async () => {
    const dates = this.mask.value.split(" - ");
    const noEmptyDates = dates.filter(d => d !== this.dateFormat);
    const dateArray: Date[] | string[] = noEmptyDates.map(date =>
      setTimeToNoon(parseDate(date, DATE_PATTERNS[this.dateFormat].fnsPattern))
    );
    const invalidDates = dateArray.filter(
      date =>
        !isValidDate(date as Date) ||
        isBeforeDate(date as Date, new Date(0, 0, 1)) ||
        isBeforeDate(date as Date, setTimeToNoon(new Date(this.minDate))) ||
        isAfterDate(date as Date, setTimeToNoon(new Date(this.maxDate)))
    );

    if (invalidDates.length > 0) {
      this.setInvalid(true);
      return this.emit("i-sgds-invalid-input");
    }
    if (this.mode === "range" && dateArray.length === 1) {
      this.setInvalid(true);
      return this.emit("i-sgds-invalid-input");
    }
    if (invalidDates.length === 0 && dateArray.length > 0) {
      this.setInvalid(false);
      return this.emit("i-sgds-selectdates-input", { detail: dateArray });
    }
    if (dateArray.length === 0 && invalidDates.length === 0) {
      this.setInvalid(false);
      return this.emit("i-sgds-empty-input");
    }
  };

  public destroyInputMask() {
    this.mask?.destroy();
  }
  public async applyInputMask() {
    return await this._applyInputMask(this.dateFormat);
  }
  public async focus() {
    const input = await this.shadowInput;
    return input.focus();
  }
  render() {
    return html`
      <div
        class="form-control-container ${classMap({
          disabled: this.disabled
        })}"
      >
        ${this._renderLabel()}
        <div class="datepicker-input-container">
          ${this._renderInput()}
          <slot name="calendar-btn"></slot>
        </div>
        ${this._renderFeedback()}
      </div>
    `;
  }
}

export default DatepickerInput;
