import { html } from "lit";
import { query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import LinkElement from "../../base/link-element";
/**
 * @summary `SgdsDropdownItem` are navigation links built with `HTMLAnchorElement`. It should be used in the default slot of `SgdsDropdown`
 */
export class SgdsDropdownItem extends LinkElement {
  static styles = [LinkElement.styles];

  /**@internal */
  @query("a")
  private anchor: HTMLElement;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        this.anchor.click();
      }
    });
  }

  render() {
    return html`
      <li>
        <a
          href="${this.href}"
          class="dropdown-item ${classMap({
            disabled: this.disabled,
            active: this.active
          })}"
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? "true" : "false"}
          role="menuitem"
          tabindex=${this.disabled ? "-1" : "0"}
          target=${this.target}
          ><slot></slot
        ></a>
      </li>
    `;
  }
}

export default SgdsDropdownItem;
