import { isAfter, isBefore, isValid, parse } from "date-fns";
import IMask, { InputMask } from "imask";
import { html } from "lit";
import { property, queryAsync } from "lit/decorators.js";
import { DATE_PATTERNS, setTimeToNoon } from "../../utils/time";
import { SgdsInput } from "../Input/sgds-input";
import datepickerInputStyles from "./datepicker-input.css";
export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY/MM/DD";

export class DatepickerInput extends SgdsInput {
  static styles = [...SgdsInput.styles, datepickerInputStyles];
  /** Date format reflected on input  */
  @property({ type: String }) dateFormat: DateFormat = "DD/MM/YYYY";

  /** ISO date string to set the lowest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) minDate: string;

  /** ISO date string to set the highest allowable date value. e.g. "2016-05-19T12:00:00.000Z" */
  @property({ type: String }) maxDate: string;

  /** Changes DatePicker to single date selection or range date selection */
  @property({ type: String, reflect: true }) mode: "single" | "range" = "single";

  @queryAsync("input")
  shadowInput: Promise<HTMLInputElement>;

  private mask: InputMask;
  constructor() {
    super();
    this.type = "text";
    this.hasFeedback = "both";
    this._handleChange = () => null;
  }
  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("sgds-change", this._validateInput);
  }

  async firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._applyInputMask(this.dateFormat);
  }
  private async _applyInputMask(dateFormat: string) {
    const shadowInput = await this.shadowInput;
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
    this.mask.on("accept", () => {
      this.value = this.mask.masked.value;
      this.emit("sgds-mask-input-change", { detail: this.value });
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
    const noEmptyDates = dates.filter(d => d !== this.dateFormat.toLowerCase());
    const dateArray: Date[] | string[] = noEmptyDates.map(date =>
      setTimeToNoon(parse(date, DATE_PATTERNS[this.dateFormat].fnsPattern, new Date()))
    );
    const invalidDates = dateArray.filter(
      date =>
        !isValid(date) ||
        isBefore(date, new Date(0, 0, 1)) ||
        isBefore(date, setTimeToNoon(new Date(this.minDate))) ||
        isAfter(date, setTimeToNoon(new Date(this.maxDate)))
    );

    if (invalidDates.length > 0) {
      this.setInvalid(true);
      return this.emit("sgds-invalid-input");
    }
    if (this.mode === "range" && dateArray.length === 1) {
      this.setInvalid(true);
      return this.emit("sgds-invalid-input");
    }
    if (invalidDates.length === 0 && dateArray.length > 0) {
      this.setInvalid(false);
      return this.emit("sgds-selectdates-input", { detail: dateArray });
    }
    if (dateArray.length === 0 && invalidDates.length === 0) {
      this.setInvalid(false);
      return this.emit("sgds-empty-input");
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
      ${this._renderLabel()} ${this._renderHintText()}
      <div class="input-container">
      <div class="input-feedback">
        ${this._renderInput()}
        ${this._renderFeedback()}
        </div>
        <slot name="calendar-btn"></slot>
        <slot name="reset-btn"></slot>
        </div>
      </div>
    `;
  }
}

export default DatepickerInput;
