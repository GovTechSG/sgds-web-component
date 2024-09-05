import { html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import SgdsElement from "../../base/sgds-element";
import breadcrumbItemStyle from "./breadcrumb-item.css";
import anchorStyles from "../../styles/anchor.css";
/**
 * @summary Breadcrumb Item are navigational links used in Breadcrumb component
 *
 * @slot default - The title of the item
 * @slot separator - The individual separator of breadcrumb item can be changed here.
 *
 * @csspart base - The base wrapper of breadcrumb item which is a HTMLListElement.
 * @csspart label -The label of the breadcrumb item. It is either a span or anchor element depending on href attribute
 *
 */
export class SgdsBreadcrumbItem extends SgdsElement {
  static styles = [...SgdsElement.styles, anchorStyles, breadcrumbItemStyle];
  /** Specifies the url path of the breadcrumb-item. When defined, the breadcrumb-items is a anchor element. When not defined, indicates that the breadcrumb item is active. In such cases, a span element is rendered. */
  @property({ type: String, reflect: true }) href: string;
  /** Tells the browser where to open the link. Only used when `href` is set. */
  @property() target: "_blank" | "_parent" | "_self" | "_top";

  /** The `rel` attribute to use on the link. Only used when `href` is set. */
  @property() rel = "noreferrer noopener";

  render() {
    const isLink = this.href ? true : false;
    return html`
      <div
        part="base"
        class=${classMap({
          "breadcrumb-item": true,
          active: !isLink
        })}
      >
        ${isLink
          ? html`
              <a
                part="label"
                href="${this.href}"
                rel=${ifDefined(this.target ? this.rel : undefined)}
                target=${ifDefined(this.target)}
                ><slot></slot
              ></a>
            `
          : html`<span part="label"><slot></slot></span>`}
        <slot name="separator" class="breadcrumb-item__separator" aria-hidden="true"></slot>
      </div>
    `;
  }
}

export default SgdsBreadcrumbItem;
