import { PatternTemplate, parameters } from "./template.js";

export default {
  title: "Patterns/Authentication/Password reset",
  tags: ["!autodocs"],
  parameters
};

export const ResetPassword = {
  name: "Reset password",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-reset-password" }
};

export const InvalidEmail = {
  name: "Invalid email",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-invalid-email" }
};

export const EmailSent = {
  name: "Email sent",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-email-sent" }
};

export const LinkExpired = {
  name: "Link expired",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-link-expired" }
};

export const NewPassword = {
  name: "New password",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-new-password" }
};

export const ResetPasswordMismatch = {
  name: "Reset password mismatch",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-reset-password-mismatch" }
};

export const PasswordResetComplete = {
  name: "Password reset complete",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-password-reset-complete" }
};

export const ChangePassword = {
  name: "Change password",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-change-password" }
};

export const CurrentPasswordIncorrect = {
  name: "Current password incorrect",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-current-password-incorrect" }
};

export const ChangePasswordMismatch = {
  name: "Change password mismatch",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-change-password-mismatch" }
};

export const ChangeFailed = {
  name: "Change failed",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-change-failed" }
};

export const PasswordChanged = {
  name: "Password changed",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-password-changed" }
};

export const SessionExpired = {
  name: "Session expired",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-session-expired" }
};

export const AccessDenied = {
  name: "Access denied",
  render: PatternTemplate.bind({}),
  args: { contentPattern: "password-reset-access-denied" }
};
