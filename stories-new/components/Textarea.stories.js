import { Template, args, parameters } from "../templates/Textarea/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Textarea",

  argTypes: {
    label: {
      defaultValue: "label",
      control: "text"
    },

    name: {
      control: "text"
    },

    textareaClasses: {
      control: "select",
      options: ["string", "undefined"]
    },

    value: {
      defaultValue: "",
      control: "text"
    },

    minlength: {
      control: "number"
    },

    maxlength: {
      control: "number"
    },

    spellcheck: {
      defaultValue: false,
      control: "boolean"
    },

    rows: {
      defaultValue: "4",
      control: "number"
    },

    placeholder: {
      defaultValue: "Placeholder",
      control: "text"
    },

    invalidFeedback: {
      defaultValue: "",
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

    resize: {
      defaultValue: "vertical",
      control: "select",
      options: ["none", "vertical", "auto"]
    },

    inputmode: {
      control: "select",
      options: ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"]
    },

    autocorrect: {
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

    invalid: {
      defaultValue: false,
      control: "boolean"
    },

    valid: {
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
