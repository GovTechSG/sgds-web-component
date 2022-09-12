import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import styles from "./sidenav-item.scss";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Collapse } from "bootstrap";

export interface MenuLink {
  itemName: string;
  href: string;
  active?: boolean;
}

@customElement("sidenav-item")
export class SideNavItem extends LitElement {
  static styles = styles;

  myCollapse: Ref<HTMLElement> = createRef();
  bsCollapse: Collapse;
  // my2Collapse: Ref<HTMLElement> = createRef();
  // bs2Collapse: Collapse;

  @property()
  eventKey = "";

  @property({ type: Boolean })
  active = undefined;

  @property({ type: Boolean })
  alwaysOpen = false;

  @property({ type: Boolean })
  visible = false; //visible on first load?

  @property({ type: String })
  collapseId = "";

  @property({ type: Array })
  menuLinks: MenuLink[] = [];

  onClick() {
    this.bsCollapse.toggle();
  }
  // on2Click() {
  //   this.bs2Collapse.toggle();
  // }

  firstUpdated() {
    // console.log("in firstupdated", this.parentElement.getRootNode());
    this.bsCollapse = new Collapse(this.myCollapse.value, {
      // parent: "#test-id",
      toggle: this.visible,
    });

    // this.bs2Collapse = new Collapse(this.my2Collapse.value, {
    //   // parent: "#test-id",
    //   toggle: this.visible
    // })

    this.myCollapse.value.addEventListener("show.bs.collapse", () => {
      console.log("show.bs.collapse");
      // this.show = true;
      // this.active = true;
      //emit event if alwaysOpen is false
      // this.bs2Collapse.hide()
    });
    this.myCollapse.value.addEventListener("shown.bs.collapse", () => {
      console.log("shown.bs.collapse");
      // console.log(this.show);
      // this.show = true;
      this.active = true
      const options = {
        detail: { activeTarget: this.id },
        bubbles: true,
        composed: true,
      };
      this.dispatchEvent(new CustomEvent("active.sidenav", options));
    });
    this.myCollapse.value.addEventListener("hide.bs.collapse", () => {
      console.log("hide.bs.collapse");
      // this.show = false;
      // this.active = false;
    });
    this.myCollapse.value.addEventListener("hidden.bs.collapse", () => {
      console.log("hidden.bs.collapse");
      // this.show = false;
      this.active = false
      // console.log(this.show);
    });
  }

  updated() {
    console.log("updated");
    this.addEventListener("active.sidenav", (e: CustomEvent) => {
      console.log("heard the activsidenav", e.detail.activeTarget);
      // this.bsCollapse.hide()
      console.log(e.detail.activeTarget, this.id);
      if (e.detail.activeTarget !== this.id) {
        this.bsCollapse.hide();
      }
    });
  }
  @state()
  isActiveLink
  activateLink (e: Event){
    (e.target as HTMLElement).classList.add("active")
    console.log(e.target as Element)
  }
  render() {
    return html`
        <li class="sidenav-item">
          <button
            @click=${(e) => this.onClick()}
            class="collapsed sidenav-btn ${this.active ? "active" : null}"
          >
            <slot name="title"></slot>
            <i class="bi bi-chevron-down"></i>
          </button>
          <div class="collapse" ${ref(this.myCollapse)} id="${this.collapseId}">
            <ul class="sidenav-list">
              ${this.menuLinks.map(
                (ml, idx) => html`
                  <li>
                    <a @click="${(e: Event) => this.activateLink(e)}" href="${ml.href}" class="nav-link ${ml.active ? "active": null}">${ml.itemName}</a>
                  </li>
                `
              )}
            </ul>
          </div>
        </li>
    `;
  }
}
