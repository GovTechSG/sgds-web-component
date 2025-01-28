import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsCheckbox from "../Checkbox/sgds-checkbox";
import comboBoxItemStyles from "./sgds-combo-box-item.css";

export class SgdsComboBoxItem extends SgdsElement {
  static dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-checkbox": SgdsCheckbox
  };

  static styles = [comboBoxItemStyles];
  /** when true, sets the active stylings */
  @property({ type: Boolean }) active = false;

  /** Disables the Item */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** If true, this item is rendered as a checkbox item */
  @property({ type: Boolean, reflect: true }) checkbox = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "menuitem");
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }

  private _handleNonCheckboxClick() {
    if (!this.checkbox) {
      this.active = true;
      this.dispatchEvent(
        new CustomEvent("sgds-combo-box-item-select", {
          detail: { active: this.active },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  private _handleCheckboxChange(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    this.active = checkbox.checked;

    this.dispatchEvent(
      new CustomEvent("sgds-combo-box-item-select", {
        detail: { active: this.active },
        bubbles: true,
        composed: true
      })
    );
  }

  render() {
    const classes = {
      disabled: this.disabled,
      active: this.active,
      checkbox: this.checkbox
    };

    return html`
      <div
        class="dropdown-item ${classMap(classes)}"
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${!this.checkbox ? this._handleNonCheckboxClick : null}
      >
        ${this.checkbox
          ? html`
              <sgds-checkbox
                .checked=${this.active}
                .disabled=${this.disabled}
                @sgds-change=${this._handleCheckboxChange}
              >
                <slot></slot>
              </sgds-checkbox>
            `
          : html`
              <div class="normal-item-content">
                <slot></slot>
                ${this.active
                  ? html`
                      <div>
                        <sgds-icon name="check"></sgds-icon>
                      </div>
                    `
                  : nothing}
              </div>
            `}
      </div>
    `;
  }
}

export default SgdsComboBoxItem;
