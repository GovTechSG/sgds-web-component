'use client';

import { SgdsDataTable, SgdsDataTableHead, SgdsDataTableRow, SgdsDataTableCell } from '@govtechsg/sgds-web-component/react';

export const DataTable = () => {
  return (
    <>
      <SgdsDataTable multiSelect dataLength={5} currentPage={1} itemsPerPage={5}>
        <SgdsDataTableRow>
          <SgdsDataTableHead sorting sortKey="id">ID</SgdsDataTableHead>
          <SgdsDataTableHead sorting sortKey="name">Name</SgdsDataTableHead>
          <SgdsDataTableHead sorting sortKey="role">Role</SgdsDataTableHead>
          <SgdsDataTableHead textAlign="right">Amount</SgdsDataTableHead>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>1</SgdsDataTableCell>
          <SgdsDataTableCell>Alice</SgdsDataTableCell>
          <SgdsDataTableCell>Engineer</SgdsDataTableCell>
          <SgdsDataTableCell>1250.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>2</SgdsDataTableCell>
          <SgdsDataTableCell>Bob</SgdsDataTableCell>
          <SgdsDataTableCell>Designer</SgdsDataTableCell>
          <SgdsDataTableCell>980.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>3</SgdsDataTableCell>
          <SgdsDataTableCell>Charlie</SgdsDataTableCell>
          <SgdsDataTableCell>Analyst</SgdsDataTableCell>
          <SgdsDataTableCell>1100.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>4</SgdsDataTableCell>
          <SgdsDataTableCell>Diana</SgdsDataTableCell>
          <SgdsDataTableCell>Manager</SgdsDataTableCell>
          <SgdsDataTableCell>1500.00</SgdsDataTableCell>
        </SgdsDataTableRow>
        <SgdsDataTableRow>
          <SgdsDataTableCell>5</SgdsDataTableCell>
          <SgdsDataTableCell>Eve</SgdsDataTableCell>
          <SgdsDataTableCell>Engineer</SgdsDataTableCell>
          <SgdsDataTableCell>1300.00</SgdsDataTableCell>
        </SgdsDataTableRow>
      </SgdsDataTable>
    </>
  );
};
