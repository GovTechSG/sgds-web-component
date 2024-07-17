import { property } from "lit/decorators.js";
import cardStyle from "./card.css";
import textStyles from "../styles/text-variants.css";
import bgStyles from "../styles/bg-variants.css";
import borderStyles from "../styles/border-variants.css";
import headerStyles from "../styles/header-class.css";
import paragraphStyles from "../styles/paragraph.css";

import SgdsElement from "./sgds-element";
export type CardBorderVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light";

export class CardElement extends SgdsElement {
  static styles = [...SgdsElement.styles, textStyles, bgStyles, borderStyles, headerStyles, paragraphStyles, cardStyle];

  /** The border's variant. */
  @property()
  borderColor: CardBorderVariant;

  /** The bg's variant. */
  @property() bgColor: CardBorderVariant;

  /** The text's variant. */
  @property() textColor: CardTextVariant;
}

export type CardTextVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "white"
  | "muted";
