import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import styles from "./footer-element.scss";

@customElement("footer-top-element")
export class FooterTopElement extends LitElement {
  static styles = styles;

  render() {
    return html`
      <div class="description">
        <slot
          >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum illo
          delectus laborum libero id ratione quibusdam tempora assumenda quas,
          pariatur cum minus, aliquid molestiae et nisi dolorem vitae molestias!
          Voluptate commodi aliquid iusto sequi sit eligendi, quod numquam nihil
          consectetur eaque error earum laudantium! Temporibus accusamus
          pariatur quod totam quia.
        </slot>
      </div>
    `;
  }
}
