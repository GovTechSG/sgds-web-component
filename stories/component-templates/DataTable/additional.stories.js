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

const NoRowsTemplate = () => html`
  <sgds-data-table>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const MultiSelectTemplate = () => html`
  <sgds-data-table .currentPage=${1} .dataLength=${3} .itemsPerPage=${5} .multiSelect=${true}>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const MultiSelectPrecheckedOnLoadTemplate = () => html`
  <sgds-data-table .currentPage=${1} .dataLength=${3} .itemsPerPage=${5} .multiSelect=${true}>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row checked>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const ExpandableRowsTemplate = () => html`
  <sgds-data-table .currentPage=${1} .dataLength=${3} .itemsPerPage=${5}>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row .expand=${true} .open=${true}>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
      <div slot="content">Department: Engineering · Join date: 01 Jan 2022 · Status: Active</div>
    </sgds-data-table-row>
    <sgds-data-table-row .expand=${true}>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
      <div slot="content">Department: Design · Join date: 15 Mar 2023 · Status: Active</div>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const ExpandableMultiSelectTemplate = () => html`
  <sgds-data-table .currentPage=${1} .dataLength=${3} .itemsPerPage=${5} .multiSelect=${true}>
    <sgds-data-table-row>
      <sgds-data-table-head>#</sgds-data-table-head>
      <sgds-data-table-head>First name</sgds-data-table-head>
      <sgds-data-table-head>Last name</sgds-data-table-head>
      <sgds-data-table-head>Username</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row .expand=${true}>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>John</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@johndoe</sgds-data-table-cell>
      <div slot="content">Department: Engineering</div>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Jane</sgds-data-table-cell>
      <sgds-data-table-cell>Doe</sgds-data-table-cell>
      <sgds-data-table-cell>@janedoe</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Bob</sgds-data-table-cell>
      <sgds-data-table-cell>Smith</sgds-data-table-cell>
      <sgds-data-table-cell>@bobsmith</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const CustomFooterTextTemplate = () => html`
  <sgds-data-table
    .currentPage=${1}
    .dataLength=${4}
    .itemsPerPage=${2}
    footerText="Showing records fetched from API cache"
  >
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head>Name</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Amy</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Ben</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Cara</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>4</sgds-data-table-cell>
      <sgds-data-table-cell>Dan</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const HideFooterTemplate = () => html`
  <sgds-data-table .currentPage=${1} .dataLength=${3} .itemsPerPage=${5} .hideFooter=${true}>
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head>Status</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1001</sgds-data-table-cell>
      <sgds-data-table-cell>Pending</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1002</sgds-data-table-cell>
      <sgds-data-table-cell>Approved</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1003</sgds-data-table-cell>
      <sgds-data-table-cell>Rejected</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const HeaderAndCellPropsTemplate = () => html`
  <sgds-data-table layout="fixed" .currentPage=${1} .dataLength=${4} .itemsPerPage=${4}>
    <sgds-data-table-row>
      <sgds-data-table-head width="88">ID</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="name">Name</sgds-data-table-head>
      <sgds-data-table-head>Role</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="score" width="120" textAlign="right">Score</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Lina</sgds-data-table-cell>
      <sgds-data-table-cell>Engineer</sgds-data-table-cell>
      <sgds-data-table-cell>82</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Adam</sgds-data-table-cell>
      <sgds-data-table-cell>Engineer</sgds-data-table-cell>
      <sgds-data-table-cell>70</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Nora</sgds-data-table-cell>
      <sgds-data-table-cell>Manager</sgds-data-table-cell>
      <sgds-data-table-cell>85</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const DefaultSortTemplate = () => html`
  <sgds-data-table .currentPage=${1} .dataLength=${4} .itemsPerPage=${4}>
    <sgds-data-table-row>
      <sgds-data-table-head sorting sortKey="id">ID</sgds-data-table-head>
      <sgds-data-table-head sorting sortKey="name" ariasort="ascending">Name</sgds-data-table-head>
      <sgds-data-table-head>Role</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell>Alice</sgds-data-table-cell>
      <sgds-data-table-cell>Engineer</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>4</sgds-data-table-cell>
      <sgds-data-table-cell>Ben</sgds-data-table-cell>
      <sgds-data-table-cell>Analyst</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Chloe</sgds-data-table-cell>
      <sgds-data-table-cell>Manager</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Darren</sgds-data-table-cell>
      <sgds-data-table-cell>Designer</sgds-data-table-cell>
    </sgds-data-table-row>
  </sgds-data-table>
`;

const RowColspanFiveByFiveTemplate = () => html`
  <sgds-data-table .currentPage=${1} .dataLength=${5} .itemsPerPage=${5}>
    <sgds-data-table-row>
      <sgds-data-table-head>ID</sgds-data-table-head>
      <sgds-data-table-head>Item</sgds-data-table-head>
      <sgds-data-table-head>Category</sgds-data-table-head>
      <sgds-data-table-head>Status</sgds-data-table-head>
      <sgds-data-table-head textAlign="right">Amount</sgds-data-table-head>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>1</sgds-data-table-cell>
      <sgds-data-table-cell>Application fee</sgds-data-table-cell>
      <sgds-data-table-cell>Service</sgds-data-table-cell>
      <sgds-data-table-cell>Paid</sgds-data-table-cell>
      <sgds-data-table-cell>120.00</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>2</sgds-data-table-cell>
      <sgds-data-table-cell colspan="2">Support package (category merged)</sgds-data-table-cell>
      <sgds-data-table-cell>Pending</sgds-data-table-cell>
      <sgds-data-table-cell>240.00</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>3</sgds-data-table-cell>
      <sgds-data-table-cell>Licence renewal</sgds-data-table-cell>
      <sgds-data-table-cell>Regulatory</sgds-data-table-cell>
      <sgds-data-table-cell>Paid</sgds-data-table-cell>
      <sgds-data-table-cell>320.00</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>4</sgds-data-table-cell>
      <sgds-data-table-cell colspan="2">Bulk order adjustment (category merged)</sgds-data-table-cell>
      <sgds-data-table-cell>Approved</sgds-data-table-cell>
      <sgds-data-table-cell>180.00</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>5</sgds-data-table-cell>
      <sgds-data-table-cell>Maintenance</sgds-data-table-cell>
      <sgds-data-table-cell>Service</sgds-data-table-cell>
      <sgds-data-table-cell>In progress</sgds-data-table-cell>
      <sgds-data-table-cell>95.00</sgds-data-table-cell>
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

export const NoRows = {
  render: NoRowsTemplate.bind({}),
  name: "No rows",
  args: {},
  parameters: {}
};

export const MultiSelect = {
  render: MultiSelectTemplate.bind({}),
  name: "Multi-select",
  args: {},
  parameters: {}
};

export const MultiSelectPrecheckedOnLoad = {
  render: MultiSelectPrecheckedOnLoadTemplate.bind({}),
  name: "Multi-select pre-checked on load",
  args: {},
  parameters: {}
};

export const ExpandableRows = {
  render: ExpandableRowsTemplate.bind({}),
  name: "Expandable rows",
  args: {},
  parameters: {}
};

export const ExpandableMultiSelect = {
  render: ExpandableMultiSelectTemplate.bind({}),
  name: "Expandable with multi-select",
  args: {},
  parameters: {}
};

export const CustomFooterText = {
  render: CustomFooterTextTemplate.bind({}),
  name: "Custom footer text",
  args: {},
  parameters: {}
};

export const HideFooter = {
  render: HideFooterTemplate.bind({}),
  name: "Hide footer",
  args: {},
  parameters: {}
};

export const HeaderColspanRowspan = {
  render: HeaderAndCellPropsTemplate.bind({}),
  name: "Header and cell props",
  args: {},
  parameters: {}
};

export const DefaultSort = {
  render: DefaultSortTemplate.bind({}),
  name: "Default sort",
  args: {},
  parameters: {}
};

export const RowColspanFiveByFive = {
  render: RowColspanFiveByFiveTemplate.bind({}),
  name: "Row colspan example (5 by 5)",
  args: {},
  parameters: {}
};

export const HeaderTextAlignment = {
  render: HeaderAlignmentTemplate.bind({}),
  name: "Header text alignment",
  args: {},
  parameters: {}
};
