import SgdsElement from "../../base/sgds-element";
import { html } from "lit/static-html.js";
import { property, state } from "lit/decorators.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import iconStyles from "./icon.css";

/**
 * @summary An icon button is a user interface element that combines an icon and a button, serving as a clickable or tabbable component.
 *
 * @event sgds-blur - Emitted when the button is blurred.
 * @event sgds-focus - Emitted when the button is focused.
 */
export class SgdsIcon extends SgdsElement {
  static styles = [...SgdsElement.styles, iconStyles];

  /** The name of the icon from sgds icon library */
  @property({ type: String, reflect: true }) name: string;

  /** Specifies a small, medium or large icon, the size is medium by default. */
  @property({ type: String, reflect: true }) size: "sm" | "md" | "lg" = "md";

  /** @internal */
  @state()
  private _svgContent: string | null = null;

  async firstUpdated() {
    if (this.name) {
      this.loadSvg(this.name);
    }
  }

  updated() {
    this.style.display = this._svgContent ? "flex" : "none";
  }

  async loadSvg(name: string) {
    if (name) {
      // Dynamically import the SVG if not cached
      try {
        const response = await fetch(`/src/icons/${name}.svg`);

        if (response.ok) {
          const svgContent = await response.text();
          // Render the SVG
          // this.renderSvg(svgContent);
          this._svgContent = svgContent;
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
