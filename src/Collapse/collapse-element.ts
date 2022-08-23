import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ref, createRef, Ref } from "lit/directives/ref.js";
// import styles from "./sidenav-element.scss";
import { Collapse } from "bootstrap";

@customElement("collapse-element")
export class CollapseElement extends LitElement {
  //   static styles = styles;

  @property({ type: Boolean })
  collapsed = true;
  @property({ type: String })
  collapseId = "collapse-test-id";
  @property({ type: String })
  accordion = "";
  @property({ type: Boolean })
  toggle = true;
  @property({ type: Boolean })
  visible = true;

  element: Ref<HTMLElement> = createRef();
  instance;

  constructor() {
    super();
    console.log("hi");
    // this.instance.value = new Collapse(this.element.value, {
    //   parent: this.accordion ? `#${this.accordion}` : undefined,
    //   toggle: this.toggle,
    // });
    // if (this.visible || !this.collapsed) this.instance.value.show();

    // this.addEventListener("show.bs.collapse", (e) => console.log(e));
  }

  render() {
    return html`
      <div
        class="sgds collapse show"
        id=${this.collapseId}
        ${ref(this.element)}
        data-bs-parent="${this.accordion || null}"
      >
        <slot></slot>
      </div>
    `;
  }
}
