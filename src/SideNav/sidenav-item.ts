import { LitElement, html, PropertyDeclaration } from "lit";
import {
  customElement,
  property,
  state,
  queryAssignedElements,
} from "lit/decorators.js";
import styles from "./sidenav-item.scss";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Collapse } from "bootstrap";
import "./sidenav-link";
@customElement("sidenav-item")
export class SideNavItem extends LitElement {
  static styles = styles;

  myCollapse: Ref<HTMLElement> = createRef();
  bsCollapse: Collapse = null;

  @property()
  title = "";

  private index = "-1";

  /** when true, toggles the sidenav-item to open on first load. Sets the initial active state which controls the active css of the button.
   */
  @property({ type: Boolean })
  visible = false;

  @state()
  active = this.visible;

  @property({ type: String })
  collapseId = "";

  @property({ type: String })
  href = "";

  _onClick() {
    const event = new CustomEvent("openEventOnClick", {
      bubbles: true,
      composed: true,
      detail: { index: this.index },
    });
    this.dispatchEvent(event);   
  }
  _onClickButton () {
    this._onClick()
    if (this.bsCollapse) {
      this.bsCollapse.toggle();
    }
  }
  _onClickLink () {
    this._onClick()
    this.active = true
  }

  /**
   * closeItem
   */
  public closeItem() {
    this.active = false
    if (this.bsCollapse) this.bsCollapse.hide();
  }
  /**
   * openItem
   */
  public openItem() {
    this.active = true
    if (this.bsCollapse) this.bsCollapse.show();
  }

  async firstUpdated() {
    if (!this.href) {
      this.bsCollapse = new Collapse(this.myCollapse.value, {
        toggle: this.visible,
      });

      this.myCollapse.value.addEventListener("show.bs.collapse", () => {
        this.active = true;
      });
      this.myCollapse.value.addEventListener("shown.bs.collapse", () => {
        this.active = true;
      });
      this.myCollapse.value.addEventListener("hide.bs.collapse", () => {
        this.active = false;
      });
      this.myCollapse.value.addEventListener("hidden.bs.collapse", () => {
        this.active = false;
      });
    }
  }

  render() {
    const withMenuTemplate = html` <button
        @click=${() => this._onClickButton()}
        class="collapsed sidenav-btn ${this.active ? "active" : null}"
      >
        ${this.title}
        <i class="bi bi-chevron-down"></i>
      </button>
      <div class="collapse" ${ref(this.myCollapse)} id="${this.collapseId}">
        <ul class="sidenav-list">
          <slot></slot>
        </ul>
      </div>`;

    const noMenuTemplate = html`
      <a
        href=${this.href}
        @click=${() => this._onClickLink()}
        class="sidenav-btn ${this.active ? "active" : null}"
      >
        ${this.title}
      </a>
    `;
    return html`
      <li class="sidenav-item">
        ${this.href ? noMenuTemplate : withMenuTemplate}
      </li>
    `;
  }
}
