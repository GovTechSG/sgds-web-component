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
              .filter((member: { static: boolean }) => !member.static)
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
  viewport: {
    viewports: {
      xs: { name: "xs mobile", styles: { width: "320px", height: "568px" } },
      sm: { name: "sm mobile", styles: { width: "512px", height: "960px" } },
      md: { name: "md tablet", styles: { width: "768px", height: "1080px"} },
      lg: { name: "lg laptop", styles: { width: "1024px",height: "1117px"} },
      xl: { name: "xl desktop", styles: { width: "1280px", height: "1117px" } },
      "2-xl": { name: "2-xl desktop", styles: { width: "1440px", height: "1117px"} }
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
        ["Validation", "Custom Validation"],
        "Troubleshoot",
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
