import { html } from "lit-html";

export const Template = args => {
  return html`
    <sgds-table
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      ?borderless=${args.borderless}
      ?hover=${args.hover}
      .size=${args.size}
      .variant=${args.variant}
      .responsive=${args.responsive}
      .tableHeaders=${args.tableHeaders}
      .tableData=${args.tableData}
      .sort=${args.sort}
      .removableSort=${args.removableSort}
    >
    </sgds-table>
  `;
};

export const TemplateBreakpointSpecific = args => {
  return html`
    <sgds-table .responsive=${`sm`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
    <sgds-table .responsive=${`md`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
    <sgds-table .responsive=${`lg`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
    <sgds-table .responsive=${`xl`} .tableHeaders=${args.tableHeaders} .tableData=${args.tableData}> </sgds-table>
  `;
};

export const args = {
  tableHeaders: ["#", "First Names", "Last Name", "Username"],
  tableData: [
    ["1", "John", "Doe", "@johndoe"],
    ["2", "Jane", "Doe", "@janedoe"],
    ["3", "Bob", "Smith", "@bobsmith"]
  ]
};