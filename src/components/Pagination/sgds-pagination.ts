import { TemplateResult, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import styles from "./sgds-pagination.scss?inline";
import { watch } from "../../utils/watch";
import { classMap } from "lit/directives/class-map.js";
import paginationStyle from "./pagination.style";
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
export class SgdsPagination extends SgdsElement {
  static styles = [paginationStyle, styles];

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
  /** Enables rendering of the first-page button on the pagination, allowing users to jump to the initial page. By default, it will be false. When true, the first ellipsis will always be rendered */
  @property({ type: Boolean }) showFirstPage = false;
  /** Enables rendering of the last-page button on the pagination, allowing users to jump to the last page. By default, it will be false */
  @property({ type: Boolean }) showLastPage = false;

  /**@internal */
  @watch("currentPage")
  _handleValueChange() {
    this.emit("sgds-page-change", { detail: { currentPage: this.currentPage } });
  }

  /** @internal */
  private _handlePageClick(event: MouseEvent) {
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
  private _handleNextButton() {
    this.currentPage = this.currentPage + 1;
  }

  /** @internal */
  private _handlePrevButton() {
    this.currentPage = this.currentPage - 1;
  }

  /** @internal */
  private _handleNextEllipsisButton() {
    this.currentPage = this.currentPage + this.ellipsisJump;
    if (this.currentPage >= this.pages.length) this.currentPage = this.pages.length;
  }

  /** @internal */
  private _handlePrevEllipsisButton() {
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
  private get _sanitizeLimit() {
    return this.limit >= this.pages.length ? this.pages.length : this.limit;
  }

  /**@internal */
  private _handleKeyDown(
    event: KeyboardEvent,
    action: string,
    number?: number,
    isFirstEllipsis?: boolean,
    isPrevButton?: boolean
  ) {
    if (event.key === "Enter") {
      switch (action) {
        case "pageNumber":
          this.currentPage = number;
          break;
        case "ellipsis":
          if (isFirstEllipsis) {
            this._handlePrevEllipsisButton();
          } else {
            this._handleNextEllipsisButton();
          }
          break;
        case "directionButton":
          if (isPrevButton) {
            this._handlePrevButton();
          } else {
            this._handleNextButton();
          }
          break;
      }
    }
  }

  private _renderFirstPage() {
    const sanitizeStartPage = this.currentPage - Math.floor(this._sanitizeLimit / 2);
    if (sanitizeStartPage > 1) {
      return html`
        <li key=${1} class="page-item ${this.currentPage === 1 ? "active" : ""}">
          <span
            class="page-link"
            tabindex="0"
            @click=${this._handlePageClick}
            @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "pageNumber", 1)}
            >1</span
          >
        </li>
      `;
    } else {
      return null;
    }
  }
  /** @internal */
  private _renderPgNumbers() {
    const pagesToShow = [];
    let sanitizeStartPage = 1;
    let endPage: number;

    if (this.limit < this.pages.length) {
      sanitizeStartPage = this.currentPage - Math.floor(this._sanitizeLimit / 2);
    }

    if (this.pages.length - sanitizeStartPage < this.limit) {
      sanitizeStartPage = this.pages.length + 1 - this.limit;
    }

    if (sanitizeStartPage <= 0) {
      sanitizeStartPage = 1;
    }

    endPage = sanitizeStartPage + this._sanitizeLimit - 1;

    if (endPage > this.pages.length) {
      endPage = this.pages.length;
    }

    if (this.currentPage === this.pages.length) {
      sanitizeStartPage = this.pages.length - this._sanitizeLimit + 1;
    }

    for (let i = sanitizeStartPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
    return pagesToShow.map(
      number => html`
        <li key=${number} class="page-item ${this.currentPage === number ? "active" : ""}">
          <span
            class="page-link"
            tabindex="0"
            @click=${this._handlePageClick}
            @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "pageNumber", number)}
            >${number}</span
          >
        </li>
      `
    );
  }

  private ellipsisContent = html`
    <span aria-hidden="true">…</span>
    <span class="visually-hidden">Ellipsis</span>
  `;

  /** @internal */
  private _renderFirstEllipsis = () => {
    const isHidden = !(
      this.pages.length !== this._sanitizeLimit && this.currentPage - Math.floor(this._sanitizeLimit / 2) > 1
    );

    if (isHidden) {
      return null;
    }

    const tabIndex = isHidden ? -1 : 0;

    return html`
      <li
        class=${classMap({ "page-item": true, disabled: !this.ellipsisOn })}
        @click=${this.ellipsisOn && this._handlePrevEllipsisButton}
        @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "ellipsis", undefined, true)}
      >
        <span class="page-link" role="button" tabindex=${tabIndex}>${this.ellipsisContent}</span>
      </li>
    `;
  };

  /** @internal */
  private _renderLastEllipsis() {
    const isEvenLimit = this._sanitizeLimit % 2 === 0;
    const differentialLimitCondition = isEvenLimit
      ? this.currentPage + Math.floor(this._sanitizeLimit / 2) <= this.pages.length
      : this.currentPage + Math.floor(this._sanitizeLimit / 2) < this.pages.length;

    const shouldRenderEllipsis = this.pages.length !== this.limit && differentialLimitCondition;
    const tabIndex = shouldRenderEllipsis && this.ellipsisOn ? 0 : -1;
    if (!shouldRenderEllipsis || this._sanitizeLimit >= this.pages.length) {
      return null;
    }

    if (this.ellipsisOn) {
      return html`
        <li
          class="page-item ${this.ellipsisOn ? "" : "disabled"} "
          @click=${this.ellipsisOn && this._handleNextEllipsisButton}
          @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "ellipsis", undefined, false)}
        >
          <span class="page-link" role="button" tabindex=${tabIndex}>${this.ellipsisContent}</span>
        </li>
      `;
    } else {
      return html`
        <li class="page-item ${this.ellipsisOn ? "" : "disabled"} ">
          <span class="page-link disabled" tabindex=${tabIndex}>${this.ellipsisContent}</span>
        </li>
      `;
    }
  }

  private _renderLastPage() {
    const isEvenLimit = this._sanitizeLimit % 2 === 0;
    const differentialLimitCondition = isEvenLimit
      ? this.currentPage + Math.floor(this._sanitizeLimit / 2) <= this.pages.length
      : this.currentPage + Math.floor(this._sanitizeLimit / 2) < this.pages.length;

    if (this.pages.length !== this._sanitizeLimit && differentialLimitCondition) {
      return html`
        <li key=${this.pages.length} class="page-item ${this.currentPage === this.pages.length ? "active" : ""}">
          <span
            class="page-link"
            tabindex="0"
            @click=${this._handlePageClick}
            @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "pageNumber", this.pages.length)}
            >${this.pages.length}</span
          >
        </li>
      `;
    } else {
      return null;
    }
  }

  /** @internal */
  private _getLeftChevronSVG() {
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
  private _getRightChevronSVG() {
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
  private _renderDirectionButton(
    directionLabel: string,
    iconClass: string,
    clickHandler: (event: MouseEvent) => void,
    keydownHandler: (event: KeyboardEvent) => void,
    directionVariant: string
  ): TemplateResult {
    const isDisabled = iconClass === "left" ? this.currentPage === 1 : this.currentPage === this.pages.length;

    const tabIndex = isDisabled ? -1 : 0;

    const keydownListener = (event: KeyboardEvent) => {
      if (!isDisabled && event.key === "Enter") {
        keydownHandler(event);
      }
    };

    return html`
      <li class="page-item ${isDisabled ? "disabled" : ""}" @click=${isDisabled ? undefined : clickHandler}>
        <span class="page-link" tabindex=${tabIndex} @keydown=${keydownListener}>
          ${directionVariant === "icon-text"
            ? html`
                ${iconClass === "left" ? this._getLeftChevronSVG() : ""} ${directionLabel}
                ${iconClass === "right" ? this._getRightChevronSVG() : ""}
              `
            : directionVariant === "text"
            ? html`${directionLabel}`
            : directionVariant === "icon"
            ? html`${iconClass === "left" ? this._getLeftChevronSVG() : this._getRightChevronSVG()}`
            : html``}
        </span>
      </li>
    `;
  }

  render() {
    return html`
      <nav aria-label="pagination" role="navigation">
        <ul class="pagination pagination-${this.size} sgds" directionVariant=${this.directionVariant}>
          ${this._renderDirectionButton(
            "Previous",
            "left",
            this._handlePrevButton,
            (e: KeyboardEvent) => this._handleKeyDown(e, "directionButton", undefined, undefined, true),
            this.directionVariant
          )}
          ${this.showFirstPage ? this._renderFirstPage() : nothing}
          ${this.showFirstPage || this.ellipsisOn ? this._renderFirstEllipsis() : nothing} ${this._renderPgNumbers()}
          ${this._renderLastEllipsis()} ${this.showLastPage ? this._renderLastPage() : nothing}
          ${this._renderDirectionButton(
            "Next",
            "right",
            this._handleNextButton,
            (e: KeyboardEvent) => this._handleKeyDown(e, "directionButton", undefined, undefined, false),
            this.directionVariant
          )}
        </ul>
      </nav>
    `;
  }
}

export type directionVariant = "icon" | "icon-text" | "text";

export type sizeVariant = "sm" | "md" | "lg";

export default SgdsPagination;
