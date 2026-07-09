import { html } from "lit";

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
      <sgds-data-table-head sortKey="id" sorting>#</sgds-data-table-head>
      <sgds-data-table-head sortKey="name" sorting>Name</sgds-data-table-head>
      <sgds-data-table-head sortKey="status" sorting>Status</sgds-data-table-head>
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
    <sgds-data-table-row>
      <sgds-data-table-cell>4</sgds-data-table-cell>
      <sgds-data-table-cell>Dan</sgds-data-table-cell>
      <sgds-data-table-cell>Active</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>5</sgds-data-table-cell>
      <sgds-data-table-cell>Eli</sgds-data-table-cell>
      <sgds-data-table-cell>Pending</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>6</sgds-data-table-cell>
      <sgds-data-table-cell>Faye</sgds-data-table-cell>
      <sgds-data-table-cell>Inactive</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>7</sgds-data-table-cell>
      <sgds-data-table-cell>Gabe</sgds-data-table-cell>
      <sgds-data-table-cell>Active</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>8</sgds-data-table-cell>
      <sgds-data-table-cell>Hana</sgds-data-table-cell>
      <sgds-data-table-cell>Pending</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>9</sgds-data-table-cell>
      <sgds-data-table-cell>Ivan</sgds-data-table-cell>
      <sgds-data-table-cell>Inactive</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>10</sgds-data-table-cell>
      <sgds-data-table-cell>Jade</sgds-data-table-cell>
      <sgds-data-table-cell>Active</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>11</sgds-data-table-cell>
      <sgds-data-table-cell>Kai</sgds-data-table-cell>
      <sgds-data-table-cell>Pending</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>12</sgds-data-table-cell>
      <sgds-data-table-cell>Lena</sgds-data-table-cell>
      <sgds-data-table-cell>Inactive</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>13</sgds-data-table-cell>
      <sgds-data-table-cell>Milo</sgds-data-table-cell>
      <sgds-data-table-cell>Active</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>14</sgds-data-table-cell>
      <sgds-data-table-cell>Nora</sgds-data-table-cell>
      <sgds-data-table-cell>Pending</sgds-data-table-cell>
    </sgds-data-table-row>
    <sgds-data-table-row>
      <sgds-data-table-cell>15</sgds-data-table-cell>
      <sgds-data-table-cell>Owen</sgds-data-table-cell>
      <sgds-data-table-cell>Inactive</sgds-data-table-cell>
    </sgds-data-table-row>
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
