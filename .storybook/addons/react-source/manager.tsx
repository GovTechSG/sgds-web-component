import React from "react";
import { addons, types } from "storybook/internal/manager-api";
import { ADDON_ID, PANEL_ID } from "./constants";
import { Panel } from "./Panel";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Code",
    match: ({ viewMode }) => viewMode === "story",
    render: ({ active }) => <Panel active={active ?? false} />
  });
});
