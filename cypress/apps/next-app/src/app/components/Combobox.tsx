import SgdsCombobox from "@govtechsg/sgds-web-component/react/combo-box/index.js";

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