import { html } from "lit";

const sampleRows = [
  { id: 1, name: "Amy", status: "Active" },
  { id: 2, name: "Ben", status: "Pending" },
  { id: 3, name: "Cara", status: "Inactive" },
  { id: 4, name: "Dan", status: "Active" },
  { id: 5, name: "Eli", status: "Pending" },
  { id: 6, name: "Faye", status: "Inactive" },
  { id: 7, name: "Gabe", status: "Active" },
  { id: 8, name: "Hana", status: "Pending" },
  { id: 9, name: "Ivan", status: "Inactive" },
  { id: 10, name: "Jade", status: "Active" },
  { id: 11, name: "Kai", status: "Pending" },
  { id: 12, name: "Lena", status: "Inactive" },
  { id: 13, name: "Milo", status: "Active" },
  { id: 14, name: "Nora", status: "Pending" },
  { id: 15, name: "Owen", status: "Inactive" }
];

export const Template = args => html`
  <sgds-data-table
    .dataLength=${args.dataLength}
    .itemsPerPage=${args.itemsPerPage}
    .currentPage=${args.currentPage}
    .multiSelect=${args.multiSelect}
    .mode=${args.mode}
    .serverSort=${args.serverSort}
    .isLoading=${args.isLoading}
    .hideFooter=${args.hideFooter}
    .footerText=${args.footerText}
  >
    <sgds-data-table-row>
      <sgds-data-table-head .sorting=${false}>#</sgds-data-table-head>
      <sgds-data-table-head .sorting=${false}>Name</sgds-data-table-head>
      <sgds-data-table-head .sorting=${false}>Status</sgds-data-table-head>
      <sgds-data-table-head .sorting=${false}>Button (sm)</sgds-data-table-head>
      <sgds-data-table-head .sorting=${false}>Overflow</sgds-data-table-head>
    </sgds-data-table-row>
    ${sampleRows.map(
      row => html`
        <sgds-data-table-row>
          <sgds-data-table-cell>${row.id}</sgds-data-table-cell>
          <sgds-data-table-cell>${row.name}</sgds-data-table-cell>
          <sgds-data-table-cell>
            ${row.status === "Active"
              ? html`<sgds-badge variant="success" outlined>${row.status}</sgds-badge>`
              : row.status === "Pending"
              ? html`<sgds-badge variant="warning" outlined>${row.status}</sgds-badge>`
              : html`<sgds-badge variant="neutral" outlined>${row.status}</sgds-badge>`}
          </sgds-data-table-cell>
          <sgds-data-table-cell>
            <sgds-button size="sm" variant="outline">View</sgds-button>
          </sgds-data-table-cell>
          <sgds-data-table-cell>
            <sgds-overflow-menu size="sm">
              <sgds-dropdown-item ariaLabel="View">View</sgds-dropdown-item>
              <sgds-dropdown-item ariaLabel="Edit">Edit</sgds-dropdown-item>
              <sgds-dropdown-item ariaLabel="Delete">Delete</sgds-dropdown-item>
            </sgds-overflow-menu>
          </sgds-data-table-cell>
        </sgds-data-table-row>
      `
    )}
  </sgds-data-table>
`;

export const args = {
  dataLength: 15,
  itemsPerPage: 5,
  currentPage: 1,
  multiSelect: false,
  mode: "client",
  serverSort: false,
  isLoading: false,
  hideFooter: false,
  footerText: ""
};

export const parameters = {};

export const play = undefined;
