import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, shimKeyframesHeightAuto, stopAnimations } from "../../utils/animate";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry";
import { waitForEvent } from "../../utils/event";
import genId from "../../utils/generateId";
import { watch } from "../../utils/watch";
import styles from "./sgds-sidenav-item.scss?inline";

/**
 *
 * @event sgds-toggle - Emitted when the sidenav item's button is clicked.
 * @event sgds-show - Emitted on show.
 * @event sgds-after-show - Emitted on show after animation has completed.
 * @event sgds-hide - Emitted on hide.
 * @event sgds-after-hide - Emitted on hide after animation has completed.
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
  static styles = [styles];

  @query(".sidenav-body") body: HTMLElement;
  /** @internal */
  @query(".sidenav-btn") header: HTMLElement;
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

  private _onToggle() {
    this.emit("sgds-toggle", { detail: { index: this.index } });
  }

  private _onClickLink() {
    this._onToggle();
    this.active = true;
  }

  /** Shows the sidenav item. */
  public async show() {
    if (this.active) {
      return;
    }

    this.active = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hide the sidenav item */
  public async hide() {
    if (!this.active) {
      return;
    }
    this.active = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  /**
   * @deprecated since 1.1. Will be removed in 2.0 and replaced by hide.
   * When invoked, closes the SgdsSidenavItem
   */
  public async closeItem() {
    return await this.hide();
  }
  /**
   * @deprecated since 1.1. Will be removed in 2.0 and replaced by show.
   * When invoked, opens the SgdsSidenavItem
   */
  public async openItem() {
    return await this.show();
  }

  firstUpdated() {
    if (!this.href) {
      this.body.hidden = !this.active;
      this.body.style.height = this.active ? "auto" : "0";
    }
  }
  private _handleSummaryClick() {
    if (this.active) {
      this.hide();
    } else {
      this.show();
    }

    this._onToggle();
    this.header.focus();
  }
  private _handleSummaryKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();

      if (this.active) {
        this.hide();
      } else {
        this.show();
      }
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      this.hide();
    }

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      this.show();
    }
  }

  @watch("active", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.href) return;
    if (this.active) {
      // Show
      const sgdsShow = this.emit("sgds-show", { cancelable: true });
      if (sgdsShow.defaultPrevented) {
        this.active = false;
        return;
      }

      await stopAnimations(this.body);
      this.body.hidden = false;

      const { keyframes, options } = getAnimation(this, "sidenav.show");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.style.height = "auto";

      this.emit("sgds-after-show");
    } else {
      // Hide
      const sgdsHide = this.emit("sgds-hide", { cancelable: true });
      if (sgdsHide.defaultPrevented) {
        this.active = true;
        return;
      }

      await stopAnimations(this.body);

      const { keyframes, options } = getAnimation(this, "sidenav.hide");
      await animateTo(this.body, shimKeyframesHeightAuto(keyframes, this.body.scrollHeight), options);
      this.body.hidden = true;
      this.body.style.height = "auto";

      this.emit("sgds-after-hide");
    }
  }

  render() {
    const withMenuTemplate = html` <button
        @click=${this._handleSummaryClick}
        @keydown=${this._handleSummaryKeyDown}
        class="sidenav-btn ${classMap({
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
      <div class="sidenav-body" id="${this.collapseId}">
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
setDefaultAnimation("sidenav.show", {
  keyframes: [
    { height: "0", opacity: "0" },
    { height: "auto", opacity: "1" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});

setDefaultAnimation("sidenav.hide", {
  keyframes: [
    { height: "auto", opacity: "1" },
    { height: "0", opacity: "0" }
  ],
  options: { duration: 200, easing: "ease-in-out" }
});
export default SgdsSidenavItem;
