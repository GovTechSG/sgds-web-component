import { Template, args, parameters } from "../templates/Breadcrumb/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Breadcrumb",

  argTypes: {
    href: {
      control: "text"
    },

    target: {
      control: "select",
      options: ["_blank", "_parent", "_self", "_top"]
    },

    rel: {
      defaultValue: "noreferrer noopener",
      control: "text"
    },

    ariaLabel: {
      defaultValue: "breadcrumb",
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
