import { create } from "@storybook/theming/create";
import logo from "./static/logo.png";
export default create({
  base: "light",
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",

  brandTitle: "SGDS Web Component Storybook",
  brandUrl: "https://www.webcomponent.designsystem.tech.gov.sg",
  brandImage: logo,
  brandTarget: "_self",

  //
  colorPrimary: "#5925dc",
  colorSecondary: "#5925dc",

  // UI
  appBg: "#f8fafc",
  appContentBg: "#ffffff",
  appPreviewBg: "#ffffff",
  appBorderColor: "#D0D5DD",
  appBorderRadius: 5,

  // Text colors
  textColor: "#1D2939",
  textInverseColor: "#ffffff",

  // Toolbar default and active colors
  barTextColor: "#9E9E9E",
  barSelectedColor: "#5925dc",
  barBg: "#ffffff",

  // Form colors
  inputBg: "#ffffff",
  inputBorder: "#98a2b3",
  inputTextColor: "#1D2939",
  inputBorderRadius: 5
});
