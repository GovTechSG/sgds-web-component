import { addons } from "storybook/manager-api";
import sgdsTheme from "./sgdsTheme";
import sgdsDarkTheme from "./sgdsDarkTheme";

const KEY = "sgds-sb-color-mode";
const saved = () => {
  try {
    return localStorage.getItem(KEY) === "night" ? "night" : "day";
  } catch {
    return "day";
  }
};
const themeFor = mode => (mode === "night" ? sgdsDarkTheme : sgdsTheme);

addons.setConfig({
  // start from the remembered mode so the manager doesn't paint light first
  theme: themeFor(saved()),
  enableShortcuts: false
});

// Keep the manager UI (sidebar, toolbar) in sync with the Color Mode toolbar global
addons.register("sgds/manager-color-mode", api => {
  // Ignore events without a colorMode: the manager's globals are empty until the preview reports in,
  // and treating that as "day" would overwrite the remembered mode.
  const apply = colorMode => {
    if (!colorMode) return;
    try {
      localStorage.setItem(KEY, colorMode);
    } catch {}
    api.setOptions({ theme: themeFor(colorMode) });
  };
  apply(api.getGlobals()?.colorMode);
  api.on("globalsUpdated", ({ globals }) => apply(globals?.colorMode));
  api.on("setGlobals", ({ globals }) => apply(globals?.colorMode));
});
