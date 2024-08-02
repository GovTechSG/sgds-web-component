import { Template, args, parameters } from "../templates/Sidenav/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Sidenav",

  argTypes: {
    body: {
      control: "object"
    },

    active: {
      defaultValue: false,
      control: "boolean"
    },

    href: {
      control: "text"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    target: {
      defaultValue: "_self",
      control: "select",
      options: ["_blank", "_parent", "_self", "_top"]
    },

    alwaysOpen: {
      defaultValue: false,
      control: "boolean"
    },

    sticky: {
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
