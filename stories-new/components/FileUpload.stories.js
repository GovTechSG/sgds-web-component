import { Template, args, parameters } from "../templates/FileUpload/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/FileUpload",

  argTypes: {
    variant: {
      defaultValue: "primary",
      control: "select",

      options: [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
        "link",
        "outline-primary",
        "outline-secondary",
        "outline-success",
        "outline-danger",
        "outline-warning",
        "outline-info",
        "outline-light",
        "outline-dark"
      ]
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    multiple: {
      defaultValue: false,
      control: "boolean"
    },

    accept: {
      defaultValue: "",
      control: "text"
    },

    size: {
      control: "select",
      options: ["sm", "lg"]
    },

    checkedIcon: {
      defaultValue: "",
      control: "text"
    },

    cancelIcon: {
      defaultValue: "",
      control: "text"
    },

    hintText: {
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
