import SgdsElement from "../../base/sgds-element";
import { html } from "lit/static-html.js";
import { property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import iconStyles from "./icon.css";

/**
 * @summary Icons offer a form of visual shorthand that we are all familiar with. They can label, inform and aid navigation quickly and effectively in minimal space. Icons must first and foremost communicate meaning. By default, the icon component renders icons form SgdsIcon library set
 *
 * @event sgds-blur - Emitted when the button is blurred.
 * @event sgds-focus - Emitted when the button is focused.
 */
export class SgdsIcon extends SgdsElement {
  static styles = [...SgdsElement.styles, iconStyles];

  /** The name of the icon from sgds icon library */
  @property({ type: String, reflect: true }) name: string;

  /** Specifies a small, medium or large icon, the size is medium by default. */
  @property({ type: String, reflect: true }) size: "sm" | "md" | "lg" | "xl" | "2-xl" | "3-xl" = "lg";

  /** @internal */
  @state()
  private _svgContent: string | null = null;

  async firstUpdated() {
    if (this.name) {
      await this.loadSvg(this.name);
    }
  }

  updated() {
    this.style.display = this._svgContent ? "flex" : "none";
  }

  async loadSvg(name: string): Promise<void> {
    if (name) {
      // Dynamically import the SVG if not cached
      const pascalName = name
        .split("-")
        .map(name => String(name).charAt(0).toUpperCase() + String(name).slice(1))
        .join("");
      try {
        const iconRegistry = await import("./icon-registry");
        const svg = iconRegistry[pascalName];
        if (svg) {
          this._svgContent = svg;
        } else {
          throw new Error("icon `name` is undefined");
        }
      } catch (error) {
        console.error(`Error loading SVG: ${name}`, error);
      }
    }
  }

  render() {
    return html`${unsafeSVG(this._svgContent)}`;
  }
}

export default SgdsIcon;
