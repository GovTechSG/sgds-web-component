import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import SgdsElement from "../../base/sgds-element";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import styles from "./sgds-radio.scss";
/**
 * @summary Radio allows the user to select one option from a set while seeing all available options.
 *
 * @slot default - The label of the radio button
 *
 * @event sgds-focus - Emitted when the control gains focus.
 * @event sgds-blur - Emitted when the control loses focus.
 */
export class SgdsRadio extends SgdsElement {
  static styles = [SgdsElement.styles, styles];
  /**
   * Draws the radio in a checked state
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** The radio's value attribute. */
  @property() value: string;

  /** Disables the radio. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Aligns the radios horizontally */
  @property({ type: Boolean, reflect: true }) isInline = false;

  /** For aria-label */
  @property({ type: String, reflect: true }) ariaLabel = "";

  private radioId: string = genId("radio");

  connectedCallback(): void {
    super.connectedCallback();
    this.setInitialAttributes();
    this.addEventListeners();
  }

  @watch("checked")
  handleCheckedChange() {
    this.setAttribute("aria-checked", this.checked ? "true" : "false");
    this.setAttribute("tabindex", this.checked ? "0" : "-1");
  }

  @watch("disabled", { waitUntilFirstUpdate: true })
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }

  private handleBlur() {
    this.emit("sgds-blur");
  }

  private handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  private handleFocus() {
    this.emit("sgds-focus");
  }

  private addEventListeners() {
    this.addEventListener("blur", () => this.handleBlur());
    this.addEventListener("click", () => this.handleClick());
    this.addEventListener("focus", () => this.handleFocus());
  }

  private setInitialAttributes() {
    this.setAttribute("role", "radio");
    this.setAttribute("tabindex", "-1");
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }

  render() {
    return html`
      <div
        class=${classMap({
          "form-check": true,
          "form-check-inline": this.isInline
        })}
      >
        <input
          class=${classMap({
            "form-check-input": true
          })}
          type="radio"
          id=${ifDefined(this.radioId)}
          value=${ifDefined(this.value)}
          .checked=${live(this.checked)}
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
        />
        <label for="${ifDefined(this.radioId)}" aria-label=${ifDefined(this.ariaLabel)} class="form-check-label"
          ><slot></slot
        ></label>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "sgds-radio": SgdsRadio;
  }
}

export default SgdsRadio;
