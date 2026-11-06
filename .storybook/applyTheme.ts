export const GT_CLASSES = [
  "gt-blue-theme",
  "gt-cyan-theme",
  "gt-magenta-theme",
  "gt-pink-theme",
  "gt-purple-theme",
  "gt-red-theme"
];

export const COLOR_MODE_KEY = "sgds-sb-color-mode";

export const getSavedColorMode = (): string => {
  try {
    return localStorage.getItem(COLOR_MODE_KEY) === "night" ? "night" : "day";
  } catch {
    return "day";
  }
};

// Shared by the story decorator and the docs container: MDX-only pages have no stories,
// so the decorator never runs there and the container must apply the theme itself.
export const applyTheme = (colorMode = "day", brandTheme = "") => {
  const html = document.documentElement;
  try {
    localStorage.setItem(COLOR_MODE_KEY, colorMode);
  } catch {}
  html.classList.toggle("sgds-night-theme", colorMode === "night");
  html.classList.remove(...GT_CLASSES);
  if (brandTheme) html.classList.add(brandTheme);
};
