import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./mainnav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import genId from "../utils/generateId";

type Size = "sm" | "md" | "lg" | "xl" | "xxl";

@customElement("mainnav-element")
export class MainNavElement extends LitElement {
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
  expand: Boolean | Size = "lg";

  @property({ type: String })
  navClasses = "";

  @state()
  expanded: Boolean = false;

  firstUpdated() {
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

  render() {
    return html`
      <nav
        class="sgds navbar navbar-light
        ${this._expandClass()} ${this.navClasses}"
      >
        <a class="navbar-brand" href=${this.brandHref}>
          <slot name="brand"></slot>
        </a>
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
      </nav>
    `;
  }
  _expandClass() {
    if (typeof this.expand === "boolean") {
      return this.expand && "navbar-expand";
    }
    return `navbar-expand-${this.expand}`;
  }
}

export default MainNavElement;
