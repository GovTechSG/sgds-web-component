import SgdsCombobox from "@govtechsg/sgds-web-component/react/combo-box";

export const Combobox = () => {
    return (
      <SgdsCombobox 
        label="Items" 
        hinttext="" 
        name="undefined" 
        placeholder="ComboBox" 
        value="" 
        close="default"
        menuList={["apple", "orange", "pear"]}>
      </SgdsCombobox>
    )
}