import { html } from "lit";
import { property, query, queryAssignedNodes } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import FormCheckElement from "../../base/form-check-element";
import SgdsElement from "../../base/sgds-element";
import { defaultValue } from "../../utils/defaultvalue";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import formLabelStyles from "../../styles/form-label.css";
import switchStyle from "./switch.css";

/**
 * @summary Switch component is used to toggle on and off or yes or no action.
 *
 * @slot default - The default label of switch on the right side of the switch
 * @slot leftLabel - The label on the left side of the switch
 *
 * @event sgds-change - Emitted when the checked state changes.
 *
 */
export class SgdsSwitch extends SgdsElement {
  static styles = [...FormCheckElement.styles, formLabelStyles, switchStyle];

  /** The size of the switch. By default, it is small size */
  @property({ reflect: true, type: String }) size: "sm" | "md" | "lg" = "md";
  /** When enabled, icon appears in the switch */
  @property({ reflect: true, type: Boolean }) icon = false;

  /**@internal */
  @query('input[type="checkbox"]') input: HTMLInputElement;

  // /** For aria-label when there is no appropriate text label visible */
  // @property({ type: String, reflect: true }) ariaLabel: string;

  /** Draws the switch in a checked state. */
  @property({ type: Boolean, reflect: true }) checked = false;

  /** Disables the switch (so the user can't check / uncheck it). */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Gets or sets the default value used to reset this element. The initial value corresponds to the one originally specified in the HTML that created this element. */
  @defaultValue("checked")
  defaultChecked = false;

  /** Simulates a click on the switch. */
  public click() {
    this.input.click();
  }
  /** Sets focus on the switch. */
  public focus(options?: FocusOptions) {
    this.input.focus(options);
  }

  /** Removes focus from the switch. */
  public blur() {
    this.input.blur();
  }

  private _handleChange() {
    this.checked = !this.checked;
    this.emit("sgds-change", { detail: { checked: this.checked } });
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      this.click();
    }
  }

  /** @internal For Id/For pair of the HTML form control and label. */
  private _inputId = genId("switch");

  /** @internal */
  @watch("disabled", { waitUntilFirstUpdate: true })
  _handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    this.input.disabled = this.disabled;
  }
  @queryAssignedNodes({ slot: "leftLabel", flatten: true })
  private _leftIconNodes!: Array<Node>;

  firstUpdated() {
    if (this._leftIconNodes.length === 0) {
      return this.shadowRoot.querySelector(".form-check-label.left-label")?.classList.add("d-none");
    }
  }

  render() {
    return html`
      <div class="form-check">
        <label for="${this._inputId}" class="form-check-label left-label"><slot name="leftLabel"></slot></label>
        <input
          class=${classMap({
            "form-check-input": true
          })}
          type="checkbox"
          id=${this._inputId}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          aria-disabled=${this.disabled ? "true" : "false"}
          aria-checked=${this.checked ? "true" : "false"}
          @change=${this._handleChange}
          @keydown=${this._handleKeyDown}
        />
        <label for="${this._inputId}" class="form-check-label"><slot></slot></label>
      </div>
    `;
  }
}

export default SgdsSwitch;
