import { Collapse } from "bootstrap";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";
import SgdsElement from "../../base/sgds-element";
import genId from "../../utils/generateId";
import styles from "./sgds-sidenav-item.scss";

/**
 *
 * @event sgds-toggle - Emitted when the dropdown is clicked.
 *
 * @slot - default slot for SgdsSidenavLink element.
 * @slot title - title slot for the content of SgdsSidenavItem's button / anchor element.
 * @slot icon - icon slot for the content of SgdsSidenavItem's button / anchor element.
 *
 * @cssproperty --sidenav-item-button-border-left-width - sidenav item left border width
 * @cssproperty --sidenav-item-padding-x - sidenav item padding left and right
 * @cssproperty --sidenav-item-padding-y - sidenav item padding top and bottom
 * @cssproperty --sidenav-item-icon-title-gap - the flex gap between sidenav item icon and title
 */

export class SgdsSidenavItem extends SgdsElement {
  static styles = [SgdsElement.styles, styles];

  /** @internal */
  private myCollapse: Ref<HTMLElement> = createRef();
  /** @internal */
  private bsCollapse: Collapse = null;

  /**
   *  when true, toggles the sidenav-item to open on first load and set the active stylings.
   */
  @property({ type: Boolean })
  active = false;

  /**
   *  When defined, converts SgdsSidenavItem from a button element to an Anchor element. In this case, only one level of navigation is allowed
   */
  @property({ type: String })
  href = "";

  /**
   * Disables the SgdsSidenavItem
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * @internal Forwards to id attribute of div.collapse and aria-controls attribute of button in SgdsSidenavItem. By default, SgdsSidenavItem auto-generates a unique id. Override the default id by specifiying your own
   */

  private collapseId: string = genId("sidenav", "collapse");

  /**
   * @internal Forwards to id attribute of button and aria-labelledby attribute of ul.sidenav-list in SgdsSidenavItem. By default, SgdsSidenavItem auto-generates a unique id. Override the default id by specifiying your own
   */
  private buttonId: string = genId("sidenav", "button");

  /** @internal */
  private index = "-1";

  private _onClick() {
    this.emit("sgds-toggle", { detail: { index: this.index } });
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
   * When invoked, closes the SgdsSidenavItem
   */
  public closeItem() {
    this.active = false;
    if (this.bsCollapse) this.bsCollapse.hide();
  }
  /**
   * When invoked, opens the SgdsSidenavItem
   */
  public openItem() {
    this.active = true;
    if (this.bsCollapse) this.bsCollapse.show();
  }

  firstUpdated() {
    // if sidenav has menu, initialise bootstrap collapse
    if (!this.href) {
      this.bsCollapse = new Collapse(this.myCollapse.value, {
        toggle: this.active
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
        class="collapsed sidenav-btn ${classMap({
          disabled: this.disabled,
          active: this.active
        })} "
        aria-expanded="${this.active}"
        aria-controls="${this.collapseId}"
        aria-selected="${this.active}"
        id="${this.buttonId}"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
      >
        <slot name="icon"></slot>
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
        class="sidenav-btn ${classMap({
          disabled: this.disabled,
          active: this.active
        })} "
        aria-selected="${this.active}"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? "true" : "false"}
      >
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </a>
    `;
    return html`
      <li class="sidenav-item" aria-haspopup="${!this.href}">${this.href ? noMenuTemplate : withMenuTemplate}</li>
    `;
  }
}

export default SgdsSidenavItem;
