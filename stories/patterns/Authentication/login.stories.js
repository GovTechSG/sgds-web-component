import { PatternTemplate, parameters } from "./template.js";

export default {
  title: "Patterns/Authentication/Login",
  tags: ["!autodocs"],
  parameters
};

export const HybridDefault = {
  name: "Hybrid · Default",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "login-hybrid-default" }
};

export const EmailDefault = {
  name: "Email · Default",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "login-email-default" }
};

export const AlternativeDefault = {
  name: "Alternative · Default",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "login-alternative-default" }
};

export const HybridError = {
  name: "Hybrid · Error",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "login-hybrid-error" }
};

export const EmailError = {
  name: "Email · Error",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "login-email-error" }
};
