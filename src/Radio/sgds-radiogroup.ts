import { html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../utils/watch";
import styles from "./sgds-radio.scss";
import SgdsElement from "../utils/sgds-element";
import SgdsRadio from "./sgds-radiogroup";

@customElement("sgds-radiogroup")
export class SgdsRadioGroup extends SgdsElement {
  static styles = styles;

  // protected readonly formSubmitController = new FormSubmitController(this, {
  //   defaultValue: (control: SlRadioGroup) => control.defaultValue,
  // });

  @query("slot:not([name])") defaultSlot: HTMLSlotElement;

  /**
   * The radio group label. Required for proper accessibility. If you need to display HTML, you can use the `label` slot
   * instead.
   */
  @property() label = "";

  /** The selected value of the control. */
  @property({ reflect: true }) value = "";

  /** The name assigned to the radio controls. */
  @property({ reflect: true }) name = "option";

  /**
   * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
   * `required`, `minlength`, `maxlength`, and `pattern` using the browser's constraint validation API.
   */
  // @property({ type: Boolean, reflect: true }) invalid = false;

  /** Aligns the radios horizontally */
  @property({ type: Boolean, reflect: true }) isInline = false;

  checked: boolean;
  disabled: any;

  @watch("value")
  handleValueChange() {
    if (this.hasUpdated) {
      this.emit("sgds-change");
    }
  }

  connectedCallback() {
    super.connectedCallback();
  }

  private getAllRadios() {
    return [...this.querySelectorAll<SgdsRadio>("sgds-radio")];
  }

  private handleRadioClick(event: MouseEvent) {
    const target = event.target as SgdsRadio;

    if (target.disabled) {
      return;
    }

    this.value = target.value;
    const radios = this.getAllRadios();
    radios.forEach((radio) => (radio.checked = radio === target));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (
      !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      return;
    }

    const radios = this.getAllRadios().filter((radio) => !radio.disabled);
    const checkedRadio = radios.find((radio) => radio.checked) ?? radios[0];
    const incr = ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
    let index = radios.indexOf(checkedRadio) + incr;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }

    this.getAllRadios().forEach((radio) => {
      radio.checked = false;

      radio.tabIndex = -1;
    });

    this.value = radios[index].value;
    radios[index].checked = true;
    radios[index].tabIndex = 0;
    radios[index].focus();

    event.preventDefault();
  }

  private handleSlotChange() {
    const radios = this.getAllRadios();
    radios.forEach((radio) => (radio.checked = radio.value === this.value));
  }

  render() {
    const defaultSlot = html`
      <slot
        @click=${this.handleRadioClick}
        @keydown=${this.handleKeyDown}
        @slotchange=${this.handleSlotChange}
        role="presentation"
      ></slot>
    `;

    return html`
      <fieldset part="base" role="radiogroup" name=${this.name}>
        <label
          part="label"
          class=${classMap({
            "form-label": true,
            "form-check": true,
          })}
        >
          <slot name="label">${this.label}</slot> </label
        >${defaultSlot}
      </fieldset>
    `;
  }
}

export default SgdsRadioGroup;
