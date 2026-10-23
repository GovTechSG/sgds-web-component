import { Template, parameters, argTypes, decorators } from "./template.js";

export default {
  title: "Templates/Authentication/Full bleed",
  tags: ["!autodocs"],
  parameters,
  argTypes,
  decorators,
  args: { contentPattern: "login-alternative-default" }
};

export const LeftLogoWithin = {
  render: Template.bind({}),
  name: "Left · Logo within",
  args: { logoPlacement: "Within content", image: "Left", imageConfiguration: "Full bleed", hasSideImage: true }
};

export const LeftLogoSeparate = {
  render: Template.bind({}),
  name: "Left · Logo separate",
  args: { logoPlacement: "Separate", image: "Left", imageConfiguration: "Full bleed", hasSideImage: true }
};

export const RightLogoWithin = {
  render: Template.bind({}),
  name: "Right · Logo within",
  args: { logoPlacement: "Within content", image: "Right", imageConfiguration: "Full bleed", hasSideImage: true }
};

export const RightLogoSeparate = {
  render: Template.bind({}),
  name: "Right · Logo separate",
  args: { logoPlacement: "Separate", image: "Right", imageConfiguration: "Full bleed", hasSideImage: true }
};
