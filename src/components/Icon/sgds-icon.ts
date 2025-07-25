import { nothing } from "lit";
import { property } from "lit/decorators.js";
import { iconRegistry } from "./icon-registry";
import SgdsElement from "../../base/sgds-element";
import iconStyles from "./icon.css";

/**
 * @summary Icons offer a form of visual shorthand that we are all familiar with. They can label, inform and aid navigation quickly and effectively in minimal space. Icons must first and foremost communicate meaning. By default, the icon component renders icons from `SgdsIcon` library set
 */
export class SgdsIcon extends SgdsElement {
  static styles = [...SgdsElement.styles, iconStyles];

  /** The name of the icon from sgds icon library */
  @property({ type: String, reflect: true }) name: string;

  /** Specifies a small, medium or large icon, the size is medium by default. */
  @property({ type: String, reflect: true }) size: "sm" | "md" | "lg" | "xl" | "2-xl" | "3-xl" = "lg";

  private _getIconByName(name: string) {
    if (!name) return;

    const svg = iconRegistry[name];

    if (!svg) {
      console.warn(`Icon not found: ${name}`);
      return;
    }

    return svg;
  }

  render() {
    const icon = this._getIconByName(this.name);
    return icon ? icon : nothing;
  }
}

export default SgdsIcon;
