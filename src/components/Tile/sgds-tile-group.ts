import { html, nothing, PropertyValueMap } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import FormControlElement from "../../base/form-control-element";
import { SgdsFormValidatorMixin } from "../../utils/validatorMixin";
import { watch } from "../../utils/watch";
import tileGroupStyles from "./tile-group.css";
import type SgdsTile from "./sgds-tile";
import type { TileVariant } from "./sgds-tile";
import type { ISgdsTileGroupChangeEventDetail } from "./types";
export type { ISgdsTileGroupChangeEventDetail };

/**
 * @summary TileGroup groups multiple tiles so they function as a single form control.
 *
 * @slot default - The default slot where sgds-tile elements are placed.
 * @slot invalidIcon - The slot for invalid icon.
 *
 * @event sgds-change - Emitted when the tile group's selected value changes.
 * @eventDetail {ISgdsTileGroupChangeEventDetail} sgds-change
 * @event sgds-invalid - Emitted when the tile group's invalid state is set to true.
 * @event sgds-valid - Emitted when the tile group's invalid state is set to false.
 */
export class SgdsTileGroup extends SgdsFormValidatorMixin(FormControlElement) {
  static styles = [...FormControlElement.styles, tileGroupStyles];

  /**@internal */
  @query("slot:not([name])") defaultSlot: HTMLSlotElement;

  /**@internal */
  @state() defaultValue = "";

  /** The selected value of the control. In radio mode, a single string. In checkbox mode, a comma-separated string of checked values. */
  @property({ reflect: true }) value = "";

  /** The selection variant. "radio" enforces single selection, "checkbox" allows multiple. */
  @property({ reflect: true }) variant: TileVariant = "radio";

  /** Feedback text for error state when validated. */
  @property({ type: String, reflect: true }) invalidFeedback = "";

  /** Allows invalidFeedback, invalid and valid styles to be visible with the input. */
  @property({ type: Boolean, reflect: true }) hasFeedback = false;

  /** Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Disables native and sgds validation for the tile group. */
  @property({ type: Boolean, reflect: true }) noValidate = false;

  @watch("value", { waitUntilFirstUpdate: true })
  _handleValueChange() {
    this._updateCheckedTiles();
  }

  @watch("invalid", { waitUntilFirstUpdate: true })
  _handleInvalidChange() {
    this._tiles.forEach(t => (t.invalid = this.invalid));
  }

  @state() private _isTouched = false;

  private _mixinResetFormControl() {
    this.value = this.input.value = this.defaultValue;
    this._updateInputValue("reset");
    this._mixinResetValidity(this.input);
  }

  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
    this.addEventListener("sgds-blur", () => {
      this._isTouched = true;
    });
    this.addEventListener("keydown", this._handleKeyDown.bind(this));
  }

  firstUpdated(changedProperties: PropertyValueMap<this>) {
    super.firstUpdated(changedProperties);
    if (this.value) {
      this._updateInputValue("change");
    }
  }

  @queryAssignedElements()
  private _tiles!: Array<SgdsTile>;

  private _handleTileClick(event: MouseEvent) {
    const tile = event.composedPath().find(el => (el as HTMLElement).tagName?.toLowerCase() === "sgds-tile") as
      | SgdsTile
      | undefined;

    if (!tile || tile.disabled) return;

    event.preventDefault();

    if (this.variant === "radio") {
      this.value = tile.value;
      this._tiles.forEach(t => (t.checked = t === tile));
    } else {
      // checkbox mode: toggle the clicked tile
      tile.checked = !tile.checked;
      this.value = this._tiles
        .filter(t => t.checked)
        .map(t => t.value)
        .join(",");
    }

    this.emit<ISgdsTileGroupChangeEventDetail>("sgds-change", { detail: { value: this.value } });
    this._updateInputValue();
  }

  private _updateInputValue(eventName = "change") {
    this.input.value = this.value;
    this.input.dispatchEvent(new InputEvent(eventName));
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const isArrowKey = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key);
    const isSelectKey = [" ", "Enter"].includes(event.key);

    if (!isArrowKey && !isSelectKey) return;

    const tiles = this._tiles.filter(t => !t.disabled);
    if (tiles.length === 0) return;

    if (isArrowKey) {
      event.preventDefault();
      const currentIndex = tiles.indexOf(
        (document.activeElement as SgdsTile) ?? tiles.find(t => t.checked) ?? tiles[0]
      );
      const incr = ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
      let nextIndex = currentIndex + incr;
      if (nextIndex < 0) nextIndex = tiles.length - 1;
      if (nextIndex > tiles.length - 1) nextIndex = 0;

      if (this.variant === "radio") {
        // Radio mode: arrow keys move AND select
        this._tiles.forEach(t => {
          t.checked = false;
          t.tabIndex = -1;
        });
        tiles[nextIndex].checked = true;
        tiles[nextIndex].tabIndex = 0;
        tiles[nextIndex].focus();
        this.value = tiles[nextIndex].value;
        this.emit<ISgdsTileGroupChangeEventDetail>("sgds-change", { detail: { value: this.value } });
        this._updateInputValue();
      } else {
        // Checkbox mode: arrow keys move focus only
        tiles.forEach(t => (t.tabIndex = -1));
        tiles[nextIndex].tabIndex = 0;
        tiles[nextIndex].focus();
      }
    } else if (isSelectKey) {
      event.preventDefault();
      const focused = document.activeElement as SgdsTile;
      if (!focused || !tiles.includes(focused)) return;

      if (this.variant === "radio") {
        this._tiles.forEach(t => (t.checked = t === focused));
        this.value = focused.value;
      } else {
        focused.checked = !focused.checked;
        this.value = this._tiles
          .filter(t => t.checked)
          .map(t => t.value)
          .join(",");
      }

      this.emit<ISgdsTileGroupChangeEventDetail>("sgds-change", { detail: { value: this.value } });
      this._updateInputValue();
    }
  }

  private _handleSlotChange() {
    const tiles = this._tiles;

    tiles.forEach(tile => {
      tile._isGrouped = true;
      tile.variant = this.variant;
      if (this.variant === "radio") {
        tile.checked = tile.value === this.value;
      } else {
        const values = this.value ? this.value.split(",") : [];
        tile.checked = values.includes(tile.value);
      }
    });

    this._disabledChildTiles();
    this._updateTabIndices();
  }

  private _updateCheckedTiles() {
    const tiles = this._tiles;
    if (this.variant === "radio") {
      tiles.forEach(t => (t.checked = t.value === this.value));
    } else {
      const values = this.value ? this.value.split(",") : [];
      tiles.forEach(t => (t.checked = values.includes(t.value)));
    }
    this._updateTabIndices();
  }

  private _updateTabIndices() {
    const tiles = this._tiles;
    if (this.variant === "radio") {
      const checkedTile = tiles.find(t => t.checked);
      tiles.forEach(t => (t.tabIndex = -1));
      if (checkedTile) {
        checkedTile.tabIndex = 0;
      } else if (tiles[0]) {
        tiles[0].tabIndex = 0;
      }
    } else {
      tiles.forEach(t => (t.tabIndex = t.disabled ? -1 : 0));
    }
  }

  protected _renderHintText() {
    const hintTextTemplate = html`<div id="${this._controlId}Help" class="form-text">${this.hintText}</div>`;
    return this.hintText && hintTextTemplate;
  }

  public reportValidity(): boolean {
    return this._mixinReportValidity();
  }

  public checkValidity(): boolean {
    return this._mixinCheckValidity();
  }

  public get validity(): ValidityState {
    return this._mixinGetValidity();
  }

  public get validationMessage() {
    return this._mixinGetValidationMessage();
  }

  @watch("_isTouched", { waitUntilFirstUpdate: true })
  _handleIsTouched() {
    if (this._mixinShouldSkipSgdsValidation()) return;
    if (this._isTouched) {
      this.invalid = !this.input.checkValidity();
    }
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    this.setInvalid(false);
    this._disabledChildTiles();
  }

  private _disabledChildTiles() {
    if (this.disabled) {
      this._tiles.forEach(t => (t.disabled = this.disabled));
    }
  }

  render() {
    const defaultSlot = html`
      <slot
        class="tile-container"
        @click=${this._handleTileClick}
        @slotchange=${this._handleSlotChange}
        role="presentation"
      ></slot>
    `;

    return html`
      <fieldset name=${this.name}>
        <div class="label-hint-container">
          <label
            class=${classMap({
              "form-label": true,
              required: this.required
            })}
          >
            ${this.label}
          </label>
          ${this._renderHintText()}
        </div>
        ${defaultSlot}
        <input
          type="text"
          class="tile-group-validation-input ${classMap({
            "is-invalid": this.hasFeedback && this.invalid
          })}"
          ?required=${this.required}
          tabindex="-1"
          @change=${(e: Event) => super._mixinHandleChange(e)}
          .value=${live(this.value)}
          aria-describedby=${this.invalid && this.hasFeedback ? "tile-group-feedback" : `${this._controlId}Help`}
        />
        ${this.invalid && this.hasFeedback
          ? html`
              <div class="invalid-feedback-container">
                <slot name="invalidIcon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10ZM10 6.25C9.49805 6.25 9.10584 6.68339 9.15578 7.18285L9.48461 10.4711C9.51109 10.7359 9.7339 10.9375 10 10.9375C10.2661 10.9375 10.4889 10.7359 10.5154 10.4711L10.8442 7.18285C10.8942 6.68339 10.5019 6.25 10 6.25ZM10.0014 11.875C9.48368 11.875 9.06394 12.2947 9.06394 12.8125C9.06394 13.3303 9.48368 13.75 10.0014 13.75C10.5192 13.75 10.9389 13.3303 10.9389 12.8125C10.9389 12.2947 10.5192 11.875 10.0014 11.875Z"
                      fill="currentColor"
                    />
                  </svg>
                </slot>
                <div id="tile-group-feedback" class="invalid-feedback">
                  ${this.invalidFeedback ? this.invalidFeedback : this.input.validationMessage}
                </div>
              </div>
            `
          : nothing}
      </fieldset>
    `;
  }
}

export default SgdsTileGroup;
