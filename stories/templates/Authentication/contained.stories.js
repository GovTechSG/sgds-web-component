import { Template, parameters, argTypes, decorators } from "./template.js";

export default {
  title: "Templates/Authentication/Contained",
  tags: ["!autodocs"],
  parameters,
  argTypes,
  decorators,
  args: { contentPattern: "login-alternative-default" }
};

export const LeftLogoWithin = {
  render: Template.bind({}),
  name: "Left · Logo within",
  args: { logoPlacement: "Within content", image: "Left", imageConfiguration: "Contained", hasSideImage: true }
};

export const LeftLogoSeparate = {
  render: Template.bind({}),
  name: "Left · Logo separate",
  args: { logoPlacement: "Separate", image: "Left", imageConfiguration: "Contained", hasSideImage: true }
};

export const RightLogoWithin = {
  render: Template.bind({}),
  name: "Right · Logo within",
  args: { logoPlacement: "Within content", image: "Right", imageConfiguration: "Contained", hasSideImage: true }
};

export const RightLogoSeparate = {
  render: Template.bind({}),
  name: "Right · Logo separate",
  args: { logoPlacement: "Separate", image: "Right", imageConfiguration: "Contained", hasSideImage: true }
};
