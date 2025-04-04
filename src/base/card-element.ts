import { property } from "lit/decorators.js";
import cardStyle from "./card.css";
import textStyles from "../styles/text-variants.css";
import bgStyles from "../styles/bg-variants.css";
import borderStyles from "../styles/border-variants.css";
import headerStyles from "../styles/header-class.css";
import paragraphStyles from "../styles/paragraph.css";

import SgdsElement from "./sgds-element";

export class CardElement extends SgdsElement {
  static styles = [...SgdsElement.styles, textStyles, bgStyles, borderStyles, headerStyles, paragraphStyles, cardStyle];

  /** When true, hides the default border of the card. */
  @property({ type: Boolean, reflect: true }) hideBorder = false;

  /** When true, applies a tinted background color to the card. */
  @property({ type: Boolean, reflect: true }) tinted = false;
}
