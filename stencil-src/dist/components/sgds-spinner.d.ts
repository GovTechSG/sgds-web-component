import type { Components, JSX } from "../types/components";

interface SgdsSpinner extends Components.SgdsSpinner, HTMLElement {}
export const SgdsSpinner: {
  prototype: SgdsSpinner;
  new (): SgdsSpinner;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
