export const signUp = [
  {
    key: "sign-up-default",
    group: "Sign up",
    name: "Default",
    title: "Create an account",
    description: "Enter your details to create an account.",
    fields: [
      {
        label: "Email address",
        name: "email-address",
        type: "email",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      },
      {
        label: "Confirm password",
        name: "confirm-password",
        type: "password",
        error: "",
        value: "",
        disabled: false
      }
    ],
    buttons: ["Create account"],
    support: ["Already have an account?", "Log in"]
  },
  {
    key: "sign-up-invalid-details",
    group: "Sign up",
    name: "Invalid details",
    title: "Create an account",
    description: "Enter your details to create an account.",
    fields: [
      {
        label: "Email address",
        name: "email-address",
        type: "email",
        error: "Enter a valid email address.",
        value: "avery@",
        disabled: false
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        error: "",
        value: "password",
        disabled: false
      },
      {
        label: "Confirm password",
        name: "confirm-password",
        type: "password",
        error: "Passwords do not match.",
        value: "secret",
        disabled: false
      }
    ],
    buttons: ["Create account"],
    support: ["Already have an account?", "Log in"]
  },
  {
    key: "sign-up-account-created",
    group: "Sign up",
    name: "Account created",
    title: "Account created",
    description: "Check your email to verify your account.",
    buttons: ["Back to log in"]
  }
];
