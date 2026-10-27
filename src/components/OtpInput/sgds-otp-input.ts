import { html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import SgdsElement from "../../base/sgds-element";
import controlStyles from "../../styles/form-text-control.css";
import labelStyles from "../../styles/form-label.css";
import feedbackStyles from "../../styles/feedback.css";
import inputStyles from "../Input/input.css";
import styles from "./otp-input.css";
import SgdsIcon from "../Icon/sgds-icon";

/**
 * @summary Collects a four to eight digit one-time code. Feedback appears only on submission or reportValidity().
 * @slot label - The accessible label for the code.
 * @event sgds-input - Emitted when the code changes during input. Cancel to prevent automatic focus movement.
 * @event sgds-change - Emitted when the user commits a change.
 * @event sgds-focus - Emitted when focus enters the component.
 * @event sgds-blur - Emitted when focus leaves the component, without validation.
 * @event sgds-invalid - Emitted when validation reports an invalid code.
 * @event sgds-valid - Emitted when explicit validation succeeds.
 */
// FormControlElement exposes excluded label, hint and disabled properties.
// Its validator mixin assumes a single input; OTP validates the combined code
// and reports errors only on submission. Keep this adapter separate while
// reusing the shared form styles and public validation API.
export class SgdsOtpInput extends SgdsElement {
  static formAssociated = true;
  /** @internal */
  static dependencies = { "sgds-icon": SgdsIcon };
  static styles = [...SgdsElement.styles, controlStyles, labelStyles, feedbackStyles, inputStyles, styles];

  /** Choose numbers-only digit boxes or a single input with a prefix. */
  @property({ reflect: true }) variant: "numbers-only" | "with-prefix" = "numbers-only";
  /** Number of digits, clamped to the range 4–8. */
  @property({ type: Number, reflect: true }) length = 6;
  /** The code. Leading zeros are preserved. */
  @property() value = "";
  /** Form field name. */
  @property({ reflect: true }) name = "";
  /** Prefix displayed in the single-input variant. */
  @property() prefix = "";
  /** Requires a complete code on submission. */
  @property({ type: Boolean, reflect: true }) required = false;
  /** Disables automatic constraint validation for custom validation. */
  @property({ type: Boolean, reflect: true }) noValidate = false;
  /** Displays the error state. */
  @property({ type: Boolean, reflect: true }) invalid = false;
  /** Optional custom error message. */
  @property() invalidFeedback = "";

  @state() private _label = "Verification code";
  @state() private _formDisabled = false;
  private _internals = this.attachInternals();
  private _digits: string[] = [];
  private _lastValue = "";
  private _defaultValue = "";
  private _form: HTMLFormElement | null = null;
  private _customValidity: { flags: ValidityStateFlags; message: string; anchor?: HTMLElement } | null = null;
  private _handleSubmit = () => {
    if (this._shouldSkipValidation()) return;
    this.invalid = false;
  };

  constructor() {
    super();
    this.addEventListener("invalid", e => {
      e.preventDefault();
      this.invalid = true;
      this.emit("sgds-invalid");
      this.focus();
    });
  }

  private get _count() {
    return Number.isFinite(this.length) ? Math.max(4, Math.min(8, Math.trunc(this.length))) : 6;
  }
  private get _disabled() {
    return this._formDisabled;
  }
  private get _message() {
    return this.invalidFeedback || this._customValidity?.message || `Enter a ${this._count}-digit code.`;
  }

  protected willUpdate(changes: PropertyValues) {
    super.willUpdate(changes);
    if (!this.hasUpdated) this._defaultValue = this.value;
    if (this.value !== this._lastValue || changes.has("length")) {
      this.value = String(this.value ?? "")
        .replace(/\D/g, "")
        .slice(0, this._count);
      this._digits = this.value.split("");
      this._lastValue = this.value;
    }
  }
  protected updated(changes: PropertyValues) {
    super.updated(changes);
    this._syncValidity();
  }

  private _shouldSkipValidation(): boolean {
    return this.noValidate || !!this._internals.form?.noValidate;
  }

  private _syncValidity() {
    this._internals.setFormValue(this._disabled ? null : this.value);
    const incomplete = this._digits.filter(Boolean).length !== this._count;
    const skip = this._disabled || this._shouldSkipValidation();
    const flags = skip
      ? {}
      : this._customValidity
      ? this._customValidity.flags
      : !this.value && this.required
      ? { valueMissing: true }
      : this.value && incomplete
      ? { patternMismatch: true }
      : {};
    this._internals.setValidity(
      flags,
      Object.keys(flags).length ? this._message : "",
      this._customValidity?.anchor || this.shadowRoot?.querySelector("input") || undefined
    );
  }

  /** Checks validity without changing the displayed error state. */
  public checkValidity() {
    this._syncValidity();
    return this._internals.validity.valid;
  }
  /** Validates the code and displays feedback. Call from a custom submit handler. */
  public reportValidity() {
    if (this._shouldSkipValidation()) return true;
    this.setInvalid(!this.checkValidity());
    if (this.invalid) this.focus();
    return !this.invalid;
  }
  /** Sets a server-side or custom validation error state. */
  public setInvalid(invalid: boolean) {
    this.invalid = invalid;
    this.emit(invalid ? "sgds-invalid" : "sgds-valid");
  }
  /** Sets custom constraint validity without displaying feedback. Clear with setValidity({}); reset also clears it. */
  public setValidity(flags: ValidityStateFlags = {}, message?: string, anchor?: HTMLElement): void {
    if (this._shouldSkipValidation()) return;
    // Let ElementInternals validate the message and anchor before storing the override.
    this._internals.setValidity(flags, message, anchor);
    this._customValidity = Object.values(flags).some(Boolean)
      ? { flags: { ...flags }, message: message ?? "", anchor }
      : null;
    this._syncValidity();
    this.requestUpdate();
  }
  /** The current constraint validity. */
  public get validity() {
    return this._internals.validity;
  }
  /** The current constraint validation message. */
  public get validationMessage() {
    return this._internals.validationMessage;
  }
  /** Focuses the first digit. */
  public focus(options?: FocusOptions) {
    this.shadowRoot?.querySelector("input")?.focus(options);
  }
  /** Removes focus from the active internal input. */
  public blur(): void {
    (this.shadowRoot?.activeElement as HTMLElement | null)?.blur();
  }
  private _handleFocus(event: FocusEvent) {
    if (this._containsFocusTarget(event.relatedTarget)) return;
    this.emit("sgds-focus");
  }
  private _handleBlur(event: FocusEvent) {
    if (this._containsFocusTarget(event.relatedTarget)) return;
    this.emit("sgds-blur", { cancelable: true });
  }
  private _containsFocusTarget(target: EventTarget | null): boolean {
    return target instanceof Node && (this.contains(target) || !!this.shadowRoot?.contains(target));
  }
  /** @internal */
  public formAssociatedCallback(form: HTMLFormElement | null) {
    this._form?.removeEventListener("submit", this._handleSubmit);
    this._form = form;
    form?.addEventListener("submit", this._handleSubmit);
  }
  /** @internal */
  public formDisabledCallback(disabled: boolean) {
    this._formDisabled = disabled;
  }
  /** @internal */
  public formResetCallback() {
    this._customValidity = null;
    this.value = this._defaultValue;
    this._digits = this.value.split("");
    this.invalid = false;
    this._syncValidity();
  }
  /** @internal */
  public formStateRestoreCallback(value: string) {
    this.value = value;
  }

  private async _setDigits(text: string, index: number) {
    if (this._disabled) return;
    const digits = text.replace(/\D/g, "");
    if (this.variant === "with-prefix") this._digits = digits.slice(0, this._count).split("");
    else {
      const start = digits.length >= this._count ? 0 : index;
      if (!digits) this._digits[index] = "";
      else
        digits
          .slice(0, this._count - start)
          .split("")
          .forEach((digit, offset) => {
            this._digits[start + offset] = digit;
          });
      index = start;
    }
    this.value = this._digits.join("");
    this._lastValue = this.value;
    this._syncValidity();
    this.requestUpdate();
    const inputEvent = this.emit("sgds-input", { cancelable: true });
    await this.updateComplete;
    if (inputEvent.defaultPrevented) return;
    if (this.variant === "numbers-only" && digits) this._focusDigit(Math.min(index + digits.length, this._count - 1));
  }
  private _focusDigit(index: number) {
    const input = this.shadowRoot?.querySelectorAll("input")[index];
    input?.focus();
    input?.select();
  }
  private _handleKey(event: KeyboardEvent, index: number) {
    if (event.key === "Enter") {
      event.preventDefault();
      this._internals.form?.requestSubmit();
      return;
    }
    if (this.variant !== "numbers-only") return;
    const targets = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: this._count - 1 };
    if (event.key in targets) {
      event.preventDefault();
      this._focusDigit(Math.max(0, Math.min(this._count - 1, targets[event.key as keyof typeof targets])));
    } else if (event.key === "Backspace") {
      event.preventDefault();
      const target = this._digits[index] ? index : Math.max(0, index - 1);
      void this._setDigits("", target);
      this._focusDigit(target);
    }
  }
  private _handleLabel(event: Event) {
    const text = (event.target as HTMLSlotElement)
      .assignedNodes({ flatten: true })
      .map(node => node.textContent)
      .join(" ")
      .trim();
    this._label = text || "Verification code";
  }
  private _renderInput(index: number) {
    const boxes = this.variant === "numbers-only";
    return html`<div
      class="form-control-group ${classMap({
        disabled: this._disabled,
        "is-invalid": this.invalid,
        "otp-box": boxes
      })}"
    >
      ${!boxes && this.prefix ? html`<span class="form-control-prefix">${this.prefix}</span>` : nothing}
      <input
        class="form-control"
        type="text"
        inputmode="numeric"
        size=${boxes ? 1 : this._count}
        autocomplete=${index === 0 ? "one-time-code" : "off"}
        aria-label=${boxes ? `${this._label}, digit ${index + 1} of ${this._count}` : this._label}
        aria-invalid=${String(this.invalid)}
        aria-required=${String(this.required)}
        aria-describedby=${this.invalid ? "otp-error" : nothing}
        ?disabled=${this._disabled}
        .value=${live(boxes ? this._digits[index] || "" : this.value)}
        @focus=${(e: FocusEvent) => {
          if (boxes) (e.target as HTMLInputElement).select();
        }}
        @keydown=${(e: KeyboardEvent) => this._handleKey(e, index)}
        @input=${(e: InputEvent) => {
          if (!e.isComposing) void this._setDigits((e.target as HTMLInputElement).value, index);
        }}
        @compositionend=${(e: CompositionEvent) => this._setDigits((e.target as HTMLInputElement).value, index)}
        @change=${() => this.emit("sgds-change", { cancelable: true })}
        @paste=${(e: ClipboardEvent) => {
          e.preventDefault();
          void this._setDigits(e.clipboardData?.getData("text") || "", index);
        }}
      />
    </div>`;
  }
  public render() {
    return html`<div
      class="form-control-container ${classMap({ disabled: this._disabled })}"
      @focusin=${this._handleFocus}
      @focusout=${this._handleBlur}
    >
      <div class="form-label" id="otp-label" @click=${() => this.focus()}>
        <slot name="label" @slotchange=${this._handleLabel}></slot>
      </div>
      <div class="otp-fields" role="group" aria-labelledby="otp-label">
        ${Array.from({ length: this.variant === "with-prefix" ? 1 : this._count }, (_, index) =>
          this._renderInput(index)
        )}
      </div>
      ${this.invalid
        ? html`<div class="invalid-feedback-container">
            <sgds-icon name="exclamation-circle-fill" size="md"></sgds-icon>
            <div id="otp-error" class="invalid-feedback" role="alert">${this._message}</div>
          </div>`
        : nothing}
    </div>`;
  }
}
export default SgdsOtpInput;
