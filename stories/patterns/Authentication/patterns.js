import { confirmYourIdentity } from "./confirm-your-identity.js";
import { emailVerification } from "./email-verification.js";
import { login } from "./login.js";
import { passwordReset } from "./password-reset.js";
import { signUp } from "./sign-up.js";
import { verificationCode } from "./verification-code.js";

export const patterns = [
  ...confirmYourIdentity,
  ...emailVerification,
  ...login,
  ...passwordReset,
  ...signUp,
  ...verificationCode
];
export const defaultPattern = "login-alternative-default";
export const patternOptions = patterns.map(pattern => pattern.key);
export const patternLabels = Object.fromEntries(
  patterns.map(pattern => [pattern.key, `${pattern.group} · ${pattern.name}`])
);
