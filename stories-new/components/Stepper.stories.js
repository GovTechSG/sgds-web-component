import { Template, args, parameters } from "../templates/Stepper/basic.js";
import "../../lib/index.js";
import { html } from "lit-html";

export default {
  title: "Components/Stepper",

  argTypes: {
    steps: {
      defaultValue: "[]",
      control: "object"
    },

    activeStep: {
      defaultValue: "0",
      control: "number"
    },

    defaultActiveStep: {
      defaultValue: "0",
      control: "number"
    }
  }
};

export const Basic = {
  render: Template.bind({}),
  name: "Basic",
  args: args,
  parameters: parameters
};
