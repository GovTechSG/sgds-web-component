import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.js";
import { customElement } from "lit/decorators.js";

// import path from 'path'
// import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
// setBasePath("./assets");

@customElement("sgds-icon")
export class SgdsIcon extends SlIcon {
}

declare global {
    interface HTMLElementTagNameMap {
      'sgds-icon': SgdsIcon;
    }
  }