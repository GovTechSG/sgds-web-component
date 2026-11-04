'use client';

import { SgdsDataTable, SgdsDataTableHead, SgdsDataTableRow, SgdsDataTableCell } from '@govtechsg/sgds-web-component/react';

export const DataTable = () => {
  return (
    <>
      <SgdsDataTable dataLength={2} currentPage={1} itemsPerPage={5}>
        <SgdsDataTableRow>
          <SgdsDataTableHead>ID</SgdsDataTableHead>
          <SgdsDataTableHead>Name</SgdsDataTableHead>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>1</SgdsDataTableCell>
          <SgdsDataTableCell>Alice</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>2</SgdsDataTableCell>
          <SgdsDataTableCell>Bob</SgdsDataTableCell>
        </SgdsDataTableRow>
      </SgdsDataTable>
    </>
  );
};
