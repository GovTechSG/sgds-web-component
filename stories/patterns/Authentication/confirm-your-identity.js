export const confirmYourIdentity = [
  {
    key: "confirm-your-identity-default",
    group: "Confirm your identity",
    name: "Default",
    title: "Confirm your identity",
    description: "Enter your password to continue.",
    fields: [
      {
        label: "Password",
        name: "password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Continue"]
  },
  {
    key: "confirm-your-identity-incorrect-password",
    group: "Confirm your identity",
    name: "Incorrect password",
    title: "Confirm your identity",
    description: "Enter your password to continue.",
    fields: [
      {
        label: "Password",
        name: "password",
        type: "password",
        error: "The password is incorrect. Try again.",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Continue"]
  },
  {
    key: "confirm-your-identity-verification-failed",
    group: "Confirm your identity",
    name: "Verification failed",
    title: "Confirm your identity",
    description: "Enter your password to continue.",
    fields: [
      {
        label: "Password",
        name: "password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Continue"],
    alert: ["danger", "Could not confirm your identity", "Try again to continue."]
  }
];
