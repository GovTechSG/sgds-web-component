import { useEffect } from "react";
import SgdsTable from "@govtechsg/sgds-web-component/react/table/index.js";

export const Table = () => {
  const rowHeader = [
    {
      key: "first-name",
      value: "First Name"
    },
    {
      key: "last-name",
      value: "Last Name"
    },
    {
      key: "email",
      value: "Email"
    },
    {
      key: "button",
      value: "Button"
    },
    {
      key: "action",
      value: "Actions"
    }
  ];

  const tableData = [
    {
      email: "@alicedoe",
      "first-name": "Alice",
      "last-name": "Doe",
      button: {
        id: "email_button",
        type: "button",
        value: "@alicedoe",
        variant: "outline"
      },
      action: [
        {
          id: "edit_btn",
          type: "icon-button",
          value: "edit",
          variant: "outline"
        },
        {
          id: "add_btn",
          type: "icon-button",
          value: "plus",
          variant: "outline"
        }
      ]
    },
    {
      email: "@johndoe",
      "first-name": "John",
      "last-name": "Doe",
      button: {
        id: "badge",
        type: "badge",
        value: "@johndoe",
        variant: "outline"
      },
      action: [
        {
          id: "add_btn",
          type: "icon-button",
          value: "three-dots-vertical",
          variant: "ghost"
        },
        {
          id: "add_btn",
          type: "icon-button",
          value: "trash"
        }
      ]
    }
  ];

  const columnHeader = ["First Names", "Last Name", "Username"];

  const handleTableLink = e => {
    console.log("handleTableLink", e);
  };

  useEffect(() => {
    document.addEventListener("sgds-table-click", handleTableLink);

    return () => {
      document.removeEventListener("sgds-table-click", handleTableLink);
    };
  });

  return (
    <>
      <SgdsTable rowHeader={rowHeader} tableData={tableData}></SgdsTable>
      <SgdsTable headerPosition="vertical" columnHeader={columnHeader} tableData={tableData} />
      <SgdsTable headerPosition="both" rowHeader={rowHeader} columnHeader={columnHeader} tableData={tableData} />
    </>
  );
};
