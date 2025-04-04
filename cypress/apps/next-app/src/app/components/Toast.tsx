import SgdsToast from "@govtechsg/sgds-web-component/react/toast/index.js";
import SgdsToastContainer from "@govtechsg/sgds-web-component/react/toast-container/index.js";
import SgdsIcon from "@govtechsg/sgds-web-component/react/icon/index.js";
import SgdsLink from "@govtechsg/sgds-web-component/react/link/index.js";

export const Toast = () => {
  return (
    <SgdsToastContainer position="bottom-start">
      <SgdsToast show dismissible variant="warning">
        <SgdsIcon slot="icon" name="exclamation-triangle-fill"></SgdsIcon>
        <SgdsLink slot="action" href="#" target="_blank">
          Action
        </SgdsLink>
        This is a toast notifications
      </SgdsToast>
    </SgdsToastContainer>
  );
};
