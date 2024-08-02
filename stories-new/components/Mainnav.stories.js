import { Template, args, parameters } from "../templates/Mainnav/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Mainnav",

  argTypes: {
    togglerText: {
      defaultValue: "",
      control: "text"
    },

    active: {
      defaultValue: false,
      control: "boolean"
    },

    popperOpts: {
      defaultValue: "{}",
      control: "object"
    },

    menuIsOpen: {
      defaultValue: false,
      control: "boolean"
    },

    close: {
      defaultValue: "default",
      control: "select",
      options: ["outside", "default", "inside"]
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    href: {
      control: "text"
    },

    target: {
      defaultValue: "_self",
      control: "select",
      options: ["_blank", "_parent", "_self", "_top"]
    },

    brandHref: {
      defaultValue: "",
      control: "text"
    },

    expand: {
      defaultValue: "lg",
      control: "select",
      options: ["sm", "md", "lg", "xl", "xxl", "always", "never"]
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
