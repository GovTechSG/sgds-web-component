// @runOnFirstUpdatedWhenSSR decorator
//
// Runs a decorated method once right before `firstUpdated()`
// if the reactive property `ssr` is true.
// Lit components not running slotchange event if element is SSR-ed
// see https://github.com/lit/lit/discussions/4697
// To be removed once this issue is resolved
//
// Usage:
//
//  @runOnFirstUpdatedWhenSSR()
//  handleSSRReady() {
//    ...
//  }

import type { LitElement } from "lit";
import SgdsElement from "../base/sgds-element";

type NoArgHandler = () => void;

type NonUndefined<A> = A extends undefined ? never : A;

type NoArgHandlerFunctionKeys<T extends object> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends NoArgHandler ? K : never;
}[keyof T];

/**
 * Runs a method once after `firstUpdated` if `this.ssr === true`
 */
export function runOnFirstUpdatedWhenSSR() {
  return <ElemClass extends LitElement>(
    proto: ElemClass,
    decoratedFnName: NoArgHandlerFunctionKeys<ElemClass>
  ): void => {
    // Preserve existing firstUpdated
    const originalFirstUpdated = (proto as any).firstUpdated;
    // @ts-expect-error -- firstUpdated is a protected property
    proto.firstUpdated = function (this: ElemClass, changedProps: Map<keyof ElemClass, ElemClass[keyof ElemClass]>) {
      // Check if the reactive prop `ssr` is true
      if ((this as unknown as SgdsElement).ssr) {
        (this[decoratedFnName] as unknown as NoArgHandler)();
      }
      // Call original firstUpdated if defined
      if (originalFirstUpdated) {
        originalFirstUpdated.call(this, changedProps);
      }
    };
  };
}
