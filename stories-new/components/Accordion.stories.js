import { Template, args, parameters } from "../templates/Accordion/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Accordion",

  argTypes: {
    open: {
      defaultValue: false,
      control: "boolean"
    },

    allowMultiple: {
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
