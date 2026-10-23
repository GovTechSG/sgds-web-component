import { PatternTemplate, parameters } from "./template.js";

export default {
  title: "Patterns/Authentication/Email verification",
  tags: ["!autodocs"],
  parameters
};

export const CheckEmail = {
  name: "Check email",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "email-verification-check-email" }
};

export const Verified = {
  name: "Verified",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "email-verification-verified" }
};

export const LinkExpired = {
  name: "Link expired",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "email-verification-link-expired" }
};

export const EmailResent = {
  name: "Email resent",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "email-verification-email-resent" }
};

export const ResendFailed = {
  name: "Resend failed",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "email-verification-resend-failed" }
};

export const RetryLimit = {
  name: "Retry limit",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "email-verification-retry-limit" }
};
