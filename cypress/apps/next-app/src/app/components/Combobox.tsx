import dynamic from "next/dynamic"
const SgdsCombobox = dynamic(
    () => import("@govtechsg/sgds-web-component/react/combo-box/index.js"),
    {
      ssr: false,
    }
  );
export const Combobox = () => {
    return (
      <SgdsCombobox 
        label="Items" 
        hintText="" 
        name="undefined" 
        placeholder="ComboBox" 
        value="" 
        close="default"
        menuList={["apple", "orange", "pear"]}>
      </SgdsCombobox>
    )
}