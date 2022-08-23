import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./sidenav-element.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref, RefOrCallback } from "lit/directives/ref.js";

@customElement("sidenav-element")
export class SideNavElement extends LitElement {
  static styles = styles;

  element: Ref<HTMLElement> = createRef();
  instance :any = { value: {}}

  constructor() {
    super();
    console.log("hi");
    console.log(this.element)
 
    // if (this.visible || !this.collapsed) this.instance.value.show();

    // this.addEventListener("show.bs.collapse", (e) => console.log(e));
  }
  collapseElementList: any = [];
  collapseList: any = []
//   myCollapse: HTMLElement 
  myCollapse: Ref<HTMLElement> = createRef()
  bsCollapse: Collapse 

  
  firstUpdated() {
    console.log('hi2')
    // this.myCollapse = document.querySelector('#collapseExampleA')
    this.bsCollapse = new Collapse(this.myCollapse.value)
    // this.collapseElementList = document.querySelectorAll('.collapse')
    // this.collapseList = this.collapseElementList.map(collapseEl => new Collapse(collapseEl))
   
    // this.instance.value = new Collapse(this.element.value, {
    //     parent: `#open1`,
    //     toggle: true
    //   });
    // console.log(this.instance)
    // console.log(this.element)
  }




  render() {
    // this.myCollapse = document.getElementById('collapseExampleA')
    // this.bsCollapse = new Collapse(this.myCollapse)
    console.log('inside render')
    return html` 
    <nav class="sidenav sgds list-unstyled open1" id="open1">
        <li class="sidenav-item">
            <button @click=${e => this.bsCollapse.hide()}  class="sgds collapsed btn active" type="button" data-bs-toggle="collapse" data-bs-target="collapseExampleA"
                aria-expanded="false" aria-controls="collapseExampleA" >
                <i class="bi bi-layers"></i>Sub menu
                <i class="bi bi-chevron-down"></i>
            </button>
            <div class="collapse" id="collapseExampleA" data-bs-parent="open1" ${ref(this.myCollapse)}>
                <ul class="list-unstyled">
                    <li><a href="#" class="nav-link">Sub menu item</a></li>
                    <li><a href="#" class="nav-link active">Sub menu item</a></li>
                    <li><a href="#" class="nav-link">Sub menu item</a></li>
                </ul>
            </div>
        </li>
    </nav>
    
                    `;
  }
}
