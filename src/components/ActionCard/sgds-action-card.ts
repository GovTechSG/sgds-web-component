import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { live } from "lit/directives/live.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { html } from "lit/static-html.js";
import { CardElement } from "../../base/card-element";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import { SgdsCheckbox } from "../Checkbox/sgds-checkbox";
import { SgdsRadio } from "../Radio/sgds-radio";
import actionCardStyles from "./action-card.css";

/**
 * @summary Action Card are cards with built in checkbox or radio components. The ref of input is extended to the Card's body.
 * @slot icon - Icon content in the card-subtitile
 * @slot card-subtitle - The subtitle of the card
 * @slot card-title - The title of the card
 * @slot card-text - The paragrapher text of the card
 *
 * @event sgds-change - Emitted when the checked state of card's checkbox changes or when the selected card's radio has changed
 *
 * @csspart base - The action card base wrapper
 * @csspart body - The action card body
 * @csspart subtitle - The action card subtitle
 * @csspart title - The action card title
 * @csspart text - The action card text
 */
export class SgdsActionCard extends ScopedElementsMixin(CardElement) {
  static styles = [...CardElement.styles, actionCardStyles];
  /**@internal */
  static get scopedElements() {
    return {
      "sgds-checkbox": SgdsCheckbox,
      "sgds-radio": SgdsRadio
    };
  }
  /** @internal */
  inputRef: Ref<SgdsCheckbox | SgdsRadio> = createRef();
  /** Name of the HTML form control. Submitted with the form as part of a name/value pair. */
  @property({ reflect: true }) name: string;
  /** Value of the HTML form control. Primarily used to differentiate a list of related checkboxes that have the same name. */
  @property({ type: String }) value: string;
  /** Disables the input (so the user can't check / uncheck it). */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Draws the input in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** The type of input of the action card */
  @property({ type: String, reflect: true }) type: TypeVariant = "checkbox";

  /** Controls the active styling of the action card */
  @property({ reflect: true, type: Boolean })
  active = false;

  /** Simulates a click on the input control*/
  public click() {
    this.inputRef.value.click();
  }
  /** @internal Declare the click event listener*/
  async handleInputChange() {
    this.inputRef.value.click();
    this.emit("sgds-change");
  }
  /** @internal The input's id. */
  private inputId: string = genId("action-card", "input");

  /** @internal */
  @watch("checked")
  async handleRadioCheckedChange() {
    this.active = this.checked;
  }
  /** @internal */
  @watch("disabled")
  async handleDisabledChange() {
    this.active = !this.disabled;
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      this.handleInputChange();
    }
  }

  render() {
    const checkbox = html`<sgds-checkbox
      ${ref(this.inputRef)}
      ?disabled=${this.disabled}
      id=${this.inputId}
      @click=${this.handleInputChange}
      @keydown=${this._handleKeyDown}
      .value=${live(this.value)}
      ?checked=${live(this.checked)}
      @sgds-change=${(e: CustomEvent) => (this.checked = e.detail.checked)}
    ></sgds-checkbox>`;

    const radio = html`<sgds-radio
      ${ref(this.inputRef)}
      ?disabled=${this.disabled}
      id=${this.inputId}
      @click=${this.handleInputChange}
      @keydown=${this._handleKeyDown}
      .value=${live(this.value)}
      ?checked=${live(this.checked)}
    ></sgds-radio>`;

    return html`
      <div
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this.handleInputChange}
        @keydown=${this._handleKeyDown}
        variant="card-action"
        class="sgds card
        ${classMap({
          [`text-${this.textColor}`]: this.textColor,
          [`bg-${this.bgColor}`]: this.bgColor,
          [`border-${this.borderColor}`]: this.borderColor,
          ["is-active"]: this.active
        })}
        "
        part="base"
      >
        <div class="card-body" part="body">
          <h6 class="card-subtitle" part="subtitle">
            <div>
              <slot name="icon"></slot>
              <slot name="card-subtitle"></slot>
            </div>
            <div class="card-input">${this.type === "checkbox" ? checkbox : radio}</div>
          </h6>
          <h5 class="card-title" part="title"><slot name="card-title"></slot></h5>
          <p class="card-text" part="text"><slot name="card-text"></slot></p>
        </div>
      </div>
    `;
  }
}

export type TypeVariant = "checkbox" | "radio";

export default SgdsActionCard;
