import SgdsElement from "../base/sgds-element";

/**
 *
 * @param name tagname of custom element
 * @returns boolean
 */
export function isRegistered(name: string): boolean {
  return !!customElements.get(name);
}

export function register(name: string, constructor: typeof SgdsElement) {
  if (!customElements.get(name)) {
    customElements.define(name, constructor);
  }
}
export function warnUnregisteredElements(name: string): boolean {
  if (isRegistered(name)) {
    return true;
  } else {
    console.error(
      `Custom element of name : ${name} is not registered. Remember to import the component file for custom element registration`
    );
    return false;
  }
}
