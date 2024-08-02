import { Template, args, parameters } from "../templates/Progress/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Progress",

  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info", "dark"]
    },

    value: {
      control: "number"
    },

    ariamin: {
      control: "number"
    },

    ariamax: {
      control: "number"
    },

    arialabel: {
      defaultValue: "",
      control: "text"
    },

    striped: {
      defaultValue: false,
      control: "boolean"
    },

    animated: {
      defaultValue: false,
      control: "boolean"
    },

    label: {
      defaultValue: "",
      control: "text"
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
