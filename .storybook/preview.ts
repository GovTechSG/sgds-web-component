import { setCustomElementsManifest } from "@storybook/web-components-vite";
import "@webcomponents/scoped-custom-element-registry/scoped-custom-element-registry.min.js";
import customElements from "../custom-elements.json";
import "../lib/index.js";
import "../lib/themes/day.css";
import "../lib/themes/night.css";
import "../lib/css/sgds.css";
import "./utility.css";
import "./gt-themes.css";
import "./global.css";
import "./addons/react-source/docs-tabs-inject";
import { ThemedDocsContainer } from "./DocsContainer";
import { applyTheme, getSavedColorMode } from "./applyTheme";

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

            // Replace deprecated text with a styled warning badge
            const badgeHtml = `<sgds-badge variant="warning" outlined>Deprecated</sgds-badge>`;
            declaration[key].forEach((member: { deprecated?: string; description?: string }) => {
              // Handle the `deprecated` field from manifest
              if (member.deprecated) {
                const deprecationNote =
                  typeof member.deprecated === "string" && member.deprecated !== "true" ? ` ${member.deprecated}` : "";
                member.description = `${badgeHtml}${deprecationNote}\n\n${member.description || ""}`;
                delete member.deprecated;
              }
              // Handle inline @deprecated text in descriptions
              if (member.description && /@deprecated/.test(member.description)) {
                member.description = member.description.replace(/@deprecated\s*/, `${badgeHtml} `);
              }
            });
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
  a11y: {
    test: "error",
    config: {
      rules: [
        { id: "color-contrast", enabled: false },
        { id: "heading-order", enabled: false },
        { id: "landmark-unique", enabled: false },
        { id: "aria-required-children", enabled: false },
        { id: "empty-table-header", enabled: false },
        { id: "empty-heading", enabled: false },
        { id: "label", enabled: false }
      ]
    }
  },
  viewMode: "docs",
  docs: {
    container: ThemedDocsContainer,
    toc: {
      headingSelector: "h1, h2, h3",
      title: "Table of Contents",
      disable: false
    },
    source: {}
  },
  viewport: {
    options: {
      xs: { name: "xs mobile", styles: { width: "320px", height: "568px" } },
      sm: { name: "sm mobile", styles: { width: "512px", height: "960px" } },
      md: { name: "md tablet", styles: { width: "768px", height: "1080px" } },
      lg: { name: "lg laptop", styles: { width: "1024px", height: "1117px" } },
      xl: { name: "xl desktop", styles: { width: "1280px", height: "1117px" } },
      "2-xl": { name: "2-xl desktop", styles: { width: "1440px", height: "1117px" } }
    }
  },
  actions: { disable: true },
  controls: {
    disable: true,
    expanded: true
  },
  selectedPanel: "storybook/docs/panel",
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
        ["Introduction", "Typography", ["Introduction", "Display", "Headings", "Subtitles"], "Layout", "Grid System"],
        "Theming",
        ["*", "Density", ["Docs", "Density"]],
        "Form",
        ["Native Validation", "Custom Validation", "Working with FormData"],
        "Utilities",
        ["Introduction", "Spacing", ["Introduction"]],
        "Components",
        "Patterns",
        "Blocks",
        "Templates",
        ["Introduction"],
        "Layouts",
        [
          "Introduction",
          "Full Width",
          ["Default", "Breadcrumb", "Split", "Aside Left", "Aside Right", "Aside Both"],
          "With Sidebar",
          ["Default", "Split", "Aside Left", "Aside Right"]
        ],
        "Troubleshoot"
      ]
    }
  }
};
export const tags = ["autodocs"];

const withTheme = (StoryFn: any, context: any) => {
  const { colorMode = "day", brandTheme = "" } = context.globals;
  applyTheme(colorMode, brandTheme);
  return StoryFn();
};

// Start from the remembered mode, not "day", so the first render after a reload doesn't flash light
export const initialGlobals = { colorMode: getSavedColorMode() };

export const globalTypes = {
  colorMode: {
    name: "Color Mode",
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
