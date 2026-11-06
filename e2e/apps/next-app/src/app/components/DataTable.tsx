'use client';

import { SgdsDataTable, SgdsDataTableHead, SgdsDataTableRow, SgdsDataTableCell } from '@govtechsg/sgds-web-component/react/ssr';

export const DataTable = () => {
  return (
    <>
      <SgdsDataTable dataLength={3} currentPage={1} itemsPerPage={5}>
        <SgdsDataTableRow>
          <SgdsDataTableHead sorting sortKey="id">ID</SgdsDataTableHead>
          <SgdsDataTableHead sorting sortKey="name">Name</SgdsDataTableHead>
          <SgdsDataTableHead sortKey="role">Role</SgdsDataTableHead>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>1</SgdsDataTableCell>
          <SgdsDataTableCell>Alice</SgdsDataTableCell>
          <SgdsDataTableCell>Engineer</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>2</SgdsDataTableCell>
          <SgdsDataTableCell>Bob</SgdsDataTableCell>
          <SgdsDataTableCell>Designer</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>3</SgdsDataTableCell>
          <SgdsDataTableCell>Charlie</SgdsDataTableCell>
          <SgdsDataTableCell>Analyst</SgdsDataTableCell>
        </SgdsDataTableRow>
      </SgdsDataTable>
    </>
  );
};
