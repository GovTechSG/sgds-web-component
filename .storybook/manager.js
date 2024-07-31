import { addons } from '@storybook/manager-api';
import sgdsTheme from "./sgdsTheme";

addons.setConfig({
  theme: sgdsTheme,
  enableShortcuts: false
});
