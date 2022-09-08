import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import styles from "../SideNav/sidenav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref } from "lit/directives/ref.js";

@customElement("sidenav-collapse")
export class SideNavCollapse extends LitElement {
  static styles = styles;

  collapseElementList: any = [];
  collapseList: any = [];
  myCollapse: Ref<HTMLElement> = createRef();
  bsCollapse: Collapse;

  firstUpdated() {
    console.log("in firstUpdated");
    this.bsCollapse = new Collapse(this.myCollapse.value);
  }

  @property({ type: String })
  parentId = "";

  render() {
    return html`
      <div
        class="collapse"
        ${ref(this.myCollapse)}
        data-bs-parent="${this.parentId || null}"
      >
        <ul class="list-unstyled">
          <slot></slot>
        </ul>
      </div>
    `;
  }
}
