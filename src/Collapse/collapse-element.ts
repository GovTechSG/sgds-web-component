import { LitElement, html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { customElement, property } from "lit/decorators.js";
import styles from "../SideNav/sidenav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref } from "lit/directives/ref.js";

@customElement("collapse-element")
export class CollapseElement extends LitElement {
  static styles = styles;

  @property()
  tag = "div";

  constructor() {
    super();
  }

  collapseElementList: any = [];
  collapseList: any = [];
  myCollapse: Ref<HTMLElement> = createRef();
  bsCollapse: Collapse;

  firstUpdated() {
    console.log('in firstUpdated')
    this.bsCollapse = new Collapse(this.myCollapse.value);
  }

  render() {
    return html`
      <div class="collapse" ${ref(this.myCollapse)}>
        <slot></slot>
      </div>
    `;
  }
}
