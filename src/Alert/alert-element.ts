import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./alert-element.scss";

@customElement("alert-element")
export class AlertElement extends LitElement {
  static styles = styles;
  @property()
  classes=""

  render() {
    return html`
    <div
    role="alert"
    class=" ${this.classes} fade d-flex align-items-center alert alert-primary alert-dismissible show sgds"
  >
    <button
      type="button"
      class="btn-close btn-sm"
      aria-label="Close alert"
    ></button>
    <div>
      <div class="alert-heading h4">Oh snap! You got an error!</div>
      <p class="mb-0  text-end">
      <slot />
        Change this and that and try again. Duis mollis, est non commodo
        luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
        Cras mattis consectetur purus sit amet fermentum.
      </p>
    </div>
  </div>`;
  }
}
