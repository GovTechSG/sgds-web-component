import { html } from "lit";
import { property, query } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import tabStyle from "./tab.css";
import { watch } from "../../utils/watch";

let id = 0;
/**
 * @summary Tabs are used within tab group to activate the tab panels
 *
 * @slot default - The slot for label of tab
 * @slot icon - The slot to place leading icon.
 *
 */
export class SgdsTab extends SgdsElement {
  static styles = [tabStyle];
  @query(".tab") private tab: HTMLElement;
  private readonly attrId = ++id;
  private readonly componentId = `sgds-tab-${this.attrId}`;

  /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
  @property({ reflect: true }) panel = "";

  /** Draws the tab in an active state. When used with tab group, this state is already managed. Use it to set the initial active tab on first load of page */
  @property({ type: Boolean, reflect: true }) active = false;
  /** When true, sets tab to disabled state */
  @property({ type: Boolean, reflect: true }) disabled = false;

  connectedCallback() {
    super.connectedCallback();
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels

    this.id = this.id.length > 0 ? this.id : this.componentId;
    this.setAttribute("role", "tab");
  }

  /** Sets focus to the tab. */
  public focus(options?: FocusOptions) {
    (this.shadowRoot?.querySelector(".tab") as HTMLElement)?.focus(options);
  }

  /** Removes focus from the tab. */
  public blur() {
    this.tab.blur();
  }

  /**@internal */
  @watch("active")
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  /**@internal */
  @watch("disabled")
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
    if (this.disabled) this.active = false;
  }

  render() {
    return html`
      <div data-testid="inner-tab" tabindex=${this.disabled ? "-1" : "0"} class="tab">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `;
  }
}

export default SgdsTab;
