import { SgdsModal, SgdsButton } from '@govtechsg/sgds-web-component/react';

export const Modal = () => {
  return (
    <>
      <SgdsButton variant="primary" onClick={(e) => { const el = e.currentTarget.nextElementSibling; if (el) el.open = true; }}>Open Modal</SgdsButton>
      <SgdsModal size="md">
        <span slot="title">Modal</span>
        <span slot="description">Description of the modal.</span>
        <span slot="footer">Footer content</span>
        Modal
      </SgdsModal>
    </>
  );
};
