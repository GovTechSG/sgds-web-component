import { Template, args, parameters } from "../templates/ActionCard/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/ActionCard",

  argTypes: {
    name: {
      control: "text"
    },

    value: {
      control: "text"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    checked: {
      defaultValue: false,
      control: "boolean"
    },

    type: {
      defaultValue: "checkbox",
      control: "select",
      options: ["checkbox", "radio"]
    },

    active: {
      defaultValue: false,
      control: "boolean"
    },

    borderColor: {
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"]
    },

    bgColor: {
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light"]
    },

    textColor: {
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark", "light", "white", "muted"]
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
