import { property } from "lit/decorators.js";
import SgdsElement from "./sgds-element";

export type CardBorderVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "dark" | "light";

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

export class CardElement extends SgdsElement {
  static styles = SgdsElement.styles;

  @property({ type: String })

  /** The border's variant. */
  @property()
  borderColor?: CardBorderVariant;

  /** The bg's variant. */
  @property() bgColor?: CardBorderVariant;

  /** The text's variant. */
  @property() textColor?: CardTextVariant;

  @property({ type: Boolean, reflect: true })
  disabled = false;
}
