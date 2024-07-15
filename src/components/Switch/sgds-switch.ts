import FormCheckElement from "../../base/form-check-element";
import genId from "../../utils/generateId";
import switchStyle from "./switch.css";
import { property } from "lit/decorators.js";

export class SgdsSwitch extends FormCheckElement {
  static styles = [...FormCheckElement.styles, switchStyle];

  /** The size of the switch. By default, it is small size */
  @property({ reflect: true, type: String }) size: "sm" | "md" = "sm";

  constructor() {
    super();
    this._inputId = genId("switch");
  }

  firstUpdated() {
    this._size = this.size;
  }
}

export default SgdsSwitch;
