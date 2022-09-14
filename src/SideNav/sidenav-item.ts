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

  /**  when true, toggles the sidenav-item to open on first load and set the active stylings.
   *   If sidenav-item has a truthy href, it sets the active stylings to it.
   */
  @property({ type: Boolean })
  active = false;

  @property({ type: String })
  href = "";

  private _onClick() {
    const event = new CustomEvent("openEventOnClick", {
      bubbles: true,
      composed: true,
      detail: { index: this.index },
    });
    this.dispatchEvent(event);
  }

  private _onClickButton() {
    this._onClick();
    if (this.bsCollapse) {
      this.bsCollapse.toggle();
    }
  }
  private _onClickLink() {
    this._onClick();
    this.active = true;
  }

  /**
   * closeItem
   */
  public closeItem() {
    this.active = false;
    if (this.bsCollapse) this.bsCollapse.hide();
  }
  /**
   * openItem
   */
  public openItem() {
    this.active = true;
    if (this.bsCollapse) this.bsCollapse.show();
  }

  firstUpdated() {
    if (!this.href) {
      this.bsCollapse = new Collapse(this.myCollapse.value, {
        toggle: this.active,
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
        <slot name="title"></slot>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-down"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </button>
      <div class="collapse" ${ref(this.myCollapse)}>
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
      <slot name="title"></slot>
      </a>
    `;
    return html`
      <li class="sidenav-item">
        ${this.href ? noMenuTemplate : withMenuTemplate}
      </li>
    `;
  }
}
