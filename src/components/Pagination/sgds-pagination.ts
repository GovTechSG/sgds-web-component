import { TemplateResult, html } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-pagination.scss";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { watch } from "../../utils/watch";

/**
 * @summary The Pagination component enables the user to select a specific page from a range of pages
 *
 * @event sgds-page-change - Event is emitted when `handleNextButton`, `handlePrevButton`, `handleNextEllipsisButton` and `handlePrevEllipsisButton` was called.
 *
 * @cssproperty --pagination-color Sets the pagination color. <br>Default value `--sgds-cyan`
 * @cssproperty --pagination-bg-color Sets the pagination background color. <br>Default value `--sgds-white`
 * @cssproperty --pagination-hover-bg-color Sets the pagination hover state background color. <br>Default value `--sgds-gray-200`
 * @cssproperty --pagination-hover-border-color Sets the pagination hover state border color. <br>Default value `--sgds-gray-300`
 * @cssproperty --pagination-active-color Sets the pagination hover state color. <br>Default value `--sgds-white`
 * @cssproperty --pagination-active-bg-color Sets the pagination active state background color. <br>Default value `--sgds-cyan`
 * @cssproperty --pagination-disabled-color Sets the pagination disabled state color. <br>Default value `--sgds-gray-600`
 * @cssproperty --pagination-disabled-bg-color Sets the pagination disabled state background color. <br>Default value `--sgds-white`
 * 
 *
 **/
export class SgdsPagination extends ScopedElementsMixin(SgdsElement) {
  static styles = [SgdsElement.styles, styles];

  /** Inserts the length value from a given sets of data objects*/
  @property({ type: String }) dataLength = 0;

  /** Sets the starting active page upon render*/
  @property({ type: Number }) currentPage = 1;

  /** Sets the amount of data objects to be displayed per page */
  @property({ type: Number }) itemsPerPage = 5;

  /** Sets the page limit to be displayed at any given render. e.g 3, 5, 7, 9 */
  @property({ type: Number }) limit = 3;

  /** Sets the page direction button to contain text and/or icon */
  @property({ type: String }) directionVariant: directionVariant = "icon-text";

  /** Sets the size of all page items. */
  @property({ type: String }) size: sizeVariant = "sm";

  /** Toggles ellipsis buttons to be able to increment/decrement pages based on the ellipsisJump value set. By default, it will be false */
  @property({ type: Boolean }) ellipsisOn = false;

  /** When ellipsisOn is true, length of decrementing/incrementing of pages can be set with a number value*/
  @property({ type: Number }) ellipsisJump = 3;

  connectedCallback() {
    super.connectedCallback();
  }

  @watch("currentPage")
  handleValueChange() {
    this.emit("sgds-page-change", { detail: { currentPage: this.currentPage } });
  }

  /** @internal */
  private handlePageClick(event: MouseEvent) {
    const liTarget = event.target as HTMLElement;
    const clickedLi = liTarget.closest("li");

    if (clickedLi) {
      const clickedPage = Number(clickedLi.getAttribute("key"));
      if (clickedPage !== this.currentPage) {
        this.currentPage = clickedPage;
      }
    }
  }

  /** @internal */
  private handleNextButton() {
    this.currentPage = this.currentPage + 1;
  }

  /** @internal */
  private handlePrevButton() {
    this.currentPage = this.currentPage - 1;
  }

  /** @internal */
  private handleNextEllipsisButton() {
    this.currentPage = this.currentPage + this.ellipsisJump;
    if (this.currentPage >= this.pages.length) this.currentPage = this.pages.length;
  }

  /** @internal */
  private handlePrevEllipsisButton() {
    this.currentPage = this.currentPage - this.ellipsisJump;
    if (this.currentPage <= 1) this.currentPage = this.pages[0];
  }

  /** @internal */
  private get pages() {
    const pages = [];
    for (let i = 1; i <= Math.ceil(this.dataLength / this.itemsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }

  /** @internal */
  private get sanitizeLimit() {
    return this.limit >= this.pages.length ? this.pages.length : this.limit;
  }

  /** @internal */
  private renderPgNumbers() {
    const pagesToShow = [];
    let sanitizeStartPage = 1;
    let endPage: number;

    if (this.limit < this.pages.length) {
      sanitizeStartPage = this.currentPage - Math.floor(this.sanitizeLimit / 2);
    }

    if (this.pages.length - sanitizeStartPage < this.limit) {
      sanitizeStartPage = this.pages.length + 1 - this.limit;
    }

    if (sanitizeStartPage <= 0) {
      sanitizeStartPage = 1;
    }

    endPage = sanitizeStartPage + this.sanitizeLimit - 1;

    if (endPage > this.pages.length) {
      endPage = this.pages.length;
    }

    if (this.currentPage === this.pages.length) {
      sanitizeStartPage = this.pages.length - this.sanitizeLimit + 1;
    }

    for (let i = sanitizeStartPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow.map(
      number => html`
        <li key=${number} class="page-item ${this.currentPage === number ? "active" : ""}">
          <span class="page-link" @click=${this.handlePageClick}>${number}</span>
        </li>
      `
    );
  }

  ellipsisContent = html`
    <span aria-hidden="true">…</span>
    <span class="visually-hidden">Ellipsis</span>
  `;

  /** @internal */
  private renderFirstEllipsis = () => {
    if (this.pages.length !== this.sanitizeLimit && this.currentPage - Math.floor(this.sanitizeLimit / 2) > 1)
      return html`
        <li class="page-item" @click=${this.handlePrevEllipsisButton}>
          <span class="page-link disabled" role="button">${this.ellipsisContent}</span>
        </li>
      `;
    else return null;
  };

  /** @internal */
  private renderLastEllipsis() {
    const isEvenLimit = this.sanitizeLimit % 2 === 0;
    const differentialLimitCondition = isEvenLimit
      ? this.currentPage + Math.floor(this.sanitizeLimit / 2) <= this.pages.length
      : this.currentPage + Math.floor(this.sanitizeLimit / 2) < this.pages.length;

    const shouldRenderEllipsis = this.pages.length !== this.limit && differentialLimitCondition;

    if (!shouldRenderEllipsis || this.sanitizeLimit >= this.pages.length) {
      return null;
    }

    return html`
      <li
        class="page-item ${this.ellipsisOn ? "" : "disabled"} "
        @click=${this.ellipsisOn ? this.handleNextEllipsisButton : null}
      >
        ${this.ellipsisOn
          ? html` <a class="page-link" role="button" tabindex="0">${this.ellipsisContent}</a> `
          : html` <span class="page-link disabled">${this.ellipsisContent}</span> `}
      </li>
    `;
  }

  /** @internal */
  private getLeftChevronSVG() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
        />
      </svg>
    `;
  }

  /** @internal */
  private getRightChevronSVG() {
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    `;
  }

  /** @internal */
  private renderDirectionButton(
    directionLabel: string,
    iconClass: string,
    clickHandler: (event: MouseEvent) => void,
    directionVariant: string
  ): TemplateResult {
    const isDisabled = iconClass === "left" ? this.currentPage === 1 : this.currentPage === this.pages.length;

    return html`
      <li class="page-item ${isDisabled ? "disabled" : ""}" @click=${isDisabled ? undefined : clickHandler}>
        <span class="page-link">
          ${directionVariant === "icon-text"
            ? html`
                ${iconClass === "left" ? this.getLeftChevronSVG() : ""} ${directionLabel}
                ${iconClass === "right" ? this.getRightChevronSVG() : ""}
              `
            : directionVariant === "text"
            ? html`${directionLabel}`
            : directionVariant === "icon"
            ? html`${iconClass === "left" ? this.getLeftChevronSVG() : this.getRightChevronSVG()}`
            : html``}
        </span>
      </li>
    `;
  }

  render() {
    return html`
      <ul class="pagination pagination-${this.size} sgds" directionVariant=${this.directionVariant}>
        ${this.renderDirectionButton("Previous", "left", this.handlePrevButton, this.directionVariant)}
        ${this.ellipsisOn ? this.renderFirstEllipsis() : null} ${this.renderPgNumbers()} ${this.renderLastEllipsis()}
        ${this.renderDirectionButton("Next", "right", this.handleNextButton, this.directionVariant)}
      </ul>
    `;
  }
}

export type directionVariant = "icon" | "icon-text" | "text";

export type sizeVariant = "sm" | "md" | "lg";

export default SgdsPagination;
