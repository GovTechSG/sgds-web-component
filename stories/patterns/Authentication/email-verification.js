export const emailVerification = [
  {
    key: "email-verification-check-email",
    group: "Email verification",
    name: "Check email",
    title: "Check your email",
    description: "Follow the link in your email to verify your email address.",
    buttons: ["Back to log in"],
    support: ["Don’t see the email?", "Resend"]
  },
  {
    key: "email-verification-verified",
    group: "Email verification",
    name: "Verified",
    title: "Email verified",
    description: "Your email address has been verified. You can now log in.",
    buttons: ["Log in"]
  },
  {
    key: "email-verification-link-expired",
    group: "Email verification",
    name: "Link expired",
    title: "Verification link expired",
    description: "Request a new email to verify your email address.",
    buttons: ["Resend verification email", "Back to log in"]
  },
  {
    key: "email-verification-email-resent",
    group: "Email verification",
    name: "Email resent",
    title: "Check your email",
    description: "Follow the link in your email to verify your email address.",
    buttons: ["Back to log in"],
    support: ["Don’t see the email?", "Resend"],
    alert: ["success", "Email sent", "Check your inbox and spam folder."]
  },
  {
    key: "email-verification-resend-failed",
    group: "Email verification",
    name: "Resend failed",
    title: "Check your email",
    description: "Follow the link in your email to verify your email address.",
    buttons: ["Back to log in"],
    support: ["Don’t see the email?", "Resend"],
    alert: ["danger", "Email not sent", "We could not resend the verification email. Try again."]
  },
  {
    key: "email-verification-retry-limit",
    group: "Email verification",
    name: "Retry limit",
    title: "Try again later",
    description: "You have requested too many verification emails. Try again later.",
    buttons: ["Back to log in"],
    support: ["Don’t see the email?", "Resend"]
  }
];
