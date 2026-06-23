import type { Components, JSX } from "../types/components";

interface SgdsButton extends Components.SgdsButton, HTMLElement {}
export const SgdsButton: {
  prototype: SgdsButton;
  new (): SgdsButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
