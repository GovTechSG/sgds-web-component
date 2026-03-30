import { setCustomElementsManifest } from "@storybook/web-components";
import "@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js";
import customElements from "../custom-elements.json";
import "../lib/index.js";
import "../lib/themes/day.css";
import "../lib/themes/night.css";
import "../lib/css/sgds.css";
import "./utility.css";
import "./gt-themes.css";
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
    },
    codePanel: true
  },
  viewport: {
    viewports: {
      xs: { name: "xs mobile", styles: { width: "320px", height: "568px" } },
      sm: { name: "sm mobile", styles: { width: "512px", height: "960px" } },
      md: { name: "md tablet", styles: { width: "768px", height: "1080px" } },
      lg: { name: "lg laptop", styles: { width: "1024px", height: "1117px" } },
      xl: { name: "xl desktop", styles: { width: "1280px", height: "1117px" } },
      "2-xl": { name: "2-xl desktop", styles: { width: "1440px", height: "1117px" } }
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
        "Agent Skills",
        "Migration",
        "Usage",
        "Frameworks",
        ["Angular", "Vue", "React", "NextJS"],
        "Foundation",
        [
          "Introduction",
          "Typography",
          ["Introduction", "Display", "Headings", "Subtitles"],
          "Theming",
          "Layout",
          "Grid System"
        ],
        "Form",
        ["Validation", "Custom Validation"],
        "Utilities",
        ["Introduction", "Spacing", ["Introduction"]],
        "Components",
        "Templates",
        ["Introduction"],
        "Troubleshoot",
        "Patterns"
      ]
    }
  }
};
export const tags = ["autodocs"];

const GT_CLASSES = [
  "gt-blue-theme",
  "gt-cyan-theme",
  "gt-magenta-theme",
  "gt-pink-theme",
  "gt-purple-theme",
  "gt-red-theme"
];

const withTheme = (StoryFn: any, context: any) => {
  const { colorMode = "day", brandTheme = "" } = context.globals;
  const html = document.documentElement;

  if (colorMode === "night") {
    html.classList.add("sgds-night-theme");
  } else {
    html.classList.remove("sgds-night-theme");
  }

  html.classList.remove(...GT_CLASSES);
  if (brandTheme) {
    html.classList.add(brandTheme);
  }

  return StoryFn();
};

export const globalTypes = {
  colorMode: {
    name: "Color Mode",
    defaultValue: "day",
    toolbar: {
      icon: "sun",
      items: [
        { value: "day", title: "Day", icon: "sun" },
        { value: "night", title: "Night", icon: "moon" }
      ],
      showName: true,
      dynamicTitle: true
    }
  },
  brandTheme: {
    name: "Brand",
    defaultValue: "",
    toolbar: {
      icon: "paintbrush",
      items: [
        { value: "", title: "Default" },
        { value: "gt-blue-theme", title: "GT Blue" },
        { value: "gt-cyan-theme", title: "GT Cyan" },
        { value: "gt-magenta-theme", title: "GT Magenta" },
        { value: "gt-pink-theme", title: "GT Pink" },
        { value: "gt-purple-theme", title: "GT Purple" },
        { value: "gt-red-theme", title: "GT Red" }
      ],
      showName: true,
      dynamicTitle: true
    }
  }
};

export const decorators = [withTheme];
