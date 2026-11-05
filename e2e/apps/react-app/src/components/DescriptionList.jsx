import { SgdsDescriptionList, SgdsDescriptionListGroup } from '@govtechsg/sgds-web-component/react';

export const DescriptionList = () => {
  return (
    <>
      <SgdsDescriptionList>
        <SgdsDescriptionListGroup>
          <span slot="title">DescriptionListGroup</span>
          <span slot="description">Description of the descriptionlistgroup.</span>
          DescriptionListGroup content
        </SgdsDescriptionListGroup>
      </SgdsDescriptionList>
    </>
  );
};
