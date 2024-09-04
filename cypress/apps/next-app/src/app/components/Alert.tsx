import dynamic from "next/dynamic"
const SgdsAlert = dynamic(
  () => import("@govtechsg/sgds-web-component/react/alert/index.js"),
  {
    ssr: false,
  }
);
import SgdsAlertHeading from "@govtechsg/sgds-web-component/react/alert-heading/index.js";
import SgdsAlertLink from "@govtechsg/sgds-web-component/react/alert-link/index.js";

export const Alert = () => {
  return (
    <>
      <SgdsAlert variant="primary" show>
        <span slot="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-exclamation-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
          </svg>
        </span>
        This is an Alert component. You may add the dismissible option
      </SgdsAlert>
      <SgdsAlert variant="success" show>
        <span slot="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-info-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
          </svg>
        </span>
        <div>
          <SgdsAlertHeading>Hello, nice to meet you</SgdsAlertHeading>
          <p>
            Aww yeah, you successfully read this important
            <SgdsAlertLink href="#">
              alert message
            </SgdsAlertLink>
            . This example text is going to run a bit longer so that you can see how spacing within an alert works with
            this kind of content.
          </p>
          <hr />
          <p>Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
        </div>
      </SgdsAlert>
    </>
  );
};
