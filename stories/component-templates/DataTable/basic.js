import { html } from "lit";

export const Template = args => html`
  <sgds-data-table
    .dataLength=${args.dataLength}
    .itemsPerPage=${args.itemsPerPage}
    .currentPage=${args.currentPage}
    .multiSelect=${args.multiSelect}
    .mode=${args.mode}
    .isLoading=${args.isLoading}
    .hideFooter=${args.hideFooter}
    .footerText=${args.footerText}
  >
    <sgds-data-table-row>
      <sgds-data-table-head sortKey="id" sortable>#</sgds-data-table-head>
      <sgds-data-table-head sortKey="name" sortable>Name</sgds-data-table-head>
      <sgds-data-table-head sortKey="status" sortable textAlign="right">Status</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Amy</sgds-data-table-cell>
      <sgds-data-table-cell>Active</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Ben</sgds-data-table-cell>
      <sgds-data-table-cell>Pending</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Cara</sgds-data-table-cell>
      <sgds-data-table-cell>Inactive</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

export const args = {
  dataLength: 3,
  itemsPerPage: 5,
  currentPage: 1,
  multiSelect: false,
  mode: "client",
  isLoading: false,
  hideFooter: false,
  footerText: ""
};

export const parameters = {};

export const play = undefined;
