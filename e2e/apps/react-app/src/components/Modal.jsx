import { SgdsModal, SgdsButton } from '@govtechsg/sgds-web-component/react';

export const Modal = () => {
  return (
    <>
      <SgdsButton variant="primary" onClick={(e) => { const m = e.currentTarget.nextElementSibling; if (m) m.open = true; }}>Open Modal</SgdsButton>
      <SgdsModal label="Modal Title">Modal content goes here.</SgdsModal>
    </>
  );
};
