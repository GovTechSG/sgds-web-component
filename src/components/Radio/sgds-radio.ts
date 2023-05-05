import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../../utils/watch";
import styles from "./sgds-radio.scss";
import SgdsElement from "../../base/sgds-element";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import genId from "../../utils/generateId";

@customElement("sgds-radio")
export class SgdsRadio extends SgdsElement {
  static styles = [SgdsElement.styles,styles];

  @state() checked = false;
  @state() protected hasFocus = false;

  /** The radio's value attribute. */
  @property() value: string;

  /** For id/for pair of the HTML form control. */
  @property({ type: String, reflect: true }) radioId = genId("radio");

  /** Disables the radio. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Aligns the radios horizontally */
  @property({ type: Boolean, reflect: true }) isInline = false;

  /** For aria-label */
  @property({ type: String, reflect: true }) ariaLabel = "";

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
    this.hasFocus = false;
    this.emit("sgds-blur");
  }

  private handleClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  private handleFocus() {
    this.hasFocus = true;
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
        part="base"
        class=${classMap({
          "form-check": true,
          "form-check-inline": this.isInline
        })}
      >
        <input
          part="control"
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
        <label
          part="label"
          for="${ifDefined(this.radioId)}"
          aria-label=${ifDefined(this.ariaLabel)}
          class="form-check-label"
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
