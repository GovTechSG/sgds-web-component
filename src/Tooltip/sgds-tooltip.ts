import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-tooltip.scss";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Tooltip } from "bootstrap";
import genId from "../utils/generateId";

@customElement("sgds-tooltip")
export class SgdsTooltip extends SgdsElement {
  static styles = styles;

  myTooltip: Ref<HTMLElement> = createRef();
  bsTooltip: Tooltip = null;

  firstUpdated() {
    this.bsTooltip = new Tooltip(this.myTooltip.value, {
      trigger: "manual",
      title: "hello world",
    });
    this.myTooltip.value.addEventListener("show.bs.tooltip", () => {
      //   this.active = true;
      console.log("show");
    });
    this.myTooltip.value.addEventListener("shown.bs.tooltip", () => {
      //   this.active = true;
      console.log("shown");
    });
    this.myTooltip.value.addEventListener("hide.bs.tooltip", () => {
      //   this.active = false;
      console.log("hide");
    });
    this.myTooltip.value.addEventListener("hidden.bs.tooltip", () => {
      //   this.active = false;
      console.log("hidden");
    });
  }
  _onClickButton() {
    this.bsTooltip.toggle();
  }

  render() {
    return html`
      <div ${ref(this.myTooltip)}>
        <button @mouseenter=${() => this.bsTooltip.toggle()} @mouseleave=${() => this.bsTooltip.toggle()}>hover me</button>
      </div>
    `;
  }
}
//    <div >
// <div class="tooltip-arrow"></div>
// <div class="tooltip-inner">This is a sample Tooltip</div>
// </div>
