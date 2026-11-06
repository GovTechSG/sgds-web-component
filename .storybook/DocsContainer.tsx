import React, { useEffect, useLayoutEffect, useState } from "react";
import { DocsContainer } from "@storybook/addon-docs/blocks";
import { addons } from "storybook/preview-api";
import sgdsTheme from "./sgdsTheme";
import sgdsDarkTheme from "./sgdsDarkTheme";
import { applyTheme } from "./applyTheme";

type DocsContainerProps = React.ComponentProps<typeof DocsContainer>;

type Globals = Record<string, string>;

// Survives container remounts (every docs navigation), so a remount never starts from "unknown"
let lastGlobals: Globals = {};

// The globals store is the source of truth; fall back to the last known values, then the <html> class
const readGlobals = (context: DocsContainerProps["context"]): Globals => {
  const fromStore: Globals = (context as any)?.store?.userGlobals?.get?.() ?? {};
  lastGlobals = { ...lastGlobals, ...fromStore };
  if (!lastGlobals.colorMode && document.documentElement.classList.contains("sgds-night-theme")) {
    lastGlobals.colorMode = "night";
  }
  return lastGlobals;
};

export const ThemedDocsContainer = (props: DocsContainerProps) => {
  const { context } = props;
  const [globals, setGlobals] = useState(() => readGlobals(context));

  useEffect(() => {
    // re-sync on every mount / navigation in case a globals event was missed
    setGlobals(readGlobals(context));

    const channel = addons.getChannel();
    const onGlobals = ({ globals }: { globals?: Globals }) => {
      if (!globals) return;
      lastGlobals = { ...lastGlobals, ...globals };
      setGlobals(lastGlobals);
    };
    channel.on("globalsUpdated", onGlobals);
    channel.on("setGlobals", onGlobals);
    return () => {
      channel.off("globalsUpdated", onGlobals);
      channel.off("setGlobals", onGlobals);
    };
  }, [context]);

  const { colorMode, brandTheme } = globals;
  // layout effect so the class lands before paint; skip while the mode is still unknown
  // so an empty read can't strip the night class and flash light
  useLayoutEffect(() => {
    if (colorMode) applyTheme(colorMode, brandTheme);
  }, [colorMode, brandTheme]);

  return <DocsContainer {...props} theme={colorMode === "night" ? sgdsDarkTheme : sgdsTheme} />;
};
