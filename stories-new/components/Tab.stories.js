import { Template, args, parameters } from "../templates/Tab/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Tab",

  argTypes: {
    variant: {
      control: "select",
      options: ["tabs-basic-toggle", "tabs-info-toggle"]
    },

    name: {
      defaultValue: "",
      control: "text"
    },

    active: {
      defaultValue: false,
      control: "boolean"
    },

    panel: {
      defaultValue: "",
      control: "text"
    },

    disabled: {
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
