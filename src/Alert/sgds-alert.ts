import { customElement, property, state, query } from "lit/decorators.js";
import { html, literal } from "lit/static-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../utils/sgds-element";
import styles from "./sgds-alert.scss";
import { watch } from "../utils/watch";

// const toastStack = Object.assign(document.createElement('div'), { className: 'sl-toast-stack' });

/**
 * @summary Alerts are used to display important messages inline or as toast notifications.
 * @documentation https://shoelace.style/components/alert
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The alert's main content.
 * @slot icon - An icon to show in the alert. Works best with `<sl-icon>`.
 *
 * @event sl-show - Emitted when the alert opens.
 * @event sl-after-show - Emitted after the alert opens and all animations are complete.
 * @event sl-hide - Emitted when the alert closes.
 * @event sl-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the alert's main content.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */

export type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light";

@customElement("sgds-alert")
export class SgdsAlert extends SgdsElement {
  static styles = styles;

  //   private autoHideTimeout: number;
  //   private readonly hasSlotController = new HasSlotController(
  //     this,
  //     "icon",
  //     "suffix"
  //   );
  //   private readonly localize = new LocalizeController(this);

  @query('[part~="base"]') base: HTMLElement;

  /**
   * Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can
   * use the `show()` and `hide()` methods and this attribute will reflect the alert's open state.
   */
  @property({ type: Boolean, reflect: true }) show = true;

  /** Enables a close button that allows the user to dismiss the alert. */
  @property({ type: Boolean, reflect: true }) closable? = false;

  /** The alert's theme variant. */
  @property({ reflect: true }) variant: AlertVariant = "primary";

  @property({ reflect: true }) closeLabel: "Close alert";

  @property({ reflect: true }) alertClasses?: string;

  //   @property({ reflect: true }) transition?: TransitionType;

  /**
   * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
   * the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning
   * the alert will not close on its own.
   */
  //   @property({ type: Number }) duration = Infinity;

  firstUpdated() {
    // this.base.hidden = !this.show;
  }

  //   private restartAutoHide() {
  //     clearTimeout(this.autoHideTimeout);
  //     if (this.open && this.duration < Infinity) {
  //       this.autoHideTimeout = window.setTimeout(
  //         () => this.hide(),
  //         this.duration
  //       );
  //     }
  //   }

  //   private handleCloseClick() {
  //     this.hide();
  //   }

  //   private handleMouseMove() {
  //     this.restartAutoHide();
  //   }

  //   @watch("open", { waitUntilFirstUpdate: true })
  //   async handleOpenChange() {
  //     if (this.open) {
  //       // Show
  //       this.emit("sl-show");

  //       if (this.duration < Infinity) {
  //         this.restartAutoHide();
  //       }

  //       await stopAnimations(this.base);
  //       this.base.hidden = false;
  //       const { keyframes, options } = getAnimation(this, "alert.show", {
  //         dir: this.localize.dir(),
  //       });
  //       await animateTo(this.base, keyframes, options);

  //       this.emit("sl-after-show");
  //     } else {
  //       // Hide
  //       this.emit("sl-hide");

  //       clearTimeout(this.autoHideTimeout);

  //       await stopAnimations(this.base);
  //       const { keyframes, options } = getAnimation(this, "alert.hide", {
  //         dir: this.localize.dir(),
  //       });
  //       await animateTo(this.base, keyframes, options);
  //       this.base.hidden = true;

  //       this.emit("sl-after-hide");
  //     }
  //   }

  //   @watch("duration")
  //   handleDurationChange() {
  //     this.restartAutoHide();
  //   }

  /** Shows the alert. */
  //   async show() {
  //     if (this.open) {
  //       return undefined;
  //     }

  //     this.open = true;
  //     return waitForEvent(this, "sl-after-show");
  //   }

  /** Hides the alert */
  //   async hide() {
  //     if (!this.open) {
  //       return undefined;
  //     }

  //     this.open = false;
  //     return waitForEvent(this, "sl-after-hide");
  //   }


  render() {
    return html`
      <div
        part="base"
        class="sgds alert fade ${classMap({
          show: this.show,
          [`alert-${this.variant}`]: this.variant,
          [`${this.alertClasses}`]: this.alertClasses,
        })}"
        role="alert"
        aria-hidden=${this.show ? "false" : "true"}
      >
        <slot part="content"> </slot>
      </div>
    `;
  }
}

// setDefaultAnimation("alert.show", {
//   keyframes: [
//     { opacity: 0, scale: 0.8 },
//     { opacity: 1, scale: 1 },
//   ],
//   options: { duration: 250, easing: "ease" },
// });

// setDefaultAnimation("alert.hide", {
//   keyframes: [
//     { opacity: 1, scale: 1 },
//     { opacity: 0, scale: 0.8 },
//   ],
//   options: { duration: 250, easing: "ease" },
// });

export default SgdsAlert;
