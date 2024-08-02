import { Template, args, parameters } from "../templates/QuantityToggle/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/QuantityToggle",

  argTypes: {
    name: {
      control: "text"
    },

    min: {
      control: "number"
    },

    max: {
      control: "number"
    },

    size: {
      defaultValue: "md",
      control: "select",
      options: ["sm", "md"]
    },

    value: {
      defaultValue: "0",
      control: "number"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    buttonVariant: {
      defaultValue: "primary",
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"]
    },

    step: {
      defaultValue: "1",
      control: "number"
    },

    defaultValue: {
      defaultValue: "0",
      control: "number"
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
