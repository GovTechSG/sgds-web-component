import { Template, args, parameters } from "../templates/Switch/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Switch",

  argTypes: {
    size: {
      defaultValue: "sm",
      control: "select",
      options: ["sm", "md"]
    },

    name: {
      control: "text"
    },

    ariaLabel: {
      defaultValue: "checkbox",
      control: "text"
    },

    value: {
      control: "text"
    },

    required: {
      defaultValue: false,
      control: "boolean"
    },

    checked: {
      defaultValue: false,
      control: "boolean"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    hasFeedback: {
      defaultValue: false,
      control: "boolean"
    },

    invalidFeedback: {
      control: "select",
      options: ["string", "undefined"]
    },

    isInline: {
      defaultValue: false,
      control: "boolean"
    },

    defaultChecked: {
      defaultValue: false,
      control: "boolean"
    },

    invalid: {
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
