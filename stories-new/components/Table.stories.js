import { Template, args, parameters } from "../templates/Table/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Table",

  argTypes: {
    striped: {
      defaultValue: false,
      control: "boolean"
    },

    bordered: {
      defaultValue: false,
      control: "boolean"
    },

    borderless: {
      defaultValue: false,
      control: "boolean"
    },

    hover: {
      defaultValue: false,
      control: "boolean"
    },

    size: {
      control: "text"
    },

    variant: {
      control: "text"
    },

    sort: {
      defaultValue: false,
      control: "boolean"
    },

    removableSort: {
      defaultValue: false,
      control: "boolean"
    },

    responsive: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "always"]
    },

    tableHeaders: {
      defaultValue: "[]",
      control: "object"
    },

    tableData: {
      defaultValue: "[]",
      control: "select",
      options: ["Array<(string", "number)[]>"]
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
