import { SgdsTab } from "./sgds-tab";
import { SgdsTabGroup } from "./sgds-tab-group";
import { SgdsTabPanel } from "./sgds-tab-panel";
import { register } from "../../utils/ce-registry";

register("sgds-tab", SgdsTab);
register("sgds-tab-group", SgdsTabGroup);
register("sgds-tab-panel", SgdsTabPanel);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tab": SgdsTab;
    "sgds-tab-group": SgdsTabGroup;
    "sgds-tab-panel": SgdsTabPanel;
  }
}
