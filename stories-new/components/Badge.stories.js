import { Template, args, parameters } from "../templates/Badge/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Badge",

  argTypes: {
    variant: {
      defaultValue: "primary",
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]
    },

    outlined: {
      defaultValue: false,
      control: "boolean"
    },

    roundedPill: {
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
