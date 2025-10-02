import { html, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import optionStyles from "./option.css";
import SgdsElement from "./sgds-element";

export class OptionElement extends SgdsElement {
  static styles = [optionStyles];
  /**
   * @internal when true, sets the active stylings.
   * This property is controlled by its nearest parent e.g. Select or Combo box
   */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Disables the Item */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** The value of the option item */
  @property({ type: String }) value: string;

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute("role", "menuitem");
    this.setAttribute("aria-disabled", `${this.disabled}`);
  }
  render() {
    const classes = {
      disabled: this.disabled,
      active: this.active
    };
    return html`
      <div class="dropdown-item ${classMap(classes)}" tabindex=${this.disabled ? "-1" : "0"}>
        ${this._renderItemContent()}
      </div>
    `;
  }

  protected declare _renderItemContent: () => TemplateResult<1>;
}
