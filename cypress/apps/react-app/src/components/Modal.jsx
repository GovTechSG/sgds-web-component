import SgdsButton from "@govtechsg/sgds-web-component/react/button";
import SgdsModal from "@govtechsg/sgds-web-component/react/modal";
import { useRef } from "react";

export const Modal = () => {
    const modalRef = useRef(null);

    const showModal = () => {
        modalRef.current?.show();
    };
    const closeModal = () => {
        modalRef.current?.hide();
    };

    return (
        <>
            <SgdsButton onClick={showModal}>Open Modal</SgdsButton>
            <SgdsModal
                ref={modalRef}
                title="hello"
                titleicon="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; width=&quot;16&quot; height=&quot;16&quot; fill=&quot;currentColor&quot; class=&quot;bi bi-amd&quot; viewBox=&quot;0 0 16 16&quot;>
                            <path d=&quot;m.334 0 4.358 4.359h7.15v7.15l4.358 4.358V0H.334ZM.2 9.72l4.487-4.488v6.281h6.28L6.48 16H.2V9.72Z&quot;/>
                            </svg>">
                This is a Modal
                <SgdsButton onClick={closeModal} slot="footer" variant="link" class="close-modal">Close</SgdsButton>
                <SgdsButton slot="footer" variant="primary" type="submit" form="formA">Submit</SgdsButton>
            </SgdsModal>
        </>
    )
}
