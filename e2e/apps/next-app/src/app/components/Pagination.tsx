'use client';

import { SgdsPagination } from '@govtechsg/sgds-web-component/react';

export const Pagination = () => {
  return (
    <>
      <SgdsPagination dataLength={0} currentPage={1} itemsPerPage={5} variant="default" navigation="icon-button" size="md"></SgdsPagination>
    </>
  );
};
