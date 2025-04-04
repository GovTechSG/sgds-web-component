import SgdsTable from "@govtechsg/sgds-web-component/react/table/index.js";

export const Table = () => {
  return (
    <>
      <SgdsTable
        rowHeader={["#", "First Names", "Last Name", "Username"]}
        tableData={[
          ["1", "John", "Doe", "@johndoe"],
          ["2", "Jane", "Doe", "@janedoe"],
          ["3", "Bob", "Smith", "@bobsmith"]
        ]}
      />
      <SgdsTable
        headerPosition="vertical"
        columnHeader={["#", "First Names", "Last Name", "Username"]}
        tableData={[
          [1, "John", "Doe", "@johndoe"],
          [2, "Jane", "Doe", "@janedoe"],
          [3, "Bob", "Smith", "@bobsmith"]
        ]}
      />
      <SgdsTable
        headerPosition="both"
        rowHeader={["8-12", "12-16", "16-20", "20-24"]}
        columnheader='["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]'
        tabledata='[
        ["20", "100", "240", "8"],
        ["35", "148", "325", "17"],
        ["16", "78", "153", "12"],
        ["43", "82", "96", "35"],
        ["36", "174", "453", "82"],
        ["149", "336", "792", "129"],
        ["133", "302", "508", "66"]
        ]'
      />
    </>
  );
};
