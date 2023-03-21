import { html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Tooltip } from "bootstrap";

@customElement("sgds-tooltip")
export class SgdsTooltip extends SgdsElement {
  myTooltip: Ref<HTMLElement> = createRef();
  bsTooltip: Tooltip = null;

  @query('.tooltip-inner') tooltipInner: HTMLDivElement

  @property({ type: String })
  content = "hello";
  @property({ type: Array })
  offset: [number, number] = [0,0];

  @property({ type: String })
  placement: "top" | "bottom" | "left" | "right" = "top";

  @property({ type: String })
  trigger: "click" | "hover" | "focus" | "hover focus" = "hover focus";

  firstUpdated() {
    this.bsTooltip = new Tooltip(this.myTooltip.value, {
      trigger: this.trigger,
      title: this.content,
      placement: this.placement,
      offset:this.offset,
      html: true
    });
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
  closeTooltip(){
    this.bsTooltip.hide()
  }
  updated() {
    if (this.trigger === 'click') {
      console.log('hello')
      let closeBtn : HTMLButtonElement  = document.createElement('button')
      closeBtn.classList.add('btn-close')
      closeBtn.classList.add('btn-close-white')
      this.bsTooltip.setContent({ '.tooltip-inner': closeBtn })

      console.log(this.tooltipInner.shadowRoot.innerHTML)
      this.tooltipInner.insertAdjacentElement("beforeend", closeBtn)
    }
  }
  render() {

    return html`
      <span ${ref(this.myTooltip)}>
        <slot></slot>
      </span>
    `;
  }
}
