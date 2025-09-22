"use client"
import dynamic from "next/dynamic"
import React from "react";
// import SgdsCombobox from "@govtechsg/sgds-web-component/react/combo-box/index.js";

const SgdsCombobox = dynamic(
    () => import("@govtechsg/sgds-web-component/react/combo-box/index.js"),
    {
      ssr: false,
    }
  );
export const Combobox = () => {
  // const [dummy, setDummy] = React.useState(0);
  // const forceRerender = () => setDummy((x) => x + 1);
  // React.useEffect(() => {
  //   forceRerender();
  // }, []);
    return (
      <div>
       <sgds-select
        menulist={JSON.stringify([{label: "apple", value: "apple"}, {label: "orange", value: "orange"}, {label: "pear", value: "pear"}])}
        onchange={(e: any) => console.log("change")}
        >
        </sgds-select>
      {/* <SgdsCombobox 
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
      </SgdsCombobox> */}
      </div>
    )
}