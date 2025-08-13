import { html } from "lit-html";

export const Template = args => {
  const headerPositionVal = args.headerPosition ?? "horizontal";
  const data = {
    horizontal: {
      rowHeader: ["#", "First Names", "Last Name", "Username"],
      tableData: [
        ["1", "John", "Doe", "@johndoe"],
        ["2", "Jane", "Doe", "@janedoe"],
        ["3", "Bob", "Smith", "@bobsmith"]
      ]
    },
    vertical: {
      columnHeader: ["1", "2", "3"],
      tableData: [
        ["John", "Doe", "@johndoe"],
        ["Jane", "Doe", "@janedoe"],
        ["Bob", "Smith", "@bobsmith"]
      ]
    },
    both: {
      rowHeader: ["#", "First Names", "Last Name", "Username"],
      columnHeader: ["1", "2", "3"],
      tableData: [
        ["John", "Doe", "@johndoe"],
        ["Jane", "Doe", "@janedoe"],
        ["Bob", "Smith", "@bobsmith"]
      ]
    }
  }[headerPositionVal];

  return html`
    <sgds-table
      headerPosition=${headerPositionVal}
      responsive=${args.responsive}
      .columnHeader=${data.columnHeader}
      .rowHeader=${data.rowHeader}
      .tableData=${data.tableData}
    >
    </sgds-table>
  `;
};

export const args = { headerPosition: "horizontal" };

export const parameters = {};
