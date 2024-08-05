import { html } from "lit-html";

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
      dataLength=${dataLength}
      currentPage=${currentPage}
      itemsPerPage=${itemsPerPage}
      limit=${limit}
      directionVariant=${directionVariant}
      size=${size}
      ?ellipsisOn=${ellipsisOn}
      ellipsisJump=${ellipsisJump}
      ?showFirstPage=${showFirstPage}
      ?showLastPage=${showLastPage}
    ></sgds-pagination>
  `;
};

export const args = { dataLength: "50" };
export const parameters = {};
