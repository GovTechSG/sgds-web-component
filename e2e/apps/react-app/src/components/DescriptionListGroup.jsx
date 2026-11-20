import { SgdsDescriptionListGroup, SgdsDescriptionList } from '@govtechsg/sgds-web-component/react';

export const DescriptionListGroup = () => {
  return (
    <>
      <SgdsDescriptionListGroup>
        <span slot="title">Personal Information</span>
        <SgdsDescriptionList>
          Name
          <span slot="data">John Doe</span>
        </SgdsDescriptionList>
        <SgdsDescriptionList>
          Email
          <span slot="data">john@example.com</span>
        </SgdsDescriptionList>
        <SgdsDescriptionList>
          Phone
          <span slot="data">+65 1234 5678</span>
        </SgdsDescriptionList>
      </SgdsDescriptionListGroup>
    </>
  );
};
