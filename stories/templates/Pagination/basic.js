import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({ dataLength, currentPage, itemsPerPage, variant, size, navigation }) => {
  return html`
    <sgds-pagination
      dataLength=${ifDefined(dataLength)}
      currentPage=${ifDefined(currentPage)}
      itemsPerPage=${ifDefined(itemsPerPage)}
      variant=${ifDefined(variant)}
      navigation=${ifDefined(navigation)}
      size=${ifDefined(size)}
    ></sgds-pagination>
  `;
};

export const args = { dataLength: "50" };
export const parameters = {};
