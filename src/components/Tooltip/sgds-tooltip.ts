import type { Options as PopperOptions } from "@popperjs/core";
import Tooltip from "bootstrap/js/src/tooltip";
import type { Tooltip as BsTooltip } from "bootstrap";

import { html } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import SgdsElement from "../../base/sgds-element";
import tooltipStyle from "./tooltip.css";
/**
 * @summary Tooltips display more information when users hover over, focus on, or interact with an element.
 * @slot default - The element to target the tooltip to.
 *
 * @cssproperty --tooltip-max-width - The max width of tooltip
 *
 */
export class SgdsTooltip extends SgdsElement {
  static styles = [...SgdsElement.styles, tooltipStyle];

  private myTooltip: Ref<HTMLElement> = createRef();

  private bsTooltip: BsTooltip = null;

  /** The tooltip's content. Content has to be textual */
  @property({ type: String })
  content = "";
  /** The placement of tooltip relative to its target */
  @property({ type: String })
  placement: "top" | "bottom" | "left" | "right" = "top";
  /** The method to invoke the tooltip. `hover focus` is the default value which allows tooltip to be triggered via mouse hover and keyboard focus. Add `tabindex=0 `for HTMLelements that are not tabbable. */
  @property({ type: String })
  trigger: "click" | "hover" | "focus" | "hover focus" = "hover focus";

  /**@internal */
  @state()
  private popperConfig: Partial<PopperOptions>;
  /**@internal */

  private tooltipConfig: Partial<BsTooltip.Options>;
  /**@internal */
  @queryAssignedElements()
  private tooltipTargetElements: Array<HTMLElement>;

  private _handleSlotChange(): void {
    // For a11y purpose
    this.tooltipTargetElements.forEach(el => el.setAttribute("data-sgds-tooltip", this.content));
  }

  private _handleClickOutOfElement(e: MouseEvent | TouchEvent, self: SgdsTooltip) {
    if (!e.composedPath().includes(self)) {
      this.hide();
    }
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.trigger === "click") {
      document.addEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this));
      document.addEventListener("touchstart", (event: TouchEvent) => this._handleClickOutOfElement(event, this));
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener("click", (event: MouseEvent) => this._handleClickOutOfElement(event, this));
    document.removeEventListener("touchstart", (event: TouchEvent) => this._handleClickOutOfElement(event, this));
  }

  private initializeTooltip() {
    this.tooltipConfig = {
      popperConfig: (defaultConfig?: Partial<PopperOptions>) => {
        this.popperConfig = defaultConfig;
        const defaultModifiers = defaultConfig.modifiers;
        const newModifiers = defaultModifiers.map(mod => {
          if (mod.name === "flip") {
            mod.options.fallbackPlacements = [];
          }
          return mod;
        });
        this.popperConfig.modifiers = newModifiers;
        return this.popperConfig;
      },
      placement: this.placement,
      trigger: this.trigger,
      title: this.content,
      html: true,
      container: this.shadowRoot.querySelector("div") // tooltip to appear inside the shadow root of sgds-tooltip instead of anywhere in the DOM, so that scoped styles can apply
    } as Partial<BsTooltip.Options>;
    this.bsTooltip = new Tooltip(this.myTooltip.value, this.tooltipConfig);
  }

  firstUpdated() {
    this.initializeTooltip();
    this.myTooltip.value.addEventListener("show.bs.tooltip", () => {
      this.emit("sgds-show");
    });
    this.myTooltip.value.addEventListener("shown.bs.tooltip", () => {
      this.emit("sgds-after-show");
    });
    this.myTooltip.value.addEventListener("hide.bs.tooltip", () => {
      this.emit("sgds-hide");
    });
    this.myTooltip.value.addEventListener("hidden.bs.tooltip", () => {
      this.emit("sgds-after-hide");
    });
  }
  /** Hides the Tooltip */
  public hide() {
    this.bsTooltip.hide();
  }
  /** Shows the Tooltip */
  public show() {
    this.bsTooltip.show();
  }

  render() {
    return html`
      <div ${ref(this.myTooltip)}>
        <slot @slotchange=${this._handleSlotChange}></slot>
      </div>
    `;
  }
}

export default SgdsTooltip;
