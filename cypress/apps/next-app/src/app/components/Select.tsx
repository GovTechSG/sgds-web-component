"use client"
import dynamic from "next/dynamic"
import React from "react";

// import SgdsSelect from "@govtechsg/sgds-web-component/react/select/index.js"
// import SgdsSelectOption from "@govtechsg/sgds-web-component/react/select-option/index.js"
import "@govtechsg/sgds-web-component/components/Select"
import "@govtechsg/sgds-web-component/components/ComboBox"
export const Select = () => {
    return (
      <div>
      <sgds-select
        label="Fruits" 
        hintText="single select" 
        name="combobox" 
        placeholder="ComboBox" 
        value="1"
        >
            <sgds-select-option value="1">One</sgds-select-option>
      </sgds-select>
      <sgds-combo-box
        label="Fruits" 
        hintText="single select" 
        name="combobox" 
        placeholder="ComboBox" 
        value="1"
        multiselect
        >
            <sgds-combo-box-option value="1">One</sgds-combo-box-option>
            <sgds-combo-box-option value="2">Two</sgds-combo-box-option>
      </sgds-combo-box>
     
      </div>
    )
}