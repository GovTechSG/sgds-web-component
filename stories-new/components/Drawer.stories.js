import { Template, args, parameters } from "../templates/Drawer/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Drawer",

  argTypes: {
    open: {
      defaultValue: false,
      control: "boolean"
    },

    label: {
      defaultValue: "",
      control: "text"
    },

    placement: {
      defaultValue: "end",
      control: "select",
      options: ["top", "end", "bottom", "start"]
    },

    contained: {
      defaultValue: false,
      control: "boolean"
    },

    noHeader: {
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
