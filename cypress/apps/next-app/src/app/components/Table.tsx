'use client';

import { SgdsTable, SgdsTableRow, SgdsTableHead, SgdsTableCell } from '@govtechsg/sgds-web-component/react';

export const Table = () => {
  return (
    <SgdsTable tableBorder headerBackground>
      <SgdsTableRow>
        <SgdsTableHead>#</SgdsTableHead>
        <SgdsTableHead>First Name</SgdsTableHead>
        <SgdsTableHead>Last Name</SgdsTableHead>
        <SgdsTableHead>Username</SgdsTableHead>
      </SgdsTableRow>
      <SgdsTableRow>
        <SgdsTableCell>1</SgdsTableCell>
        <SgdsTableCell>John</SgdsTableCell>
        <SgdsTableCell>Doe</SgdsTableCell>
        <SgdsTableCell>@johndoe</SgdsTableCell>
      </SgdsTableRow>
      <SgdsTableRow>
        <SgdsTableCell>2</SgdsTableCell>
        <SgdsTableCell>Jane</SgdsTableCell>
        <SgdsTableCell>Doe</SgdsTableCell>
        <SgdsTableCell>@janedoe</SgdsTableCell>
      </SgdsTableRow>
      <SgdsTableRow>
        <SgdsTableCell>3</SgdsTableCell>
        <SgdsTableCell>Bob</SgdsTableCell>
        <SgdsTableCell>Smith</SgdsTableCell>
        <SgdsTableCell>@bobsmith</SgdsTableCell>
      </SgdsTableRow>
    </SgdsTable>
  );
};
