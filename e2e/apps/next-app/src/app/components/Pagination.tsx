'use client';

import { SgdsPagination } from '@govtechsg/sgds-web-component/react';

export const Pagination = () => {
  return (
    <>
      <SgdsPagination dataLength={50} currentPage={1} itemsPerPage={10}></SgdsPagination>
    </>
  );
};
