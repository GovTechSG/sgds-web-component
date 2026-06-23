export * from "../dist/types/components";
export interface CustomElementsDefineOptions {
  exclude?: string[];
  resourcesUrl?: string;
  syncQueue?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  jmp?: (c: Function) => any;
  raf?: (c: FrameRequestCallback) => number;
  ael?: (
    el: EventTarget,
    eventName: string,
    listener: EventListenerOrEventListenerObject,
    options: boolean | AddEventListenerOptions
  ) => void;
  rel?: (
    el: EventTarget,
    eventName: string,
    listener: EventListenerOrEventListenerObject,
    options: boolean | AddEventListenerOptions
  ) => void;
}
/**
 * @deprecated
 */
export declare function applyPolyfills(): Promise<void>;

export declare function defineCustomElements(win?: Window, opts?: CustomElementsDefineOptions): void;

/**
 * Used to specify a nonce value that corresponds with an application's CSP.
 * When set, the nonce will be added to all dynamically created script and style tags at runtime.
 * Alternatively, the nonce value can be set on a meta tag in the DOM head
 * (<meta name="csp-nonce" content="{ nonce value here }" />) which
 * will result in the same behavior.
 */
export declare function setNonce(nonce: string): void;
