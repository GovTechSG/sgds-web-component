import React, { useEffect } from "react";

export const Combobox = () => {
  const comboBoxRef = React.useRef(null);
  const [disable, setDisabled]= React.useState(false)
  const [value, setValue]= React.useState("1")
  const [menuList, setMenuList] = React.useState([
    { label: "Afghanistan", value: "1" },
    { label: "Albania", value: "2" },
    { label: "Algeria", value: "3" }
  ]);


  const handleClick = () => {
    // setValue("2")
    setDisabled(!disable)
    // setMenuList(prev => [...prev,
    //   { label: "Burundi", value: "32" },
    //   { label: "Cambodia", value: "33" },
    //   { label: "Cameroon", value: "34" }
    // ]);
    setMenuList([
      { label: "Burundi", value: "32" },
      { label: "Cambodia", value: "33" },
      { label: "Cameroon", value: "34" }
    ]);
    setMenuList(prev => prev.filter(item => item.value !== "2"));
  };

  return (
    <>
      <sgds-button onClick={handleClick}></sgds-button>
      <sgds-select
        ref={comboBoxRef}
        label="Items"
        hinttext=""
        name="undefined"
        placeholder="ComboBox"
        close="default"
        menuList={menuList}
      ></sgds-select>
    </>
  );
};
