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
    email: "@johndoe",
    "first-name": "John",
    "last-name": "Doe",
    button: "@johndoe",
    action: "actions"
  },
  {
    email: "@alicedoe",
    "first-name": "Alice",
    "last-name": "Doe",
    button: "@alicedoe",
    action: "actions"
  }
];

const mockTableDataDynamic = [
  {
    email: "@alicedoe",
    "first-name": "Alice",
    "last-name": "Doe",
    button: {
      id: "email_button",
      type: "button",
      value: "@alicedoe",
      variant: "outline"
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

export const AlwaysResponsive = {
  render: Template.bind({}),
  name: "Always Responsive",
  args: { responsive: "always", rowHeader: mockRowHeader, tableData: mockTableData },
  parameters: {},
  tags: ["!dev"]
};

export const Responsive = {
  render: Template.bind({}),
  name: "Responsive",
  args: { responsive: "sm", rowHeader: mockRowHeader, tableData: mockTableData },
  parameters: {},
  tags: ["!dev"]
};

export const DynamicCellData = {
  render: Template.bind({}),
  name: "dynamic",
  args: { responsive: "sm", rowHeader: mockRowHeader, tableData: mockTableDataDynamic },
  parameters: {},
  tags: ["!dev"]
};
