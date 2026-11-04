'use client';

import { SgdsDataTable, SgdsDataTableRow, SgdsDataTableHead, SgdsDataTableCell } from '@govtechsg/sgds-web-component/react';

export const DataTable = () => {
  return (
    <SgdsDataTable dataLength={5} itemsPerPage={5} currentPage={1}>
      <SgdsDataTableRow>
        <SgdsDataTableHead sorting sortKey="name">Name</SgdsDataTableHead>
        <SgdsDataTableHead sorting sortKey="email">Email</SgdsDataTableHead>
        <SgdsDataTableHead>Role</SgdsDataTableHead>
        <SgdsDataTableHead textAlign="right">Amount</SgdsDataTableHead>
      </SgdsDataTableRow>
      <SgdsDataTableRow>
        <SgdsDataTableCell>John Doe</SgdsDataTableCell>
        <SgdsDataTableCell>john@example.com</SgdsDataTableCell>
        <SgdsDataTableCell>Admin</SgdsDataTableCell>
        <SgdsDataTableCell>1250.00</SgdsDataTableCell>
      </SgdsDataTableRow>
      <SgdsDataTableRow>
        <SgdsDataTableCell>Jane Doe</SgdsDataTableCell>
        <SgdsDataTableCell>jane@example.com</SgdsDataTableCell>
        <SgdsDataTableCell>User</SgdsDataTableCell>
        <SgdsDataTableCell>750.00</SgdsDataTableCell>
      </SgdsDataTableRow>
      <SgdsDataTableRow>
        <SgdsDataTableCell>Bob Smith</SgdsDataTableCell>
        <SgdsDataTableCell>bob@example.com</SgdsDataTableCell>
        <SgdsDataTableCell>Editor</SgdsDataTableCell>
        <SgdsDataTableCell>980.00</SgdsDataTableCell>
      </SgdsDataTableRow>
      <SgdsDataTableRow>
        <SgdsDataTableCell>Alice Tan</SgdsDataTableCell>
        <SgdsDataTableCell>alice@example.com</SgdsDataTableCell>
        <SgdsDataTableCell>Admin</SgdsDataTableCell>
        <SgdsDataTableCell>1100.00</SgdsDataTableCell>
      </SgdsDataTableRow>
      <SgdsDataTableRow>
        <SgdsDataTableCell>Charlie Lim</SgdsDataTableCell>
        <SgdsDataTableCell>charlie@example.com</SgdsDataTableCell>
        <SgdsDataTableCell>User</SgdsDataTableCell>
        <SgdsDataTableCell>500.00</SgdsDataTableCell>
      </SgdsDataTableRow>
    </SgdsDataTable>
  );
};
