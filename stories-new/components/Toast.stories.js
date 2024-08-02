import { Template, args, parameters } from "../templates/Toast/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Toast",

  argTypes: {
    position: {
      control: "select",

      options: [
        "top-start",
        "top-center",
        "top-end",
        "middle-start",
        "middle-center",
        "middle-end",
        "bottom-start",
        "bottom-center",
        "bottom-end"
      ]
    },

    show: {
      defaultValue: false,
      control: "boolean"
    },

    title: {
      defaultValue: "Title",
      control: "text"
    },

    noAnimation: {
      defaultValue: false,
      control: "boolean"
    },

    autohide: {
      defaultValue: false,
      control: "boolean"
    },

    delay: {
      defaultValue: "5000",
      control: "number"
    },

    status: {
      control: "select",
      options: ["success", "warning", "danger", "info"]
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
