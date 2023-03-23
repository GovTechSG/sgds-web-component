import { html } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Tooltip } from "bootstrap";
import styles from "./sgds-tooltip.scss";
import * as Popper from "@popperjs/core";
@customElement("sgds-tooltip")
export class SgdsTooltip extends SgdsElement {
  static styles = styles;

  myTooltip: Ref<HTMLElement> = createRef();
  bsTooltip: Tooltip = null;

  @property({ type: String })
  content = "";
  @property({ type: Array })
  offset: [number, number] = [0, 0];

  @property({ type: String })
  placement: "top" | "bottom" | "left" | "right" = "top";

  @property({ type: String })
  trigger: "click" | "hover" | "focus" | "hover focus" = "hover focus";

  private closableContainer: HTMLElement;

  firstUpdated() {
    // refer to Bootstrap's Tooltip options
    // Feature: Add close button when prop trigger === 'click'
    //useless to modify the "template" as BsTooltip "title" option will override anything that is within .tooltip-inner
    //HTML method insertAdjacentText() is use to add the text content before close button but it requires a parent
    // Only way is to modify BsTooltip's title with "sanitize: false" to add the close button
    // When trigger is a "click", tooltipContainer will be created and modify BsTooltip's "title", adding a close button
    if (this.trigger === "click") {
      this.closableContainer = document.createElement("div");
      this.closableContainer.classList.add("d-flex");
      this.closableContainer.classList.add("gap-5");
      let closeBtn: HTMLButtonElement = document.createElement("button");
      closeBtn.classList.add("btn-close");
      closeBtn.classList.add("btn-close-white");
      closeBtn.setAttribute("aria-label", "Close");
      this.closableContainer.appendChild(closeBtn);
      this.closableContainer.insertAdjacentText("afterbegin", this.content);

      this.shadowRoot
        .querySelector(".btn-close")
        ?.addEventListener("click", () => this.closeTooltip());
    }

    this.bsTooltip = new Tooltip(this.myTooltip.value, {
      popperConfig: (defaultConfig?: Partial<Popper.Options>) => {
        const defaultModifiers = defaultConfig.modifiers;
        const newModifiers = defaultModifiers.map((mod) => {
          if (mod.name === "flip") {
            mod.options.fallbackPlacements = [];
          }
          return mod;
        });
        defaultConfig.modifiers = newModifiers;
        defaultConfig.placement = this.placement;
        return defaultConfig;
      },
      trigger: this.trigger,
      title: this.trigger === "click" ? this.closableContainer : this.content,
      html: true,
      offset: this.offset,
      sanitize: false, // to allow button element,
      container: this.shadowRoot.querySelector("div"), // tooltip to appear inside the shadow root of sgds-tooltip instead of anywhere in the DOM, so that scoped styles can apply
    } as Partial<Tooltip.Options>);

    this.myTooltip.value.addEventListener("show.bs.tooltip", () => {
      this.emit("sgds-show");
    });
    this.myTooltip.value.addEventListener("shown.bs.tooltip", () => {
      this.emit("sgds-shown");
    });
    this.myTooltip.value.addEventListener("hide.bs.tooltip", () => {
      this.emit("sgds-hide");
    });
    this.myTooltip.value.addEventListener("hidden.bs.tooltip", () => {
      this.emit("sgds-hidden");
    });
  }

  closeTooltip() {
    this.bsTooltip.hide();
  }

  render() {
    return html`
      <div ${ref(this.myTooltip)}>
        <slot></slot>
      </div>
    `;
  }
}
