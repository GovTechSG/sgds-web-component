import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

const mockRowHeader = [
  {
    key: "first-name",
    value: "First Name"
  },
  {
    key: "last-name",
    value: "Last Name"
  },
  {
    key: "email",
    value: "Email"
  },
  {
    key: "button",
    value: "Button"
  },
  {
    key: "action",
    value: "Actions"
  }
];

const mockTableData = [
  {
    email: "@alicedoe",
    "first-name": "Alice",
    "last-name": "Doe",
    button: {
      id: "email_button",
      type: "button",
      value: "@alicedoe",
      variant: "info"
    },
    action: [
      {
        id: "edit_btn",
        type: "icon-button",
        value: "edit",
        variant: "outline"
      },
      {
        id: "add_btn",
        type: "icon-button",
        value: "plus",
        variant: "outline"
      }
    ]
  },
  {
    email: "@johndoe",
    "first-name": "John",
    "last-name": "Doe",
    button: {
      id: "badge",
      type: "badge",
      value: "@johndoe",
      variant: "outline"
    },
    action: [
      {
        id: "add_btn",
        type: "icon-button",
        value: "three-dots-vertical",
        variant: "ghost"
      },
      {
        id: "add_btn",
        type: "icon-button",
        value: "trash"
      }
    ]
  }
];

export const Template = args => {
  return html`
    <sgds-table
      responsive=${ifDefined(args.responsive)}
      .rowHeader=${args.rowHeader}
      .tableData=${args.tableData}
    ></sgds-table>
  `;
};

export const args = { responsive: "sm", rowHeader: mockRowHeader, tableData: mockTableData };

export const parameters = {};
