import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import { html } from "lit/static-html.js";
import { CardElement } from "../../base/card-element";
import styles from "./sgds-action-card.scss";
import generateId from "../../utils/generateId";
import { SgdsCheckbox } from "../Checkbox";
import { SgdsRadio } from "../Radio";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { watch } from "../../utils/watch";

export type TypeVariant = "checkbox" | "radio";

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
 *
 */

@customElement("sgds-action-card")
export class SgdsActionCard extends CardElement {
  static styles = [CardElement.styles, styles];

  /** @internal */
  inputRef: Ref<SgdsCheckbox | SgdsRadio> = createRef();
  /** Name of the HTML form control. Submitted with the form as part of a name/value pair. */
  @property({ reflect: true }) name: string;
  /** Value of the HTML form control. Primarily used to differentiate a list of related checkboxes that have the same name. */
  @property() value: string;
  /** Disables the input (so the user can't check / uncheck it). */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Draws the input in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** The type of input of the action card */
  @property({ type: String, reflect: true }) type: TypeVariant = "checkbox";

  /** The input's id. */
  @property({ reflect: true }) inputId: string = generateId("action-card", "input");

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

  @watch("checked")
  async handleRadioCheckedChange() {
    this.active = this.checked;
  }

  handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      this.handleInputChange();
    }
  }

  render() {
    const checkbox = html`<sgds-checkbox
      ${ref(this.inputRef)}
      ?disabled=${this.disabled}
      checkboxId=${this.inputId}
      @click=${this.handleInputChange}
      @keydown=${this.handleKeyDown}
      .value=${ifDefined(this.value)}
      ?checked=${live(this.checked)}
      @sgds-change=${(e: CustomEvent) => (this.checked = e.detail.checked)}
    ></sgds-checkbox>`;

    const radio = html`<sgds-radio
      ${ref(this.inputRef)}
      ?disabled=${this.disabled}
      radioId=${this.inputId}
      @click=${this.handleInputChange}
      @keydown=${this.handleKeyDown}
      .value=${ifDefined(this.value)}
      ?checked=${live(this.checked)}
    ></sgds-radio>`;

    return html`
      <div
      tabindex=${this.disabled ? "-1" : "0"}
      @click=${this.handleInputChange}
     @keydown=${this.handleKeyDown}
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
          <h6 class="text-muted card-subtitle" part="subtitle">
            <div>
              <slot name="icon"></slot>
              <slot name="card-subtitle"></slot></slot>
            </div>
            <div class="card-input">
            ${this.type === "checkbox" ? checkbox : radio}
            </div>
          </h6>
          <h5 class="card-title" part="title"><slot name="card-title"></slot></h5>
          <p class="card-text" part="text"><slot name="card-text"></slot></p>
        </div>
      </div>
    `;
  }
}

export default SgdsActionCard;
