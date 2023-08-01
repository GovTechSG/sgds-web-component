import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { ref } from "lit/directives/ref.js";
import { DropdownElement } from "../../base/dropdown-element";
import { defaultValue } from "../../utils/defaultvalue";
import { SgdsDropdownItem } from "../Dropdown";
import { SgdsInput } from "../Input";

export class SgdsComboBox extends ScopedElementsMixin(DropdownElement) {
  static get scopedElements() {
    return {
      "sgds-input": SgdsInput,
      "sgds-dropdown-item": SgdsDropdownItem
    };
  }
  constructor() {
    super();
    /**@internal */
    this.modifierOpt = [
      {
        name: "offset",
        options: {
          offset: [0, 10]
        }
      }
    ];
  }
  /** The input's label  */
  @property({ reflect: true }) label = "";
  /** The input's hint text below the label */
  @property({ reflect: true }) hintText = "";
  /**The input's name attribute */
  @property({ reflect: true }) name: string;
  /**The input's placeholder text. */
  @property({ type: String, reflect: true }) placeholder = "placeholder";
  /**Autofocus the input */
  @property({ type: Boolean, reflect: true }) autofocus = false;
  /**Disables the input. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /**Makes the input a required field. */
  @property({ type: Boolean, reflect: true }) required = false;
  /**Makes the input readonly. */
  @property({ type: Boolean, reflect: true }) readonly = false;
  /**The input's value attribute. */
  @property({ reflect: true }) value = "";
  /**Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue()
  defaultValue = "";
  @property({ type: Array }) menuList: string[] = [];

  private _handleInputChange(e: CustomEvent) {
    const value = (e.target as SgdsInput).value;
    console.log(value)
  }
  render() {
    return html`
      <div class="sgds combobox dropdown">
        <sgds-input
          class="dropdown-toggle w-100"
          label=${this.label}
          hintText=${this.hintText}
          name=${this.name}
          ${ref(this.myDropdown)}
          @click=${() => this._onClickButton()}
          placeholder=${this.placeholder}
          ?autofocus=${this.autofocus}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          .value=${this.value}
          @sgds-input=${this._handleInputChange}
        >
        </sgds-input>
        <div class="form-control-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
            />
          </svg>
        </div>
        <ul class="dropdown-menu" role="menu" part="menu">
          ${this.menuList.map(
            item => html`<sgds-dropdown-item href="#" @click=${this._handleSelectSlot}>${item}</sgds-dropdown-item>`
          )}
        </ul>
      </div>
    `;
  }
}

export default SgdsComboBox;
