import { LitElement, html, PropertyPart } from "lit";
import { customElement, property } from "lit/decorators.js";
import { Dropdown } from "bootstrap";
import * as Popper from "@popperjs/core";
import type { StrictModifiers } from "@popperjs/core";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import styles from "./dropdown.scss";
import mergeDeep from "../utils/mergeDeep";
import genId from '../utils/generateId'

@customElement("dropdown-element")
export class DropdownElement extends LitElement {
  private myDropdown: Ref<HTMLElement> = createRef();
  private bsDropdown: Dropdown = null;
  private toggleBtnId = genId('dropdown', 'button')

  static styles = styles;

  @property({ type: Boolean })
  noFlip = false;
  @property({ type: Boolean })
  right = false;
  @property({ type: Boolean })
  dropup = false;
  @property({ type: Boolean })
  dropright = false;
  @property({ type: Boolean })
  dropleft = false;
  @property({ type: Object })
  popperOpts = {};
 

  private _onClickButton() {
    this.bsDropdown.toggle();
  }

  firstUpdated() {
    this.bsDropdown = new Dropdown(this.myDropdown.value, {
      autoClose: true,
      reference: "toggle",
      popperConfig: (defaultConfig?: Partial<Popper.Options>) => {
        const modifierOpt: StrictModifiers[] = [
          {
            name: "offset",
            options: {
              offset: [0, 10],
            },
          },
        ];
        const dropDownConfig = {
          placement: "bottom-start",
          modifiers: !this.noFlip
            ? modifierOpt
            : [
                ...modifierOpt,
                {
                  name: "flip",
                  options: { fallbackPlacements: [] },
                },
              ],
        };
        if (this.dropup) {
          dropDownConfig.placement = this.right ? "top-end" : "top-start";
        } else if (this.dropright) {
          dropDownConfig.placement = "right-start";
        } else if (this.dropleft) {
          dropDownConfig.placement = "left-start";
        } else if (this.right) {
          dropDownConfig.placement = "bottom-end";
        }
        return mergeDeep(
            defaultConfig,
            mergeDeep(dropDownConfig, this.popperOpts)
          );
      },
    });
    this.myDropdown.value.addEventListener("show.bs.dropdown", () => {
      console.log("show");
    });
    this.myDropdown.value.addEventListener("shown.bs.dropdown", () => {
      console.log("shown");
    });
    this.myDropdown.value.addEventListener("hide.bs.dropdown", () => {
      console.log("hide");
    });
    this.myDropdown.value.addEventListener("hidden.bs.dropdown", () => {
      console.log("hidden");
    });
  }
  render() {
    return html`
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          aria-expanded="false"
          @click=${() => this._onClickButton()}
          id=${this.toggleBtnId}
          ${ref(this.myDropdown)}
        >
          Dropdown button
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
      <!-- <div class="nav-item sgds dropdown" ${ref(this.myDropdown)}>
        <button
          class="nav-link sgds dropdown-toggle show"
          href=""
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          @click=${() => this._onClickButton()}
        >
          Dropdown<i class="bi bi-chevron-down"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="">Action</a></li>
          <li><a class="dropdown-item" href="">Another Action</a></li>
          <li><a class="dropdown-item" href="">Something</a></li>
          <div class="dropdown-divider"></div>
          <li><a class="dropdown-item" href="">Seperated Link</a></li>
        </ul>
      </div> -->
    `;
  }
}
