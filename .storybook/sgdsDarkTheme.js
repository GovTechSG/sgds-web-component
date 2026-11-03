import { create } from "storybook/theming";
import logo from "./static/logo-white.svg";
export default create({
  base: "dark",
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",

  brandTitle: "SGDS Web Component Storybook",
  brandUrl: "https://www.webcomponent.designsystem.tech.gov.sg",
  brandImage: logo,
  brandTarget: "_self",

  colorPrimary: "#9b7bf0",
  colorSecondary: "#9b7bf0",

  appBg: "#0c111d",
  appContentBg: "#101828",
  appPreviewBg: "#101828",
  appBorderColor: "#344054",
  appBorderRadius: 5,

  textColor: "#f2f4f7",
  textInverseColor: "#101828",

  barTextColor: "#98a2b3",
  barSelectedColor: "#9b7bf0",
  barBg: "#101828",

  inputBg: "#1d2939",
  inputBorder: "#667085",
  inputTextColor: "#f2f4f7",
  inputBorderRadius: 5
});
