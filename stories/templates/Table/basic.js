import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = args => {
  return html`
    <sgds-table
      responsive=${ifDefined(args.responsive)}
      .rowHeader=${["#", "First Names", "Last Name", "Username"]}
      .tableData=${[
        ["1", "John", "Doe", "@johndoe"],
        ["2", "Jane", "Doe", "@janedoe"],
        ["3", "Bob", "Smith", "@bobsmith"]
      ]}
    >
    </sgds-table>
  `;
};

export const TemplateA = args => {
  return html`
    <sgds-table>
      <sgds-table-row>
        <sgds-table-head>#</sgds-table-head>
        <sgds-table-head>First name</sgds-table-head>
        <sgds-table-head>Last name</sgds-table-head>
        <sgds-table-head>Username</sgds-table-head>
        <sgds-table-head>Action</sgds-table-head>
      </sgds-table-row>

      <sgds-table-row>
        <sgds-table-cell>1</sgds-table-cell>
        <sgds-table-cell>John</sgds-table-cell>
        <sgds-table-cell>Doe</sgds-table-cell>
        <sgds-table-cell>
          <sgds-link>
            <a href="#">@johndoe</a>
          </sgds-link>
        </sgds-table-cell>
        <sgds-table-cell>
          <sgds-icon-button name="three-dots-vertical"></sgds-icon-button>
        </sgds-table-cell>
      </sgds-table-row>
      <sgds-table-row>
        <sgds-table-cell>2</sgds-table-cell>
        <sgds-table-cell>Jane</sgds-table-cell>
        <sgds-table-cell>Doe</sgds-table-cell>
        <sgds-table-cell>
          <sgds-link>
            <a href="#">@janedoe</a>
          </sgds-link>
        </sgds-table-cell>
        <sgds-table-cell>-</sgds-table-cell>
      </sgds-table-row>
      <sgds-table-row>
        <sgds-table-cell>3</sgds-table-cell>
        <sgds-table-cell>Bob</sgds-table-cell>
        <sgds-table-cell>Smith</sgds-table-cell>
        <sgds-table-cell>
          <sgds-link>
            <a href="#">@bobsmith</a>
          </sgds-link>
        </sgds-table-cell>
        <sgds-table-cell>
          <sgds-badge outlined> active </sgds-badge>
        </sgds-table-cell>
      </sgds-table-row>
    </sgds-table>
  `;
};

export const args = {};

export const parameters = {};
