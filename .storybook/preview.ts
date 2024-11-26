import { withThemeByClassName } from "@storybook/addon-themes";
import { setCustomElementsManifest } from "@storybook/web-components";
import "@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js";
import customElements from "../custom-elements.json";
import "../lib/index.js";
import "../lib/themes/day.css";
import "../lib/themes/night.css";
import "../lib/css/sgds.css";
import "./global.css";
import sgdsTheme from "./sgdsTheme";

export const setCustomElementsManifestWithOptions = (
  customElements: any,
  options: { privateFields?: boolean }
): void => {
  let { privateFields = true } = options;
  if (!privateFields) {
    customElements?.modules?.forEach((module: { declarations: any[] }) => {
      module?.declarations?.forEach(declaration => {
        Object.keys(declaration).forEach(key => {
          if (Array.isArray(declaration[key])) {
            declaration[key] = declaration[key]
              .filter((member: { privacy: string | string[] }) => !member.privacy?.includes("private"))
              .filter((member: { privacy: string | string[] }) => !member.privacy?.includes("protected"));
          }
        });
      });
    });
  }
  return setCustomElementsManifest(customElements);
};
// setCustomElements(customElements);
setCustomElementsManifestWithOptions(customElements, { privateFields: false });

export const parameters = {
  viewMode: "docs",
  docs: {
    //@ts-ignore
    theme: sgdsTheme,
    toc: {
      headingSelector: "h1, h2, h3",
      title: "Table of Contents",
      disable: false
    }
  },
  controls: {
    //  disable: true,
    expanded: true
  },
  options: {
    storySort: {
      order: [
        "Getting Started",
        ["Introduction", "Installation", "Imports"],
        "Migration",
        "Usage",
        "Frameworks",
        ["Angular", "Vue", "React", "NextJS"],
        "Style",
        "Form",
        "Troubleshooting",
        "Components",
        "Patterns",
        "Templates"
      ]
    }
  }
};
export const tags = ["autodocs"];

export const decorators = [
  withThemeByClassName({
    themes: {
      day: "",
      night: "sgds-night-theme"
    },
    defaultTheme: "day"
  })
];
