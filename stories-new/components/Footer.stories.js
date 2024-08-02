import { Template, args, parameters } from "../templates/Footer/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Footer",

  argTypes: {
    title: {
      defaultValue: "",
      control: "text"
    },

    description: {
      defaultValue: "",
      control: "text"
    },

    copyrightLiner: {
      defaultValue: "Government of Singapore",
      control: "text"
    },

    links: {
      defaultValue: "[]",
      control: "object"
    },

    lastUpdatedDate: {
      defaultValue: "",
      control: "text"
    },

    contactHref: {
      defaultValue: "#",
      control: "text"
    },

    feedbackHref: {
      defaultValue: "#",
      control: "text"
    },

    privacyHref: {
      defaultValue: "#",
      control: "text"
    },

    termsOfUseHref: {
      defaultValue: "#",
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
