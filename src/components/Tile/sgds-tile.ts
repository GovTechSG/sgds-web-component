import SgdsElement from "../../base/sgds-element";
import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import tileStyle from "./tile.css";
import SgdsCheckbox from "../Checkbox/sgds-checkbox";
import SgdsRadio from "../Radio/sgds-radio";

/**
 * @summary A tile component that displays an icon alongside a title and description.
 *
 * @slot icon - The slot for the icon on the left of the tile
 * @slot title - The slot for the tile title
 * @slot description - The slot for the tile description
 */
export class SgdsTile extends SgdsElement {
  static styles = [...SgdsElement.styles, tileStyle];

  /**@internal */
  static dependencies = {
    "sgds-checkbox": SgdsCheckbox,
    "sgds-radio": SgdsRadio
  };

  /** Disables the tile */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The variant of the tile input. When set, renders a checkbox or radio in the top-right corner. */
  @property({ reflect: true }) variant: TileVariant | undefined;

  /** Sets the checked state of the internal checkbox or radio */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Stacks the icon above the title and description instead of beside them */
  @property({ type: Boolean, reflect: true }) stacked = false;

  /** Sets the tile to an invalid state */
  @property({ type: Boolean, reflect: true }) invalid = false;

  private _handleTileClick() {
    if (this.disabled || !this.variant) return;

    if (this.variant === "checkbox") {
      const checkbox = this.shadowRoot!.querySelector("sgds-checkbox") as SgdsCheckbox;
      checkbox?.click();
      this.checked = checkbox?.checked;
    } else if (this.variant === "radio") {
      const radio = this.shadowRoot!.querySelector("sgds-radio") as SgdsRadio;
      radio?.click();
      this.checked = radio?.checked;
    }
  }

  private _handleInputClick(e: Event) {
    e.stopPropagation();
    if (this.variant === "checkbox") {
      const checkbox = this.shadowRoot!.querySelector("sgds-checkbox") as SgdsCheckbox;
      this.checked = checkbox?.checked;
    } else if (this.variant === "radio") {
      const radio = this.shadowRoot!.querySelector("sgds-radio") as SgdsRadio;
      this.checked = radio?.checked;
    }
  }

  private _handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this._handleTileClick();
    }
  }

  render() {
    return html`
      <div
        class=${classMap({ tile: true, disabled: this.disabled, checked: this.checked, invalid: this.invalid })}
        tabindex=${this.disabled ? "-1" : "0"}
        @click=${this._handleTileClick}
        @keydown=${this._handleKeyDown}
      >
        ${this.variant === "checkbox"
          ? html`<sgds-checkbox
              tabindex="-1"
              ?disabled=${this.disabled}
              ?checked=${this.checked}
              ?invalid=${this.invalid}
              ?noValidate=${true}
              hasFeedback="style"
              @click=${this._handleInputClick}
            ></sgds-checkbox>`
          : this.variant === "radio"
          ? html`<sgds-radio
              tabindex="-1"
              ?disabled=${this.disabled}
              ?checked=${this.checked}
              ?invalid=${this.invalid}
              @click=${this._handleInputClick}
            ></sgds-radio>`
          : nothing}
        <div class=${classMap({ "tile-container": true, stacked: this.stacked })}>
          <slot name="icon"></slot>
          <div class="tile-text">
            <slot name="title"></slot>
            <slot name="description"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

export type TileVariant = "checkbox" | "radio";

export default SgdsTile;
