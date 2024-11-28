import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import tabStyle from "./tab.css";

let id = 0;
/**
 * @summary Tabs are used within tab group to activate the tab panels
 *
 * @slot default - The content of the tab. This is  available when variant attribute of `sgds-tab-group` is not specified or when it is `tabs-basic-toggle`
 *
 * @slot icon - The slot to place svg icons. This is only available when variant attribute of `sgds-tab-group` is `tabs-info-toggle`
 * @slot label - The slot for label of tab. This is only available when variant attribute of `sgds-tab-group` is `tabs-info-toggle`
 *
 * @csspart base - The base wrapper of tab
 *
 *
 */
export class SgdsTab extends SgdsElement {
  static styles = [tabStyle];
  /**@internal */
  @query(".tab") tab: HTMLElement;
  /**@internal */
  private readonly attrId = ++id;
  /**@internal */
  private readonly componentId = `sgds-tab-${this.attrId}`;

  /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
  @property({ reflect: true }) panel = "";

  /** Draws the tab in an active state. When used with tab group, this state is already managed. Use it to set the initial active tab on first load of page */
  @property({ type: Boolean, reflect: true }) active = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ reflect: true, attribute: true }) variant: "underlined" | "solid";
  @property({ type: String, reflect: true }) orientation: "horizontal" | "vertical";

  @property({ type: String, reflect: true }) density: "default" | "compact" = "default";

  connectedCallback() {
    super.connectedCallback();
  }
  /** Sets focus to the tab. */
  public focus(options?: FocusOptions) {
    (this.shadowRoot?.querySelector(".tab") as HTMLElement)?.focus(options);
  }

  /** Removes focus from the tab. */
  public blur() {
    this.tab.blur();
  }

  render() {
    // If the user didn't provide an ID, we'll set one so we can link tabs and tab panels with aria labels
    this.id = this.id.length > 0 ? this.id : this.componentId;
    //const parentVariantAttr = this.closest("sgds-tab-group").getAttribute("variant");
    //const parentOrientationAttr = this.closest("sgds-tab-group").getAttribute("orientation");

    return html`
      <div
        role="tab"
        data-testid="inner-tab"
        tabindex=${this.disabled ? "-1" : "0"}
        aria-selected=${this.active ? "true" : "false"}
        aria-disabled=${this.disabled ? "true" : "false"}
        class="${classMap({
          tab: true,
          active: this.active,
          disabled: this.disabled,
          variant: this.variant,
          orientation: this.orientation,
          density: this.density
        })}"
      >
        <slot name="icon"></slot>
        <slot name="label"></slot>
      </div>
    `;
  }
}

export default SgdsTab;
