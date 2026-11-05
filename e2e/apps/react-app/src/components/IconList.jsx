import { SgdsIconList, SgdsIcon } from '@govtechsg/sgds-web-component/react';

export const IconList = () => {
  return (
    <>
      <SgdsIconList>
        <div role="listitem"><SgdsIcon name="placeholder"></SgdsIcon>Item 1</div>
        <div role="listitem"><SgdsIcon name="placeholder"></SgdsIcon>Item 2</div>
        <div role="listitem"><SgdsIcon name="placeholder"></SgdsIcon>Item 3</div>
      </SgdsIconList>
    </>
  );
};
