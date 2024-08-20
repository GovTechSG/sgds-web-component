import { __decorate } from "tslib";
import { html, nothing } from "lit";
import { property } from "lit/decorators.js";
import SgdsElement from "../../base/sgds-element";
import { watch } from "../../utils/watch";
import { classMap } from "lit/directives/class-map.js";
import paginationStyle from "./pagination.css";
/**
 * @summary The Pagination component enables the user to select a specific page from a range of pages
 *
 * @event sgds-page-change - Event is emitted when `handleNextButton`, `handlePrevButton`, `handleNextEllipsisButton` and `handlePrevEllipsisButton` was called.
 *
 * @cssproperty --sgds-pagination-color - The text color of pagination
 * @cssproperty --sgds-pagination-bg - The background color of pagination
 * @cssproperty --sgds-pagination-hover-bg - The  background color of pagination in hover state
 * @cssproperty --sgds-pagination-hover-border-color - The border color of pagination in hover state
 * @cssproperty --sgds-pagination-active-color - The text color of pagination in active state
 * @cssproperty --sgds-pagination-active-bg - The background color of pagination in active state
 * @cssproperty --sgds-pagination-disabled-color - The text color of pagination in disabled state
 * @cssproperty --sgds-pagination-disabled-bg - The background color of pagination in disabled state
 * @cssproperty --sgds-pagination-focus-box-shadow - The box shadow of pagination in focused state
 *
 *
 **/
export class SgdsPagination extends SgdsElement {
    constructor() {
        super(...arguments);
        /** Inserts the length value from a given sets of data objects*/
        this.dataLength = 0;
        /** Sets the starting active page upon render*/
        this.currentPage = 1;
        /** Sets the amount of data objects to be displayed per page */
        this.itemsPerPage = 5;
        /** Sets the page limit to be displayed at any given render. e.g 3, 5, 7, 9 */
        this.limit = 3;
        /** Sets the page direction button to contain text and/or icon */
        this.directionVariant = "icon-text";
        /** Sets the size of all page items. */
        this.size = "sm";
        /** Toggles ellipsis buttons to be able to increment/decrement pages based on the ellipsisJump value set. By default, it will be false */
        this.ellipsisOn = false;
        /** When ellipsisOn is true, length of decrementing/incrementing of pages can be set with a number value*/
        this.ellipsisJump = 3;
        /** Enables rendering of the first-page button on the pagination, allowing users to jump to the initial page. By default, it will be false. When true, the first ellipsis will always be rendered */
        this.showFirstPage = false;
        /** Enables rendering of the last-page button on the pagination, allowing users to jump to the last page. By default, it will be false */
        this.showLastPage = false;
        this.ellipsisContent = html `
    <span aria-hidden="true">…</span>
    <span class="visually-hidden">Ellipsis</span>
  `;
        /** @internal */
        this._renderFirstEllipsis = () => {
            const isHidden = !(this.pages.length !== this._sanitizeLimit && this.currentPage - Math.floor(this._sanitizeLimit / 2) > 1);
            if (isHidden) {
                return null;
            }
            const tabIndex = isHidden ? -1 : 0;
            return html `
      <li
        class=${classMap({ "page-item": true, disabled: !this.ellipsisOn })}
        @click=${this.ellipsisOn && this._handlePrevEllipsisButton}
        @keydown=${(e) => this._handleKeyDown(e, "ellipsis", undefined, true)}
      >
        <span class="page-link" role="button" tabindex=${tabIndex}>${this.ellipsisContent}</span>
      </li>
    `;
        };
    }
    /**@internal */
    _handleValueChange() {
        this.emit("sgds-page-change", { detail: { currentPage: this.currentPage } });
    }
    /** @internal */
    _handlePageClick(event) {
        const liTarget = event.target;
        const clickedLi = liTarget.closest("li");
        if (clickedLi) {
            const clickedPage = Number(clickedLi.getAttribute("key"));
            if (clickedPage !== this.currentPage) {
                this.currentPage = clickedPage;
            }
        }
    }
    /** @internal */
    _handleNextButton() {
        this.currentPage = this.currentPage + 1;
    }
    /** @internal */
    _handlePrevButton() {
        this.currentPage = this.currentPage - 1;
    }
    /** @internal */
    _handleNextEllipsisButton() {
        this.currentPage = this.currentPage + this.ellipsisJump;
        if (this.currentPage >= this.pages.length)
            this.currentPage = this.pages.length;
    }
    /** @internal */
    _handlePrevEllipsisButton() {
        this.currentPage = this.currentPage - this.ellipsisJump;
        if (this.currentPage <= 1)
            this.currentPage = this.pages[0];
    }
    /** @internal */
    get pages() {
        const pages = [];
        for (let i = 1; i <= Math.ceil(this.dataLength / this.itemsPerPage); i++) {
            pages.push(i);
        }
        return pages;
    }
    /** @internal */
    get _sanitizeLimit() {
        return this.limit >= this.pages.length ? this.pages.length : this.limit;
    }
    /**@internal */
    _handleKeyDown(event, action, number, isFirstEllipsis, isPrevButton) {
        if (event.key === "Enter") {
            switch (action) {
                case "pageNumber":
                    this.currentPage = number;
                    break;
                case "ellipsis":
                    if (isFirstEllipsis) {
                        this._handlePrevEllipsisButton();
                    }
                    else {
                        this._handleNextEllipsisButton();
                    }
                    break;
                case "directionButton":
                    if (isPrevButton) {
                        this._handlePrevButton();
                    }
                    else {
                        this._handleNextButton();
                    }
                    break;
            }
        }
    }
    _renderFirstPage() {
        let sanitizeStartPage = this.currentPage - Math.floor(this._sanitizeLimit / 2);
        if (this.pages.length - sanitizeStartPage < this.limit) {
            sanitizeStartPage = this.pages.length + 1 - this.limit;
        }
        if (sanitizeStartPage > 1) {
            return html `
        <li key=${1} class="page-item ${this.currentPage === 1 ? "active" : ""}">
          <span
            class="page-link"
            tabindex="0"
            @click=${this._handlePageClick}
            @keydown=${(e) => this._handleKeyDown(e, "pageNumber", 1)}
            >1</span
          >
        </li>
      `;
        }
        else {
            return null;
        }
    }
    /** @internal */
    _renderPgNumbers() {
        const pagesToShow = [];
        let sanitizeStartPage = 1;
        let endPage;
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
        return pagesToShow.map(number => html `
        <li key=${number} class="page-item ${this.currentPage === number ? "active" : ""}">
          <span
            class="page-link"
            tabindex="0"
            @click=${this._handlePageClick}
            @keydown=${(e) => this._handleKeyDown(e, "pageNumber", number)}
            >${number}</span
          >
        </li>
      `);
    }
    /** @internal */
    _renderLastEllipsis() {
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
            return html `
        <li
          class="page-item ${this.ellipsisOn ? "" : "disabled"} "
          @click=${this.ellipsisOn && this._handleNextEllipsisButton}
          @keydown=${(e) => this._handleKeyDown(e, "ellipsis", undefined, false)}
        >
          <span class="page-link" role="button" tabindex=${tabIndex}>${this.ellipsisContent}</span>
        </li>
      `;
        }
        else {
            return html `
        <li class="page-item ${this.ellipsisOn ? "" : "disabled"} ">
          <span class="page-link disabled" tabindex=${tabIndex}>${this.ellipsisContent}</span>
        </li>
      `;
        }
    }
    _renderLastPage() {
        const isEvenLimit = this._sanitizeLimit % 2 === 0;
        const differentialLimitCondition = isEvenLimit
            ? this.currentPage + Math.floor(this._sanitizeLimit / 2) <= this.pages.length
            : this.currentPage + Math.floor(this._sanitizeLimit / 2) < this.pages.length;
        if (this.pages.length !== this._sanitizeLimit && differentialLimitCondition) {
            return html `
        <li key=${this.pages.length} class="page-item ${this.currentPage === this.pages.length ? "active" : ""}">
          <span
            class="page-link"
            tabindex="0"
            @click=${this._handlePageClick}
            @keydown=${(e) => this._handleKeyDown(e, "pageNumber", this.pages.length)}
            >${this.pages.length}</span
          >
        </li>
      `;
        }
        else {
            return null;
        }
    }
    /** @internal */
    _getLeftChevronSVG() {
        return html `
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
    _getRightChevronSVG() {
        return html `
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
    _renderDirectionButton(directionLabel, iconClass, clickHandler, keydownHandler, directionVariant) {
        const isDisabled = iconClass === "left" ? this.currentPage === 1 : this.currentPage === this.pages.length;
        const tabIndex = isDisabled ? -1 : 0;
        const keydownListener = (event) => {
            if (!isDisabled && event.key === "Enter") {
                keydownHandler(event);
            }
        };
        return html `
      <li class="page-item ${isDisabled ? "disabled" : ""}" @click=${isDisabled ? undefined : clickHandler}>
        <span class="page-link" tabindex=${tabIndex} @keydown=${keydownListener}>
          ${directionVariant === "icon-text"
            ? html `
                ${iconClass === "left" ? this._getLeftChevronSVG() : ""} ${directionLabel}
                ${iconClass === "right" ? this._getRightChevronSVG() : ""}
              `
            : directionVariant === "text"
                ? html `${directionLabel}`
                : directionVariant === "icon"
                    ? html `${iconClass === "left" ? this._getLeftChevronSVG() : this._getRightChevronSVG()}`
                    : html ``}
        </span>
      </li>
    `;
    }
    render() {
        return html `
      <nav aria-label="pagination" role="navigation">
        <ul class="pagination pagination-${this.size} sgds" directionVariant=${this.directionVariant}>
          ${this._renderDirectionButton("Previous", "left", this._handlePrevButton, (e) => this._handleKeyDown(e, "directionButton", undefined, undefined, true), this.directionVariant)}
          ${this.showFirstPage ? this._renderFirstPage() : nothing}
          ${this.showFirstPage || this.ellipsisOn ? this._renderFirstEllipsis() : nothing} ${this._renderPgNumbers()}
          ${this._renderLastEllipsis()} ${this.showLastPage ? this._renderLastPage() : nothing}
          ${this._renderDirectionButton("Next", "right", this._handleNextButton, (e) => this._handleKeyDown(e, "directionButton", undefined, undefined, false), this.directionVariant)}
        </ul>
      </nav>
    `;
    }
}
SgdsPagination.styles = [...SgdsElement.styles, paginationStyle];
__decorate([
    property({ type: Number })
], SgdsPagination.prototype, "dataLength", void 0);
__decorate([
    property({ type: Number })
], SgdsPagination.prototype, "currentPage", void 0);
__decorate([
    property({ type: Number })
], SgdsPagination.prototype, "itemsPerPage", void 0);
__decorate([
    property({ type: Number })
], SgdsPagination.prototype, "limit", void 0);
__decorate([
    property({ type: String })
], SgdsPagination.prototype, "directionVariant", void 0);
__decorate([
    property({ type: String })
], SgdsPagination.prototype, "size", void 0);
__decorate([
    property({ type: Boolean })
], SgdsPagination.prototype, "ellipsisOn", void 0);
__decorate([
    property({ type: Number })
], SgdsPagination.prototype, "ellipsisJump", void 0);
__decorate([
    property({ type: Boolean })
], SgdsPagination.prototype, "showFirstPage", void 0);
__decorate([
    property({ type: Boolean })
], SgdsPagination.prototype, "showLastPage", void 0);
__decorate([
    watch("currentPage")
], SgdsPagination.prototype, "_handleValueChange", null);
export default SgdsPagination;
//# sourceMappingURL=sgds-pagination.js.map