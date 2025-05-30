// import "@govtechsg/sgds-web-component/react/table/index.js";
// import "@govtechsg/sgds-web-component/components/Badge";
// import "@govtechsg/sgds-web-component/components/Button";
// import "@govtechsg/sgds-web-component/components/IconButton";
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

  const handleTableLink = e => {
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
      <SgdsTable rowHeader={rowHeader} tableData={tableData}></SgdsTable>
    </>
  );
};
