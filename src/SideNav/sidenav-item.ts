import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sidenav-item.scss";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Collapse } from "bootstrap";
import "./sidenav-link";
@customElement("sidenav-item")
export class SideNavItem extends LitElement {
  static styles = styles;

  myCollapse: Ref<HTMLElement> = createRef();
  bsCollapse: Collapse;

  // createRenderRoot() {
  //   return this;
  // }

  @property()
  title = ""

  /** when true, toggles the sidenav-item to open on first load. Sets the initial active state which controls the active css of the button. 
    */
  @property({ type: Boolean })
  visible = false;

  @state()
  active = this.visible

  @property({ type: String })
  collapseId = "";

  onClick() {
    this.bsCollapse.toggle();
  }

  firstUpdated() {
    this.bsCollapse = new Collapse(this.myCollapse.value, {
      parent: document.getElementById('test-id'),
      toggle: this.visible,
    });

    this.myCollapse.value.addEventListener("show.bs.collapse", () => {
      console.log("show.bs.collapse");
      this.active = true

    });
    this.myCollapse.value.addEventListener("shown.bs.collapse", () => {
      console.log("shown.bs.collapse");
      this.active = true

    });
    this.myCollapse.value.addEventListener("hide.bs.collapse", () => {
      console.log("hide.bs.collapse");
      this.active = false;

    });
    this.myCollapse.value.addEventListener("hidden.bs.collapse", () => {
      console.log("hidden.bs.collapse");
      this.active = false;

    });
  }
  render() {
    return html`
      <li class="sidenav-item">
        <button
          @click=${() => this.onClick()}
          class="collapsed sidenav-btn ${this.active ? "active" : null}"
        >
          ${this.title}
          <i class="bi bi-chevron-down"></i>
        </button>
        <div class="collapse" ${ref(this.myCollapse)} id="${this.collapseId}">
          <ul class="sidenav-list">
            <slot></slot>
          </ul>
        </div>
      </li>
    `;
  }
}
