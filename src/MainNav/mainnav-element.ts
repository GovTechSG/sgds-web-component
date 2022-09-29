import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./mainnav.scss";
import { Collapse, Offcanvas } from "bootstrap";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import genId from "../utils/generateId";
import { ResizeController } from "@lit-labs/observers/resize_controller.js";

type Size = "sm" | "md" | "lg" | "xl" | "xxl" | "always" | "never";
export const SM_BREAKPOINT = 576;
export const MD_BREAKPOINT = 768;
export const LG_BREAKPOINT = 992;
export const XL_BREAKPOINT = 1200;
export const XXL_BREAKPOINT = 1400;

const SIZES = {
  sm: SM_BREAKPOINT,
  md: MD_BREAKPOINT,
  lg: LG_BREAKPOINT,
  xl: XL_BREAKPOINT,
  XXL: XXL_BREAKPOINT,
  never: Infinity,
  always: 0,
};
@customElement("mainnav-element")
export class MainNavElement extends LitElement {
  static styles = styles;

  constructor() {
    super();
  }

  private myCollapse: Ref<HTMLElement> = createRef();
  private bsCollapse: Collapse = null;
  // TODO: stylings and slots are incomplete for offcanvas mode 
  private myOffcanvas: Ref<HTMLElement> = createRef();
  private bsOffcanvas: Offcanvas = null;

  private _onClickButton() {
    if (this.mode === "offcanvas") {
      return this.bsOffcanvas.toggle();
    }
    this.bsCollapse.toggle();
  }

  @property({ type: String })
  brandHref = "";

  @property({ type: String })
  collapseId = genId("mainnav", "collapse");

  @property()
  expand: Size = "lg";

  @state()
  expanded: Boolean = false;

  @property({ type: String })
  mode: "offcanvas" | "default" = "default";

  firstUpdated() {
    if (this.mode === "default") {
      this.bsCollapse = new Collapse(this.myCollapse.value, {
        toggle: false,
      });
      this.myCollapse.value.addEventListener("show.bs.collapse", () => {
        this.expanded = true;
      });
      this.myCollapse.value.addEventListener("shown.bs.collapse", () => {
        this.expanded = true;
      });
      this.myCollapse.value.addEventListener("hide.bs.collapse", () => {
        this.expanded = false;
      });
      this.myCollapse.value.addEventListener("hidden.bs.collapse", () => {
        this.expanded = false;
      });
    }

    if (this.mode === "offcanvas") {
      this.bsOffcanvas = new Offcanvas(this.myOffcanvas.value);
      //add esc keyboard event for bsOffcanvas
      this.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape") {
          this.bsOffcanvas.hide();
        }
      });
    }
  }
  // Detects changes in element size and runs update
  _resizeController = new ResizeController(this, {});

  render() {
    const breakpointReached = this.offsetWidth < SIZES[this.expand.toString()];
    const collapseClass = "collapse navbar-collapse order-4";
    const offcanvasClass = "offcanvas offcanvas-start";
    return html`
      <nav
        class="sgds navbar navbar-light
        ${this._expandClass()}"
      >
        <a class="navbar-brand me-auto order-1" href=${this.brandHref}>
          <slot name="brand"></slot>
        </a>
        <slot
          name="non-collapsible"
          class="${breakpointReached ? "order-2" : "order-5"}"
        ></slot>
        <button
          class="navbar-toggler order-3"
          type="button"
          @click=${() => this._onClickButton()}
          aria-controls="${this.collapseId}"
          aria-expanded="${this.expanded}"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class=${this.mode === "default" ? collapseClass : offcanvasClass}
          ${this.mode === "default"
            ? ref(this.myCollapse)
            : ref(this.myOffcanvas)}
          id=${this.collapseId}
        >
          <ul class="navbar-nav">
            <slot></slot>
          </ul>
        </div>
      </nav>
    `;
  }
  _expandClass() {
    switch (this.expand) {
      case "always":
        return "navbar-expand";
      case "never":
        break;
      default:
        return `navbar-expand-${this.expand}`;
    }
  }
}

export default MainNavElement;
