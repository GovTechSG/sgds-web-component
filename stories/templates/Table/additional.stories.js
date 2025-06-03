const mockRowHeader = [
  {
    key: "first-name",
    value: "First Name"
  },
  {
    key: "last-name",
    value: "Last Name",
    render: {
      id: "id-of-link",
      type: "link"
    }
  },
  {
    key: "email",
    value: "Email",
    render: {
      id: "id-of-badge",
      type: "badge",
      props: {
        variant: "success",
        variant_key: "status_color"
      }
    }
  },
  {
    key: "action",
    value: "Button",
    render: {
      id: "id-of-button",
      type: "button",
      props: {
        variant: "outline",
        type: "reset"
      }
    }
  },
  {
    key: "action",
    value: "icon-button",
    render: [
      {
        id: "id-of-icon-button-1",
        type: "icon-button",
        props: {
          variant: "outline",
          name: "plus"
        }
      },
      {
        id: "id-of-icon-button-2",
        type: "icon-button",
        props: {
          variant: "outline",
          name: "plus"
        }
      }
    ]
  }
];

const mockTableData = [
  {
    email: "@alicedoe",
    "first-name": "Alice",
    "last-name": "Doe",
    action: "View",
    status_color: "warning"
  },
  {
    email: "@johndoe",
    "first-name": "John",
    "last-name": "Doe",
    action: "View"
  },
  {
    email: "@bobdoe",
    "first-name": "Bob",
    "last-name": "Kepner",
    action: "View"
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
