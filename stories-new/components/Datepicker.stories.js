import { Template, args, parameters } from "../templates/Datepicker/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Datepicker",

  argTypes: {
    required: {
      defaultValue: false,
      control: "boolean"
    },

    name: {
      control: "text"
    },

    disabled: {
      defaultValue: false,
      control: "boolean"
    },

    initialValue: {
      defaultValue: "[]",
      control: "object"
    },

    dateFormat: {
      defaultValue: "DD/MM/YYYY",
      control: "select",
      options: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY/MM/DD"]
    },

    minDate: {
      defaultValue: "",
      control: "text"
    },

    maxDate: {
      defaultValue: "",
      control: "text"
    },

    mode: {
      defaultValue: "single",
      control: "select",
      options: ["single", "range"]
    },

    invalidFeedback: {
      defaultValue: "Please enter a valid date",
      control: "text"
    },

    label: {
      defaultValue: "",
      control: "text"
    },

    hintText: {
      defaultValue: "",
      control: "text"
    },

    noFlip: {
      defaultValue: false,
      control: "boolean"
    },

    drop: {
      defaultValue: "down",
      control: "select",
      options: ["up", "down"]
    },

    displayDate: {
      control: "object"
    },

    dialogAriaLabel: {
      control: "text"
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
