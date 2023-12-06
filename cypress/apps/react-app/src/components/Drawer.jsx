import SgdsButton from "@govtechsg/sgds-web-component/react/button";
import SgdsDrawer from "@govtechsg/sgds-web-component/react/drawer";
import { useRef } from "react";

export const Drawer = () => {
    const drawerRef = useRef(null);

    const showDrawer = () => {
        drawerRef.current?.show();
    };
    const closeDrawer = () => {
        drawerRef.current?.hide();
    };

    return (
        <>
            <SgdsButton onClick={showDrawer}>Open end Drawer</SgdsButton>
            <SgdsDrawer ref={drawerRef} label="" placement="end">
                This is a Drawer
                <SgdsButton onClick={closeDrawer} slot="footer" variant="link" class="close-drawer">Close</SgdsButton>
                <SgdsButton slot="footer" variant="primary" type="submit" form="formA">Submit</SgdsButton>
            </SgdsDrawer>
        </>
    )
}
