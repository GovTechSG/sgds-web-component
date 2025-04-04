import SgdsIcon from "@govtechsg/sgds-web-component/react/icon/index.js";
import SgdsIconList from "@govtechsg/sgds-web-component/react/icon-list/index.js";

export const IconList = () => {
  return (
    <>
      <SgdsIconList size="sm">
        <div role="listitem">
          <SgdsIcon size="sm" name="placeholder"></SgdsIcon>item one
        </div>
        <div role="listitem">
          <SgdsIcon name="placeholder" size="sm"></SgdsIcon>item one
        </div>
        <div role="listitem">
          <SgdsIcon name="placeholder" size="sm"></SgdsIcon>item one
        </div>
      </SgdsIconList>
    </>
  );
};
