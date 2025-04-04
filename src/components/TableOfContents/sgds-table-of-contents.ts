import SgdsElement from "../../base/sgds-element";
import { html } from "lit";
import tableOfContentsStyle from "./table-of-contents.css";

/**
 *
 * @summary Tables of contents provide a page overview and direct access to specific sections.
 *
 * @slot default - The slot for the header
 * @slot contents - The slot for the contents
 */

export class SgdsTableOfContents extends SgdsElement {
  static styles = [...SgdsElement.styles, tableOfContentsStyle];

  render() {
    return html`<div class="container">
      <slot></slot>
      <ul class="contents">
        <slot name="contents"></slot>
      </ul>
    </div> `;
  }
}

export default SgdsTableOfContents;
