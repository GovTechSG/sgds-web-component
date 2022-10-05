import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-sidenav-item.scss";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Collapse } from "bootstrap";
import genId from "../utils/generateId";
@customElement("sgds-sidenav-item")
export class SgdsSidenavItem extends SgdsElement {
  static styles = styles;

  private myCollapse: Ref<HTMLElement> = createRef();
  private bsCollapse: Collapse = null;

  /**  when true, toggles the sidenav-item to open on first load and
   * set the active stylings.
   */
  @property({ type: Boolean })
  active = false;

  @property({ type: String })
  href = "";

  @property({ type: String })
  collapseId = genId('sidenav','collapse');

  @property({ type: String })
  buttonId = genId('sidenav','button');

  private index = "-1";

  private _onClick() {
    this.emit('sgds-toggle', {detail : {index: this.index}})
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
   * closeItem - closes sidenav and inactivates it
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
    // if sidenav has menu, initialise bootstrap collapse
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
        aria-expanded="${this.active}" 
        aria-controls="${this.collapseId}"
        aria-selected="${this.active}"
        id="${this.buttonId}"
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
      <div class="collapse" ${ref(this.myCollapse)} id="${this.collapseId}">
        <ul class="sidenav-list" aria-labelledby="${this.buttonId}">
          <slot></slot>
        </ul>
      </div>`;

    const noMenuTemplate = html`
      <a
        href=${this.href}
        @click=${() => this._onClickLink()}
        class="sidenav-btn ${this.active ? "active" : null}"
        aria-selected="${this.active}"
        >
        <slot name="title"></slot>
      </a>
    `;
    return html`
      <li class="sidenav-item" aria-haspopup="${!this.href}">
        ${this.href ? noMenuTemplate : withMenuTemplate}
      </li>
    `;
  }
}