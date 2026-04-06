import { useEffect, type RefObject } from "react";

/**
 * Attach a custom event listener after mount.
 * Use this on raw <sgds-*> JSX when the global patch isn't sufficient.
 *
 * @param ref - ref to the custom element
 * @param eventName - DOM event name, e.g. 'sgds-change'
 * @param handler - event handler
 */
export function useCustomEvent<T extends Event>(
  ref: RefObject<Element | null>,
  eventName: string,
  handler: (e: T) => void
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener(eventName, handler as EventListener);
    return () => el.removeEventListener(eventName, handler as EventListener);
  }, [ref, eventName, handler]);
}

/**
 * Set an object/array property directly on a custom element DOM node.
 * Bypasses React's attribute serialization for complex props.
 *
 * @param ref - ref to the custom element
 * @param propName - DOM property name, e.g. 'menuList'
 * @param value - value to set (array, object, etc.)
 */
export function useWebComponentProp<T>(ref: RefObject<Element | null>, propName: string, value: T): void {
  useEffect(() => {
    if (ref.current) (ref.current as any)[propName] = value;
  }, [ref, propName, value]);
}
