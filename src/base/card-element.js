import { __decorate } from "tslib";
import { property } from "lit/decorators.js";
import cardStyle from "./card.css";
import textStyles from "../styles/text-variants.css";
import bgStyles from "../styles/bg-variants.css";
import borderStyles from "../styles/border-variants.css";
import headerStyles from "../styles/header-class.css";
import paragraphStyles from "../styles/paragraph.css";
import SgdsElement from "./sgds-element";
export class CardElement extends SgdsElement {
}
CardElement.styles = [...SgdsElement.styles, textStyles, bgStyles, borderStyles, headerStyles, paragraphStyles, cardStyle];
__decorate([
    property()
], CardElement.prototype, "borderColor", void 0);
__decorate([
    property()
], CardElement.prototype, "bgColor", void 0);
__decorate([
    property()
], CardElement.prototype, "textColor", void 0);
//# sourceMappingURL=card-element.js.map