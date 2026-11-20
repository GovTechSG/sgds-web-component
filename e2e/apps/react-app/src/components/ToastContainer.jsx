import { SgdsToastContainer, SgdsToast, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const ToastContainer = () => {
  return (
    <>
      <SgdsToastContainer>
        <SgdsToast show title="Title" delay={5000} variant="info">
          <SgdsIcon slot="icon" name="placeholder" size="md"></SgdsIcon>
          Toast content
        </SgdsToast>
      </SgdsToastContainer>
    </>
  );
};
