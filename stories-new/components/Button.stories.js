import { Template, args, parameters } from "../templates/Button/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Button",

  argTypes: {
    variant: {
      control: "select",

      options: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "link"]
    },

    outlined: {
      defaultValue: false,
      control: "boolean"
    },

    size: {
      control: "select",
      options: ["sm", "lg"]
    },

    active: {
      defaultValue: false,
      control: "boolean"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    type: {
      defaultValue: "button",
      control: "select",
      options: ["button", "submit", "reset"]
    },

    href: {
      control: "text"
    },

    target: {
      control: "select",
      options: ["_blank", "_parent", "_self", "_top"]
    },

    download: {
      control: "text"
    },

    form: {
      control: "text"
    },

    formAction: {
      control: "text"
    },

    formMethod: {
      control: "select",
      options: ["post", "get"]
    },

    formNoValidate: {
      defaultValue: false,
      control: "boolean"
    },

    formTarget: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top", "string"]
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
