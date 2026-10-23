import { PatternTemplate, parameters } from "./template.js";

export default {
  title: "Patterns/Authentication/Confirm your identity",
  tags: ["!autodocs"],
  parameters
};

export const Default = {
  name: "Default",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "confirm-your-identity-default" }
};

export const IncorrectPassword = {
  name: "Incorrect password",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "confirm-your-identity-incorrect-password" }
};

export const VerificationFailed = {
  name: "Verification failed",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "confirm-your-identity-verification-failed" }
};
