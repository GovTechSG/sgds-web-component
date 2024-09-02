import SgdsPagination from "@govtechsg/sgds-web-component/react/pagination/index.js";

export const Pagination = () => {
  return (
    <SgdsPagination
      dataLength={50}
      currentPage={1}
      itemsPerPage={5}
      limit={3}
      directionVariant="icon-text"
      size="sm"
      ellipsisJump={3}
    />
  );
};
