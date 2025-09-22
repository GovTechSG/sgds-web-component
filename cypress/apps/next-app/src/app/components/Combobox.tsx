"use client"
import dynamic from "next/dynamic"
import React from "react";

const SgdsCombobox = dynamic(
    () => import("@govtechsg/sgds-web-component/react/combo-box/index.js"),
    {
      ssr: false,
    }
  );
export const Combobox = () => {
    return (
      <div>
      <SgdsCombobox 
        label="Fruits" 
        hintText="single select" 
        name="combobox" 
        placeholder="ComboBox" 
        menuList={[{label: "apple", value: "apple"}, {label: "orange", value: "orange"}, {label: "pear", value: "pear"}]}>
      </SgdsCombobox>
      <SgdsCombobox 
        multiSelect
        label="Fruits" 
        hintText="single select" 
        name="combobox" 
        placeholder="ComboBox" 
        menuList={[{label: "apple", value: "apple"}, {label: "orange", value: "orange"}, {label: "pear", value: "pear"}]}>
      </SgdsCombobox>
      </div>
    )
}