import { __decorate } from "tslib";
import { isAfter, isBefore, isValid, parse } from "date-fns";
import IMask from "imask";
import { html } from "lit";
import { property, queryAsync } from "lit/decorators.js";
import { DATE_PATTERNS, setTimeToNoon } from "../../utils/time";
import { SgdsInput } from "../Input/sgds-input";
import datepickerInputStyles from "./datepicker-input.css";
export class DatepickerInput extends SgdsInput {
    constructor() {
        super();
        /** Date format reflected on input  */
        this.dateFormat = "DD/MM/YYYY";
        /** Changes DatePicker to single date selection or range date selection */
        this.mode = "single";
        this._validateInput = async () => {
            const dates = this.mask.value.split(" - ");
            const noEmptyDates = dates.filter(d => d !== this.dateFormat.toLowerCase());
            const dateArray = noEmptyDates.map(date => setTimeToNoon(parse(date, DATE_PATTERNS[this.dateFormat].fnsPattern, new Date())));
            const invalidDates = dateArray.filter(date => !isValid(date) ||
                isBefore(date, new Date(0, 0, 1)) ||
                isBefore(date, setTimeToNoon(new Date(this.minDate))) ||
                isAfter(date, setTimeToNoon(new Date(this.maxDate))));
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
        this.type = "text";
        this.hasFeedback = true;
        this._handleValueChange = () => null;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener("sgds-change", this._validateInput);
    }
    async firstUpdated(changes) {
        super.firstUpdated(changes);
        this._applyInputMask(this.dateFormat);
    }
    async _applyInputMask(dateFormat) {
        const shadowInput = await this.shadowInput;
        const imPattern = this.mode === "single" ? DATE_PATTERNS[dateFormat].imPattern : DATE_PATTERNS[dateFormat].imRangePattern;
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
            parse: function (str) {
                const dates = str.split(" - ");
                return dates.map(date => parse(date, DATE_PATTERNS[dateFormat].fnsPattern, new Date()));
            },
            format: function (dateArr) {
                const dateStrings = dateArr.map(date => {
                    let dayStr, monthStr = "";
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    if (day < 10)
                        dayStr = "0" + day;
                    if (month < 10)
                        monthStr = "0" + month;
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
    updateMaskValue() {
        var _a;
        (_a = this.mask) === null || _a === void 0 ? void 0 : _a.updateValue();
    }
    destroyInputMask() {
        var _a;
        (_a = this.mask) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    async applyInputMask() {
        return await this._applyInputMask(this.dateFormat);
    }
    async focus() {
        const input = await this.shadowInput;
        return input.focus();
    }
    render() {
        return html `
      ${this._renderLabel()} ${this._renderHintText()}
      <div class="input-container">
        ${this._renderInput()}
        <slot name="calendar-btn"></slot>
        <slot name="reset-btn"></slot>
        </div>
      </div>
    `;
    }
}
DatepickerInput.styles = [...SgdsInput.styles, datepickerInputStyles];
__decorate([
    property({ type: String })
], DatepickerInput.prototype, "dateFormat", void 0);
__decorate([
    property({ type: String })
], DatepickerInput.prototype, "minDate", void 0);
__decorate([
    property({ type: String })
], DatepickerInput.prototype, "maxDate", void 0);
__decorate([
    property({ type: String, reflect: true })
], DatepickerInput.prototype, "mode", void 0);
__decorate([
    queryAsync("input")
], DatepickerInput.prototype, "shadowInput", void 0);
export default DatepickerInput;
//# sourceMappingURL=datepicker-input.js.map