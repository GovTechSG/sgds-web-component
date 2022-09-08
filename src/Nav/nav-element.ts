import { LitElement, html, PropertyDeclaration } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./nav.scss";
import { Collapse } from "bootstrap";
import { ref, createRef, Ref, RefOrCallback } from "lit/directives/ref.js";
// import "bootstrap/dist/js/x/bootstrap.bundle.min.js"

@customElement("nav-element")
export class NavElement extends LitElement {
  static styles = styles;

  constructor() {
    super();
  }

  render() {
    return html`
      <nav class="sidenav sgds list-unstyled open1">
        <li class="sidenav-item">
          <button
            class="sgds btn collapsed active"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleA"
            aria-expanded="false"
            aria-controls="collapseExampleA"
          >
            <i class="bi bi-layers"></i>Sub menu
            <i class="bi bi-chevron-down"></i>
          </button>
          <div
            class="collapse show"
            id="collapseExampleA"
            data-bs-parent=".open1"
          >
            <ul class="list-unstyled">
              <li><a href="#" class="nav-link">Sub menu item</a></li>
              <li><a href="#" class="nav-link active">Sub menu item</a></li>
              <li><a href="#" class="nav-link">Sub menu item</a></li>
            </ul>
          </div>
        </li>
        <li class="sidenav-item">
          <button
            class="sgds btn collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleB"
            aria-expanded="false"
            aria-controls="collapseExampleB"
          >
            <i class="bi bi-layers"></i>Sub menu
            <i class="bi bi-chevron-down"></i>
          </button>
          <div class="collapse" id="collapseExampleB" data-bs-parent=".open1">
            <ul class="list-unstyled">
              <li><a href="#" class="nav-link">Sub menu item</a></li>
              <li><a href="#" class="nav-link">Sub menu item</a></li>
              <li><a href="#" class="nav-link">Sub menu item</a></li>
            </ul>
          </div>
        </li>
        <li class="sidenav-item">
          <button
            class="sgds btn collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExampleC"
            aria-expanded="false"
            aria-controls="collapseExampleC"
          >
            <i class="bi bi-layers"></i>Sub menu
            <i class="bi bi-chevron-down"></i>
          </button>
          <div class="collapse" id="collapseExampleC" data-bs-parent=".open1">
            <ul class="list-unstyled">
              <li><a href="#" class="nav-link">Sub menu item</a></li>
              <li><a href="#" class="nav-link">Sub menu item</a></li>
              <li><a href="#" class="nav-link">Sub menu item</a></li>
            </ul>
          </div>
        </li>
      </nav>
    `;
  }
}
