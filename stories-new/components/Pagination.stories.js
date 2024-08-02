import { Template, args, parameters } from "../templates/Pagination/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Pagination",

  argTypes: {
    dataLength: {
      defaultValue: "0",
      control: "number"
    },

    currentPage: {
      defaultValue: "1",
      control: "number"
    },

    itemsPerPage: {
      defaultValue: "5",
      control: "number"
    },

    limit: {
      defaultValue: "3",
      control: "number"
    },

    directionVariant: {
      defaultValue: "icon-text",
      control: "select",
      options: ["icon", "icon-text", "text"]
    },

    size: {
      defaultValue: "sm",
      control: "select",
      options: ["sm", "md", "lg"]
    },

    ellipsisOn: {
      defaultValue: false,
      control: "boolean"
    },

    ellipsisJump: {
      defaultValue: "3",
      control: "number"
    },

    showFirstPage: {
      defaultValue: false,
      control: "boolean"
    },

    showLastPage: {
      defaultValue: false,
      control: "boolean"
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
