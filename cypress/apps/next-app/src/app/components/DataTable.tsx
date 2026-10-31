'use client';

import { SgdsDataTable, SgdsDataTableRow, SgdsDataTableHead, SgdsDataTableCell } from '@govtechsg/sgds-web-component/react';

export const DataTable = () => {
  return (
    <SgdsDataTable>
      <SgdsDataTableRow>
        <SgdsDataTableHead>Name</SgdsDataTableHead>
        <SgdsDataTableHead>Email</SgdsDataTableHead>
        <SgdsDataTableHead>Role</SgdsDataTableHead>
      </SgdsDataTableRow>
      <SgdsDataTableRow>
        <SgdsDataTableCell>John Doe</SgdsDataTableCell>
        <SgdsDataTableCell>john@example.com</SgdsDataTableCell>
        <SgdsDataTableCell>Admin</SgdsDataTableCell>
      </SgdsDataTableRow>
      <SgdsDataTableRow>
        <SgdsDataTableCell>Jane Doe</SgdsDataTableCell>
        <SgdsDataTableCell>jane@example.com</SgdsDataTableCell>
        <SgdsDataTableCell>User</SgdsDataTableCell>
      </SgdsDataTableRow>
    </SgdsDataTable>
  );
};
