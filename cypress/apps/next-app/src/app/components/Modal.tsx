"use client"
import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";
import SgdsModal from "@govtechsg/sgds-web-component/react/modal/index.js";


import { useState } from "react";
export const Modal = () => {
  const [open, setOpen] = useState(false)
  const toggleModal = () => {
    setOpen(!open)
  };


  return (
    <>
      <SgdsButton onClick={toggleModal}>Open Modal</SgdsButton>
      <SgdsModal
        open={open}
        title="hello"
        titleIcon='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-amd" viewBox="0 0 16 16">
                            <path d="m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0H.334ZM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2V9.72Z"/>
                            </svg>'
      >
        This is a Modal
        <SgdsButton onClick={toggleModal} slot="footer" variant="link">
          Close
        </SgdsButton>
        <SgdsButton slot="footer" variant="primary" type="submit" form="formA">
          Submit
        </SgdsButton>
      </SgdsModal>
    </>
  );
};
