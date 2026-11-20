import { SgdsTable, SgdsTableHead, SgdsTableRow, SgdsTableCell } from '@govtechsg/sgds-web-component/react';

export const Table = () => {
  return (
    <>
      <SgdsTable headerBackground tableBorder>
        <SgdsTableRow>
          <SgdsTableHead>Name</SgdsTableHead>
          <SgdsTableHead>Role</SgdsTableHead>
        </SgdsTableRow>
        <SgdsTableRow>
          <SgdsTableCell>Alice</SgdsTableCell>
          <SgdsTableCell>Engineer</SgdsTableCell>
        </SgdsTableRow>
        <SgdsTableRow>
          <SgdsTableCell>Bob</SgdsTableCell>
          <SgdsTableCell>Designer</SgdsTableCell>
        </SgdsTableRow>
      </SgdsTable>
    </>
  );
};
