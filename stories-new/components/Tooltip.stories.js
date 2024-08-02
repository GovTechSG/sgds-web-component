import { Template, args, parameters } from "../templates/Tooltip/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Tooltip",

  argTypes: {
    content: {
      defaultValue: "",
      control: "text"
    },

    placement: {
      defaultValue: "top",
      control: "select",
      options: ["top", "bottom", "left", "right"]
    },

    trigger: {
      defaultValue: "hover focus",
      control: "select",
      options: ["click", "hover", "focus", "hover focus"]
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
