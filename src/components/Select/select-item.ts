import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import SgdsIcon from "../Icon/sgds-icon";
import selectItemStyles from "./select-item.css";

export class SelectItem extends SgdsElement {
  /** @internal */
  static dependencies = {
    "sgds-icon": SgdsIcon
  };

  static styles = [selectItemStyles];
  /** when true, sets the active stylings */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Disables the Item */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "menuitem");
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }

  private _handleClickItem() {
    this.emit("sgds-select");
  }

  render() {
    const classes = {
      disabled: this.disabled,
      active: this.active
    };

    return html`
      <div class="dropdown-item ${classMap(classes)}" tabindex=${this.disabled ? "-1" : "0"}>
        <div class="normal-item-content" @click=${this._handleClickItem}>
          <slot></slot>
          ${this.active ? html` <sgds-icon name="check"></sgds-icon> ` : nothing}
        </div>
      </div>
    `;
  }
}

export default SelectItem;
