"use client";

import SgdsTable from "@govtechsg/sgds-web-component/react/table/index.js";
import "@govtechsg/sgds-web-component/react/button/index.js";
import "@govtechsg/sgds-web-component/react/icon-button/index.js";
import "@govtechsg/sgds-web-component/react/badge/index.js";
import { useEffect } from "react";

export const Table = () => {
  const rowHeader = [
    {
      key: "first-name",
      value: "First Name"
    },
    {
      key: "last-name",
      value: "Last Name",
      render: {
        id: "row-link",
        type: "link"
      }
    },
    {
      key: "email",
      value: "Email",
      render: {
        type: "badge",
        props: {
          variant: "success"
        }
      }
    },
    {
      key: "buttons",
      value: "Button",
      render: {
        type: "button",
        props: {
          variant: "outline",
          id: "stepper-btn-next",
          type: "reset"
        }
      }
    },
    {
      key: "action",
      value: "icon-button",
      render: [
        {
          type: "icon-button",
          props: {
            variant: "outline",
            id: "stepper-btn-next",
            name: "plus"
          }
        },
        {
          type: "icon-button",
          props: {
            variant: "outline",
            id: "stepper-btn-next",
            name: "plus"
          }
        }
      ]
    }
  ];

  const tableData = [
    {
      email: "@johndoe",
      "first-name": "John",
      "last-name": "Doe",
      buttons: "click"
    },
    {
      email: "@johndoe",
      "first-name": "John",
      "last-name": "Doe",
      buttons: "click"
    }
  ];

  const columnHeader = ["First Names", "Last Name", "Username"];

  const handleTableLink = (e: unknown) => {
    console.log("handleTableLink", e);
  };

  useEffect(() => {
    document.addEventListener("sgds-table-click-row-link", handleTableLink);

    return () => {
      document.removeEventListener("sgds-table-click-row-link", handleTableLink);
    };
  });

  return (
    <>
      <SgdsTable rowHeader={rowHeader} tableData={tableData} />
      <SgdsTable headerPosition="vertical" columnHeader={columnHeader} tableData={tableData} />
      <SgdsTable headerPosition="both" rowHeader={rowHeader} columnHeader={columnHeader} tableData={tableData} />

      {/* <SgdsTable
        headerPosition="vertical"
        
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
      /> */}
    </>
  );
};
