import { __decorate } from "tslib";
import FormCheckElement from "../../base/form-check-element";
import genId from "../../utils/generateId";
import switchStyle from "./switch.css";
import { property } from "lit/decorators.js";
import feedbackStyles from "../../styles/feedback.css";
import formLabelStyles from "../../styles/form-label.css";
export class SgdsSwitch extends FormCheckElement {
    constructor() {
        super();
        /** The size of the switch. By default, it is small size */
        this.size = "sm";
        /**@internal */
        this._inputId = genId("switch");
    }
    firstUpdated() {
        this._size = this.size;
    }
}
SgdsSwitch.styles = [...FormCheckElement.styles, feedbackStyles, formLabelStyles, switchStyle];
__decorate([
    property({ reflect: true, type: String })
], SgdsSwitch.prototype, "size", void 0);
export default SgdsSwitch;
//# sourceMappingURL=sgds-switch.js.map