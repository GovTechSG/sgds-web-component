import { Template, args, parameters } from "../templates/Dropdown/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Dropdown",

  argTypes: {
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

    togglerId: {
      control: "text"
    },

    togglerText: {
      defaultValue: "",
      control: "text"
    },

    noFlip: {
      defaultValue: false,
      control: "boolean"
    },

    menuAlignRight: {
      defaultValue: false,
      control: "boolean"
    },

    drop: {
      defaultValue: "down",
      control: "select",
      options: ["left", "right", "up", "down"]
    },

    variant: {
      defaultValue: "secondary",
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]
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
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
