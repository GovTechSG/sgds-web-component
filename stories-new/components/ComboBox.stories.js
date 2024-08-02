import { Template, args, parameters } from "../templates/ComboBox/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/ComboBox",

  argTypes: {
    label: {
      defaultValue: "",
      control: "text"
    },

    hintText: {
      defaultValue: "",
      control: "text"
    },

    name: {
      control: "text"
    },

    placeholder: {
      defaultValue: "placeholder",
      control: "text"
    },

    autofocus: {
      defaultValue: false,
      control: "boolean"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    required: {
      defaultValue: false,
      control: "boolean"
    },

    readonly: {
      defaultValue: false,
      control: "boolean"
    },

    value: {
      defaultValue: "",
      control: "text"
    },

    defaultValue: {
      defaultValue: "",
      control: "text"
    },

    menuList: {
      defaultValue: "[]",
      control: "object"
    },

    filterFunction: {
      control: "object"
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
