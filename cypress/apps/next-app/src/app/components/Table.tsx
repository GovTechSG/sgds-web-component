import SgdsTable from "@govtechsg/sgds-web-component/react/table/index.js";

export const Table = () => {
  return (
    <SgdsTable
      tableheaders='["#", "First Names", "Last Name", "Username"]'
      tabledata='[
        ["1", "John", "Doe", "@johndoe"],
        ["2", "Jane", "Doe", "@janedoe"],
        ["3", "Bob", "Smith", "@bobsmith"]
      ]'
    />
  );
};
