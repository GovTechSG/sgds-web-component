import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sgds-mainnav.scss";
import { Collapse, Offcanvas } from "bootstrap";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import genId from "../utils/generateId";
import SgdsElement from "../utils/sgds-element";
import {
  SM_BREAKPOINT,
  MD_BREAKPOINT,
  LG_BREAKPOINT,
  XL_BREAKPOINT,
  XXL_BREAKPOINT,
} from "../utils/breakpoints";
import { classMap } from "lit/directives/class-map.js";

export type MainnavExpandSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "always"
  | "never";

const SIZES = {
  sm: SM_BREAKPOINT,
  md: MD_BREAKPOINT,
  lg: LG_BREAKPOINT,
  xl: XL_BREAKPOINT,
  XXL: XXL_BREAKPOINT,
  never: Infinity,
  always: -1,
};
@customElement("sgds-mainnav")
export class SgdsMainnav extends SgdsElement {
  static styles = styles;

  constructor() {
    super();
    window.addEventListener("resize", () => {
      const newBreakpointReachedValue =
        window.innerWidth < SIZES[this.expand.toString()];
      if (newBreakpointReachedValue !== this.breakpointReached) {
        this.requestUpdate();
      }
    });
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
  expand: MainnavExpandSize = "lg";

  @property({ type: String })
  mode: "offcanvas" | "default" = "default";

  @state()
  breakpointReached: Boolean = false;

  @state()
  expanded: Boolean = false;

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

  render() {
    this.breakpointReached = window.innerWidth < SIZES[this.expand.toString()];
    const collapseClass = "collapse navbar-collapse order-4";
    const offcanvasClass = "offcanvas offcanvas-start order-4";
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
          class="${this.breakpointReached ? "order-2" : "order-5"}"
        ></slot>
        <button
          class="navbar-toggler order-3"
          type="button"
          @click=${() => this._onClickButton()}
          aria-controls="${this.collapseId}"
          aria-expanded="${this.expanded}"
          aria-label="Toggle navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
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
            <slot name="end" class=${classMap({"slot-end": !this.breakpointReached})}></slot>
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

export default SgdsMainnav;
