import { isServer, LitElement, type CSSResult } from "lit";
import style from "./sgds-element.css";
import { property } from "lit/decorators.js";
/**
 * @cssprop --sgds-{stateColor} - State colors in hexadecimal value
 * @cssprop --sgds-{stateColor}-rgb - State colors in rgb value
 * @cssprop --sgds-{stateColor}-{weights} - State colors with different weightage in hexadecimal value
 * @cssprop --sgds-gray-{weights} - State colors with different weightage in hexadecimal value
 * @cssprop --overlay-background-color - The drawer and modal component overlay background color
 * @cssprop --zindex-modal - The drawer and modal component z-index value
 */

export default class SgdsElement extends LitElement {
  static styles: CSSResult[] = [style];
  /**@internal Set to true in SSR environment */
  @property({ type: Boolean, reflect: true }) ssr = isServer || Boolean(this.shadowRoot);

  /** Emits a custom event with more convenient defaults. */
  emit(name: string, options?: CustomEventInit) {
    const event = new CustomEvent(name, {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {},
      ...options
    });

    this.dispatchEvent(event);

    return event;
  }
  static define(name: string, elementConstructor = this, options: ElementDefinitionOptions = {}) {
    const currentlyRegisteredConstructor = customElements.get(name) as CustomElementConstructor | typeof SgdsElement;

    if (!currentlyRegisteredConstructor) {
      // We try to register as the actual class first. If for some reason that fails, we fall back to anonymous classes.
      // customElements can only have 1 class of the same "object id" per registry, so that is why the try {} catch {} exists.
      // Some tools like Jest Snapshots and if you import the constructor and call `new SgdsButton()` they will fail with
      //   the anonymous class version.
      try {
        customElements.define(name, elementConstructor, options);
      } catch (_err) {
        customElements.define(name, class extends elementConstructor {}, options);
      }
      return;
    }
  }
  /** @internal */
  static dependencies: Record<string, typeof SgdsElement> = {};

  constructor() {
    super();
    Object.entries((this.constructor as typeof SgdsElement).dependencies).forEach(([name, component]) => {
      (this.constructor as typeof SgdsElement).define(name, component);
    });
  }

  protected firstUpdated(changedProperties: Parameters<LitElement["firstUpdated"]>[0]): void {
    super.firstUpdated(changedProperties);
    // This is a fix to workaround SSR not being able to catch slotchange events.
    // https://github.com/lit/lit/discussions/4697
    if (this.ssr) {
      this.shadowRoot?.querySelectorAll("slot").forEach(slotElement => {
        slotElement.dispatchEvent(new Event("slotchange", { bubbles: true, composed: false, cancelable: false }));
      });
    }
  }
}
