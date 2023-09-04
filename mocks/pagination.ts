import { html } from "lit";
import { customElement } from "lit/decorators.js";
import SgdsElement from "../src/base/sgds-element";
import { SgdsTable } from "../src/components/Table";
import { SgdsPagination } from "../src/components/Pagination";

interface IDetails {
  currentPage: number;
  itemsPerPage: number;
}

@customElement("mock-pagination")
export class MockPagination extends SgdsElement {
  details: IDetails = {
    currentPage: 1,
    itemsPerPage: 5
  };
  tableData: any[] = [];

  connectedCallback() {
    super.connectedCallback();
  }

  async fetchPosts() {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error fetching posts:", error);
      return [];
    }
  }

  async firstUpdated() {
    const posts = await this.fetchPosts();

    const tableHeaders = ["Id", "Title", "Body"];
    const tableData = posts.map((post: { id: number | string; title: number | string; body: number | string }) => [
      post.id,
      post.title,
      post.body
    ]);

    this.tableData = tableData;

    const indexOfLastItem = this.details.currentPage * this.details.itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - this.details.itemsPerPage;
    const displayedData = tableData.slice(indexOfFirstItem, indexOfLastItem);

    const table = this.shadowRoot?.querySelector("sgds-table") as SgdsTable;
    const pagination = this.shadowRoot?.querySelector("sgds-pagination") as SgdsPagination;

    if (table && pagination) {
      table.tableHeaders = tableHeaders;
      table.tableData = displayedData;

      pagination.dataLength = posts.length;
      pagination.currentPage = this.details.currentPage;
      pagination.itemsPerPage = this.details.itemsPerPage;
    }
  }

  _pageChange(e: CustomEvent) {
    const updatedCurrentPage = e.detail.currentPage;
    const indexOfLastItem = updatedCurrentPage * this.details.itemsPerPage;
    const indexofFirstItem = indexOfLastItem - this.details.itemsPerPage;
    const updatedDisplayedData = this.tableData.slice(indexofFirstItem, indexOfLastItem);

    const table = this.shadowRoot?.querySelector("sgds-table") as SgdsTable;
    table.tableData = updatedDisplayedData;
  }

  render() {
    return html`
      <sgds-table></sgds-table>
      <sgds-pagination ellipsisOn @sgds-page-change=${this._pageChange}></sgds-pagination>
    `;
  }
}
