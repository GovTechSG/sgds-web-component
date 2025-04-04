import SgdsDescriptionList from "@govtechsg/sgds-web-component/react/description-list/index.js";
import SgdsDescriptionListGroup from "@govtechsg/sgds-web-component/react/description-list-group/index.js";

export const DescriptionList = () => {
  return (
    <>
      <SgdsDescriptionListGroup>
        <span slot="description">Description</span>
        <SgdsDescriptionList>
          Label 1<span slot="data">Data Text Description List 1</span>
        </SgdsDescriptionList>
        <SgdsDescriptionList>
          Label 2<span slot="data">Data Text Description List 2</span>
        </SgdsDescriptionList>
      </SgdsDescriptionListGroup>
    </>
  );
};
