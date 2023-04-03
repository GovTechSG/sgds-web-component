import { customElement, property, state, query } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "./sgds-action-card.scss";
import { CardElement } from "../utils/card-element";
import { ref, createRef, Ref } from "lit/directives/ref.js";

export type CardVariant = "card-action" | "card-action-quantity-toggle";

export type TypeVariant = "checkbox" | "radio";

@customElement("sgds-action-card")
export class SgdsActionCard extends CardElement {
  static styles = styles;

  // @query("sgds-checkbox") // Define the query
  // inputEl!: HTMLInputElement; // Declare the prop

  inputRef: Ref<HTMLInputElement> = createRef();

  @property({ type: String, reflect: true }) type?: TypeVariant = "checkbox";

  /** Use on actionable cards like SelectableCard and Quantity Toggle Card' */
  @property({ reflect: true }) variant?: CardVariant = "card-action";

  /** The card's subtitle iconName. */
  @property({ reflect: true }) iconName?: string;

  /** The input's id. */
  @property({ reflect: true }) inputId?: string;

  @property({ reflect: true, type: Boolean })
  active = false;

  // Declare the click event listener
  onInputChange() {
    this.inputRef.value.click();
    if (this.inputRef.value.checked && (!this.inputRef.value.disabled)) this.active = true;
    else if (!this.inputRef.value.checked) {
      this.active = false;
    }
  }

  handleKeyDown(event: KeyboardEvent) {
    const hasModifier =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      this.onInputChange();
    }
  }
  // handleChange(event: string){
  //   this.checked = this.inputRef.value.checked;
  //   this.emit(event);
  // }

  render() {
    const checkbox = html`<sgds-checkbox
      ${ref(this.inputRef)}
      ?disabled=${this.disabled}
      checkboxId=${this.inputId}
      @click=${this.onInputChange}
      @keydown=${this.handleKeyDown}
    ></sgds-checkbox>`;

    const radio = html`<sgds-radio
      ${ref(this.inputRef)}
      ?disabled=${this.disabled}
      radioId=${this.inputId}
      @click=${this.onInputChange}
      @keydown=${this.handleKeyDown}
    ></sgds-radio>`;

    const icon = html`<sgds-icon name="${this.iconName}"></sgds-icon>`;

    return html`
      <div
      tabindex=${this.disabled ? "-1" : "0"}
      @click=${this.onInputChange}
     @keydown=${this.handleKeyDown}
     
        variant="card-action"
        class="sgds card
        ${classMap({
          [`text-${this.textColor}`]: this.textColor,
          [`bg-${this.bgColor}`]: this.bgColor,
          [`border-${this.borderColor}`]: this.borderColor,
          ["is-active"]: this.active,
        })}
        "
      >
        <div class="card-body">
          <h6 class="text-muted card-subtitle">
            <div>
              ${this.iconName == undefined ? undefined : icon}
              <slot name="card-subtitle"></slot></slot>
            </div>
            <div class="card-input">
            ${
              this.type == "checkbox" && this.variant == "card-action"
                ? checkbox
                : this.type == "radio" && this.variant == "card-action"
                ? radio
                : undefined
            }
            </div>
          </h6>
          <h5 class="card-title"><slot name="card-title"></slot></h5>
          <p class="card-text"><slot name="card-text"></slot></p>
        </div>
      </div>
    `;
  }
}

export default SgdsActionCard;
