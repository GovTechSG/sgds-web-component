
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
            <sgds-button onClick={showDrawer}>Open end Drawer</sgds-button>
            <sgds-drawer ref={drawerRef} label="" placement="end">
                This is a Drawer
                <sgds-button onClick={closeDrawer} slot="footer" variant="link" class="close-drawer">Close</sgds-button>
                <sgds-button slot="footer" variant="primary" type="submit" form="formA">Submit</sgds-button>
            </sgds-drawer>
        </>
    )
}
