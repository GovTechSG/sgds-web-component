import React, { useEffect } from "react";

export const Table = () => {
    const tableData = [
        ["1", "John", "Doe", "@johndoe"],
        ["2", "Jane", "Doe", "@janedoe"],
        ["3", "Bob", "Smith", "@bobsmith"]
      ]
  const [state, setState] = React.useState(tableData)

  useEffect(() => {
    setTimeout(() => {
      setState([])
    }, 5000)
  }, [])
  const rowHeader = ["#", "First Names", "Last Name", "Username"]
  return (
    <>
    <sgds-table tableData={state} rowHeader={rowHeader}></sgds-table>
    <br/>
    <sgds-table>
  <sgds-table-row>
    <sgds-table-head>#</sgds-table-head>
    <sgds-table-head>First name</sgds-table-head>
    <sgds-table-head>Last name</sgds-table-head>
    <sgds-table-head>Username</sgds-table-head>
    <sgds-table-head>Action</sgds-table-head>
  </sgds-table-row>

  <sgds-table-row>
    <sgds-table-head>1</sgds-table-head>
    <sgds-table-cell>John</sgds-table-cell>
    <sgds-table-cell>Doe</sgds-table-cell>
    <sgds-table-cell>
      <sgds-link>
        <a href="#">@johndoe</a>
      </sgds-link>
    </sgds-table-cell>
    <sgds-table-cell>
      <sgds-icon-button name="three-dots-vertical"></sgds-icon-button>
    </sgds-table-cell>
  </sgds-table-row>
  <sgds-table-row>
    <sgds-table-head>2</sgds-table-head>
    <sgds-table-cell>Jane</sgds-table-cell>
    <sgds-table-cell>Doe</sgds-table-cell>
    <sgds-table-cell>
      <sgds-link>
        <a href="#">@janedoe</a>
      </sgds-link>
    </sgds-table-cell>
    <sgds-table-cell>-</sgds-table-cell>
  </sgds-table-row>
  <sgds-table-row>
    <sgds-table-head>3</sgds-table-head>
    <sgds-table-cell>Bob</sgds-table-cell>
    <sgds-table-cell>Smith</sgds-table-cell>
    <sgds-table-cell>
      <sgds-link>
        <a href="#">@bobsmith</a>
      </sgds-link>
    </sgds-table-cell>
    <sgds-table-cell>
      <sgds-badge outlined=""> active </sgds-badge>
    </sgds-table-cell>
  </sgds-table-row>
</sgds-table>
</>
  );
};
