import { Template, args, parameters } from "../templates/CloseButton/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/CloseButton",

  argTypes: {
    ariaLabel: {
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
