import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { IGeneric, IRender, IRowHeader, SgdsTable } from "../src/components/Table/sgds-table";
import { SgdsPagination } from "../src/components/Pagination/sgds-pagination";

interface Post {
  id: number | string;
  title: string | number;
  body: string | number;
}

interface PaginationProps {
  currentPage: number;
  itemsPerPage: number;
}

@customElement("mock-pagination")
export class MockPagination extends LitElement {
  paginationProps: PaginationProps = {
    currentPage: 1,
    itemsPerPage: 5
  };

  tableData: Post[] = [];
  rowHeader: IRowHeader[] = [
    {
      key: "first-name",
      value: "First Name"
    },
    {
      key: "last-name",
      value: "Last Name",
      render: {
        id: "id-of-link",
        type: "link"
      } as IRender
    }
  ];

  async connectedCallback() {
    super.connectedCallback();
    await this.firstUpdated();
  }

  async fetchPosts(): Promise<Post[]> {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data: Post[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  }

  async firstUpdated() {
    const posts: Post[] = await this.fetchPosts();

    this.tableData = posts.map(post => ({
      id: post.id,
      title: post.title,
      body: post.body
    }));

    this.updateTable();
  }

  _pageChange(e: CustomEvent) {
    const updatedCurrentPage: number = e.detail.currentPage;
    this.paginationProps.currentPage = updatedCurrentPage;
    this.updateTable();
  }

  updateTable() {
    const indexOfLastItem: number = this.paginationProps.currentPage * this.paginationProps.itemsPerPage;
    const indexOfFirstItem: number = indexOfLastItem - this.paginationProps.itemsPerPage;
    const displayedData: Post[] = this.tableData.slice(indexOfFirstItem, indexOfLastItem);

    const table = this.shadowRoot?.querySelector("sgds-table") as SgdsTable;
    const pagination = this.shadowRoot?.querySelector("sgds-pagination") as SgdsPagination;

    if (table && pagination) {
      table.rowHeader = this.rowHeader;
      table.tableData = displayedData;

      pagination.dataLength = this.tableData.length;
      pagination.currentPage = this.paginationProps.currentPage;
      pagination.itemsPerPage = this.paginationProps.itemsPerPage;
    }
  }

  render() {
    return html`
      <sgds-table></sgds-table>
      <sgds-pagination @sgds-page-change=${this._pageChange}></sgds-pagination>
    `;
  }
}
