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
 *
 * @cssprop --action-card-border-active-box-shadow - The box-shadow of action card border when it is in active state
 * @cssprop --action-card-transition-duration - The transition duration to active or hover state. Defaults to 0.3s
 * @cssprop --card-background - The background color of the card
 * @cssprop --card-height - The height of the card. By default, height of card depends on the size of its children
 * @cssprop --card-border-width - The border width of card
 * @cssprop --card-border-color - The border color of card
 * @cssprop --card-border-radius - The border radius of card
 * @cssprop --card-box-shadow - The box-shadow of card
 * @cssprop --card-inner-border-radius - The inner border radius of card. Useful in cases where card image is applied to prevent image border from exceeding the outer borders of the card
 * @cssprop --card-body-color - The text color of the items in card body. This includes title, subtitle and excludes link.
 * @cssprop --card-body-spacer-y - The y-axis spacer of card body
 * @cssprop --card-body-spacer-x - The x-axis spacer of card body.
 * @cssprop --card-title-color - The text color of card title
 * @cssprop --card-title-spacer-y - The y-axis spacer of card title.
 * @cssprop --card-subtitle-color - The text color of card subtitle
 */
export class SgdsActionCard extends ScopedElementsMixin(CardElement) {
  static styles = [...CardElement.styles, actionCardStyles];
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

  @watch("checked")
  async handleRadioCheckedChange() {
    this.active = this.checked;
  }
  @watch("disabled")
  async handleDisabledChange() {
    this.active = !this.disabled;
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
      id=${this.inputId}
      @click=${this.handleInputChange}
      @keydown=${this.handleKeyDown}
      .value=${live(this.value)}
      ?checked=${live(this.checked)}
      @sgds-change=${(e: CustomEvent) => (this.checked = e.detail.checked)}
    ></sgds-checkbox>`;

    const radio = html`<sgds-radio
      ${ref(this.inputRef)}
      ?disabled=${this.disabled}
      id=${this.inputId}
      @click=${this.handleInputChange}
      @keydown=${this.handleKeyDown}
      .value=${live(this.value)}
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
