import React from "react";

import SgdsSelect from "@govtechsg/sgds-web-component/react/select/index.js"
import SgdsSelectOption from "@govtechsg/sgds-web-component/react/select-option/index.js"
// import "@govtechsg/sgds-web-component/components/Select"
export const Select = () => {
    return (
      <div>
      <SgdsSelect
        label="Fruits" 
        hintText="single select" 
        name="combobox" 
        placeholder="ComboBox" 
        value="1"
        >
            <SgdsSelectOption value="1">One</SgdsSelectOption>
      </SgdsSelect>
     
      {/* <sgds-select
        label="Fruits" 
        hintText="single select" 
        name="combobox" 
        placeholder="ComboBox" 
        value="1"
        >
            <sgds-select-option value="1">One</sgds-select-option>
      </sgds-select> */}
     
      </div>
    )
}