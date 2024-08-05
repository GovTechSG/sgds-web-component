import { html } from "lit-html";
import { ifDefined } from "lit/directives/if-defined.js";

export const Template = ({
  dataLength,
  currentPage,
  itemsPerPage,
  limit,
  directionVariant,
  size,
  ellipsisOn,
  ellipsisJump,
  showFirstPage,
  showLastPage
}) => {
  return html`
    <sgds-pagination
      dataLength=${ifDefined(dataLength)}
      currentPage=${ifDefined(currentPage)}
      itemsPerPage=${ifDefined(itemsPerPage)}
      limit=${ifDefined(limit)}
      directionVariant=${ifDefined(directionVariant)}
      size=${ifDefined(size)}
      ellipsisOn=${ifDefined(ellipsisOn)}
      ellipsisJump=${ifDefined(ellipsisJump)}
      showFirstPage=${ifDefined(showFirstPage)}
      showLastPage=${ifDefined(showLastPage)}
    ></sgds-pagination>
  `;
};

export const args = { dataLength: "50" };
export const parameters = {};
