import { property, state } from "lit/decorators.js";
import genId from "../utils/generateId";
import SgdsElement from "./sgds-element";

export type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | string;

export type Color =
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
  @property({ type: String })

  /** The border's variant. */
  @property() borderColor?: Variant;

  /** The bg's variant. */
  @property() bgColor?: Variant;

  /** The text's variant. */
  @property() textColor?: Color;

  @property({ type: Boolean, reflect: true })
  disabled = false;
}
