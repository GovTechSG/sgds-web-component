import { Template, args, parameters } from "../templates/Spinner/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Spinner",

  argTypes: {
    type: {
      defaultValue: "border",
      control: "select",
      options: ["border", "grow"]
    },

    color: {
      defaultValue: "primary",
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
