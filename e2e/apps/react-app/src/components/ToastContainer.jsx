import { SgdsToastContainer, SgdsToast, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const ToastContainer = () => {
  return (
    <>
      <SgdsToastContainer position="bottom-end">
        <SgdsToast show title="Notification" variant="info">
          <SgdsIcon slot="icon" name="info-circle-fill" size="md"></SgdsIcon>
          Your changes have been saved.
        </SgdsToast>
      </SgdsToastContainer>
    </>
  );
};
