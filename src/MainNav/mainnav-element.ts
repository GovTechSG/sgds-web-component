import { LitElement, html, PropertyValueMap } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import styles from "./mainnav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import genId from "../utils/generateId";
import { ResizeController } from "@lit-labs/observers/resize_controller.js";
// >576px, >768px, >992, >1200, >1400
type Size = "sm" | "md" | "lg" | "xl" | "xxl" | 'always' | 'never';
export const SM_BREAKPOINT = 576
export const MD_BREAKPOINT = 768
export const LG_BREAKPOINT = 992
export const XL_BREAKPOINT = 1200
export const XXL_BREAKPOINT = 1400

const SIZES = {
  sm: SM_BREAKPOINT,
  md: MD_BREAKPOINT,
  lg: LG_BREAKPOINT,
  xl: XL_BREAKPOINT,
  XXL: XXL_BREAKPOINT
}
@customElement("mainnav-element")
export class MainNavElement extends LitElement {
  @query(".navbar-toggler") togglerElement: HTMLButtonElement;

  static styles = styles;

  private myCollapse: Ref<HTMLElement> = createRef();
  private bsCollapse: Collapse = null;

  private _onClickButton() {
    this.bsCollapse.toggle();
  }

  @property({ type: String })
  brandHref = "";

  @property({ type: String })
  collapseId = genId("mainnav", "collapse");

  @property()
  expand: Size = "lg";

  @property({ type: String })
  navClasses = "";

  @state()
  expanded: Boolean = false;

  firstUpdated() {
    this.bsCollapse = new Collapse(this.myCollapse.value, {
      toggle: false,
    });
    this.myCollapse.value.addEventListener("show.bs.collapse", () => {
      console.log("show");
      this.expanded = true;
    });
    this.myCollapse.value.addEventListener("shown.bs.collapse", () => {
      console.log("shown");
      this.expanded = true;
    });
    this.myCollapse.value.addEventListener("hide.bs.collapse", () => {
      console.log("hide");
      this.expanded = false;
    });
    this.myCollapse.value.addEventListener("hidden.bs.collapse", () => {
      console.log("hidden");
      this.expanded = false;
    });
  }
  _resizeController = new ResizeController(this, {callback: (e) => console.log(e)});


  render() {

   const breakpointReached = this.offsetWidth < SIZES[this.expand.toString()]
   console.log(this.offsetWidth)
   console.log({breakpointReached})
    return html`
          <nav
        class="sgds navbar navbar-light
        ${this._expandClass()} ${this.navClasses}"
      >
        <a class="navbar-brand ${breakpointReached && "me-auto"}" href=${this.brandHref}>
          <slot name="brand"></slot>
        </a>
        <!-- <slot name="non-collapsible" class="${breakpointReached ? 'order-2': 'order-5'}"></slot> -->
       ${breakpointReached ? html`<slot name="non-collapsible"></slot>` : null} 
        <button
          class="navbar-toggler"
          type="button"
          @click=${() => this._onClickButton()}
          aria-controls="${this.collapseId}"
          aria-expanded="${this.expanded}"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          ${ref(this.myCollapse)}
          id=${this.collapseId}
        >
          <ul class="navbar-nav">
            <slot></slot>
          </ul>
        </div>
        ${breakpointReached? html`<slot name="non-collapsible"></slot>` : null} 

      </nav>
    `;
  }
  _expandClass() {
    if (this.expand === "always") {
      return "navbar-expand";
    }
    if (this.expand === "never") {
      return 
    }
    return `navbar-expand-${this.expand}`;
  }
}

export default MainNavElement;
