import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import themingBoxStyles from "./theming-box.css";
export class SgdsThemingBox extends SgdsElement {
  static styles = [...SgdsElement.styles, themingBoxStyles];
  render() {
    return html`<slot></slot>`;
  }
}

export default SgdsThemingBox;
