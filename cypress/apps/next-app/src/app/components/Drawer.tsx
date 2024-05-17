import SgdsButton from "@govtechsg/sgds-web-component/react/button/index.js";
import SgdsDrawer from "@govtechsg/sgds-web-component/react/drawer/index.js";
import { useRef, type MutableRefObject } from "react";
import { SgdsDrawer as typeDrawer } from "@govtechsg/sgds-web-component/components";
export const Drawer = () => {
  const drawerRef = useRef(null);

  const showDrawer = () => {
    const drawer: typeDrawer = drawerRef.current!
    drawer.show()
  };
  const closeDrawer = () => {
    const drawer: typeDrawer = drawerRef.current!
    drawer.hide()
  };

  return (
    <>
      <SgdsButton onClick={showDrawer}>Open end Drawer</SgdsButton>
      <SgdsDrawer ref={drawerRef} label="" placement="end">
        This is a Drawer
        <SgdsButton onClick={closeDrawer} slot="footer" variant="link" class="close-drawer">
          Close
        </SgdsButton>
        <SgdsButton slot="footer" variant="primary" type="submit" form="formA">
          Submit
        </SgdsButton>
      </SgdsDrawer>
    </>
  );
};
