import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsCheckbox from "../Checkbox/sgds-checkbox"; // <== import your checkbox if needed

export class SgdsComboBoxItem extends SgdsElement {
  static dependencies = {
    "sgds-icon": SgdsIcon,
    "sgds-checkbox": SgdsCheckbox, // <== make sure it's actually declared
  };

  /** when true, sets the active stylings */
  @property({ type: Boolean }) active = false;

  /** Disables the SgdsMainnavItem */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** If true, this item is rendered as a checkbox item */
  @property({ type: Boolean, reflect: true }) checkbox = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "menuitem");
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }

  private _handleNonCheckboxClick() {
    // Only dispatch if this item is NOT a checkbox
    if (!this.checkbox) {
      // Mark it active if desired
      this.active = true;
      // Dispatch the same event name as the checkbox scenario
      this.dispatchEvent(new CustomEvent("sgds-combo-box-item-select", {
        detail: { active: this.active },
        bubbles: true,
        composed: true
      }));
    }
  }

  private _handleCheckboxChange(e: Event) {
    // The sgds-checkbox dispatches an 'input' or 'change' event
    const checkbox = e.target as HTMLInputElement;
    // Update `active` based on the checkbox's checked state
    this.active = checkbox.checked;
    console.log('checkbox changed');

    // Optionally, dispatch an event to the parent, so the parent knows this item is selected
    this.dispatchEvent(new CustomEvent("sgds-combo-box-item-select", {
      detail: { active: this.active },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    // Common classes
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
        <!-- If checkbox is true, show an sgds-checkbox. Otherwise, show normal slot + icon. -->
        ${this.checkbox
        ? html`
              <!-- Render as a checkbox item -->
              <sgds-checkbox
                .checked=${this.active}
                .disabled=${this.disabled}
                @sgds-change=${this._handleCheckboxChange}
              >
                <slot></slot>
              </sgds-checkbox>
            `
        : html`
              <!-- Render the normal non-checkbox item -->
              <slot></slot>
              <!-- If active, show the "check" icon -->
              ${this.active
            ? html`
                    <div>
                      <sgds-icon name="check"></sgds-icon>
                    </div>
                  `
            : nothing}
            `}
      </div>
    `;
  }
}

export default SgdsComboBoxItem;
