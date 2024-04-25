import { property } from "lit/decorators.js";
import cardStyle from "./card.style";
import TempElement from "./temp-element";
export type CardBorderVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light";

export class CardElement extends TempElement {
  static styles = [cardStyle, TempElement.styles];

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
