import customElements from "../custom-elements.json";
import { themes } from "@storybook/theming";
import "@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js";
import { setCustomElementsManifest } from "@storybook/web-components";
import "./global.css";
import "../lib/themes/day.css";
import "../lib/index.js";
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
            declaration[key] = declaration[key].filter(
              (member: { privacy: string | string[] }) => !member.privacy?.includes("private")
            );
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
    theme: themes.sgdsTheme,
    toc: {
      headingSelector: 'h1, h2, h3',
      title: 'Table of Contents',
      disable: false,
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  options: {
    storySort: {
      order: [
        "Getting Started",
        ["Introduction", "Installation", "Imports", "Usage", "Frameworks"],
        "Troubleshooting",
        "Components",
        "Patterns",
        "Templates"
      ]
    }
  }
};
export const tags = ["autodocs"];
