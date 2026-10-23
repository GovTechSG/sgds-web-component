export const passwordReset = [
  {
    key: "password-reset-reset-password",
    group: "Password reset",
    name: "Reset password",
    title: "Reset your password",
    description: "Enter the email address you use to log in.",
    fields: [
      {
        label: "Email address",
        name: "email-address",
        type: "email",
        error: "",
        value: "avery@example.com",
        disabled: false
      }
    ],
    buttons: ["Send reset link", "Back to log in"]
  },
  {
    key: "password-reset-invalid-email",
    group: "Password reset",
    name: "Invalid email",
    title: "Reset your password",
    description: "Enter the email address you use to log in.",
    fields: [
      {
        label: "Email address",
        name: "email-address",
        type: "email",
        error: "Enter a valid email address.",
        value: "avery@",
        disabled: false
      }
    ],
    buttons: ["Send reset link", "Back to log in"]
  },
  {
    key: "password-reset-email-sent",
    group: "Password reset",
    name: "Email sent",
    title: "Check your email",
    description: "If an account exists for this email address, we will send a password reset link.",
    buttons: ["Back to log in"],
    support: ["Don’t see the email?", "Resend"],
    body: "Check your spam folder if the email does not arrive."
  },
  {
    key: "password-reset-link-expired",
    group: "Password reset",
    name: "Link expired",
    title: "This reset link has expired",
    description: "Request a new link to reset your password.",
    buttons: ["Resend reset link", "Back to log in"]
  },
  {
    key: "password-reset-new-password",
    group: "Password reset",
    name: "New password",
    title: "Set a new password",
    description: "Enter and confirm your new password.",
    fields: [
      {
        label: "New password",
        name: "new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Confirm new password",
        name: "confirm-new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Save password"]
  },
  {
    key: "password-reset-reset-password-mismatch",
    group: "Password reset",
    name: "Reset password mismatch",
    title: "Set a new password",
    description: "Enter and confirm your new password.",
    fields: [
      {
        label: "New password",
        name: "new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Confirm new password",
        name: "confirm-new-password",
        type: "password",
        error: "The passwords do not match. Enter the same password.",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Save password"]
  },
  {
    key: "password-reset-password-reset-complete",
    group: "Password reset",
    name: "Password reset complete",
    title: "Password reset",
    description: "Your password has been reset. Log in with your new password.",
    buttons: ["Log in"]
  },
  {
    key: "password-reset-change-password",
    group: "Password reset",
    name: "Change password",
    title: "Change password",
    description: "Enter your current password, then choose a new password.",
    fields: [
      {
        label: "Current password",
        name: "current-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "New password",
        name: "new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Confirm new password",
        name: "confirm-new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Change password"]
  },
  {
    key: "password-reset-current-password-incorrect",
    group: "Password reset",
    name: "Current password incorrect",
    title: "Change password",
    description: "Enter your current password, then choose a new password.",
    fields: [
      {
        label: "Current password",
        name: "current-password",
        type: "password",
        error: "The current password is incorrect. Try again.",
        value: "",
        disabled: false
      },
      {
        label: "New password",
        name: "new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Confirm new password",
        name: "confirm-new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Change password"]
  },
  {
    key: "password-reset-change-password-mismatch",
    group: "Password reset",
    name: "Change password mismatch",
    title: "Change password",
    description: "Enter your current password, then choose a new password.",
    fields: [
      {
        label: "Current password",
        name: "current-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "New password",
        name: "new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Confirm new password",
        name: "confirm-new-password",
        type: "password",
        error: "The passwords do not match. Enter the same password.",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Change password"]
  },
  {
    key: "password-reset-change-failed",
    group: "Password reset",
    name: "Change failed",
    title: "Change password",
    description: "Enter your current password, then choose a new password.",
    fields: [
      {
        label: "Current password",
        name: "current-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "New password",
        name: "new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Confirm new password",
        name: "confirm-new-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Change password"],
    alert: ["danger", "Password not changed", "We could not change your password. Try again."]
  },
  {
    key: "password-reset-password-changed",
    group: "Password reset",
    name: "Password changed",
    title: "Password changed",
    description: "Your password has been changed.",
    buttons: ["Return to account"]
  },
  {
    key: "password-reset-session-expired",
    group: "Password reset",
    name: "Session expired",
    title: "Log in again",
    description: "Your session has expired.",
    buttons: ["Log in"],
    alert: ["warning", "Your session has ended", "Log in again to continue. Only saved changes can be restored."]
  },
  {
    key: "password-reset-access-denied",
    group: "Password reset",
    name: "Access denied",
    title: "You do not have access",
    description: "Ask your service administrator for access, or log in with another account.",
    buttons: ["Back to home", "Use another account"]
  }
];
