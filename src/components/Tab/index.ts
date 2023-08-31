import { SgdsTab } from "./sgds-tab";
import { SgdsTabGroup } from "./sgds-tab-group";
import { SgdsTabPanel } from "./sgds-tab-panel";
import registerCustomElement from "../../utils/registerCustomElement";

//sideEffect
registerCustomElement([SgdsTab, SgdsTabGroup, SgdsTabPanel]);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tab": SgdsTab;
    "sgds-tab-group": SgdsTabGroup;
    "sgds-tab-panel": SgdsTabPanel;
  }
}
