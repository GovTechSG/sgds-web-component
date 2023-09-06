import { SgdsTab } from "./sgds-tab";
import { SgdsTabGroup } from "./sgds-tab-group";
import { SgdsTabPanel } from "./sgds-tab-panel";

//sideEffect
customElements.define("sgds-tab", SgdsTab);
customElements.define("sgds-tab-group", SgdsTabGroup);
customElements.define("sgds-tab-panel", SgdsTabPanel);

declare global {
  interface HTMLElementTagNameMap {
    "sgds-tab": SgdsTab;
    "sgds-tab-group": SgdsTabGroup;
    "sgds-tab-panel": SgdsTabPanel;
  }
}
