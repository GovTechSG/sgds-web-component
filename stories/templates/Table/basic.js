import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-table
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      ?borderless=${args.borderless}
      ?hover=${args.hover}
      size=${ifDefined(args.size)}
      variant=${ifDefined(args.variant)}
      responsive=${ifDefined(args.responsive)}
      .rowHeader=${["#", "First Names", "Last Name", "Username"]}
      .tableData=${[
        ["1", "John", "Doe", "@johndoe"],
        ["2", "Jane", "Doe", "@janedoe"],
        ["3", "Bob", "Smith", "@bobsmith"]
      ]}
      ?sort=${args.sort}
      ?removableSort=${args.removableSort}
    >
    </sgds-table>
  `;
};

export const args = {};

export const parameters = {};
