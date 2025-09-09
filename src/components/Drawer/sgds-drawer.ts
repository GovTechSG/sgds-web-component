import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import { animateTo, stopAnimations } from "../../utils/animate.js";
import { getAnimation, setDefaultAnimation } from "../../utils/animation-registry.js";
import { waitForEvent } from "../../utils/event.js";
import { lockBodyScrolling, unlockBodyScrolling } from "../../utils/scroll.js";
import { SM_BREAKPOINT } from "../../utils/breakpoints";
import { watch } from "../../utils/watch.js";
import drawerStyles from "./drawer.css";
import SgdsCloseButton from "../../internals/CloseButton/sgds-close-button";

/**
 * @summary Drawers slide in from a container to expose additional options and information.
 *
 * @slot default - The drawer's main content
 * @slot title - The title of the drawer
 * @slot description - The description of the drawer
 * @slot footer - The footer of the drawer
 *
 * @event sgds-show - Emitted when the drawer opens.
 * @event sgds-after-show - Emitted after the drawer opens and all animations are complete.
 * @event sgds-hide - Emitted when the drawer closes.
 * @event sgds-after-hide - Emitted after the drawer closes and all animations are complete.
 * @event sgds-initial-focus - Emitted when the drawer opens and is ready to receive focus. Calling
 *   `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: 'close-button' | 'keyboard' | 'overlay' }} sgds-request-close - Emitted when the user attempts to
 *   close the drawer by clicking the close button, clicking the overlay, or pressing escape. Calling
 *   `event.preventDefault()` will keep the drawer open. Avoid using this unless closing the drawer will result in
 *   destructive behavior such as data loss.
 *
 */
export class SgdsDrawer extends SgdsElement {
  static styles = [...SgdsElement.styles, drawerStyles];
  /**@internal */
  static dependencies = {
    "sgds-close-button": SgdsCloseButton
  };

  /** @internal */
  private originalTrigger: HTMLElement | null;
  /** @internal */
  @query(".drawer") drawer: HTMLElement;
  /** @internal */
  @query(".drawer-panel") panel: HTMLElement;
  /** @internal */
  @query(".drawer-overlay") overlay: HTMLElement;

  /**
   * Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the drawer's open state.
   */
  @property({ type: Boolean, reflect: true }) open = false;

  /**
   * Defines the size of the drawer panel.
   * For drawers placed on the left or right (`start`/`end`), this controls the drawer's width.
   * For drawers placed on the top or bottom, this controls the drawer's height.
   * Accepts `small`, `medium`, or `large`. Defaults to `small`.
   */
  @property({ type: String, reflect: true }) size: "sm" | "md" | "lg" = "sm";

  /** The direction from which the drawer will open. */
  @property({ type: String, reflect: true }) placement: "top" | "end" | "bottom" | "start" = "end";

  /**
   * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
   * its parent element, set this attribute and add `position: relative` to the parent.
   */
  @property({ type: Boolean, reflect: true }) contained = false;

  @state() private drawerPlacement: "top" | "end" | "bottom" | "start";

  firstUpdated() {
    this.drawer.hidden = !this.open;

    if (this.open) {
      this.addOpenListeners();

      if (!this.contained) {
        lockBodyScrolling(this);
      }
    }

    this._handleResize();
  }

  connectedCallback() {
    super.connectedCallback();

    this.drawerPlacement = this.placement;
    window.addEventListener("resize", this._handleResize);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    unlockBodyScrolling(this);
    window.removeEventListener("resize", this._handleResize);
  }

  private _handleResize = async () => {
    const replacePlacement = this.drawerPlacement === "top" ? "top" : "bottom";
    this.placement = window.innerWidth < SM_BREAKPOINT ? replacePlacement : this.drawerPlacement;
  };

  private uppercaseFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  private requestClose(source: "close-button" | "keyboard" | "overlay") {
    const slRequestClose = this.emit("sgds-request-close", {
      cancelable: true,
      detail: { source }
    });

    if (slRequestClose.defaultPrevented) {
      const animation = getAnimation(this, "drawer.denyClose");
      animateTo(this.panel, animation.keyframes, animation.options);
      return;
    }

    this.hide();
  }

  private addOpenListeners() {
    document.addEventListener("keydown", this.handleDocumentKeyDown);
  }

  private removeOpenListeners() {
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
  }

  private handleDocumentKeyDown = (event: KeyboardEvent) => {
    if (this.open && !this.contained && event.key === "Escape") {
      event.stopPropagation();
      this.requestClose("keyboard");
    }
  };

  @watch("open", { waitUntilFirstUpdate: true })
  async handleOpenChange() {
    if (this.open) {
      // Show
      this.emit("sgds-show");
      this.addOpenListeners();
      this.originalTrigger = document.activeElement as HTMLElement;

      // Lock body scrolling only if the drawer isn't contained
      if (!this.contained) {
        lockBodyScrolling(this);
      }

      // When the drawer is shown, Safari will attempt to set focus on whatever element has autofocus. This causes the
      // drawer's animation to jitter, so we'll temporarily remove the attribute, call `focus({ preventScroll: true })`
      // ourselves, and add the attribute back afterwards.
      //
      // Related: https://github.com/shoelace-style/shoelace/issues/693
      //
      const autoFocusTarget = this.querySelector("[autofocus]");
      if (autoFocusTarget) {
        autoFocusTarget.removeAttribute("autofocus");
      }

      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      this.drawer.hidden = false;

      // Set initial focus
      requestAnimationFrame(() => {
        const slInitialFocus = this.emit("sgds-initial-focus", { cancelable: true });

        if (!slInitialFocus.defaultPrevented) {
          // Set focus to the autofocus target and restore the attribute
          if (autoFocusTarget) {
            (autoFocusTarget as HTMLInputElement).focus({ preventScroll: true });
          } else {
            this.panel.focus({ preventScroll: true });
          }
        }

        // Restore the autofocus attribute
        if (autoFocusTarget) {
          autoFocusTarget.setAttribute("autofocus", "");
        }
      });

      const panelAnimation = getAnimation(this, `drawer.show${this.uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, "drawer.overlay.show");
      await Promise.all([
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
      ]);

      this.emit("sgds-after-show");
    } else {
      // Hide
      this.emit("sgds-hide");
      this.removeOpenListeners();

      if (!this.contained) {
        unlockBodyScrolling(this);
      }

      await Promise.all([stopAnimations(this.drawer), stopAnimations(this.overlay)]);
      const panelAnimation = getAnimation(this, `drawer.hide${this.uppercaseFirstLetter(this.placement)}`);
      const overlayAnimation = getAnimation(this, "drawer.overlay.hide");

      // Animate the overlay and the panel at the same time. Because animation durations might be different, we need to
      // hide each one individually when the animation finishes, otherwise the first one that finishes will reappear
      // unexpectedly. We'll unhide them after all animations have completed.
      await Promise.all([
        animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options).then(() => {
          this.overlay.hidden = true;
        }),
        animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options).then(() => {
          this.panel.hidden = true;
        })
      ]);

      this.drawer.hidden = true;

      // Now that the dialog is hidden, restore the overlay and panel for next time
      this.overlay.hidden = false;
      this.panel.hidden = false;

      // Restore focus to the original trigger
      const trigger = this.originalTrigger;
      if (typeof trigger?.focus === "function") {
        setTimeout(() => trigger.focus());
      }

      this.emit("sgds-after-hide");
    }
  }

  @watch("contained", { waitUntilFirstUpdate: true })
  handleNoModalChange() {
    if (this.open && !this.contained) {
      lockBodyScrolling(this);
    }

    if (this.open && this.contained) {
      unlockBodyScrolling(this);
    }
  }

  /** Shows the drawer. */
  public async show() {
    if (this.open) {
      return undefined;
    }

    this.open = true;
    return waitForEvent(this, "sgds-after-show");
  }

  /** Hides the drawer */
  public async hide() {
    if (!this.open) {
      return undefined;
    }

    this.open = false;
    return waitForEvent(this, "sgds-after-hide");
  }

  render() {
    return html`
      <div
        class=${classMap({
          drawer: true,
          "drawer-open": this.open,
          "drawer-top": this.placement === "top",
          "drawer-end": this.placement === "end",
          "drawer-bottom": this.placement === "bottom",
          "drawer-start": this.placement === "start",
          "drawer-contained": this.contained,
          "drawer-fixed": !this.contained
        })}
      >
        <div class="drawer-overlay" @click=${() => this.requestClose("overlay")} tabindex="-1"></div>

        <div
          class="drawer-panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open ? "false" : "true"}
          tabindex="0"
        >
          <header class="drawer-header">
            <slot name="title"></slot>
            <slot name="description"></slot>
            <sgds-close-button
              class="drawer-close"
              aria-label="close drawer"
              @click="${() => this.requestClose("close-button")}"
            ></sgds-close-button>
          </header>
          <slot class="drawer-body"></slot>
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

// Top
setDefaultAnimation("drawer.showTop", {
  keyframes: [
    { opacity: 0, translate: "0 -100%" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideTop", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 -100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// End
setDefaultAnimation("drawer.showEnd", {
  keyframes: [
    { opacity: 0, translate: "100%" },
    { opacity: 1, translate: "0" }
  ],
  rtlKeyframes: [
    { opacity: 0, translate: "-100%" },
    { opacity: 1, translate: "0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideEnd", {
  keyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "100%" }
  ],
  rtlKeyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "-100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// Bottom
setDefaultAnimation("drawer.showBottom", {
  keyframes: [
    { opacity: 0, translate: "0 100%" },
    { opacity: 1, translate: "0 0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideBottom", {
  keyframes: [
    { opacity: 1, translate: "0 0" },
    { opacity: 0, translate: "0 100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// Start
setDefaultAnimation("drawer.showStart", {
  keyframes: [
    { opacity: 0, translate: "-100%" },
    { opacity: 1, translate: "0" }
  ],
  rtlKeyframes: [
    { opacity: 0, translate: "100%" },
    { opacity: 1, translate: "0" }
  ],
  options: { duration: 250, easing: "ease" }
});

setDefaultAnimation("drawer.hideStart", {
  keyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "-100%" }
  ],
  rtlKeyframes: [
    { opacity: 1, translate: "0" },
    { opacity: 0, translate: "100%" }
  ],
  options: { duration: 250, easing: "ease" }
});

// Deny close
setDefaultAnimation("drawer.denyClose", {
  keyframes: [{ scale: 1 }, { scale: 1.01 }, { scale: 1 }],
  options: { duration: 250 }
});

// Overlay
setDefaultAnimation("drawer.overlay.show", {
  keyframes: [{ opacity: 0 }, { opacity: 1 }],
  options: { duration: 250 }
});

setDefaultAnimation("drawer.overlay.hide", {
  keyframes: [{ opacity: 1 }, { opacity: 0 }],
  options: { duration: 250 }
});

export default SgdsDrawer;
