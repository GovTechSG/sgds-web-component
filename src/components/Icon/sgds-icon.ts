import { nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { TemplateResult } from "lit";
import { iconRegistry } from "./icon-registry";
import SgdsElement from "../../base/sgds-element";
import iconStyles from "./icon.css";

const iconCache = new Map<string, TemplateResult>();

/**
 * @summary Icons offer a form of visual shorthand that we are all familiar with. They can label, inform and aid navigation quickly and effectively in minimal space. Icons must first and foremost communicate meaning. By default, the icon component renders icons from `SgdsIcon` library set
 */
export class SgdsIcon extends SgdsElement {
  static styles = [...SgdsElement.styles, iconStyles];

  /** The name of the icon from sgds icon library */
  @property({ type: String, reflect: true }) name: string;

  /** Specifies a small, medium or large icon, the size is medium by default. */
  @property({ type: String, reflect: true }) size: "xs" | "sm" | "md" | "lg" | "xl" | "2-xl" | "3-xl" = "lg";

  /** An accessible label for the icon. When set, the SVG is treated as informative. When omitted, the SVG is marked as decorative with aria-hidden="true". */
  @property({ type: String }) ariaLabel: string;

  @state() private _icon: TemplateResult | undefined;

  willUpdate(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("name")) {
      this._loadIcon(this.name);
    }
  }

  private async _loadIcon(name: string) {
    if (!name) {
      this._icon = undefined;
      return;
    }

    if (iconCache.has(name)) {
      this._icon = iconCache.get(name);
      return;
    }

    const loader = iconRegistry[name];
    if (!loader) {
      console.warn(`Icon not found: ${name}`);
      this._icon = undefined;
      return;
    }

    try {
      const module = await loader();
      iconCache.set(name, module.default);
      this._icon = module.default;
    } catch {
      console.warn(`Failed to load icon: ${name}`);
      this._icon = undefined;
    }
  }

  updated() {
    const svg = this.shadowRoot?.querySelector("svg");
    if (!svg) return;

    if (this.ariaLabel) {
      svg.removeAttribute("aria-hidden");
      svg.setAttribute("aria-label", this.ariaLabel);
    } else {
      svg.removeAttribute("aria-label");
      svg.setAttribute("aria-hidden", "true");
    }
  }

  render() {
    return this._icon ?? nothing;
  }
}

export default SgdsIcon;
