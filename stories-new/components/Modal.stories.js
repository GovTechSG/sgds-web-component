import { Template, args, parameters } from "../templates/Modal/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Modal",

  argTypes: {
    open: {
      defaultValue: false,
      control: "boolean"
    },

    title: {
      defaultValue: "",
      control: "text"
    },

    titleIcon: {
      defaultValue: "",
      control: "text"
    },

    noHeader: {
      defaultValue: false,
      control: "boolean"
    },

    centered: {
      defaultValue: false,
      control: "boolean"
    },

    centeredAlignVariant: {
      defaultValue: false,
      control: "boolean"
    },

    noAnimation: {
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
