export declare class SgdsSpinner {
  /** The color tones of spinner, replaces variant prop */
  tone: SpinnerTone;
  /** The variant of spinner. @deprecated Use `tone` instead */
  variant: SpinnerVariant;
  /** Specifies spinner size */
  size: "xs" | "sm" | "md" | "lg" | "xl";
  /** Text label of the spinner */
  label: string;
  /** Orientation of label relative to the spinner */
  orientation: "horizontal" | "vertical";
  render(): any;
}
export type SpinnerTone = "brand" | "neutral" | "inverse" | "fixed-light" | "fixed-dark";
export type SpinnerVariant = "primary" | "neutral";
