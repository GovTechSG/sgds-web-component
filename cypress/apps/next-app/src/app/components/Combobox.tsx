"use client";
import { SgdsButton } from "@govtechsg/sgds-web-component/react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
// import SgdsCombobox from "@govtechsg/sgds-web-component/react/combo-box/index.js";

const SgdsSelect = dynamic(() => import("@govtechsg/sgds-web-component/react/select/index.js"), {
  ssr: false
});
export const Combobox = () => {
  const [menuList, setMenuList] = useState([
    { label: "Afghanistan", value: "1" },
    { label: "Albania", value: "2" },
    { label: "Algeria", value: "3" }
  ]);

  const handleClick = () => {
       setMenuList([
      { label: "Burundi", value: "32" },
      { label: "Cambodia", value: "33" },
      { label: "Cameroon", value: "34" }
    ]);
  };
  return (
    <div>
      <SgdsButton onClick={handleClick}>Click</SgdsButton>
      <SgdsSelect
        label="Fruits"
        hintText="single select"
        name="combobox"
        placeholder="ComboBox"
        menuList={menuList}
      ></SgdsSelect>
    </div>
  );
};
