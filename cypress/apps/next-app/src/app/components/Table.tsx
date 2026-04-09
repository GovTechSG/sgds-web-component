'use client';

import { useRef, useEffect } from "react";

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
      <sgds-table ref={rowHeaderRef} suppressHydrationWarning></sgds-table>
      <sgds-table ref={colHeaderRef} suppressHydrationWarning></sgds-table>
    </>
  );
};
