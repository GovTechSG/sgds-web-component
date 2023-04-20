import { customElement, property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import { html } from "lit/static-html.js";
import { SgdsButton } from "../Button";
import SgdsElement from "../base/sgds-element";
import { defaultValue } from "../utils/defaultvalue";
import genId from "../utils/generateId";
import { watch } from "../utils/watch";
import styles from "./sgds-quantity-toggle.scss";

@customElement("sgds-quantity-toggle")
export class SgdsQuantityToggle extends SgdsElement {
  @query("input.form-control") input: HTMLInputElement;
  @query("sgds-button.button-group_button-first") leftBtn: SgdsButton;
  @query("sgds-button.button-group_button-last") lastBtn: SgdsButton;
  static styles = styles;

  @property({ reflect: true, type: String }) quantToggleId = genId("quantToggle", "toggle");

  @property({ reflect: true }) name: string;
  /** The input's minimum value. */
  @property() min: number | string;
  /** The input's maximum value. */
  @property() max: number | string;

  @property() size: "sm" | "lg" | "default" = "sm";

  @property({ reflect: true, type: Number }) count: number;

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ reflect: true }) quantityToggleClasses?: string;

  /**
   * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
   * implied, allowing any numeric value.
   */
  @property() step = 1;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";

  handleChange(event: string) {
    this.emit(event);
    this.count = parseInt(this.input.value);
  }
  onPlus(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.count = parseInt(this.input.value) + parseInt(this.input.step);
  }
  onMinus(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.count < this.step) {
      this.count = 0;
    } else {
      this.count = parseInt(this.input.value) - parseInt(this.input.step);
    }
  }

  @watch("count", { waitUntilFirstUpdate: true })
  render() {
    return html`
      <div
        part="base"
        class="${classMap({
          sgds: true,
          disabled: this.disabled,
          "input-group": true,
          [`${this.quantityToggleClasses}`]: this.quantityToggleClasses
        })}"
        variant="quantity-toggle"
        id=${this.quantToggleId}
        size=${this.size}
      >
        <sgds-button
          part="button"
          variant="primary"
          class="button-group_button-first"
          size=${this.size}
          @click=${this.onMinus}
          ?disabled=${this.disabled}
        >
          <sl-icon name="dash-lg"></sl-icon>
        </sgds-button>
        <input
          type="number"
          class="form-control ${"form-control-" + this.size} text-center"
          name=${ifDefined(this.name)}
          step=${ifDefined(this.step as number)}
          min=${ifDefined(this.min)}
          max=${ifDefined(this.max)}
          .value=${live(this.count)}
          @change=${() => this.handleChange("sgds-change")}
          @input=${() => this.handleChange("sgds-input")}
          ?disabled=${this.disabled}
        />
        <sgds-button
          part="button"
          variant="primary"
          class="button-group_button-last"
          size=${this.size}
          @click=${this.onPlus}
          ?disabled=${this.disabled}
        >
          <sl-icon name="plus-lg"></sl-icon>
        </sgds-button>
      </div>
    `;
  }
}

export default SgdsQuantityToggle;
