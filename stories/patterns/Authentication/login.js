export const login = [
  {
    key: "login-hybrid-default",
    group: "Login",
    name: "Hybrid · Default",
    title: "Log in",
    description: "Enter your email address and password to log in.",
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
      }
    ],
    buttons: ["Log in"],
    support: ["Don’t have an account yet?", "Sign up"],
    loginOptions: true,
    providers: true
  },
  {
    key: "login-email-default",
    group: "Login",
    name: "Email · Default",
    title: "Log in",
    description: "Enter your email address and password to log in.",
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
      }
    ],
    buttons: ["Log in"],
    support: ["Don’t have an account yet?", "Sign up"],
    loginOptions: true,
    providers: false
  },
  {
    key: "login-alternative-default",
    group: "Login",
    name: "Alternative · Default",
    title: "Log in",
    description: "Log in with your work account.",
    support: ["Don’t have an account yet?", "Sign up"],
    loginOptions: false,
    providers: true
  },
  {
    key: "login-hybrid-error",
    group: "Login",
    name: "Hybrid · Error",
    title: "Log in",
    description: "Enter your email address and password to log in.",
    fields: [
      {
        label: "Email address",
        name: "email-address",
        type: "email",
        error: "",
        value: "name@example.com",
        disabled: false
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        error: "The email address or password is incorrect. Try again.",
        value: "password",
        disabled: false
      }
    ],
    buttons: ["Log in"],
    support: ["Don’t have an account yet?", "Sign up"],
    loginOptions: true,
    providers: true
  },
  {
    key: "login-email-error",
    group: "Login",
    name: "Email · Error",
    title: "Log in",
    description: "Enter your email address and password to log in.",
    fields: [
      {
        label: "Email address",
        name: "email-address",
        type: "email",
        error: "",
        value: "name@example.com",
        disabled: false
      },
      {
        label: "Password",
        name: "password",
        type: "password",
        error: "The email address or password is incorrect. Try again.",
        value: "password",
        disabled: false
      }
    ],
    buttons: ["Log in"],
    support: ["Don’t have an account yet?", "Sign up"],
    loginOptions: true,
    providers: false
  }
];
