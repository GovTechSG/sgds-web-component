import { TemplateResult, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import { classMap } from "lit/directives/class-map.js";
import paginationStyle from "./pagination.css";
import SgdsIconButton from "../IconButton/sgds-icon-button";
import SgdsButton from "../Button/sgds-button";
import SgdsIcon from "../Icon/sgds-icon";

export type Navigation = "button" | "icon-button";

/**
 * @summary The Pagination component enables the user to select a specific page from a range of pages
 *
 * @event sgds-page-change - Event is emitted when `handleNextButton`, `handlePrevButton`, `handleNextEllipsisButton` and `handlePrevEllipsisButton` was called.
 *
 * @cssproperty --pagination-color - The text color of pagination
 * @cssproperty --pagination-bg - The background color of pagination
 * @cssproperty --pagination-hover-bg - The  background color of pagination in hover state
 * @cssproperty --pagination-active-color - The text color of pagination in active state
 * @cssproperty --pagination-active-bg - The background color of pagination in active state
 * @cssproperty --pagination-disabled-color - The text color of pagination in disabled state
 * @cssproperty --pagination-disabled-bg - The background color of pagination in disabled state
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

  /** Sets the page limit to be displayed at any given render. e.g 3, 5, 7, 9 */
  @property({ type: Number }) limit = 3;

  @property({ type: String }) variant: "default" | "number" | "input" | "button" | "description" = "default";

  /** Sets the page direction button to contain text and/or icon */
  @property({ type: String }) navigation: Navigation = "icon-button";

  /** Sets the size of all page items. */
  @property({ type: String }) size: SizeVariant = "md";

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
    let sanitizeStartPage = this.currentPage - Math.floor(this._sanitizeLimit / 2);

    if (this.pages.length - sanitizeStartPage < this.limit) {
      sanitizeStartPage = this.pages.length + 1 - this.limit;
    }

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
        class=${classMap({ "page-item": true, "ellipsis-disabled": !this.ellipsisOn })}
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
          class="page-item ${this.ellipsisOn ? "" : "ellipsis-disabled"} "
          @click=${this.ellipsisOn && this._handleNextEllipsisButton}
          @keydown=${(e: KeyboardEvent) => this._handleKeyDown(e, "ellipsis", undefined, false)}
        >
          <span class="page-link" role="button" tabindex=${tabIndex}>${this.ellipsisContent}</span>
        </li>
      `;
    } else {
      return html`
        <li class="page-item ${this.ellipsisOn ? "" : "ellipsis-disabled"} ">
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
  private _renderDirectionButton(
    directionLabel: "Previous" | "Next",
    clickHandler: (event: MouseEvent) => void,
    keydownHandler: (event: KeyboardEvent) => void
  ): TemplateResult {
    const isDisabled = directionLabel === "Previous" ? this.currentPage === 1 : this.currentPage === this.pages.length;

    const keydownListener = (event: KeyboardEvent) => {
      if (!isDisabled && event.key === "Enter") {
        keydownHandler(event);
      }
    };
    const getNavButton = (direction: "Previous" | "Next") => {
      const icon = html`<sgds-icon size=${this.size}
        name=${direction === "Previous" ? "arrow-left" : "arrow-right"}
        slot=${direction === "Previous" ? "leftIcon" : "rightIcon"}
      ></sgds-icon>`;
      return html`
        <sgds-button
          size=${this.size}
          @click=${isDisabled ? undefined : clickHandler}
          ?disabled=${isDisabled}
          @keydown=${keydownListener}
          variant="ghost"
          >${icon}${direction}</sgds-button
        >
      `;
    };
    if (this.navigation === "button") {
      return html`${getNavButton(directionLabel)}`;
    }
    if (this.navigation === "icon-button") {
      return html`${this._getIconButton(directionLabel, clickHandler, isDisabled, keydownListener)}`;
    }

    return html`${nothing}`;
  }
  private _getIconButton(
    direction: "Previous" | "Next",
    clickHandler: (e: MouseEvent) => void,
    isDisabled: boolean,
    keydownListener: (event: KeyboardEvent) => void
  ) {
    return html`
      <sgds-icon-button
        size=${this.size}
        @click=${isDisabled ? undefined : clickHandler}
        ?disabled=${isDisabled}
        @keydown=${keydownListener}
        variant="ghost"
        name=${direction === "Previous" ? "arrow-left" : "arrow-right"}
      ></sgds-icon-button>
    `;
  }
  private _renderDescriptionPagination() {
    return html`
      ${this._getIconButton("Previous", this._handlePrevButton, this.currentPage === 1, (e: KeyboardEvent) =>
        this._handleKeyDown(e, "directionButton", undefined, undefined, true)
      )}
      <div class="pagination-description">Page ${this.currentPage} of ${this.pages.length}</div>
      ${this._getIconButton(
        "Next",
        this._handleNextButton,
        this.currentPage === this.pages.length,
        (e: KeyboardEvent) => this._handleKeyDown(e, "directionButton", undefined, undefined, true)
      )}
    `;
  }

  private _renderDefaultPagination() {
    return html`
      ${this._renderDirectionButton("Previous", this._handlePrevButton, (e: KeyboardEvent) =>
        this._handleKeyDown(e, "directionButton", undefined, undefined, true)
      )}
      ${this.showFirstPage ? this._renderFirstPage() : nothing}
      ${this.showFirstPage || this.ellipsisOn ? this._renderFirstEllipsis() : nothing} ${this._renderPgNumbers()}
      ${this._renderLastEllipsis()} ${this.showLastPage ? this._renderLastPage() : nothing}
      ${this._renderDirectionButton("Next", this._handleNextButton, (e: KeyboardEvent) =>
        this._handleKeyDown(e, "directionButton", undefined, undefined, false)
      )}
    `;
  }

  private _renderNumberPagination(){
    return html`
    ${this.showFirstPage ? this._renderFirstPage() : nothing}
    ${this.showFirstPage || this.ellipsisOn ? this._renderFirstEllipsis() : nothing} ${this._renderPgNumbers()}
    ${this._renderLastEllipsis()} ${this.showLastPage ? this._renderLastPage() : nothing}
    `
  }

  private _renderButtonPagination(){
    return html`
    ${this._getIconButton("Previous", this._handlePrevButton, this.currentPage === 1, (e: KeyboardEvent) =>
      this._handleKeyDown(e, "directionButton", undefined, undefined, true)
    )}
    ${this._getIconButton(
      "Next",
      this._handleNextButton,
      this.currentPage === this.pages.length,
      (e: KeyboardEvent) => this._handleKeyDown(e, "directionButton", undefined, undefined, true)
    )}
  `;
  }
  render() {
    return html`
      <nav aria-label="pagination" role="navigation">
        <ul class="pagination pagination-${this.size} sgds">
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
