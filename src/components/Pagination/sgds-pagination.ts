import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-pagination.scss";
import { SgdsTable } from "../Table";

import { ScopedElementsMixin } from "@open-wc/scoped-elements";

/**
 * @summary
 *
 *
 */
export class SgdsPagination extends ScopedElementsMixin(SgdsElement) {
  static styles = [SgdsElement.styles, styles];

  static get scopedElements() {
    return {
      // "sgds-table": SgdsTable
    };
  }

  /** Inserts the length value from a given sets of data objects*/
  @property({ type: Number }) dataLength = 0;

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

  handlePageClick(event: MouseEvent) {
    const liTarget = event.target as HTMLElement;
    const clickedLi = liTarget.closest("li");

    if (clickedLi) {
      const clickedPage = Number(clickedLi.getAttribute("key"));
      if (clickedPage !== this.currentPage) {
        this.currentPage = clickedPage;
      }
    }
  }

  handleNextButton() {
    this.currentPage = this.currentPage + 1;
  }

  handlePrevButton() {
    this.currentPage = this.currentPage - 1;
  }

  handleNextEllipsisButton() {
    this.currentPage = this.currentPage + this.ellipsisJump;
    if (this.currentPage + this.ellipsisJump > this.pages.length) this.currentPage = this.pages.length;

  }

  handlePrevEllipsisButton() {
    this.currentPage = this.currentPage - this.ellipsisJump;
    if (this.currentPage - this.ellipsisJump < 1) this.currentPage = this.pages[0];
  }

  get pages() {
    const pages = [];
    for (let i = 1; i <= Math.ceil(this.dataLength / this.itemsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }

  get sanitizeLimit() {
    return this.limit >= this.pages.length ? this.pages.length : this.limit;
  }

  renderPgNumbers() {
    const pagesToShow = [];
    let sanitizeStartPage = 1;
    let endPage;

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

  renderFirstEllipsis = () => {
    if (this.pages.length !== this.sanitizeLimit && this.currentPage - Math.floor(this.sanitizeLimit / 2) > 1)
      return html`
        <li class="page-item" @click=${this.handlePrevEllipsisButton}>
          <span class="page-link disabled">${this.ellipsisContent}</span>
        </li>
      `;
    else return null;
  };

  renderLastEllipsis() {
    const isEvenLimit = this.sanitizeLimit % 2 === 0;
    const differentialLimitCondition = isEvenLimit
      ? this.currentPage + Math.floor(this.sanitizeLimit / 2) <= this.pages.length
      : this.currentPage + Math.floor(this.sanitizeLimit / 2) < this.pages.length;

    const shouldRenderEllipsis = this.pages.length !== this.limit && differentialLimitCondition;

    if (!shouldRenderEllipsis) {
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

  getLeftChevronSVG() {
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

  getRightChevronSVG() {
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

  directionBtnContent(directionLabel: string, iconClass: string) {
    if (this.directionVariant === "icon") {
      return iconClass === "left" ? this.getLeftChevronSVG() : this.getRightChevronSVG();
    } else if (this.directionVariant === "icon-text") {
      if (iconClass === "left") {
        return html` ${this.getLeftChevronSVG()} ${directionLabel} `;
      } else if (iconClass === "right") {
        return html` ${directionLabel} ${this.getRightChevronSVG()} `;
      }
    } else if (this.directionVariant === "text") {
      return html` ${directionLabel} `;
    } else {
      return null;
    }
  }

  render() {
    const isLastPage = this.currentPage === this.pages.length;
    const isFirstPage = this.currentPage === this.pages[0];
    return html`
      <!-- <sgds-table
        tableHeaders='["#", "First Names", "Last Name", "Username"]'
        tableData='[
        ["1", "John", "Doe", "@johndoe"],
        ["2", "Jane", "Doe", "@janedoe"],
        ["3", "Bob", "Smith", "@bobsmith"]
      ]'
      ></sgds-table> -->
      <ul class="pagination pagination-${this.size} sgds" directionVariant=${this.directionVariant}>
        <!-- Previous Button -->
        <li
          class="page-item ${isFirstPage ? "disabled" : ""}"
          @click=${isFirstPage ? undefined : this.handlePrevButton}
        >
          <span class="page-link"> ${this.directionBtnContent("Previous", "left")} </span>
        </li>
        ${this.ellipsisOn ? this.renderFirstEllipsis() : null} ${this.renderPgNumbers()} ${this.renderLastEllipsis()}
        <!-- Next Button -->
        <li class="page-item ${isLastPage ? "disabled" : ""}" @click=${isLastPage ? undefined : this.handleNextButton}>
          <span class="page-link">${this.directionBtnContent("Next", "right")}</span>
        </li>
      </ul>
    `;
  }
}

export type directionVariant = "icon" | "icon-text" | "text";

export type sizeVariant = "sm" | "md" | "lg";

export default SgdsPagination;
