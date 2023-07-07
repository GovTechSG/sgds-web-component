import { html } from "lit-html";

export const Template = ({ variant, tabsClasses, bodyClasses, active, disabled, panel, name }) => html`
  <h5>Default toggle</h5>
  <sgds-tab-group tabsClasses=${tabsClasses} bodyClasses=${bodyClasses}>
    <sgds-tab slot="nav" panel=${panel} ?active=${active} ?disabled=${disabled}>Home</sgds-tab>
    <sgds-tab slot="nav" panel="profile">Profile</sgds-tab>
    <sgds-tab slot="nav" panel="contact">Contact</sgds-tab>
    <sgds-tab-panel name=${name}
      >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book.</sgds-tab-panel
    >
    <sgds-tab-panel name="profile"
      >It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using 'Content here, content here',</sgds-tab-panel
    >
    <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
  </sgds-tab-group>
  <br />
  <h5>Basic toggle</h5>
  <sgds-tab-group variant="tabs-basic-toggle">
    <sgds-tab slot="nav" panel="home"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-house"
        viewBox="0 0 16 16"
      >
        <path
          d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"
        /></svg
      >Home
    </sgds-tab>
    <sgds-tab active slot="nav" panel="profile">Profile</sgds-tab>
    <sgds-tab slot="nav" panel="contact">Contact</sgds-tab>
    <sgds-tab-panel name="home"
      >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
      type specimen book.</sgds-tab-panel
    >
    <sgds-tab-panel name="profile"
      >It is a long established fact that a reader will be distracted by the readable content of a page when looking at
      its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
      opposed to using 'Content here, content here',</sgds-tab-panel
    >
    <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
    <br />
    <h5>Info toggle</h5>
    <sgds-tab-group variant="tabs-info-toggle">
      <sgds-tab slot="nav" panel="home"
        ><svg
          slot="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-house"
          viewBox="0 0 16 16"
        >
          <path
            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"
          /></svg
        ><span slot="count">1</span><span slot="label">Home</span>
      </sgds-tab>
      <sgds-tab slot="nav" panel="profile"><span slot="count">2</span><span slot="label">Profile</span></sgds-tab>
      <sgds-tab slot="nav" panel="contact"
        ><sgds-badge slot="count" variant="light" badgeClasses="text-dark">100</sgds-badge
        ><span slot="label">Contact</span></sgds-tab
      >

      <sgds-tab-panel name="home"
        >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make
        a type specimen book.</sgds-tab-panel
      >
      <sgds-tab-panel name="profile"
        >It is a long established fact that a reader will be distracted by the readable content of a page when looking
        at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as
        opposed to using 'Content here, content here',</sgds-tab-panel
      >
      <sgds-tab-panel name="contact">Contact information</sgds-tab-panel>
    </sgds-tab-group>
  </sgds-tab-group>
`;

export const args = {
  name: "home",
  panel: "home",
  tabsClasses: "mb-3"
};

export const parameters = {};
