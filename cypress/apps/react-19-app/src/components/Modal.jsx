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
      <sgds-button onClick={showModal}>Open Modal</sgds-button>
      <sgds-modal>
        <h2 slot="title">Modal title</h2>
        <p slot="description">Modal description</p>
        <p>
          Etiam suscipit nisi eget porta cursus. Ut sit amet felis aliquet, pellentesque mi at, vulputate nunc. Vivamus
          ac facilisis tellus. Maecenas ac libero scelerisque tellus maximus accumsan a vehicula arcu. Aenean quis leo
          gravida, congue sapien eu, rhoncus ante. Quisque velit est, sodales vitae turpis vitae, hendrerit facilisis
          nulla. Suspendisse potenti. Nulla hendrerit enim sed leo rutrum auctor. Praesent volutpat rutrum purus in
        </p>
        <sgds-button slot="footer" variant="link" class="close-modal" onClick={closeModal}>
          Close
        </sgds-button>
        <sgds-button slot="footer" variant="primary" type="submit" form="formA">
          Submit
        </sgds-button>
      </sgds-modal>
    </>
  );
};
