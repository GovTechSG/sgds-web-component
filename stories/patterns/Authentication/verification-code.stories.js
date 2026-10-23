import { PatternTemplate, parameters } from "./template.js";

export default {
  title: "Patterns/Authentication/Verification code",
  tags: ["!autodocs"],
  parameters
};

export const EnterCode = {
  name: "Enter code",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "verification-code-enter-code" }
};

export const IncorrectCode = {
  name: "Incorrect code",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "verification-code-incorrect-code" }
};

export const CodeExpired = {
  name: "Code expired",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "verification-code-code-expired" }
};

export const CodeResent = {
  name: "Code resent",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "verification-code-code-resent" }
};

export const ResendFailed = {
  name: "Resend failed",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "verification-code-resend-failed" }
};

export const RetryLimit = {
  name: "Retry limit",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "verification-code-retry-limit" }
};
