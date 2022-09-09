import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sidenav-item.scss";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Collapse } from "bootstrap";

export interface MenuLink {
  itemName: string;
  href: string;
}

@customElement("sidenav-item")
export class SideNavItem extends LitElement {
  static styles = styles;

  myCollapse: Ref<HTMLElement> = createRef();
  bsCollapse: Collapse;

  @property()
  eventKey = "";

  @state()
  private active = false;

  @property({ type: Boolean })
  isActive = this.active;

  @property({ type: Boolean })
  alwaysOpen = false;

  @property({ type: Boolean })
  visible = false//visible on first load?

  // @state()
  // private show = this.visible;

  @property({ type: String })
  parentId = "";

  @property({ type: Array })
  menuLinks: MenuLink[] = [];

  onClick() {
    this.bsCollapse.toggle()
  }

  firstUpdated() {
    console.log("in firstupdated");
    this.bsCollapse = new Collapse(this.myCollapse.value, {
      parent: `#parentId`,
      toggle: this.visible,
    });
    this.myCollapse.value.addEventListener("show.bs.collapse", () => {
      console.log("show.bs.collapse");
      // this.show = true;
      // this.active = true;
    });
    this.myCollapse.value.addEventListener("shown.bs.collapse", () => {
      console.log("shown.bs.collapse");
      // console.log(this.show);
      // this.show = true;
    });
    this.myCollapse.value.addEventListener("hide.bs.collapse", () => {
      console.log("hide.bs.collapse");
        // this.show = false;
        // this.active = false;
    });
    this.myCollapse.value.addEventListener("hidden.bs.collapse", () => {
      console.log("hidden.bs.collapse");
      // this.show = false;
      // console.log(this.show);
    });
  }

  render() {
    // console.log("in render", this.show);
    return html`
          <!-- <nav class="sidenav accordion" id="parentId"> -->
      <li class="sidenav-item">
        <button
          @click=${(e) => this.onClick()}
          class="collapsed sidenav-btn ${this.active ? "active" : null}"
        >
          <slot name="title"></slot>
          <i class="bi bi-chevron-down"></i>
        </button>
        <div
          class="collapse"
          ${ref(this.myCollapse)}
        >
          <ul class="sidenav-list">
            ${this.menuLinks.map(
              (ml) => html`
                <li>
                  <a href="${ml.href}" class="nav-link">${ml.itemName}</a>
                </li>
              `
            )}
          </ul>
          <!-- <ul class="sidenav-list">
            <li>
              <a href="#" class="nav-link">test</a>
            </li>
            <li>
              <a href="#" class="nav-link">test</a>
            </li>
          </ul> -->
        </div>
      </li>
            <!-- </nav> -->
    `;
  }
}
