import { Template, parameters, argTypes, decorators } from "./template.js";

export default {
  title: "Templates/Authentication/No image",
  tags: ["!autodocs"],
  parameters,
  argTypes,
  decorators,
  args: { contentPattern: "login-alternative-default" }
};

export const LogoWithin = {
  render: Template.bind({}),
  name: "Logo within",
  args: { logoPlacement: "Within content", image: "None", imageConfiguration: "Full bleed", hasSideImage: false }
};

export const LogoSeparate = {
  render: Template.bind({}),
  name: "Logo separate",
  args: { logoPlacement: "Separate", image: "None", imageConfiguration: "Full bleed", hasSideImage: false }
};
