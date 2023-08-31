import generateCustomElementName from "./generateCustomElementName";

const registerCustomElement = (components: Array<CustomElementConstructor>) => {
  components.forEach(c => {
    const customElementTag = generateCustomElementName(c.name);
    customElements.define(customElementTag, c as CustomElementConstructor);
  });
};
export default registerCustomElement;
