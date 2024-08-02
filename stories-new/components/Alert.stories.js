import { Template, args, parameters } from "../templates/Alert/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Alert",

  argTypes: {
    headerTag: {
      defaultValue: "h4",
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"]
    },

    href: {
      control: "text"
    },

    target: {
      control: "select",
      options: ["_blank", "_parent", "_self", "_top"]
    },

    show: {
      defaultValue: false,
      control: "boolean"
    },

    dismissible: {
      defaultValue: false,
      control: "boolean"
    },

    variant: {
      defaultValue: "primary",
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "light"]
    },

    outlined: {
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
