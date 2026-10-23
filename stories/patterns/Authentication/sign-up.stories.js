import { PatternTemplate, parameters } from "./template.js";

export default {
  title: "Patterns/Authentication/Sign up",
  tags: ["!autodocs"],
  parameters
};

export const Default = {
  name: "Default",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "sign-up-default" }
};

export const InvalidDetails = {
  name: "Invalid details",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "sign-up-invalid-details" }
};

export const AccountCreated = {
  name: "Account created",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "sign-up-account-created" }
};
