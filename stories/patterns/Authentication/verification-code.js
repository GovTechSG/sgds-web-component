export const verificationCode = [
  {
    key: "verification-code-enter-code",
    group: "Verification code",
    name: "Enter code",
    title: "Enter verification code",
    description: "Enter the code sent to your email address.",
    fields: [
      {
        label: "Verification code",
        name: "verification-code",
        type: "text",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Verify"],
    support: ["Don’t see the code?", "Resend"],
    disabled: false
  },
  {
    key: "verification-code-incorrect-code",
    group: "Verification code",
    name: "Incorrect code",
    title: "Enter verification code",
    description: "Enter the code sent to your email address.",
    fields: [
      {
        label: "Verification code",
        name: "verification-code",
        type: "text",
        error: "The code is incorrect. Try again.",
        value: "123456",
        disabled: false
      }
    ],
    buttons: ["Verify"],
    support: ["Don’t see the code?", "Resend"],
    disabled: false
  },
  {
    key: "verification-code-code-expired",
    group: "Verification code",
    name: "Code expired",
    title: "Enter verification code",
    description: "Enter the code sent to your email address.",
    fields: [
      {
        label: "Verification code",
        name: "verification-code",
        type: "text",
        error: "This code has expired. Resend the code to try again.",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Resend code", "Back to log in"],
    support: ["Don’t see the code?", "Resend"],
    disabled: false
  },
  {
    key: "verification-code-code-resent",
    group: "Verification code",
    name: "Code resent",
    title: "Enter verification code",
    description: "Enter the code sent to your email address.",
    fields: [
      {
        label: "Verification code",
        name: "verification-code",
        type: "text",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Verify"],
    support: ["Don’t see the code?", "Resend"],
    alert: ["success", "New code sent", "Use the most recent code in your email."],
    disabled: false
  },
  {
    key: "verification-code-resend-failed",
    group: "Verification code",
    name: "Resend failed",
    title: "Enter verification code",
    description: "Enter the code sent to your email address.",
    fields: [
      {
        label: "Verification code",
        name: "verification-code",
        type: "text",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Verify"],
    support: ["Don’t see the code?", "Resend"],
    alert: ["danger", "Code not sent", "We could not resend the code. Try again."],
    disabled: false
  },
  {
    key: "verification-code-retry-limit",
    group: "Verification code",
    name: "Retry limit",
    title: "Try again later",
    description: "You have made too many attempts. Try again later.",
    fields: [
      {
        label: "Verification code",
        name: "verification-code",
        type: "text",
        error: "",
        value: "",
        disabled: true
      }
    ],
    buttons: ["Verify"],
    support: ["Don’t see the code?", "Resend"],
    disabled: true
  }
];
