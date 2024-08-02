import { Template, args, parameters } from "../templates/Masthead/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Masthead",

  argTypes: {
    fluid: {
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
