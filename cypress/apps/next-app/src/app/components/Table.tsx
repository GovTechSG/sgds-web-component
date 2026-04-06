'use client';

import { useRef, useEffect } from "react";
import { SgdsTable } from "@govtechsg/sgds-web-component/react";

export const Table = () => {
  const rowHeaderRef = useRef<any>(null);
  const colHeaderRef = useRef<any>(null);

  useEffect(() => {
    if (rowHeaderRef.current) {
      rowHeaderRef.current.rowHeader = ["#", "First Names", "Last Name", "Username"];
      rowHeaderRef.current.tableData = [
        ["1", "John", "Doe", "@johndoe"],
        ["2", "Jane", "Doe", "@janedoe"],
        ["3", "Bob", "Smith", "@bobsmith"]
      ];
    }
    if (colHeaderRef.current) {
      colHeaderRef.current.headerPosition = "vertical";
      colHeaderRef.current.columnHeader = ["#", "First Names", "Last Name", "Username"];
      colHeaderRef.current.tableData = [
        [1, "John", "Doe", "@johndoe"],
        [2, "Jane", "Doe", "@janedoe"],
        [3, "Bob", "Smith", "@bobsmith"]
      ];
    }
  }, []);

  return (
    <>
      <SgdsTable ref={rowHeaderRef}></SgdsTable>
      <SgdsTable ref={colHeaderRef}></SgdsTable>
    </>
  );
};
