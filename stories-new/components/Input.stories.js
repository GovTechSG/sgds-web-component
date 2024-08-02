import { Template, args, parameters } from "../templates/Input/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Input",

  argTypes: {
    type: {
      defaultValue: "text",
      control: "select",
      options: ["email", "number", "password", "search", "tel", "text", "time", "url"]
    },

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

    icon: {
      control: "text"
    },

    minlength: {
      control: "number"
    },

    maxlength: {
      control: "number"
    },

    placeholder: {
      defaultValue: "placeholder",
      control: "text"
    },

    pattern: {
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

    min: {
      control: "select",
      options: ["number", "string"]
    },

    max: {
      control: "select",
      options: ["number", "string"]
    },

    step: {
      control: "select",
      options: ["number", "any"]
    },

    value: {
      defaultValue: "",
      control: "text"
    },

    defaultValue: {
      defaultValue: "",
      control: "text"
    },

    hasFeedback: {
      defaultValue: false,
      control: "boolean"
    },

    invalidFeedback: {
      defaultValue: "",
      control: "text"
    },

    invalid: {
      defaultValue: false,
      control: "boolean"
    },

    valid: {
      defaultValue: false,
      control: "boolean"
    },

    labelId: {
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
