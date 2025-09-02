/**
 * Popper modifiers
 */
import { Modifier } from "@popperjs/core";

export const referenceTargetWidth: Modifier<"sameWidthAsTarget", object> = {
  name: "sameWidthAsTarget",
  enabled: true,
  phase: "beforeWrite",
  requires: ["computeStyles"],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${(state.elements.reference as HTMLElement).offsetWidth}px`;
  }
};
