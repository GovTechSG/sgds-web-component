import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { watch } from "../utils/watch";
import styles from "./sgds-stepper-item.scss";
import SgdsElement from "../base/sgds-element";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
import genId from "../utils/generateId";

@customElement("sgds-stepper-item")
export class SgdsStepperItem extends SgdsElement {
  static styles = styles;

  @state() checked = false;
  @state() protected hasFocus = false;

  /** The stepper item title */
  @property() title: string;

  /** The stepper item title */
  @property() stepHeader: string;

  /** The stepper item active state */
  @property({ type: Boolean, reflect: true })
  active = false;

  /** The stepper item completed state */
  @property({ type: Boolean, reflect: true })
  isCompleted = false;

  //   connectedCallback(): void {
  //     super.connectedCallback();
  //     this.setInitialAttributes();
  //     this.addEventListeners();
  //   }

  //   @watch("checked")
  //   handleCheckedChange() {
  //     this.setAttribute("aria-checked", this.checked ? "true" : "false");
  //     this.setAttribute("tabindex", this.checked ? "0" : "-1");
  //   }

  //   @watch("disabled", { waitUntilFirstUpdate: true })
  //   handleDisabledChange() {
  //     this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  //   }

  //   private handleBlur() {
  //     this.hasFocus = false;
  //     this.emit('sgds-blur');
  //   }

  //   private handleClick() {
  //     if (!this.disabled) {
  //       this.checked = true;
  //     }
  //   }

  //   private handleFocus() {
  //     this.hasFocus = true;
  //     this.emit('sgds-focus');
  //   }

  //   private addEventListeners() {
  //     this.addEventListener('blur', () => this.handleBlur());
  //     this.addEventListener('click', () => this.handleClick());
  //     this.addEventListener('focus', () => this.handleFocus());
  //   }

  //   private setInitialAttributes() {
  //     this.setAttribute("role", "radio");
  //     this.setAttribute("tabindex", "-1");
  //     this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  //   }

  render() {
    return html`
      <div
        class="stepper-item ${classMap({
          "is-completed": this.isCompleted,
          "is-active": this.active,
        })}
      "
      >
        <div class="stepper-marker">${this.title}</div>
        <div class="stepper-detail">
          <p><b>${this.stepHeader}</b></p>
        </div>
      </div>
    `;
  }
}

export default SgdsStepperItem;
