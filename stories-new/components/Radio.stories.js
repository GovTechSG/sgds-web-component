import { Template, args, parameters } from "../templates/Radio/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Radio",

  argTypes: {
    invalid: {
      defaultValue: false,
      control: "boolean"
    },

    value: {
      control: "text"
    },

    name: {
      defaultValue: "option",
      control: "text"
    },

    required: {
      defaultValue: false,
      control: "boolean"
    },

    invalidFeedback: {
      defaultValue: "",
      control: "text"
    },

    hasFeedback: {
      defaultValue: false,
      control: "boolean"
    },

    validity: {
      control: "object"
    },

    checked: {
      defaultValue: false,
      control: "boolean"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    isInline: {
      defaultValue: false,
      control: "boolean"
    },

    ariaLabel: {
      defaultValue: "",
      control: "text"
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
