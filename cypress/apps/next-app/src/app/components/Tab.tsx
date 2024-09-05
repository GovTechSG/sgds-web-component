import SgdsTab from "@govtechsg/sgds-web-component/react/tab/index.js";
import SgdsTabGroup from "@govtechsg/sgds-web-component/react/tab-group/index.js";
import SgdsTabPanel from "@govtechsg/sgds-web-component/react/tab-panel/index.js";
import SgdsBadge from "@govtechsg/sgds-web-component/react/badge/index.js";

export const Tab = () => {
  return (
    <>
      <SgdsTabGroup>
        <SgdsTab slot="nav" panel="home">
          Home
        </SgdsTab>
        <SgdsTab slot="nav" panel="profile" active>
          Profile
        </SgdsTab>
        <SgdsTab slot="nav" panel="contact">
          Contact
        </SgdsTab>
        <SgdsTabPanel name="home">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </SgdsTabPanel>
        <SgdsTabPanel name="profile">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here',
        </SgdsTabPanel>
        <SgdsTabPanel name="contact">Contact information</SgdsTabPanel>
      </SgdsTabGroup>
      <br />
      <h5>Basic toggle</h5>
      <SgdsTabGroup variant="tabs-basic-toggle">
        <SgdsTab slot="nav" panel="home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-house"
            viewBox="0 0 16 16"
          >
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"></path>
          </svg>
          Home
        </SgdsTab>
        <SgdsTab slot="nav" panel="profile">
          Profile
        </SgdsTab>
        <SgdsTab slot="nav" panel="contact">
          Contact
        </SgdsTab>
        <SgdsTabPanel name="home">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book.
        </SgdsTabPanel>
        <SgdsTabPanel name="profile">
          It is a long established fact that a reader will be distracted by the readable content of a page when looking
          at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
          opposed to using 'Content here, content here',
        </SgdsTabPanel>
        <SgdsTabPanel name="contact">Contact information</SgdsTabPanel>
        <br />
        <h5>Info toggle</h5>
        <SgdsTabGroup variant="tabs-info-toggle">
          <SgdsTab slot="nav" panel="home">
            <span slot="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"></path>
            </svg>
            </span>
            <span slot="count">1</span>
            <span slot="label">Home</span>
          </SgdsTab>
          <SgdsTab slot="nav" panel="profile">
            <span slot="count">2</span>
            <span slot="label">Profile</span>
          </SgdsTab>
          <SgdsTab slot="nav" panel="contact">
            <SgdsBadge slot="count" variant="light">
              100
            </SgdsBadge>
            <span slot="label">Contact</span>
          </SgdsTab>

          <SgdsTabPanel name="home">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </SgdsTabPanel>
          <SgdsTabPanel name="profile">
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using 'Content here, content here',
          </SgdsTabPanel>
          <SgdsTabPanel name="contact">Contact information</SgdsTabPanel>
        </SgdsTabGroup>
      </SgdsTabGroup>
    </>
  );
};
