import { html } from "lit";

const ServerLoadingTemplate = () => html`
  <sgds-data-table mode="server" .isLoading=${true} .dataLength=${50} .itemsPerPage=${10} .currentPage=${1}>
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head>Name</sgds-data-table-head>
      <sgds-data-table-head textAlign="right">Amount</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Citizen 1</sgds-data-table-cell>
      <sgds-data-table-cell>42</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const HeaderAlignmentTemplate = () => html`
  <sgds-data-table .dataLength=${3} .itemsPerPage=${5} .currentPage=${1}>
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head textAlign="right">Amount</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>125.00</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>98.30</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>302.10</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

export const ServerLoading = {
  render: ServerLoadingTemplate.bind({}),
  name: "Server loading",
  args: {},
  parameters: {}
};

export const HeaderTextAlignment = {
  render: HeaderAlignmentTemplate.bind({}),
  name: "Header text alignment",
  args: {},
  parameters: {}
};
