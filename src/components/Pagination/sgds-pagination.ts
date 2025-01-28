import { TemplateResult, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import SgdsButton from "../Button/sgds-button";
import SgdsIcon from "../Icon/sgds-icon";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import paginationStyle from "./pagination.css";

export type Navigation = "button" | "icon-button";

/**
 * @summary The Pagination component enables the user to select a specific page from a range of pages
 *
 * @event sgds-page-change - Event is emitted when `handleNextButton`, `handlePrevButton`, `handleNextEllipsisButton` and `handlePrevEllipsisButton` was called.
 *
 **/
export class SgdsPagination extends SgdsElement {
  static styles = [...SgdsElement.styles, paginationStyle];

  static dependencies = {
    "sgds-icon-button": SgdsIconButton,
    "sgds-button": SgdsButton,
    "sgds-icon": SgdsIcon
  };

  /** Inserts the length value from a given sets of data objects*/
  @property({ type: Number }) dataLength = 0;

  /** Sets the starting active page upon render*/
  @property({ type: Number }) currentPage = 1;

  /** Sets the amount of data objects to be displayed per page */
  @property({ type: Number }) itemsPerPage = 5;

  /** Sets the variant of the pagination. */
  @property({ type: String }) variant: "default" | "number" | "input" | "button" | "description" = "default";

  /** Sets the page direction button to contain text and/or icon */
  @property({ type: String }) navigation: Navigation = "icon-button";

  /** Sets the size of all page items. */
  @property({ type: String }) size: SizeVariant = "md";

  /**
   * The number of pages to show besides first and last page. First and last page always appears
   */
  @state() private _limit: 3 | 4 | 5 = 4;

  /**@internal */
  @watch("currentPage", { waitUntilFirstUpdate: false })
  _handleValueChange() {
    this.emit("sgds-page-change", { detail: { currentPage: this.currentPage } });
    /**
     * Always showing 7 li at a time.
     * The case when both ellipsis is not needed
     */
    if (this.pages.length <= 7) {
      return (this._limit = 5);
    }
    /**
     * The case when currentPage is reaching the endPage
     */
    if (this.pages.length - this.currentPage <= 3) {
      return (this._limit = 4);
    }
    /**
     * The case when currentPage is after 4
     */
    if (this.currentPage > 4) {
      return (this._limit = 3);
    } else {
      return (this._limit = 4);
    }
  }

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

  private _handleNextButton() {
    this.currentPage = this.currentPage + 1;
  }

  private _handlePrevButton() {
    this.currentPage = this.currentPage - 1;
  }

  private get pages() {
    const pages = [];
    for (let i = 1; i <= Math.ceil(this.dataLength / this.itemsPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }

  private _handleKeyDown(event: KeyboardEvent, action: string, number?: number, isPrevButton?: boolean) {
    if (event.key === "Enter") {
      switch (action) {
        case "pageNumber":
          this.currentPage = number;
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
    return html`
      <li key=${1} class="page-item ${this.currentPage === 1 ? "active" : ""}">
        <span
          role="button"
          class="page-link"
          aria-label=${this.currentPage === 1 ? `Current Page, Page 1` : "Go to Page 1"}
          aria-current="${this.currentPage === 1}"
          tabindex="0"
          @click=${this._handlePageClick}
          @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "pageNumber", 1)}
          >1</span
        >
      </li>
    `;
  }

  private _getAllPageNumbers(): number[] {
    const pagesToShow = [];

    for (let i = 1; i <= this.pages.length; i++) {
      pagesToShow.push(i);
    }

    return pagesToShow;
  }

  private _getPageNumbers(): number[] {
    const pagesToShow = [];
    let sanitizeStartPage = 2;
    let endPage: number;

    if (this._limit === 3) {
      sanitizeStartPage = this.currentPage - Math.floor(this._limit / 2);
    }

    if (this._limit === 4) {
      sanitizeStartPage = this.currentPage - Math.floor(this._limit / 2);
      if (this.currentPage + this._limit > this.pages.length) {
        sanitizeStartPage = this.pages.length - this._limit;
      }
    }

    if (sanitizeStartPage <= 1) {
      sanitizeStartPage = 2;
    }

    endPage = sanitizeStartPage + this._limit - 1;

    if (endPage >= this.pages.length) {
      endPage = this.pages.length - 1;
    }

    for (let i = sanitizeStartPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
    return pagesToShow;
  }

  private _renderPgNumbers(pagesToShow: number[]) {
    return pagesToShow.map(
      number => html`
        <li key=${number} class="page-item ${this.currentPage === number ? "active" : ""}">
          <span
            role="button"
            class="page-link"
            tabindex="0"
            aria-label=${this.currentPage === number ? `Current Page, Page ${number}` : `Go to Page ${number}`}
            aria-current="${this.currentPage === number}"
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
    <span class="sr-only" role="text">Ellipsis</span>
  `;

  private _renderFirstEllipsis = () => {
    const pagesLengthWithinTotalLimit = this.pages.length <= 7;

    const isHidden = pagesLengthWithinTotalLimit || !(this.pages.length !== this._limit && this.currentPage > 4);
    if (isHidden) {
      return null;
    }

    return html`
      <li class="page-item ">
        <span class="page-link ellipsis">${this.ellipsisContent}</span>
      </li>
    `;
  };

  private _renderLastEllipsis() {
    const shouldRenderEllipsis = this.pages.length !== this._limit;
    if (this.pages.length <= 7) {
      return null;
    }
    if (
      !shouldRenderEllipsis ||
      this._limit >= this.pages.length ||
      this.pages.length - this.currentPage < this._limit
    ) {
      return null;
    }
    return html`
      <li class="page-item">
        <span class="page-link ellipsis ">${this.ellipsisContent}</span>
      </li>
    `;
  }

  private _renderLastPage() {
    return html`
      <li key=${this.pages.length} class="page-item ${this.currentPage === this.pages.length ? "active" : ""}">
        <span
          role="button"
          class="page-link"
          aria-label=${this.currentPage === this.pages.length
            ? `Current Page, Page ${this.pages.length}`
            : `Go to Page ${this.pages.length}`}
          aria-current="${this.currentPage === this.pages.length}"
          tabindex="0"
          @click=${this._handlePageClick}
          @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "pageNumber", this.pages.length)}
          >${this.pages.length}</span
        >
      </li>
    `;
  }

  private _renderDirectionButton(
    directionLabel: "Prev" | "Next",
    clickHandler: (event: MouseEvent) => void
  ): TemplateResult {
    const isDisabled = directionLabel === "Prev" ? this.currentPage === 1 : this.currentPage === this.pages.length;

    const getNavButton = (direction: "Prev" | "Next") => {
      const icon = html`<sgds-icon
        size=${this.size}
        name=${direction === "Prev" ? "arrow-left" : "arrow-right"}
        slot=${direction === "Prev" ? "leftIcon" : "rightIcon"}
      ></sgds-icon>`;
      return html`
        <sgds-button
          ariaLabel=${direction === "Prev" ? "Previous" : "Next"}
          size=${this.size}
          @click=${isDisabled ? undefined : clickHandler}
          ?disabled=${isDisabled}
          variant="ghost"
          >${icon}${direction}</sgds-button
        >
      `;
    };
    if (this.navigation === "button") {
      return html`${getNavButton(directionLabel)}`;
    }
    if (this.navigation === "icon-button") {
      return html`${this._getIconButton(directionLabel, clickHandler, isDisabled)}`;
    }

    return html`${nothing}`;
  }
  private _getIconButton(direction: "Prev" | "Next", clickHandler: (e: MouseEvent) => void, isDisabled: boolean) {
    return html`
      <sgds-icon-button
        ariaLabel=${direction === "Prev" ? "Previous" : "Next"}
        size=${this.size}
        @click=${isDisabled ? undefined : clickHandler}
        ?disabled=${isDisabled}
        variant="ghost"
        name=${direction === "Prev" ? "arrow-left" : "arrow-right"}
      ></sgds-icon-button>
    `;
  }
  private _renderDescriptionPagination() {
    return html`
      ${this._getIconButton("Prev", this._handlePrevButton, this.currentPage === 1)}
      <div class="pagination-description">Page ${this.currentPage} of ${this.pages.length}</div>
      ${this._getIconButton("Next", this._handleNextButton, this.currentPage === this.pages.length)}
    `;
  }

  private _renderDefaultPagination() {
    return html`
      ${this._renderDirectionButton("Prev", this._handlePrevButton)} ${this._renderFirstPage()}
      ${this._renderFirstEllipsis()} ${this._renderPgNumbers(this._getPageNumbers())} ${this._renderLastEllipsis()}
      ${this.pages.length <= 1 ? nothing : this._renderLastPage()}
      ${this._renderDirectionButton("Next", this._handleNextButton)}
    `;
  }

  private _renderNumberPagination() {
    return html` ${this._renderPgNumbers(this._getAllPageNumbers())} `;
  }

  private _renderButtonPagination() {
    return html`
      ${this._getIconButton("Prev", this._handlePrevButton, this.currentPage === 1)}
      ${this._getIconButton("Next", this._handleNextButton, this.currentPage === this.pages.length)}
    `;
  }
  render() {
    return html`
      <nav aria-label="pagination" role="navigation">
        <ul class="pagination pagination-${this.size}">
          ${this.variant === "description" ? this._renderDescriptionPagination() : nothing}
          ${this.variant === "default" ? this._renderDefaultPagination() : nothing}
          ${this.variant === "number" ? this._renderNumberPagination() : nothing}
          ${this.variant === "button" ? this._renderButtonPagination() : nothing}
        </ul>
      </nav>
    `;
  }
}
export type SizeVariant = "sm" | "md";

export default SgdsPagination;
