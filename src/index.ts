import * as Components from "./components";

//takes all the components exported from index.ts, converts it to kebab case and register it in customElementsRegistry
const tagNameConverter = (key: string) => key.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
for (const [key, value] of Object.entries(Components)) {
    const customElementTag = tagNameConverter(key)
    customElements.define(customElementTag, value)
  }

