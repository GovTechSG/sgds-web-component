import { Template, args, parameters } from "../templates/Card/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Card",

  argTypes: {
    stretchedLink: {
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
